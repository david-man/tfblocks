import Link from "../../../link"
const ConcatenateMenu = () => {
    return <div className = 'w-full h-95/100 flex flex-col items-center overflow-y-scroll rounded-3xl'>
        <p className = "text-3xl text-center p-2 ">Concatenate Layers</p>
        <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
        <p className = 'text-2xl text-center p-1 pt-3'>Reference Sheet</p>
        <ul className = 'list-disc list-inside pl-1 pb-3'>
            <li><b>Input Dimensionality</b>: 1-D or greater. Inputs must be of same dimension.</li>
            <li><b>Output Dimensionality</b>: Same as input</li>
            <li><b>Training Load</b>: None</li>
            <li><b>Use Case</b>: Convolutional Neural Networks, Transformers</li>
            <li><b>Customizable Parameters</b>
                <ul className = 'list-disc list-inside pl-4'>
                    <li><b>Axis</b> — Axis across which to concatenate</li>
                </ul>
            </li>
        </ul>
        <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
        <p className = 'text-2xl text-center p-1 pt-3'>Guide</p>
        <ul className = 'list-disc list-inside pl-2 pb-3 pr-3'>
            <li>Concatenate layers are layers that join two inputs by combining them at a certain axis.</li>
            <li>The inputs are effectively treated like building blocks, and so it's imperative that all other axes have the same shape before concatenating.</li>
         </ul>
        
        
    </div>
}
export default ConcatenateMenu