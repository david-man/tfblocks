import NodeComponent from "../../Graph/Nodes/NodeComponent"

const Slide15 = () => {
    const exampleNode =
     (<div className = 'relative w-1/5 h-1/5 text-[60px] '>
        <div className = 'absolute left-[-5px] top-[calc(50%-5px)] w-[10px] h-[10px] rounded-full bg-[#97a5a6]'></div>
        <div className = 'absolute right-[-5px] top-[calc(50%-5px)] w-[10px] h-[10px] rounded-full bg-black'></div>
        <NodeComponent dummy = {true} valid_node = {false} mainText = {"Node"} parent_handles = {[]} bg_color = "bg-blue-100" optionsMenu = {<div />}/>
    </div>)
    return (
        <div className = 'absolute z-5 h-full w-full flex flex-col justify-center items-center'>
            <div className = 'absolute z-10 top-[10px] left-6/10 h-4/5 flex w-1/5 justify-center items-center'>
                <img src = 'white-down-angle.png' height = {16} width = {16} className = 'transform rotate-90'></img>
                <div className = 'flex flex-col'>
                    <p className = 'text-[25px] text-white text-center'>All layers, though, have a help button attached.</p>
                    <br/>
                    <p className = 'text-[25px] text-white text-center'>If you're ever unsure about how a layer functions, click on the button or search through the help icon in the header.</p>
                </div>
            </div>
            {exampleNode}
        </div>
    )
}
export default Slide15