import tensorflow as tf
import keras
import copy

def parse_json(data):
    if(not data["active_nodes"] or not data["properties_map"] or not data["dependency_map"] or not data["network_heads"]):
        raise Exception("Incomplete Data")
    else:
        active_node_ids = []
        active_nodes = []
        type_map = {}
        for node in data["active_nodes"]:
            if(node['type'] == 'recurrent_head'):
                active_node_ids.append(f"rec_external_{node['id']}")
                active_node_ids.append(f"rec_hidden_{node['id']}")
                type_map[f"rec_external_${node['id']}"] = 'recurrent_external'
                type_map[f"rec_hidden_${node['id']}"] = 'recurrent_internal'
            else:
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
        networks, network_compile_order = _organize_networks(active_node_ids, network_heads, dependency_map, child_map)
        print("NETWORKS: ", networks)
        print("NETWORK COMPILATION ORDER: ", network_compile_order )

        input_shape = properties_map['in']['input_shape']

        input_handle_dict = {}
        for node in active_nodes:
            if(node['id'] != 'in' and type_map[node['id']] != 'custom_matrix'):
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
        
        type_map = {}
        for node in active_nodes:
            type_map[node['id']] = node['type']
                    
        
        return tuple(input_shape), networks, network_compile_order, input_handle_dict, output_handle_dict, type_map, properties_map, dependency_map
    
def _organize_networks(nodes_ids, network_heads, dependency_map, child_map):
    print("DEP MAP: ", dependency_map)
    print("CHILD MAP: ", child_map)

    networks = {}
    for head in network_heads:
        networks[head] = []
    def findNetwork(id):
        to_ret = "hanging"
        for head in network_heads:
            nodes_to_search = [head]
            nodes_searched = []
            while(not len(nodes_to_search) == 0 and to_ret == 'hanging'):
                next_node = nodes_to_search.pop()
                if(next_node == id):
                    to_ret = head
                else:
                    dependencies = dependency_map[next_node]
                    children = child_map[next_node]
                    surroundings = dependencies + children
                    for surrounding_node in surroundings:
                        if(surrounding_node in nodes_searched):
                            continue
                        else:
                            if(surrounding_node == id):
                                to_ret = head
                            else:
                                nodes_to_search.append(surrounding_node)
                                nodes_searched.append(next_node)
        return to_ret
    for node in nodes_ids:
        networks[findNetwork(node)].append(node)
    for head in network_heads:
        if head != 'in':
            external_node_id = head.replace('rec_hidden_', 'rec_external_')
            networks[findNetwork(external_node_id)].append(external_node_id)
    network_dependencies = {}
    for head in network_heads:
        network_dependencies[head] = []
        network = networks[head]
        for dependent_node in network:
            if(dependent_node == head):
                continue
            else:
                if('rec_external_' in dependent_node):
                    hidden_network_dependency = dependent_node.replace("rec_external_", "rec_hidden_")
                    network_dependencies[head].append(hidden_network_dependency)
    network_compile_order = []
    heads_to_add = copy.copy(network_heads)
    while(not(len(heads_to_add) == 0)):
        for head in heads_to_add:
            if(set(network_dependencies[head]).issubset(set(network_compile_order))):
                network_compile_order.append(head)
                heads_to_add.remove(head)
                break
    return networks, network_compile_order

            
    