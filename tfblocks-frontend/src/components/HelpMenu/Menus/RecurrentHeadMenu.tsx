import helpMenuController from "../../../controllers/helpMenuController"
import Link from "../../../link"
const RecurrentHeadMenu = () => {
    const {setHelpMenu} = helpMenuController()
    return <div className = 'w-full h-95/100 flex flex-col items-center overflow-y-auto rounded-3xl'>
        <p className = "text-3xl text-center p-2 ">Recurrent Head</p>
        <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
        <p className = 'text-2xl text-center p-1 pt-3'>Reference Sheet</p>
        <ul className = 'list-disc list-inside pl-1 pb-3 w-full'>
            <li><b>Input Dimensionality</b>: 2D: [timesteps, timestep-specific features]</li>
            <li><b>Output Dimensionality</b>: Depends</li>
            <li><b>Training Load</b>: High</li>
            <li><b>Use Case</b>: Time-Series Forecasting, Natural Language Processing</li>
            <li><b>Customizable Parameters</b>
                <ul className = 'list-disc list-inside pl-4'>
                    <li><b>Hidden Units</b> — The number of units in the memory state</li>
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
        <ul className = 'list-disc list-inside pl-1 pb-3 w-full'>
            <li>The Recurrent Head layer allows you to create <i>fully customizable</i> recurrent neural networks.</li>
            <li>It does this by allowing you to manually set how the memory state and timestep-dependent feature vectors interact</li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <img src = "recurrent_node.png"></img>
            <li>The above image shows a recurrent head layer.</li>
            <li>Like all other recurrent layers, the input timeseries comes through the <b>left</b> handle.</li>
            <li>Similarly, <b>Handle D</b> outputs the recurrent network's <i>final</i> output, whose shape depends on whether you're doing Seq2Seq or Seq2One transformations.</li>
            <li>Then, at each timestep... 
                <ul className = 'list-disc list-inside pl-4'>
                    <li><b>Handle A</b> gives the <i>previous memory state</i></li>
                    <li><b>Handle B</b> gives the <i>current timestep-dependent vector</i></li>
                    <li><b>Handle C</b> takes in the <i>new memory state</i>.</li>
                </ul>
            </li>
            <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
            <li>It should be clearly noted by users that, to load this layer in Python, you will need to import the <i>CustomRNNCell.py</i> file located in the examples folder on our <Link href = "https://github.com/david-man/tfblocks">Github</Link></li>
        </ul>
        
        
        
    </div>
}
export default RecurrentHeadMenu