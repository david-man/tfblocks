import helpMenuController from "../../../controllers/helpMenuController"
import Link from "../../../link"
const GRUMenu = () => {
    const {setHelpMenu} = helpMenuController()
    return <div className = 'w-full h-95/100 flex flex-col items-center overflow-y-auto rounded-3xl'>
        <p className = "text-3xl text-center p-2 ">GRU Layers</p>
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
            <li>The GRU, or Gated Recurrent Unit, layer is a newer type of Recurrent Layer designed to be a cheaper alternative to the &nbsp;
                <span>
                    <button onClick = {() => setHelpMenu('lstm')} className = 'cursor-pointer'>
                        <p><u>LSTM</u></p>
                    </button>
                </span>.</li>
            <li>It improves on the simple RNN by more cleverly manipulating the memory state at each timestep.</li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <li>At each timestep, the GRU makes 3 copies of the timestep-specific feature vector to perform 3 different processes.</li>
            <li>While these 3 different processes have unique structures to encourage certain behaviors, it's important to remember that we <i>aren't ever sure</i> that these processes truly describe what's happening.</li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <li><b>Process 1: The Reset gate:</b>
                <ul className = 'list-disc list-inside pl-6'>
                    <li>The first copy gets concatenated with the current memory state to form an intermediate vector</li>
                    <li>This intermediate state gets fed into a biased Dense layer with a Sigmoid activation layer, which outputs numbers 0 to 1. These values can be said to be metrics that determines which parts of the memory state are still important and which should now be 'reset'</li>
                    <li>This vector of metrics gets element-wise multiplied to the current memory state to apply the changes. Then, to keep values from exploding, this vector gets put through a TanH activation layer to keep its values from -1 to 1.</li>
                    <li>This resulting vector is considered the 'candidate activation state'. Because it's a 'candidate' state, it <i>is not</i> the memory state used by the second process.</li>
                </ul>
            </li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <li><b>Process 2: The Update gate:</b>
                <ul className = 'list-disc list-inside pl-6'>
                    <li>The second copy also gets concatenated with the current memory state to form an intermediate vector</li>
                    <li>This intermediate goes through a biased Dense layer and a Sigmoid activation layer to create a vector of values 0 to 1 that are said to determine how much the current memory state should be affected by the candidate state. Values close to 1 mean that the memory state should adopt the candidate's value, while values close to 0 mean that the memory state should keep its current values.</li>
                    <li>The candidate state is element-wise multiplied to this intermediate vector.</li>
                    <li>At the same time, the current memory state is element-wise multiplied to <b>1</b> minus this intermediate vector.</li>
                </ul>
            </li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <li><b>Process 3: Combination</b>
                <ul className = 'list-disc list-inside pl-6'>
                    <li>The modified memory state is combined via the modified candidate state to get a final, new memory state</li>
                    <li>This combination procedure is said to allow the GRU to balance long and short term memory similarly to the LSTM.</li>
                </ul>
            </li>
            <li className = 'pb-2'>This image by <Link href = 'https://towardsdatascience.com/gru-recurrent-neural-networks-a-smart-way-to-predict-sequences-in-python-80864e4fe9f6/'>Saul Dobilas</Link> summarizes the GRU's architecture.
                <img src = 'GRU-cell.png' className = 'object-cover'></img>
            </li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <li>You can learn more about GRU's <Link href = "https://www.geeksforgeeks.org/machine-learning/gated-recurrent-unit-networks/">here</Link></li>
        </ul>
        
        
    </div>
}
export default GRUMenu