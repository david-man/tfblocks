import { useShallow } from 'zustand/shallow'
import '../../App.css'
import dependencyController from '../../controllers/dependencyController'
import nodeController from '../../controllers/nodeController'
import propertyController from '../../controllers/propertyController'
import axios from 'axios'
import type { Node } from '@xyflow/react'
import { useState} from 'react'
import TrainingElement from './TrainingElement'
import IdleElement from './IdleElement'

const Header = (props: any) => {
    const {nodes} = nodeController()
    const {get_map, get_properties} = propertyController()
    const {get_dep_map, get_child_map, get_network_heads, get_dependencies, get_children} = dependencyController()
    const [trainingState, setTrainingState] = useState(false)

    const findNetwork = (id : String) => {
        let to_ret = "hanging"
        get_network_heads().map((network_head : String) => {
        let nodes_to_search = [network_head]
        let nodes_searched : Array<String> = []
        while(!(nodes_to_search.length === 0) && to_ret  === 'hanging'){
            let next_node = nodes_to_search.pop()!
            if(next_node === id){
            to_ret = network_head as string
            }
            let dep = get_dependencies(next_node)
            let children = get_children(next_node)
            let surroundings = dep.concat(children).filter((next : String) => !nodes_searched.includes(next))

            if(surroundings.includes(id)){
            to_ret = network_head as string
            }
            else{
            nodes_to_search = nodes_to_search.concat(surroundings)
            nodes_searched.push(next_node)
            }
        }
        })
        if(to_ret == 'out'){
            to_ret = 'in'//the network for the output layer should ALWAYS be the same as the network for the input layer.
        }
        return to_ret
    }

    const handleClick = async () => {
        let send = true;
        nodes.map((node : Node) => {
            if((!get_properties(node.id) || !(get_properties(node.id)?.valid)) && findNetwork(node.id) != 'hanging'){
                send = false;
            }
        })
        if(!send){
            alert("This graph isn't ready to be parsed yet! Make sure you have a valid configuration!")
        }
        else{
            const filtered_network_heads = get_network_heads().filter((id : string) => (id != 'out'))
            try{
                const resp = await axios.post('http://localhost:8000/api/sendModel/', {
                    active_nodes : [...nodes.map((node : Node) => {
                        return {id: node.id, type: node.type}
                    }).filter((node) => findNetwork(node.id) != 'hanging')],//active nodes defined as nodes that aren't floating around
                    properties_map: [...get_map()],
                    dependency_map : [...get_dep_map()],
                    child_map : [...get_child_map()],
                    network_heads : filtered_network_heads
                })
                if(resp.status == 200){
                    const download = await axios.get('http://localhost:8000/api/getLastModel/', {responseType: 'blob'})
                    // Create a URL for the blob and trigger a download
                    const url = window.URL.createObjectURL(new Blob([download.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'model.keras'); // Use the desired filename
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    window.URL.revokeObjectURL(url); // Clean up the URL object
                }
            }
            catch (err){
                alert("ERROR: " + err.response.data.message.toString())
            }
        }
    }
    return (
        <div className = "border-2 border-gray-500 w-full h-full relative">
            <div className = 'h-full w-1/12 flex flex-col items-center justify-center absolute left-8'>
                <img src = {'logo.png'} width = '60px' height = '60px'></img>
            </div>
            <div className = "absolute top-1/8 right-10 h-3/4 w-1/10 rounded-xl border-2 border-gray-500 bg-amber-300 flex justify-center items-center">
                <button onClick = {handleClick} className = 'w-full h-full'>Train!</button>
            </div>
            <div className = 'absolute top-1/8 right-2/5 w-1/5 h-3/4'>
                {trainingState ? <TrainingElement setTrainingState = {setTrainingState}/> : <IdleElement setTrainingState = {setTrainingState}/>}
            </div>
        </div>
    )
}
export default Header