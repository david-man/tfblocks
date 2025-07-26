import Link from "../../../link"
const ActivationMenu = () => {
    return <div className = 'w-full h-95/100 flex flex-col items-center overflow-y-auto rounded-3xl'>
        <p className = "text-3xl text-center p-2 ">Activation Layers</p>
        <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
        <p className = 'text-2xl text-center p-1 pt-3'>Reference Sheet</p>
        <ul className = 'list-disc list-inside pl-1 pb-3 w-full'>
            <li><b>Input Dimensionality</b>: 1-D or higher</li>
            <li><b>Output Dimensionality</b>: Same as input</li>
            <li><b>Training Load</b>: None</li>
            <li><b>Use Case</b>: Universal</li>
            <li><b>Customizable Parameters</b>
                <ul className = 'list-disc list-inside pl-4'>
                    <li><b>Function</b> — The activation function to use</li>
                </ul>
            </li>
        </ul>
        <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
        <p className = 'text-2xl text-center p-1 pt-3'>Guide</p>
         <ul className = 'list-disc list-inside pl-2 pb-3 pr-3'>
            <li>Activation functions are the most basic catalyst for complex learning.</li>
            <li>At their core, their job is to help the layers above them(almost always Dense) learn non-linear patterns <i>exponentially faster</i> by putting the layer's output through a non-linear function.</li>
            <li className = 'pb-2'>This GIF by <Link href = 'https://prabhakar-rangarao.medium.com/activation-functions-9020acfa80b6'>Prabhakar Rangarao</Link> shows a Sigmoid activation function acting on a Dense layer.
                <img src = 'activation-gif.gif' className = 'object-cover'></img>
            </li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <li>The reason their non-linearity is important follows from the realization that, at their core, Dense and Convolutional layers (the two building blocks of modern AI) are <i>completely</i> linear. </li>
            <li>In other words, they're basically just fancier versions of the equation 'y = mx + b'. So what happens if they have to learn 'y = x^2'?</li>
            <li>Introducing non-linear activation functions is the simplest, most effective way we've found to bridge this gap.</li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <li>While there are many activation functions, the most common are 'ReLU', 'Sigmoid', and 'Softmax'.</li>
            <li>ReLU is the simplest one out of all of them, which is why it's so loved. Here it is plotted on a graph.
                <img src = 'relu.png' className = 'object-cover aspect-auto'></img>
            </li>
            <li className = 'pt-1'>Sigmoid is thought of as a sort of 'clamp' from 0 to 1, making it perfect for binary classification problems. Here it is plotted on a graph
                <img src = 'sigmooid.png' className = 'object-cover aspect-auto'></img>
            </li>
            <li className = 'pt-1'>Softmax is sigmoid's older brother. Rather than clamping a single value from 0 to 1, it clamps each value in a vector down to 0 through 1 while <i>also</i> keeping the vector's sum 1. Because it does this is a weighed fashion, it's used in non-binary classification. Here is the formula it uses.
                <img src = 'softmax.jpg' className = 'object-cover aspect-auto'></img></li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <li>You can learn more about activation functions and their uses <Link href = 'https://www.geeksforgeeks.org/machine-learning/activation-functions-neural-networks/'>here</Link></li>
         </ul>
    </div>
}
export default ActivationMenu