const InputMenu = () => {
    return <div className = 'w-full h-95/100 flex flex-col items-center overflow-y-auto rounded-3xl'>
        <p className = "text-3xl text-center p-2 ">Input Layers</p>
        <hr className = 'w-5/6 border-black border-1 rounded-2xl m-5'></hr>
        <li>Because you're on the <i>Web</i> version of tfBlocks, input layers store the shape of&nbsp;<i>a singular</i>&nbsp; input.&nbsp;</li>
        <li>To enter an N-dimensional input shape, simply enter a list of N comma-separated numbers dictating the size of each axis.</li>
        <li>Inputs can be of all kinds! For example, an 16x16 RGB image input might be [16,16,3].</li>
        <hr className = 'w-5/6 border-black border-1 rounded-2xl m-5'></hr>
        <li>Before you put anything in, though, note that we have a few rules that you shouldn't overlook!
            <ol className = 'decimal list-inside'>
                <li>Convolutional & pooling layers expect that the channels(think RGB) are in the last position.</li>
                <li>Recurrent layers expect that the timesteps are in the first position.</li>
            </ol>
        </li>
        <li>Aside from that, we're relatively lax on input rules; if the shapes match up, the model should compile!</li>
    </div>
}
export default InputMenu