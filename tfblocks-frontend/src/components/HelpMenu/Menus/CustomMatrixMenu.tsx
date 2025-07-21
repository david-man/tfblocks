const CustomMatrixMenu = () => {
    return <div className = 'w-full h-95/100 flex flex-col items-center overflow-y-scroll rounded-3xl'>
        <p className = "text-3xl text-center p-2 ">Custom Matrix Layers</p>
        <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
        <p className = 'text-2xl text-center p-1 pt-3'>Reference Sheet</p>
        <ul className = 'list-disc list-inside pl-1 pb-3 w-full'>
            <li><b>Output Dimensionality</b>: Depends</li>
            <li><b>Training Load</b>: None</li>
            <li><b>Use Case</b>: Universal</li>
            <li><b>Customizable Parameters</b>
                <ul className = 'list-disc list-inside pl-4'>
                    <li><b>Matrix</b> — Matrix to use</li>
                </ul>
            </li>
        </ul>
        <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
        <p className = 'text-2xl text-center p-1 pt-3'><b>Warning</b>: Use of this layer requires code knowledge.</p>
        <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
        <p className = 'text-2xl text-center p-1 pt-3'>Guide</p>
        <ul className = 'list-disc list-inside pl-2 pb-3 pr-3'>
            <li>This layer accepts a .npy file that holds a constant matrix. It will then treat that matrix as a constant output similar to the Scalar Operations layer.</li>
            <li>Note that, while we do process your .npy file to find its shape, we <i>do not</i> store it. In fact, it is only during compilation that we even read its contents.</li>
         </ul>
        
        
    </div>
}
export default CustomMatrixMenu