import Link from "../../../link"
const DenseMenu = () => {
    return <div className = 'w-full h-95/100 flex flex-col items-center overflow-y-scroll rounded-3xl'>
        <p className = "text-3xl text-center p-2 ">Dense Layers</p>
        <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
        <p className = 'text-2xl text-center p-1 pt-3'>Reference Sheet</p>
        <ul className = 'list-disc list-inside pl-1 pb-3'>
            <li><b>Input Dimensionality</b>: 1-D or higher</li>
            <li><b>Output Dimensionality</b>: Same as input</li>
            <li><b>Training Load</b>: High</li>
            <li><b>Use Case</b>: Universal</li>
            <li><b>Customizable Parameters</b>
                <ul className = 'list-disc list-inside pl-4'>
                    <li><b>Units</b> — Number of outputs</li>
                    <li><b>Bias</b> — Whether to add a bias to the final output or not</li>
                </ul>
            </li>
        </ul>
        <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
        <p className = 'text-2xl text-center p-1 pt-3'>Guide</p>
         <ul className = 'list-disc list-inside pl-2 pb-3 pr-3'>
            <li>Dense layers are the fundamental building blocks of modern machine learning models.</li>
            <li>At their core, their job is to turn an input vector with 'F' features into an output vector with 'U' features/units. They do this by computing a weighted sum of all input features for every unit.</li>
            <li className = 'pb-2'>This GIF by <Link href = 'https://pub.aimind.so/convolutional-neural-networks-cnns-for-image-recognition-2d584775205b'>Sunghyun An</Link> does a good job of showing this aspect.
                <img src = 'dense_gif.gif' className = 'object-cover'></img>
            </li>
            <li>Because every input feature is weighed into every output unit, they were given the name 'fully-connected' or 'dense'.</li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <li>You should note that a different set of weights is used for every unit and that that each one of these weights are trainable. You can probably see how this can very quickly lead to a large training load</li>
            <li>At the same time, this allows them to learn a lot of complex relationships between features. In fact, given enough time and data, dense layers are theoretically capable of learning <Link href = 'https://en.wikipedia.org/wiki/Universal_approximation_theorem'><i>any</i></Link> relationship.</li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <li>In addition to these weights, developers often add a bias to their dense layers.</li>
            <li>Biases are like the 'b' term in 'y = mx + b'; they are a vector of trainable weights that get tacked onto the output of the weighted sum process.</li>
            <li>Biases add a lot of flexibility to the dense layer while usually consisting of much less trainable weights than its main process; hence, they're almost always used.</li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <li>Dense layers, though designed for 1-D inputs, can actually take in an input of any dimension</li>
            <li>Say that our input is made up of 'K' feature vectors of size 'F'. In this case, a dense layer will apply the same weighing process to each feature vector, outputting 'K' output vectors of size 'U'.</li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <li>You can learn more about dense layers and their uses <Link href = 'https://www.geeksforgeeks.org/deep-learning/what-is-fully-connected-layer-in-deep-learning/'>here</Link></li>
         </ul>
        
        
    </div>
}
export default DenseMenu