import NodeComponent from "../../Graph/Nodes/NodeComponent"

const Slide16 = () => {
    const exampleNode =
     (<div className = 'relative w-1/5 h-1/5 text-[60px] '>
        <div className = 'absolute left-[-5px] top-[calc(50%-5px)] w-[10px] h-[10px] rounded-full bg-[#97a5a6]'></div>
        <div className = 'absolute right-[-5px] top-[calc(50%-5px)] w-[10px] h-[10px] rounded-full bg-black'></div>
        <NodeComponent dummy = {true} valid_node = {false} mainText = {"Node"} parent_handles = {[]} bg_color = "bg-blue-100" optionsMenu = {<div />}/>
    </div>)
    return (
        <div className = 'absolute z-5 h-full w-full flex flex-col justify-center items-center'>
            <div className = 'absolute z-10 top-[calc(10%-20px)] left-[calc(40%-32px)] h-4/5 flex justify-center items-center'>
                <img src = 'white-down-angle.png' height = {32} width = {32} className = 'transform rotate-330'></img>
            </div>
            <div className = 'absolute z-10 top-[calc(10%-20px)] left-[calc(60%)] h-4/5 flex justify-center items-center'>
                <img src = 'white-down-angle.png' height = {32} width = {32} className = 'transform rotate-30'></img>
            </div>
            <div className = 'absolute z-10 top-0 left-0 h-6/10 w-full flex flex-col justify-center items-center'>
                <p className = 'text-white text-[25px] text-center'>All layers have these attached parts called handles.</p>
                <p className = 'text-white text-[25px] text-center'>Dragging a handle will create an edge, which can be attached to other handles to form connections.</p>
                <p className = 'text-white text-[25px] text-center'>Connections are how you can connect layers together to make your model!</p>
            </div>
            {exampleNode}
        </div>
    )
}
export default Slide16