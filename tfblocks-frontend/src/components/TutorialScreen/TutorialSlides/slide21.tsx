import NodeComponent from "../../Graph/Nodes/NodeComponent"

const Slide21 = () => {
    const exampleNode =
     (<div className = 'relative w-1/5 h-1/5 text-[60px] '>
        <div className = 'absolute left-[-5px] top-[calc(50%-5px)] w-[10px] h-[10px] rounded-full bg-[#2c7d41]'></div>
        <div className = 'absolute right-[-5px] top-[calc(50%-5px)] w-[10px] h-[10px] rounded-full bg-black'></div>
        <NodeComponent dummy = {true} valid_node = {true} mainText = {"Node"} parent_handles = {[]} bg_color = "bg-blue-100" optionsMenu = {<div />}/>
    </div>)
    return (
        <div className = 'absolute z-5 h-full w-full flex flex-col justify-center items-center'>
            <div className = 'absolute z-10 top-0 left-0 h-6/10 w-full flex flex-col justify-center items-center'>
                <p className = 'text-[25px] text-white text-center'>Naturally, all layers involved in the model need to be green for the model to properly compile!</p>
            </div>
            {exampleNode}
        </div>
    )
}
export default Slide21