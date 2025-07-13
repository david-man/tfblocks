import NodeComponent from "../../Graph/Nodes/NodeComponent"

const Slide18 = () => {
    const exampleNode =
     (<div className = 'relative w-1/5 h-1/5 text-[60px] '>
        <div className = 'absolute left-[-5px] top-[calc(50%-5px)] w-[10px] h-[10px] rounded-full bg-[#2c7d41]'></div>
        <div className = 'absolute right-[-5px] top-[calc(50%-5px)] w-[10px] h-[10px] rounded-full bg-black'></div>
        <NodeComponent dummy = {true} valid_node = {false} mainText = {"Node"} parent_handles = {[]} bg_color = "bg-blue-100" optionsMenu = {<div />}/>
    </div>)
    return (
        <div className = 'absolute z-5 h-full w-full flex flex-col justify-center items-center'>
            <div className = 'absolute z-10 top-[calc(10%-20px)] left-[calc(40%-32px)] h-4/5 flex justify-center items-center'>
                <img src = 'white-down-angle.png' height = {32} width = {32} className = 'transform rotate-330'></img>
            </div>
            <div className = 'absolute z-10 top-0 left-0 h-6/10 w-full flex flex-col justify-center items-center'>
                <p className = 'text-white text-[25px]'>All layers need to be given the right amount of inputs.</p>
                <p className = 'text-white text-[25px] text-center'>tfBlocks makes sure this happens by giving you a certain amount of input handles per layer and only allowing you to make one connection per handle.</p>
                <p className = 'text-white text-[25px]'>You'll know if an input handle is properly connected when it turns this shade.</p>
            </div>
            {exampleNode}
        </div>
    )
}
export default Slide18