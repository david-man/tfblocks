import Link from "../../../link"

const FlattenMenu = () => {
    return <div className = 'w-full h-95/100 flex flex-col items-center overflow-y-scroll rounded-3xl'>
        <p className = "text-3xl text-center p-2 ">Flatten Layers</p>
        <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
        <p className = 'text-2xl text-center p-1 pt-3'>Reference Sheet</p>
        <ul className = 'list-disc list-inside pl-1 pb-3 w-full'>
            <li><b>Input Dimensionality</b>: 2-D or greater</li>
            <li><b>Output Dimensionality</b>: input dimension - 1</li>
            <li><b>Training Load</b>: None</li>
            <li><b>Use Case</b>: Convolutional Neural Networks, Transformers</li>
            <li><b>Customizable Parameters</b>
                <ul className = 'list-disc list-inside pl-4'>
                    <li><b>Axis</b> — Optional. Axis to flatten down at.</li>
                </ul>
            </li>
        </ul>
        <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
        <p className = 'text-2xl text-center p-1 pt-3'>Guide</p>
        <ul className = 'list-disc list-inside pl-2 pb-3 pr-3'>
            <li>Flatten layers reduce the dimensionality of an input, and they're effectively the inverse to the Upscale layer.</li>
            <li className = 'pb-2'>This image by <Link href = 'https://medium.com/@PK_KwanG/cnn-step-2-flattening-50ee0af42e3e'>Panadda Kongsilp</Link> shows a Flatten layer in action.
                <img src = 'flatten-img.png' className = 'object-cover'></img>
            </li>
            <hr className = 'w-4/5 border-black border-1 rounded-2xl'></hr>
            <li>By specifying 'axis', you are telling the Flatten layer to 'squash' the axis into the next one</li>
            <li>By not specifying 'axis', you are telling the Flatten layer to 'squash' everything down until it becomes a vector.</li>
         </ul>
        
        
    </div>
}
export default FlattenMenu