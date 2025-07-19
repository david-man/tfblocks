import Link from "../../../link"
const ConvolutionalMenu = () => {
    return <div className = 'w-full h-95/100 flex flex-col items-center overflow-y-scroll rounded-3xl'>
        <p className = "text-3xl text-center p-2 ">Convolutional Layers</p>
        <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
        <p className = 'text-2xl text-center p-1 pt-3'>Reference Sheet</p>
        <ul className = 'list-disc list-inside pl-1 pb-3'>
            <li><b>Input Dimensionality</b>: 2-D or higher</li>
            <li><b>Output Dimensionality</b>: Same as input</li>
            <li><b>Training Load</b>: Low/Medium</li>
            <li><b>Use Case</b>: Spatial Analysis</li>
            <li><b>Customizable Parameters</b>
                <ul className = 'list-disc list-inside pl-4'>
                    <li><b>Kernel Size</b> — How large the kernel should be. In 2D and 3D convolutions, this number defines the length for all sides of the kernel</li>
                    <li><b>Filters</b> — Number of filters</li>
                    <li><b>Stride Size</b> — How far the kernel "jumps" every time it moves.</li>
                    <li><b>Padding</b>
                        <ul className = 'list-disc list-inside pl-4'>
                            <li>Same: Pad the input so that the final output is the same shape</li>
                            <li>Valid: Don't pad the input</li>
                        </ul>
                    </li>
                    <li><b>Dimensionality</b> — Spatial dimensionality of the input. Note that we require that channels are on the last axis.</li>
                    <li><b>Bias</b> — Whether to add a bias to the final output of each kernel or not</li>
                </ul>
            </li>
        </ul>
        <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
        <p className = 'text-2xl text-center p-1 pt-3'>Guide</p>
         <ul className = 'list-disc list-inside pl-2 pb-3 pr-3 flex flex-col justify-center items-center'>
            <li>Convolutional Layers are the fundamental building block for analysis of things with spatial relationships, like images and videos. They're also an auxiliary tool for temporal analysis.</li>
            <li>At their core, their job is to train a set of convolutional kernels. You can think of these as filters designed to learn and highlight certain important features in an input.</li>
            <li>While it might sound crazy that filters like these can exist, convolutions have been used for decades for image processing tools like image blurring.</li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <li>When given an input, each filter will move across the input, weighing each region it comes across in a spatially-aware manner and outputting a number corresponding to how present a feature is in the region. Just like Dense layers, this output may be shifted by a trainable <i>bias</i> for flexibility.</li>
            <li>After going through an input, they will have effectively made a feature map!</li>
            <li className = 'pb-2'>This GIF from <Link href = 'https://commons.wikimedia.org/wiki/File:Convolution_arithmetic_-_Padding_strides.gif#filelinks'>Wikipedia</Link> does a good job of showing one filter acting on an image.
                <img src = 'convolutional_gif.gif' className = 'object-cover'></img>
            </li>
            <li>Because there can be multiple filters, the convolutional layer will repeat this process for each one to get a stack of different feature maps.</li>
            <li>The convolutional layer will simply stack these feature maps on top of each other to make its output.</li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <li>Something important to notice is that a convolutional layer will <i>always</i> shrink an image, regardless of its <i>stride</i> or <i>kernel size</i>.</li>
            <li>Thus, if you want your input to be the same as your output, your only option is to <i>pad</i> your input. </li>
            <li>In other words, you need to artificially make it bigger while adding as little information as possible.</li>
            <li>The way we do this is by padding the edges of your input with zeros. This type of padding is called 'same' padding.</li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <li>Something else that is key to convolutional layers are the idea of channels.</li>
            <li>Channels represent how much information is encoded in one single spatial unit; for example, in an RGB image, each spatial unit(pixel) encodes 3 different values</li>
            <li>In this RGB case, for each 'filter' you ask for, the convolutional layer will train 3 different(but related) kernels. These kernels will form a feature map corresponding to each channel</li>
            <li>After that, rather than being stacked on each other, they are simply combined via element-wise addition. </li>
            <li>This image from <Link href = "https://isaac-the-man.dev/posts/how-multi-channel-convolution-works/">IsaacTheBlog</Link> does a good job of showing the process as a whole.
                <img src = 'channel_conv_image.png' className = 'object-cover'></img>
            </li>
            <li>You should note that channels are <i>required</i>. This means that, if you have a [16,16] greyscale image that you want to feed into a 2D convolution, you need to <i>upscale</i> it to [16,16,1] before using a convolution.</li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <li>While convolutional layers are most typically used in image processing, where there are 2 spatial dimensions, they aren't confined to that.</li>
            <li>In fact, we support 3 kinds of convolutional dimensionality.
                <ol className = 'list-decimal list-inside pl-4'>
                    <li>1D convolutions are meant for data that are of the shape [steps, channels]</li>
                    <li>2D convolutions are meant for data that are of the shape [height, width, channels]</li>
                    <li>3D convolutions are meant for data that are of the shape [dimension_1, dimension_2, dimension_3, channels]</li>
                </ol>
            </li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <li className = 'pt-3'>While narrower in scope than the almighty Dense layer, convolutional layers' biggest advantage is their low training load</li>
            <li>After all, they aren't training a set of weights for every individual number in the input - rather, they're training small kernels that can act over much bigger spaces.</li>
            <li>This is why they're often used to <i>preprocess</i> an input, highlighting its features to make it easier for dense layers to find patterns.</li>
            <li className = 'pt-3'>You can learn more about convolutional layers and convolutional neural networks <Link href = "https://www.geeksforgeeks.org/machine-learning/introduction-convolution-neural-network/#">here</Link></li>
         </ul>
        
        
    </div>
}
export default ConvolutionalMenu