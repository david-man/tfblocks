import Link from "../../../link"
const GeneralRecurrentMenu = () => {
    return <div className = 'w-full h-95/100 flex flex-col items-center overflow-y-auto rounded-3xl'>
        <p className = "text-3xl text-center p-2 ">Recurrent Layers</p>
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
        <p className = 'text-2xl text-center p-1 pt-3'>Guide</p>
         <ul className = 'list-disc list-inside pl-2 pb-3 pr-3'>
            <li>Recurrent layers are the building blocks for <i>sequential</i> learning.</li>
            <li>Sequential learning is a type of learning that takes into account the idea that earlier elements are related to current elements</li>
            <li>For example, in Natural Language Processing(NLP), words that come earlier in the sentence set the context for later words.</li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <li>The way all recurrent layers work is by maintaining and using an internal memory state as they go across the time axis</li>
            <li>When they initially take in their input - a sequence of timestep-specific feature vectors - this memory state is set to a bunch of 0's</li> 
            <li>As they consider each feature from earliest to latest, they consider <i>both</i> the current memory state and the features at the current timestep to output a state of size <i>units</i>.</li>
            <li>Then, instead of just spitting this state out and moving on, they <i>send</i> this state over to the next timestep to be the new memory state.</li>
            <li>Because this new memory state has been affected by every state before it, it allows recurrent layers to conduct sequential learning.</li>
            <li className = 'pb-2'>This GIF by <Link href = 'https://medium.com/data-science/illustrated-guide-to-recurrent-neural-networks-79e5eb8049c9'>Michael Phi</Link>, where the red circles are features, the black circles are outputs, and the blue circles are the model, does a good job of showing a basic recurrent layer.
                <img src = 'recurrent-gif.gif' className = 'object-cover'></img>
            </li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <li>All recurrent layers can be used in both Seq2One and Seq2Seq processesing.</li>
            <li><b>Seq2One</b> — Sequence to One — processing refers to analyzing a whole sequence to output a singular feature vector
                <ul className = 'list-disc list-inside pl-6'>
                    <li>This type of processing is typical for Time-Series Forecasting and Sentiment Analysis</li>
                    <li>For recurrent networks, the singular feature vector is the <i>singular</i> memory state released after the model has processed every timestep-specific feature vector</li>
                    <li>Using the GIF above, you can think of it as the last black circle to be generated before there are no more timestep-specific feature vector to analyze</li>
                    <li>Even today, RNNs remain dominant in this type of processing.</li>
                </ul>
            </li>
            <li><b>Seq2Seq</b> — Sequence to Sequence — processing refers to analyzing a sequence to generate a different sequence of features
                <ul className = 'list-disc list-inside pl-6'>
                    <li>This type of processing is typical for tasks like translation</li>
                    <li>For recurrent networks, the new sequence is made up of <i>every</i> memory state released after processing <i>each</i> timestep-specific feature vector</li>
                    <li>Using the GIF above, you can think of it as the sequence of every black circle generated as the model considers every timestep-specific feature vector</li>
                    <li>This field, which used to also be dominated by RNNs, has more recently been dominated by Attention-based Transformers.</li>
                </ul>
            </li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <li>You can learn more about Recurrent Layers <Link href = "https://aws.amazon.com/what-is/recurrent-neural-network/#:~:text=A%20recurrent%20neural%20network%20(RNN,complex%20semantics%20and%20syntax%20rules.">here</Link>!</li>
         </ul>
        
        
    </div>
}
export default GeneralRecurrentMenu