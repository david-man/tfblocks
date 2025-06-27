import { useShallow } from 'zustand/shallow'
import '../../App.css'
import dependencyController from '../../controllers/dependencyController'
import nodeController from '../../controllers/nodeController'
import propertyController from '../../controllers/propertyController'
import axios from 'axios'
import type { Node } from '@xyflow/react'
const Header = () => {
    const {nodes} = nodeController()
    const {get_map, get_properties} = propertyController()
    const {get_dep_map, get_child_map, get_network_heads} = dependencyController()
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
        
        console.log("ACTIVE NODES: ", nodes)
        console.log("PROPERTIES MAP: ", get_map())
        console.log("CURRENT DEPENDENCY MAP: ", get_dep_map())
        console.log("CURRENT CHILD MAP: ", get_child_map())
        console.log("CURRENT NETWORK HEADS: ", get_network_heads())
    }
    return (
        <div className = "flex justify-center items-center border-2 border-black w-full h-full">
            <p className = "text-center text-black">HEADER AREA</p>
            <div className = "h-3/4 w-1/5 rounded-xs border-2 border-black">
                <button onClick = {handleClick}>SHOW ALL</button>
            </div>
        </div>
    )
}
export default Header