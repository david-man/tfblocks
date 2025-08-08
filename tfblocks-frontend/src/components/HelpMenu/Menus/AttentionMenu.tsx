import Link from "../../../link"
const AttentionMenu = () => {
    return <div className = 'w-full h-95/100 flex flex-col items-center overflow-y-auto rounded-3xl'>
        <p className = "text-3xl text-center p-2 ">Attention Layers</p>
        <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
        <p className = 'text-2xl text-center p-1 pt-3'>Reference Sheet</p>
        <ul className = 'list-disc list-inside pl-1 pb-3 w-full'>
            <li><b>Input Dimensionality</b>: 2-D: [Q/KV Dimensionality, features]</li>
            <li><b>Output Dimensionality</b>: 2-D: [Q-dimensionality, features]</li>
            <li><b>Training Load</b>: High</li>
            <li><b>Use Case</b>: NLP, Time Series Forecasting</li>
            <li><b>Customizable Parameters</b>
                <ul className = 'list-disc list-inside pl-4'>
                    <li><b>Heads</b> — Number of Heads</li>
                </ul>
            </li>
        </ul>
        <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
        <p className = 'text-2xl text-center p-1 pt-3'>Guide</p>
        <ul className = 'list-disc list-inside pl-2 pb-3 pr-3'>
            <li>Attention layers, while part of the Recurrent series due to overlapping use-cases, are <i>fundamentally</i> different from modern RNN's.</li>
            <li>Unlike RNN's, they don't accumulate information by processing a time series one timestep at a time. Rather, they use the <i>attention</i> mechanism -- analogous to something like a search index -- to highlight important parts of a series in one step.</li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <li>As shown by the diagram below, there are two initial inputs to the attention block: <i>Query(Q)</i> and <i>Key/Value(KV)</i></li>
            <img src = 'attention_block.png' className = 'object-cover'></img>
            <li>The Query input is the input of dimensionality (Q, features) representing the information you are searching for.</li>
            <li>The Key/Value input is the input of dimensionality (K/V, features) representing what information is available.</li>
            <li>In attention layers, these inputs are encoded into 3 vectors -- Query, Key, and Value -- with the same number of features using 3 Dense layers.</li>
            <li>These encoded vectors serve to help the layer's 'context-calculation' responsibility.</li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <li>Once the encoded vectors are calculated, the layer needs to check which keys are holding valuable information given the query.</li>
            <li>To do this, it goes through each query and, for that query, calculates a scaled "relevance" score for each key using a <i>dot product</i> combined with a <i>sigmoid</i> activation function. This process ends in a (Q, K/V) matrix.</li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <li>Now that it knows which keys are storing important information for which queries, it can simply perform a dot product (weighted sum) with the value vector to get a "context" vector.</li>
            <li>This context vector is shape (Q, features), and it represents a weighted sum of the important information that each query was looking for.</li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <li>Often times, attention is discussed through the words <i>cross-attention</i> & <i>self-attention</i></li>
            <li>In self attention, the Query, Key, and Value inputs are all the same. This is mostly used in language understanding, where models like Chat-GPT need to figure out what parts of a paragraph provide context for what other parts of a paragraph.</li>
            <li>In fact, the word <i>context-window</i> refers to how large the input vector is when self-attention is used. A larger context window means more keys, more values, and more queries, which often leads to better understanding and performance!</li>
            <li>In cross attention, the Query vector is different from the Key and Value vector. This is mostly used in machine translation, where models like DeepL need to determine which words in the original sentence are relevant for generating the next word in the target sentence.</li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <li>The final important thing to note about Attention layers is the Multi-Head Attention mechanism.</li>
            <li>While normal attention layers use a singlular set of encoded query, key, and value vectors, the Multi-Head Attention mechanism generates multiple sets.</li>
            <li>It does this by splitting the inputs into multiple, <i>equally-sized</i> smaller parts of sizes (__, features / heads) using dense layers. Then, it calculates relevance scores for each set before concatenating all of them together</li>
            <li>It then puts the output through a final Dense layer to get it to be of shape (Q, features).</li>
            <li className = 'pb-2'>This image by <Link href = 'https://medium.com/@weidagang/demystifying-transformers-multi-head-attention-43b3173de391'>Dagang Wei</Link> is a common image used to illustrate the Multi-Head Attention mechanism.
                <img src = 'mha_block.png' className = 'object-cover'></img>
            </li>
            <li><i>Note that, because the parts need to be equally-sized, # of heads must be divisible by # of features.</i></li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <li>Attention and Multi-Head Attention layers are some of the most important recent innovations in machine learning, enabling the core functionality of almost all LLM's.</li>
            <li>You can learn more about them <Link href = 'https://medium.com/@gginis/the-attention-mechanism-in-deep-learning-an-example-fb6b27c30cff'>here</Link></li>
        </ul>
    </div>
}
export default AttentionMenu