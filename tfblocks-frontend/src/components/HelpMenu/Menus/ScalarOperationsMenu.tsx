import Link from "../../../link"
const ScaleOpsMenu = () => {
    return <div className = 'w-full h-95/100 flex flex-col items-center overflow-y-scroll rounded-3xl'>
        <p className = "text-3xl text-center p-2 ">Scalar Operations Layers</p>
        <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
        <p className = 'text-2xl text-center p-1 pt-3'>Reference Sheet</p>
        <ul className = 'list-disc list-inside pl-1 pb-3 w-full'>
            <li><b>Input Dimensionality</b>: 1-D or greater</li>
            <li><b>Output Dimensionality</b>: Same as input</li>
            <li><b>Training Load</b>: None</li>
            <li><b>Use Case</b>: Universal</li>
            <li><b>Customizable Parameters</b>
                <ul className = 'list-disc list-inside pl-4'>
                    <li><b>Operation</b> — Operation to apply scalar</li>
                    <li><b>Scalar</b> — Scalar to use</li>
                </ul>
            </li>
        </ul>
        <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
        <p className = 'text-2xl text-center p-1 pt-3'>Guide</p>
        <ul className = 'list-disc list-inside pl-2 pb-3 pr-3'>
            <li>This layer simply takes applies a scalar(number) operation to every value in an input.</li>
         </ul>
        
        
    </div>
}
export default ScaleOpsMenu