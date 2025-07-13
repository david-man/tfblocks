import NodeComponent from "../../Graph/Nodes/NodeComponent"

const Slide13 = () => {
    const exampleNode =
     (<div className = 'relative w-1/5 h-1/5 text-[60px] '>
        <div className = 'absolute left-[-5px] top-[calc(50%-5px)] w-[10px] h-[10px] rounded-full bg-[#97a5a6]'></div>
        <div className = 'absolute right-[-5px] top-[calc(50%-5px)] w-[10px] h-[10px] rounded-full bg-black'></div>
        <NodeComponent dummy = {true} valid_node = {false} mainText = {"Node"} parent_handles = {[]} bg_color = "bg-blue-100" optionsMenu = {<div />}/>
    </div>)
    return (
        <div className = 'absolute z-5 h-full w-full flex flex-col justify-center items-center'>
            <p className = 'text-[25px] text-white'>This is what a typical layer block looks like</p>
            <img src = 'white-down-angle.png' height = {16} width = {16}></img>
            {exampleNode}
        </div>
    )
}
export default Slide13