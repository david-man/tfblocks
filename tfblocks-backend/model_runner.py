import keras
import tensorflow as tf
import copy as copy
import numpy as np
_debug = False
def test_model(input_shape, model):
    random_input_shape = (1, ) + tuple(input_shape)
    try:
        model(tf.random.uniform(shape = random_input_shape))
        return True
    except Exception:
        return False
def build_model(input_shape, networks, networks_compile_order, input_handle_dict, output_handle_dict, type_map, properties_map, dependency_map):
    RNNs = {}#special dictionary mapping RNN network heads to whole cells
    layers = {}#special dictionary mapping cells to normal layers
    handle_results = {}
    _preloaded = False
    def preload_layer(node_id):
        if(node_id == 'in'):
            layers[node_id] = keras.Input(shape = input_shape)
            return
        elif('rec_external_' in node_id):
            return#RNNs are dealt with through their own preloading function
        elif(node_id == 'out'):
            return #no layer is output
        else:
            match type_map[node_id]:
                case 'activation':
                    activation_function = properties_map[node_id]['activation']
                    layers[node_id] = keras.layers.Activation(activation = activation_function)
                    return
                case 'add':
                    return# dealt with in runtime
                case 'concatenate':
                    return# dealt with in runtime
                case 'conv':
                    dim = properties_map[node_id]['dim']
                    filters = properties_map[node_id]['filters']
                    kernel_size = properties_map[node_id]['kernel_size']
                    stride = properties_map[node_id]['stride']
                    padding = properties_map[node_id]['padding']
                    match dim:
                        case '1d':
                            layers[node_id] =  keras.layers.Conv1D(filters = filters,
                                                        kernel_size = kernel_size,
                                                        strides = stride,
                                                        padding = padding)
                            return
                        case '2d':
                            layers[node_id] = keras.layers.Conv2D(filters = filters,
                                                        kernel_size = kernel_size,
                                                        strides = stride,
                                                        padding = padding)
                            return
                        case '3d':
                            layers[node_id] = keras.layers.Conv3D(filters = filters,
                                                        kernel_size = kernel_size,
                                                        strides = stride,
                                                        padding = padding)
                            return layers
                        case _:
                            print("CONVOLUTIONAL ERROR")
                            return
                case 'cut':
                    return#will be dealt with in runtime
                case 'subtract':
                    return #dealt with in runtime
                case 'multiply':
                    return#dealt with in runtime
                case 'scalar_ops':
                    return #dealt with in runtime
                case 'dense':
                    units = properties_map[node_id]['units']
                    layers[node_id] = keras.layers.Dense(units = units)
                    return
                case 'dot_product':
                    return#dealt with in runtime
                case 'dropout':
                    dimensionality = properties_map[node_id]['dimensionality']
                    rate = properties_map[node_id]['rate'] / 100
                    match dimensionality:
                        case '1d':
                            layers[node_id] = keras.layers.SpatialDropout1D(rate = rate)
                            return
                        case '2d':
                            layers[node_id] = keras.layers.SpatialDropout2D(rate = rate)
                            return
                        case '3d':
                            layers[node_id] = keras.layers.SpatialDropout3D(rate = rate)
                            return
                        case 'indiv':
                            layers[node_id] = keras.layers.Dropout(rate = rate)
                            return
                        case _:
                            print("DROPOUT ERROR")
                            return
                case 'flatten':
                    resulting_shape = properties_map[node_id]['output_shape']
                    layers[node_id] = keras.layers.Reshape(target_shape = resulting_shape)
                    return
                case 'gru':
                    units = properties_map[node_id]['units']
                    layers[node_id] = keras.layers.GRU(units = units)
                    return
                case 'lstm':
                    units = properties_map[node_id]['units']
                    layers[node_id] = keras.layers.LSTM(units = units)
                    return
                case 'norm':
                    axis = properties_map[node_id]['axis']
                    normtype = properties_map[node_id]['norm_type']
                    match normtype:
                        case 'unit':
                            layers[node_id] = keras.layers.UnitNormalization(axis = axis)
                            return
                        case 'batch':
                            layers[node_id] = keras.layers.BatchNormalization(axis = axis)
                            return
                        case 'layer':
                            layers[node_id] = keras.layers.LayerNormalization(axis = axis)
                            return
                        case _:
                            print("NORMALIZATION ERROR")
                            return
                case 'pooling':
                    dim = properties_map[node_id]['dim']
                    pooling_size = properties_map[node_id]['pooling_size']
                    stride = properties_map[node_id]['stride']
                    padding = properties_map[node_id]['padding']
                    pooling_type = properties_map[node_id]['pooling_type']
                    match dim:
                        case '1d':
                            match pooling_type:
                                case 'maxpool':
                                    layers[node_id] = keras.layers.MaxPool1D(pool_size=pooling_size, strides = stride, padding = padding)
                                    return
                                case 'averagepool':
                                    layers[node_id] = keras.layers.AveragePooling1D(pool_size=pooling_size, strides = stride, padding = padding)
                                    return
                                case _:
                                    print("POOLING ERROR")
                                    return
                        case '2d':
                            match pooling_type:
                                case 'maxpool':
                                    layers[node_id] = keras.layers.MaxPool2D(pool_size=pooling_size, strides = stride, padding = padding)
                                    return
                                case 'averagepool':
                                    layers[node_id] =  keras.layers.AveragePooling2D(pool_size=pooling_size, strides = stride, padding = padding)
                                    return
                                case _:
                                    print("POOLING ERROR")
                        case '3d':
                            match pooling_type:
                                case 'maxpool':
                                    layers[node_id] =  keras.layers.MaxPool3D(pool_size=pooling_size, strides = stride, padding = padding)
                                    return
                                case 'averagepool':
                                    layers[node_id] =  keras.layers.AveragePooling3D(pool_size=pooling_size, strides = stride, padding = padding)
                                    return
                                case _:
                                    print("POOLING ERROR")
                                    return
                        case _:
                            print("POOLING ERROR")
                            return
                case 'rnn':
                    units = properties_map[node_id]['units']
                    layers[node_id] = keras.layers.SimpleRNN(units = units)
                    return
                case 'transpose':
                    axis_1 = properties_map[node_id]['axis_1']
                    axis_2 = properties_map[node_id]['axis_2']
                    shapelen = properties_map[node_id]['shapelen']
                    shape_permutation = list(range(1, shapelen + 1))
                    holder = shape_permutation[axis_1]
                    shape_permutation[axis_1] = shape_permutation[axis_2]
                    shape_permutation[axis_2] = holder
                    layers[node_id] = keras.layers.Permute(dims = shape_permutation)
                    return
                case 'upscale':
                    output_shape = properties_map[node_id]['output_shape']
                    layers[node_id] = keras.layers.Reshape(target_shape=output_shape)
                    return
                case _:
                    print("LAYER TYPE NOT FOUND")
                    return
    
    def run_node(node_id):
        if(not _preloaded):
            raise Exception("run_node ran before layers were properly preloaded. Exiting")
        else:
            if(node_id == 'in'):
                output_handle = 'in|output_handle'
                handle_results[output_handle] = layers[node_id]
            elif('rec_external_' in node_id):
                raw_id = node_id.replace("rec_external_", "")
                network_id = f"rec_hidden_{raw_id}"
                layer = RNNs[network_id]
                input_handle = properties_map[raw_id]['external_parent_handle_id']
                output_handle = properties_map[raw_id]['external_output_handle_id']
                handle_results[output_handle] = layer(handle_results[input_handle])
            elif(node_id == 'out'):
                input_handle = input_handle_dict['out'][0]
                handle_results['final_result'] = handle_results[input_handle]
            else:
                match type_map[node_id]:
                    case 'add':
                        input_handle_1 = input_handle_dict[node_id][0]
                        input_handle_2 = input_handle_dict[node_id][1]
                        output_handle = output_handle_dict[node_id][0]
                        handle_results[output_handle] = handle_results[input_handle_1] + handle_results[input_handle_2]
                    case 'subtract':
                        input_handle_1 = input_handle_dict[node_id][0]
                        input_handle_2 = input_handle_dict[node_id][1]
                        output_handle = output_handle_dict[node_id][0]
                        handle_results[output_handle] = handle_results[input_handle_1] + handle_results[input_handle_2]
                    case 'multiply':
                        input_handle_1 = input_handle_dict[node_id][0]
                        input_handle_2 = input_handle_dict[node_id][1]
                        output_handle = output_handle_dict[node_id][0]
                        handle_results[output_handle] = handle_results[input_handle_1] + handle_results[input_handle_2]
                    case 'scalar_ops':
                        input_handle = input_handle_dict[node_id][0]
                        output_handle = output_handle_dict[node_id][0]
                        scalar = properties_map[node_id]['scalar']
                        operation = properties_map[node_id]['operation']
                        match operation:
                            case 'add':
                                handle_results[output_handle] = handle_results[input_handle] + scalar
                            case 'multiply':
                                handle_results[output_handle] = handle_results[input_handle] * scalar
                            case 'exponentiate':
                                handle_results[output_handle] = handle_results[input_handle] ** scalar
                            case _:
                                print("AAAAAAAAA")
                    case 'concatenate':
                        axis = properties_map[node_id]['axis']
                        input_handle_1 = input_handle_dict[node_id][0]
                        input_handle_2 = input_handle_dict[node_id][1]
                        output_handle = output_handle_dict[node_id][0]
                        handle_results[output_handle] = keras.ops.concatenate(xs = [handle_results[input_handle_1], handle_results[input_handle_2]], axis = axis)
                    case 'cut':
                        axis = properties_map[node_id]['axis']
                        cut_1 = properties_map[node_id]['cut_1']
                        input_handle = input_handle_dict[node_id][0]
                        output_handle_1 = output_handle_dict[node_id][0]
                        output_handle_2 = output_handle_dict[node_id][1]
                        handle_results[output_handle_1], handle_results[output_handle_2] = keras.ops.split(handle_results[input_handle], [cut_1], axis = axis)
                    case 'dot_product':
                        input_handle_1 = input_handle_dict[node_id][0]
                        input_handle_2 = input_handle_dict[node_id][1]
                        output_handle = output_handle_dict[node_id][0]
                        handle_results[output_handle] = keras.ops.dot(handle_results[input_handle_1], handle_results[input_handle_2])
                    case _:
                        input_handle = input_handle_dict[node_id][0]
                        output_handle = output_handle_dict[node_id][0]
                        handle_results[output_handle] = layers[node_id](handle_results[input_handle])
    def assembleRNNs():
        class CustomRNNCell(keras.Layer):#REMAKE FOR WEIGHTS
            def __init__(self, input_shape, state_shape, rec_node_id, run_order):
                super().__init__()
                self.input_size = input_shape
                self.state_size = state_shape
                self.output_size = state_shape
                self.run_order = run_order
                self.rec_node_id = rec_node_id
                self.raw_id = self.rec_node_id.replace("rec_hidden_", "")
                self.layers = []
                for node in self.run_order:
                    if(node != rec_node_id):
                        self.layers.append(layers[node])#forces Keras to acknowledge the existence of the inner layers
            def call(self, inputs, states):
                handle_results[f'{self.rec_node_id}|timestep_handle'] = inputs
                handle_results[f'{self.rec_node_id}|output_handle'] = states[0]
                for node in self.run_order:
                    if(node == self.rec_node_id):
                        continue
                    else:
                        run_node(node)
                final_handle = properties_map[raw_id]['hidden_parent_handle_id']
                return handle_results[final_handle], [handle_results[final_handle]]
            

        for network in networks_compile_order:
            if(not (network == 'in')):
                raw_id = network.replace("rec_hidden_", "")
                hidden_input_shape = properties_map[raw_id]['hidden_input_shape']
                hidden_state_shape = properties_map[raw_id]['hidden_state_shape']
                isolated_net = copy.copy(networks[network])
                isolated_net.remove(network)
                run_order = [network]
                while(not(len(isolated_net) == 0)):
                    for node in isolated_net:
                        if(set(dependency_map[node]).issubset(set(run_order))):
                            run_order.append(node)
                            isolated_net.remove(node)
                            break
                RNNs[network] = keras.layers.RNN(cell = CustomRNNCell(hidden_input_shape, hidden_state_shape, network, run_order))
    
    #PRELOADING DATA
    for node_id in type_map.keys():
        preload_layer(node_id)
    _preloaded = True
    assembleRNNs()
    
    run_order = ['in']
    nodes_to_add = copy.copy(networks['in'])
    nodes_to_add.remove('in')
    while(not(len(nodes_to_add) == 0)):
        for node_id in nodes_to_add:
            if(set(dependency_map[node_id]).issubset(run_order)):
                run_order.append(node_id)
                nodes_to_add.remove(node_id)
                break
    
    for i in run_order:
        run_node(i)
    if(_debug):
        print("RUN ORDER: ", run_order)
        print("INPUT SHAPE: ", input_shape)
        print("INPUT HANDLE DICT: ", input_handle_dict)
        print("OUTPUT HANDLE DICT: ", output_handle_dict)
    if(handle_results["in|output_handle"] == handle_results['final_result']):
        return "NO MODEL", False
    else:
        mymodel = keras.Model(inputs = handle_results["in|output_handle"], outputs = handle_results['final_result'])
        test_result = test_model(input_shape, mymodel)
        mymodel.summary()
        return mymodel, test_result