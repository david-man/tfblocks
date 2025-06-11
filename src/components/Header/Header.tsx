import { useShallow } from 'zustand/shallow'
import '../../App.css'
import nodeController from '../../controllers/nodeController'
const Header = () => {
    const {nodes} = nodeController(useShallow((state) => ({nodes: state.nodes})))
    const handleClick = () => {
        console.log(nodes)
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