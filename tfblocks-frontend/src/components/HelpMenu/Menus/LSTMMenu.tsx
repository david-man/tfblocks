import helpMenuController from "../../../controllers/helpMenuController"
import Link from "../../../link"
const LSTMMenu = () => {
    const {setHelpMenu} = helpMenuController()
    return <div className = 'w-full h-95/100 flex flex-col items-center overflow-y-auto rounded-3xl'>
        <p className = "text-3xl text-center p-2 ">LSTM Layers</p>
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
            <li>The LSTM, or Long-Short Term Memory, layer is a very common type of Recurrent Layer.</li>
            <li>It improves on the simple RNN by dividing the memory state into 2 distinct parts: the cell(long-term memory) & hidden(short-term memory) states.</li>
            <li>The different ways that timestep-specific feature vectors impact these two parts is what makes the LSTM so effective.</li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <li>At each timestep, the LSTM starts by concatenating the timestep-specific feature vector with the hidden state to create an intermediate state vector.</li>
            <li>Then, it makes 4 copies of this intermediate vector to perform 3 different processes.</li>
            <li>While these 3 different processes have unique structures to encourage certain behaviors, it's important to remember that we <i>aren't ever sure</i> that these processes truly describe what's happening.</li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <li><b>Process 1: The forget gate:</b>
                <ul className = 'list-disc list-inside pl-6'>
                    <li>The first copy goes through a biased Dense layer and a Sigmoid activation layer before getting element-wise multiplied to the current cell state</li>
                    <li>By using a Sigmoid activation layer, which outputs numbers 0 to 1, and element-wise multiplication, it can be said that the model is trying to use the intermediate vector determines what parts of the long-term cell state to keep.</li>
                </ul>
            </li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <li><b>Process 2: The input gate:</b>
                <ul className = 'list-disc list-inside pl-6'>
                    <li>The second copy goes through a biased Dense layer and a Sigmoid activation layer to create a vector of values 0 to 1 that are said to dictate how much each part of the long-term cell state should be updated</li>
                    <li>The third copy goes through a biased Dense layer and a TanH activation layer to create a vector of values from -1 to 1 that are said to be "candidates" for changes that could be made to the long-term cell state</li>
                    <li>These two results get element-wise multiplied to created a weighted state change vector that gets element-wise added to the long-term cell state.</li>
                </ul>
            </li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <li><b>Process 3: The output gate:</b>
                <ul className = 'list-disc list-inside pl-6'>
                    <li>The final copy goes through a biased Dense layer and a Sigmoid activation layer to create a vector of values 0 to 1 that can be said to determine which parts of the cell state it shoud focus on <i>right now</i></li>
                    <li>Then, it applies a TanH function to the long-term cell state to normalize its values</li>
                    <li>By multiplying these two vectors together, it can be said that the model is filtering through its long-term memory to put out a hidden(short-term) state that contains only what it needs for the next timestep</li>
                </ul>
            </li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <li>At each timestep, the output of the LSTM is considered to just be its <i>hidden</i> state.</li>
            <li className = 'pb-2'>This image by <Link href = 'https://medium.com/analytics-vidhya/lstms-explained-a-complete-technically-accurate-conceptual-guide-with-keras-2a650327e8f2'>Ryan T.J.J</Link> summarizes the LSTM's architecture.
                <img src = 'lstm-cell.png' className = 'object-cover'></img>
            </li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <li>You can learn more about LSTMs <Link href = "https://medium.com/analytics-vidhya/lstms-explained-a-complete-technically-accurate-conceptual-guide-with-keras-2a650327e8f2">here</Link>!</li>
        </ul>
        
        
    </div>
}
export default LSTMMenu