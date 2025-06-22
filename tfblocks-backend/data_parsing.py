import tensorflow as tf
import keras

def parse_json(data):
    if(not data["active_nodes"] or not data["properties_map"] or not data["dependency_map"] or not data["network_heads"]):
        raise Exception("Incomplete Data")
    else:
        print("DATA RECEIVED")
        active_node_ids = []
        active_nodes = []
        type_map = {}
        for node in data["active_nodes"]:
            active_node_ids.append(node['id'])
            active_nodes.append(node)
            type_map[node['id']] = node['type']
        properties_map = {}
        for pair in data["properties_map"]:
            properties_map[pair[0]] = pair[1]
        dependency_map = {}
        for pair in data["dependency_map"]:
            dependency_map[pair[0]] = pair[1]
        child_map = {}
        for pair in data["child_map"]:
            child_map[pair[0]] = pair[1]
        network_heads = data["network_heads"]

        run_order = ['in']
        nodes_to_add = active_node_ids[:]
        nodes_to_add.remove('in')
        while(len(nodes_to_add) > 0):
            for node in nodes_to_add:
                if(set(dependency_map[node]).issubset(set(run_order))):
                    run_order.append(node)
                    nodes_to_add.remove(node)
                    break

        print("RUN ORDER: ", run_order)

        input_shape = properties_map['in']['input_shape']

        input_handle_dict = {}
        for node in active_nodes:
            if(node['id'] != 'in'):
                if('parent_handle_id' in properties_map[node['id']].keys()):
                    input_handle_dict[node['id']] = [properties_map[node['id']]['parent_handle_id']]
                else:
                    input_handle_dict[node['id']] = [properties_map[node['id']]['parent_handle_id_1'], properties_map[node['id']]['parent_handle_id_2']]
        
        output_handle_dict = {}
        for node in active_nodes:
            if(node['id'] != 'out' and node['id'] != 'in'):
                if(node['type'] == 'cut'):
                    output_handle_dict[node['id']] = [properties_map[node['id']]['output_handle_id_1'], properties_map[node['id']]['output_handle_id_2']]
                else:
                    output_handle_dict[node['id']] = [properties_map[node['id']]['output_handle_id']]
                    
        
        return tuple(input_shape), run_order, input_handle_dict, output_handle_dict, active_nodes, properties_map, type_map

            
    