import { useShallow } from 'zustand/shallow'
import '../../App.css'
import dependencyController from '../../controllers/dependencyController'
import nodeController from '../../controllers/nodeController'
import propertyController from '../../controllers/propertyController'
const Header = () => {
    const {nodes} = nodeController()
    const {get_map} = propertyController()
    const {get_dep_map, get_child_map, get_network_heads} = dependencyController()
    const handleClick = () => {
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