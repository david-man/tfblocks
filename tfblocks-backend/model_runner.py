import keras
import tensorflow as tf

def build_model(input_shape, run_order, input_handle_dict, output_handle_dict, active_nodes, properties_map, type_map):
    layers = {}#assembles a set of keras layers that will be used
    for node in active_nodes:
        if(node['type'] == 'dense'):
            layers[node['id']] = keras.layers.Dense(units = properties_map[node['id']]['units'])
        elif(node['type'] == 'activation'):
            layers[node['id']] = keras.layers.Activation(activation = properties_map[node['id']]['activation'])
        elif(node['type'] == 'conv'):
            stride = properties_map[node['id']]['stride']
            kernel_size = properties_map[node['id']]['kernel_size']
            padding_type = properties_map[node['id']]['padding']
            filters = properties_map[node['id']]['filters']
            match properties_map[node['id']]['dim']:
                case '1d':
                    layers[node['id']] = keras.layers.Conv1D(filters, kernel_size, stride, padding = padding_type)
                case '2d':
                    layers[node['id']] = keras.layers.Conv2D(filters, kernel_size, stride, padding = padding_type)
                case '3d':
                    layers[node['id']] = keras.layers.Conv3D(filters, kernel_size, stride, padding= padding_type)
    
    results = {"in|output_handle": keras.Input(shape = input_shape)}
    for node_id in run_order:
        if(node_id == 'in'):
            continue
        elif(node_id in layers):#layers are non-ops, meaning that they must take in 1 input and release 1 output
            input_handle = input_handle_dict[node_id][0]
            output_handle = output_handle_dict[node_id][0]
            results[output_handle] = layers[node_id](results[input_handle])
        elif(node_id == 'out'):
            input_handle = input_handle_dict[node_id][0]
            results['final_output'] = results[input_handle]
        else:#this is an operation
            if(type_map[node_id] == 'dot_product'):
                input_handle_1 = input_handle_dict[node_id][0]
                input_handle_2 = input_handle_dict[node_id][1]
                output_handle = output_handle_dict[node_id][0]
                results[output_handle] = keras.ops.dot(results[input_handle_1], results[input_handle_2])
            elif(type_map[node_id] == 'transpose'):
                input_handle = input_handle_dict[node_id][0]
                output_handle = output_handle_dict[node_id][0]
                axis_1 = properties_map[node_id]['axis_1']
                axis_2 = properties_map[node_id]['axis_2']
                results[output_handle] = keras.ops.transpose(results[input_handle], (axis_1, axis_2))
            elif(type_map[node_id] == 'upscale'):
                input_handle = input_handle_dict[node_id][0]
                output_handle = output_handle_dict[node_id][0]
                resultant_shape = properties_map[node_id]['output_shape']
                results[output_handle] = keras.layers.Reshape(target_shape = tuple(resultant_shape))(results[input_handle])
            elif(type_map[node_id] == 'flatten'):
                input_handle = input_handle_dict[node_id][0]
                output_handle = output_handle_dict[node_id][0]
                resultant_shape = properties_map[node_id]['output_shape']
                results[output_handle] = keras.layers.Reshape(target_shape = tuple(resultant_shape))(results[input_handle])
                    
    mymodel = keras.Model(inputs = results["in|output_handle"], outputs = results['final_output'])
    mymodel.summary()
    mymodel.predict(tf.random.uniform(shape = (1, 16, 16 ,3)))
    return mymodel