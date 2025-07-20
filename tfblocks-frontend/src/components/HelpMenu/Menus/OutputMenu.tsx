import Link from "../../../link"

const OutputMenu = () => {
    return <div className = 'w-full h-95/100 flex flex-col items-center overflow-y-scroll rounded-3xl'>
        <p className = "text-3xl text-center p-2 ">Output Layers</p>
        <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
        <li>Output Layers simply describe the shape of &nbsp;<i>a singular</i>&nbsp; output.&nbsp;<i>In other words, our shape system ignores the batch dimension</i></li>
        <li>To enter an N-dimensional output shape, simply enter a list of N comma-separated numbers dictating the size of each axis.</li>
        <li>Output can be of all kinds! For example, classifying an image into one of 16 classes might use an output shape of [16], where each number describes the probability of the image belonging to that respective class.</li>
        <li>P.S: This output is called a <Link href = "https://www.geeksforgeeks.org/machine-learning/ml-one-hot-encoding/">one-hot vector encoding</Link>.</li>
        <li>We don't limit your output shapes to anything; if the shapes match up, the model should compile!</li>
    </div>
}
export default OutputMenu