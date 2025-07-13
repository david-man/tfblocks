import NodeComponent from "../../Graph/Nodes/NodeComponent"

const Slide14 = () => {
    const exampleNode =
     (<div className = 'relative w-1/5 h-1/5 text-[60px] '>
        <div className = 'absolute left-[-5px] top-[calc(50%-5px)] w-[10px] h-[10px] rounded-full bg-[#97a5a6]'></div>
        <div className = 'absolute right-[-5px] top-[calc(50%-5px)] w-[10px] h-[10px] rounded-full bg-black'></div>
        <NodeComponent dummy = {true} valid_node = {false} mainText = {"Node"} parent_handles = {[]} bg_color = "bg-blue-100" optionsMenu = {<div />}/>
    </div>)
    return (
        <div className = 'absolute z-5 h-full w-full flex flex-col justify-center items-center'>
            <div className = 'absolute z-10 top-[calc(20%+30px)] h-4/5 flex flex-col justify-center items-center'>
                <img src = 'white-down-angle.png' height = {16} width = {16} className = 'transform rotate-180'></img>
                <p className = 'text-[25px] text-white'>Many layers will have options that you can access by clicking this button.</p>
                <p className = 'text-[25px] text-white'>If it doesn't have an options button, that means it doesn't need to be configured.</p>
            </div>
            {exampleNode}
        </div>
    )
}
export default Slide14