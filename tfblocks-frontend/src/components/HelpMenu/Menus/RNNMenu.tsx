import helpMenuController from "../../../controllers/helpMenuController"
import Link from "../../../link"
const RNNMenu = () => {
    const {setHelpMenu} = helpMenuController()
    return <div className = 'w-full h-95/100 flex flex-col items-center overflow-y-scroll rounded-3xl'>
        <p className = "text-3xl text-center p-2 ">Simple RNN Layers</p>
        <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
        <p className = 'text-2xl text-center p-1 pt-3'>Reference Sheet</p>
        <ul className = 'list-disc list-inside pl-1 pb-3 w-full'>
            <li><b>Input Dimensionality</b>: 2D: [timesteps, timestep-specific features]</li>
            <li><b>Output Dimensionality</b>: Depends</li>
            <li><b>Training Load</b>: High</li>
            <li><b>Use Case</b>: Time-Series Forecasting, Natural Language Processing</li>
            <li><b>Customizable Parameters</b>
                <ul className = 'list-disc list-inside pl-4'>
                    <li><b>Hidden Units</b> — The number of units in a hidden state</li>
                    <li><b>Seq2Seq</b> — Whether to do a Seq2One or Seq2Seq transformation</li>
                </ul>
            </li>
        </ul>
        <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
        <p className = 'text-2xl text-center p-1 pt-3'>If you have not read the Recurrent Layer guide, click&nbsp;
            <span>
                <button onClick = {() => setHelpMenu('recurrent-general')} className = 'cursor-pointer'>
                    <p><u>here</u></p>
                </button>
            </span>&nbsp;to do that first!</p>
        <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
        <p className = 'text-2xl text-center p-1 pt-3'>Guide</p>
        <ul className = 'list-disc list-inside pl-2 pb-3 pr-3'>
            <li>The Simple RNN is the most basic type of Recurrent Layer.</li>
            <li>At each timestep, its model starts by concatenating(joining) the input with the memory state to create an intermediate state.</li>
            <li>Then, it puts this intermediate state through a biased Dense layer and a TanH activation layer to get the new state.</li>
            <li>This new state becomes the memory state for the next timestep.</li>
            <li className = 'pb-2'>This image by <Link href = 'https://medium.com/@imjeremyhi/understanding-recurrent-networks-part-1-simple-rnn-lstm-cc53e7475980'>Jeremy</Link> shows an RNN's architecture.
                <img src = 'rnn-img.png' className = 'object-cover'></img>
            </li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <li>It should be noted that, due to their simplicity, simple RNN's are notorious for instability and an inability to retain information for long.</li>
            <li>If you're worried about those things, try using GRU's, LSTM's, or even try designing your own Recurrent Layer!</li>
        </ul>
        
        
    </div>
}
export default RNNMenu