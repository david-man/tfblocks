import Link from "../../../link"
const TransposeMenu = () => {
    return <div className = 'w-full h-95/100 flex flex-col items-center overflow-y-scroll rounded-3xl'>
        <p className = "text-3xl text-center p-2 ">Transpose Layers</p>
        <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
        <p className = 'text-2xl text-center p-1 pt-3'>Reference Sheet</p>
        <ul className = 'list-disc list-inside pl-1 pb-3 w-full'>
            <li><b>Input Dimensionality</b>: 2-D or greater</li>
            <li><b>Output Dimensionality</b>: Same as input</li>
            <li><b>Training Load</b>: None</li>
            <li><b>Use Case</b>: Convolutional Neural Networks, Transformers</li>
            <li><b>Customizable Parameters</b>
                <ul className = 'list-disc list-inside pl-4'>
                    <li><b>Axis 1</b> — First axis to transpose</li>
                    <li><b>Axis 2</b> — Second axis to transpose</li>
                </ul>
            </li>
        </ul>
        <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
        <p className = 'text-2xl text-center p-1 pt-3'>Guide</p>
        <ul className = 'list-disc list-inside pl-2 pb-3 pr-3'>
            <li>Transpose layers are a Reshape layer that simply swaps two axes around.</li>
            <li className = 'pb-2'>This GIF by <Link href = 'https://en.m.wikipedia.org/wiki/File:Matrix_transpose.gif'>Wikipedia</Link> does a good job of showing a transpose performed between the last 2 axes of a matrix.
                <img src = 'transpose-gif.gif' className = 'object-cover'></img>
            </li>
         </ul>
        
        
    </div>
}
export default TransposeMenu