import Link from "../../../link"
const PoolingMenu = () => {
    return <div className = 'w-full h-95/100 flex flex-col items-center overflow-y-scroll rounded-3xl'>
        <p className = "text-3xl text-center p-2 ">Pooling Layers</p>
        <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
        <p className = 'text-2xl text-center p-1 pt-3'>Reference Sheet</p>
        <ul className = 'list-disc list-inside pl-1 pb-3 w-full'>
            <li><b>Input Dimensionality</b>: 2-D or higher</li>
            <li><b>Output Dimensionality</b>: Same as input</li>
            <li><b>Training Load</b>: None</li>
            <li><b>Use Case</b>: Image Processing</li>
            <li><b>Customizable Parameters</b>
                <ul className = 'list-disc list-inside pl-4 w-full'>
                    <li><b>Pool Size</b> — How large the pooling kernel should be. In 2D and 3D pooling layers, this number defines the length for all sides of the kernel</li>
                    <li><b>Stride Size</b> — How far the kernel "jumps" every time it moves.</li>
                    <li><b>Type</b> — Type of pooling to use.</li>
                    <li><b>Padding</b>
                        <ul className = 'list-disc list-inside pl-4'>
                            <li>Same: Pad the input so that the final output is the same shape</li>
                            <li>Valid: Don't pad the input</li>
                        </ul>
                    </li>
                    <li><b>Dimensionality</b> — Spatial dimensionality of the input. Note that we require that channels are placed last.</li>
                </ul>
            </li>
        </ul>
        <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
        <p className = 'text-2xl text-center p-1 pt-3'>Guide</p>
         <ul className = 'list-disc list-inside pl-2 pb-3 pr-3'>
            <li>Pooling layers are primarily used to enhance feature maps, making them primarily linked to <i>convolutional</i> layers.</li>
            <li>Like convolutional layers, they rely on kernels, which are filters used to highlight certain features in an input. Unlike convolutions, though, their kernels are <i>functional</i></li>
            <li>This means that, instead of taking a weighted sum, these kernels perform one of 2 'pooling' functions: 
                <ol className = 'list-decimal list-inside pl-4'>
                    <li>Max Pooling: Output the max of all values in the kernels</li>
                    <li>Average Pooling: Output the mean of all values in the kernels</li>
                </ol>
            </li>
            <li>This GIF by <Link href = 'https://pub.towardsai.net/introduction-to-pooling-layers-in-cnn-dafe61eabe34'>Rafay Qayyum</Link> does a good job of showing the differences.
                <img src = 'pooling-gif.gif ' className = 'object-cover'></img>
            </li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <li>Something to notice is that, like convolutional layers, pooling layers have to deal with output shrinkage, whereby the output is necessarily smaller than the input.</li>
            <li>While this can be dealt with using 'same' padding, whereby the edges of an input are padded with 0's until the final output is of the same shape as the input, this often defeats the purpose of pooling layers</li>
            <li>That is because the primary strength of pooling layers is that they are designed to <i>preserve important information and features</i> while downscaling the input.</li>
            <li>This can be particularly helpful if you want to feed the output of a convolution into a Dense layer, which are notoriously <i>computationally expensive</i></li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <li>Often, we want to keep consumed information <i>separate</i> during pooling so that we don't highlight the same feature twice.</li>
            <li>This is why its recommended to use larger strides to minimize overlap between windows.</li>
            <li>This is also why we don't allow information to leak between channels. In other words, pooling layers operate independently on each channel.</li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <li>You can learn more about pooling layers and their uses <Link href = 'https://www.geeksforgeeks.org/deep-learning/cnn-introduction-to-pooling-layer/'>here</Link></li>
         </ul>
    </div>
}
export default PoolingMenu