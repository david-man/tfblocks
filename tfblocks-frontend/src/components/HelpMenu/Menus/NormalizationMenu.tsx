import Link from "../../../link"
const NormalizationMenu = () => {
    return <div className = 'w-full h-95/100 flex flex-col items-center overflow-y-scroll rounded-3xl'>
        <p className = "text-3xl text-center p-2 ">Normalization Layers</p>
        <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
        <p className = 'text-2xl text-center p-1 pt-3'>Reference Sheet</p>
        <ul className = 'list-disc list-inside pl-1 pb-3'>
            <li><b>Input Dimensionality</b>: 1-D or higher</li>
            <li><b>Output Dimensionality</b>: Same as input</li>
            <li><b>Training Load</b>: Negligible </li>
            <li><b>Use Case</b>: 
                <ul className = 'list-disc list-inside pl-4'>
                    <li><b>Unit</b> — Preprocessing</li>
                    <li><b>Batch</b> — Convolutional Networks</li>
                    <li><b>Layer</b> — Recurrent Networks & Transformers</li>
                </ul>
            </li>
            <li><b>Customizable Parameters</b>
                <ul className = 'list-disc list-inside pl-4'>
                    <li><b>Type</b> — Unit, Batch, or Layer Normalization</li>
                    <li><b>Axis</b> — Axis across which to normalize</li>
                    <li><b>Scale</b> — Whether or not to learn scaling factors. Does not do anything for unit normalization.</li>
                </ul>
            </li>
        </ul>
        <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
        <p className = 'text-2xl text-center p-1 pt-3'>Guide</p>
         <ul className = 'list-disc list-inside pl-2 pb-3 pr-3'>
            <li>Unit, Batch, and Layer Normalization layers are layers used to stabilize and speed up training.</li>
            <li>At their core, they all seek to solve the issue of variable input scaling, which refers to the idea that inputs aren't guaranteed to always be of the same scale.</li>
            <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
            <li>The easiest one to explain is unit normalization. The unit normalization layer simply goes across a specified axis and makes sure that all the vectors/matrices on that axis have a magnitude of 1.</li>
            <li>This layer is used mostly right after the Input Layer to make sure that the data is scaled to what the model expects.</li>
            <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
            <li>Batch and layer normalization, unlike unit normalization, are usually applied before <i>hidden</i> layers, which are layers that get their inputs from other layers. They solve the problem of internal covariate shift.</li>
            <li>Internal covariate shift refers to the idea that, while training, internal layers are always technically training on old data.</li>
            <li>Why? Well, let's say layer 1 feeds into layer 2 and layer 2 feeds into layer 3. After a training iteration, layer 3 will adjust its parameters based on what layer 2 gave it during that iteration.</li>
            <li>At the same time, though, layer 2 <i>also</i> adjusts its parameters based on layer 1. In effect, that means that layer 3 has to adjust to a moving target, and so it is <i>behind</i></li>
            <li>Being behind one training iteration might not seem like a big deal, but what if layer 2 made a major adjustment to its parameters so that its outputs were now 100 times larger in magnitude? There's just no way layer 3 could keep up.</li>
            <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
            <li>To start, batch normalization tries to solve internal covariate shift by considering a set of incoming samples called a 'batch'</li>
            <li>The layer starts by looking at the specified axis and considering each feature.</li>
            <li>For each feature, the layer goes to every sample in the batch and takes an average of the values contained in that sample's feature to get a 'score'</li>
            <li>Based on the scores it calculates, it then scales and shifts <i>each sample's feature</i> so that the samples' scores will average to 0 with standard deviation of 1</li>
            <li>The scale option refers to the idea that the layer doesn't have to scale and shift the features so that their scores will have a mean of 0 and unit standard deviation.</li>
            <li>By checking the scale option, you give the layer the responsibility of learning what mean and standard deviation to scale the scores toward.</li>
            <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
            <li>On the other hand, layer normalization tries to solve internal covariate shift by looking at each individual sample</li>
            <li>Like batch normalization, it starts by looking at the specified axis and considering each feature.</li>
            <li>For each feature, the layer takes an average of the values contained in that feature to get a 'score' for each of the sample's features</li>
            <li>Based on the scores it calculates, it then scales and shifts <i>each feature</i> so that the features' scores will average to 0 with standard deviation of 1</li>
            <li>Like batch normalization, the scale option refers to the idea that the layer doesn't have to scale and shift the features so that their scores will have a mean of 0 and unit standard deviation.</li>
            <li>By checking the scale option, you give the layer the responsibility of learning what mean and standard deviation to scale the scores toward.</li>
            <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
            <li>Typically, layer and batch normalization layers are placed right after Convolutional or Dense layers, and they typically feed into an Activation layer.</li>
            <li>You can learn more about batch and layer normalization <Link href = "https://www.pinecone.io/learn/batch-layer-normalization/">here</Link></li>
         </ul>
        
    </div>
}
export default NormalizationMenu