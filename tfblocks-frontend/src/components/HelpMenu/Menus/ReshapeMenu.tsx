import Link from "../../../link"
const ReshapeMenu = () => {
    return <div className = 'w-full h-95/100 flex flex-col items-center overflow-y-scroll rounded-3xl'>
        <p className = "text-3xl text-center p-2 ">Reshape Layers</p>
        <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
        <p className = 'text-2xl text-center p-1 pt-3'>Reference Sheet</p>
        <ul className = 'list-disc list-inside pl-1 pb-3'>
            <li><b>Input Dimensionality</b>: 1-D or greater</li>
            <li><b>Output Dimensionality</b>: Depends</li>
            <li><b>Training Load</b>: None</li>
            <li><b>Use Case</b>: Convolutional Neural Networks, Transformers</li>
            <li><b>Customizable Parameters</b>
                <ul className = 'list-disc list-inside pl-4'>
                    <li><b>Shape</b> — Comma-separated new shape</li>
                </ul>
            </li>
        </ul>
        <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
        <p className = 'text-2xl text-center p-1 pt-3'>Guide</p>
        <ul className = 'list-disc list-inside pl-2 pb-3 pr-3'>
            <li>Reshape layers allow you to turn your input into any compatible shape, which is defined as any shape that doesn't add or remove values.</li>
            <li>While usable and powerful, we usually recommend that you stick to other types of Reshape layers. This is because it's harder to track where values and features end up when using arbitrary reshapes.</li>
         </ul>
        
        
    </div>
}
export default ReshapeMenu