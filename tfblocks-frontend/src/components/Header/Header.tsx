import { useShallow } from 'zustand/shallow'
import '../../App.css'
import dependencyController from '../../controllers/dependencyController'
import nodeController from '../../controllers/nodeController'
import propertyController from '../../controllers/propertyController'
import axios from 'axios'
import type { Node } from '@xyflow/react'
import { useState, useEffect} from 'react'
import TrainingElement from './TrainingElement'
import IdleElement from './IdleElement'

const Header = () => {
    const {nodes} = nodeController()
    const {get_map, get_properties} = propertyController()
    const {get_dep_map, get_child_map, get_network_heads} = dependencyController()
    const [trainingState, setTrainingState] = useState(false)

    const handleClick = async () => {
        let send = true;
        nodes.map((node : Node) => {
            if(!get_properties(node.id) || !(get_properties(node.id)?.valid)){
                send = false;
            }
        })
        if(!send){
            alert("This graph isn't ready to be parsed yet! Make sure you have a valid configuration!")
        }
        else{
            const filtered_network_heads = get_network_heads().filter((id : string) => (id != 'out'))
            try{
                const resp = await axios.post('http://localhost:8000/api/data/', {
                    active_nodes : [...nodes.map((node : Node) => {
                        return {id: node.id, type: node.type}
                    })],
                    properties_map: [...get_map()],
                    dependency_map : [...get_dep_map()],
                    child_map : [...get_child_map()],
                    network_heads : filtered_network_heads
                })
                console.log(resp.data)
            }
            catch (err){
                console.log("ERROR: ", err)
            }
        }
        
        // console.log("ACTIVE NODES: ", nodes)
        // console.log("PROPERTIES MAP: ", get_map())
        // console.log("CURRENT DEPENDENCY MAP: ", get_dep_map())
        // console.log("CURRENT CHILD MAP: ", get_child_map())
        // console.log("CURRENT NETWORK HEADS: ", get_network_heads())
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