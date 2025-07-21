const CutMenu = () => {
    return <div className = 'w-full h-95/100 flex flex-col items-center overflow-y-scroll rounded-3xl'>
        <p className = "text-3xl text-center p-2 ">Cut Layers</p>
        <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
        <p className = 'text-2xl text-center p-1 pt-3'>Reference Sheet</p>
        <ul className = 'list-disc list-inside pl-1 pb-3 w-full'>
            <li><b>Input Dimensionality</b>: 1-D or greater</li>
            <li><b>Output Dimensionality</b>: Same as input</li>
            <li><b>Training Load</b>: None</li>
            <li><b>Use Case</b>: Convolutional Neural Networks, Transformers</li>
            <li><b>Customizable Parameters</b>
                <ul className = 'list-disc list-inside pl-4'>
                    <li><b>Axis</b> — Axis to cut across</li>
                    <li><b>Cut 1</b> — Size of the cut leading to the top output</li>
                    <li><b>Cut 2</b> — Size of the cut leading to the bottom output</li>
                </ul>
            </li>
        </ul>
        <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
        <p className = 'text-2xl text-center p-1 pt-3'>Guide</p>
        <ul className = 'list-disc list-inside pl-2 pb-3 pr-3'>
            <li>Cut layers are layers that slice an input across an axis into 2 outputs, and you can think of them as the opposite of the Concatenate layer.</li>
            <li>To ensure no data is unintentionally lost, it's required that the size of the cuts be the same as the size of the axis.</li>
         </ul>
        
        
    </div>
}
export default CutMenu