import Link from "../../../link"
const OperationsMenu = () => {
    return <div className = 'w-full h-95/100 flex flex-col items-center overflow-y-auto rounded-3xl'>
        <p className = "text-3xl text-center p-2 ">Operations Layers</p>
        <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
        <p className = 'text-2xl text-center p-1 pt-3'>Reference Sheet</p>
        <ul className = 'list-disc list-inside pl-1 pb-3 w-full'>
            <li><b>Input Dimensionality</b>: Any</li>
            <li><b>Output Dimensionality</b>: Same as input</li>
            <li><b>Training Load</b>: None</li>
            <li><b>Use Case</b>: Transformers & Other Complex Frameworks</li>
        </ul>
        <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
        <p className = 'text-2xl text-center p-1 pt-3'>Guide</p>
        <ul className = 'list-disc list-inside pl-2 pb-3 pr-3'>
            <li>Operations layers are the general category of layers that perform an operation between 2 inputs.</li>
            <li>Add, subtract, multiply, and divide layers take two inputs of the same shape and perform the respective <i>element-wise</i> operation on them.</li>
            <li>This means that they look at each individual scalar value in the first input, look for its corresponding value in the second input, and perform the operation between them.</li>
            <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
            <li>Dot Product layers are a little more specific.</li>
            <li>For two 1-D vectors, they perform an inner product to get a <i>single value</i>. You can think of this value as the <i>similarity</i> between the two vectors; the higher this value, the more similar the vectors are to each other.</li>
            <li className = 'pb-2'>This GIF by <Link href = 'https://www.reddit.com/r/Unity3D/comments/gj8t29/dot_product_visualized/'>@CodingGustavo</Link> shows this aspect well.
                <img src = 'dotproduct-gfi.gif' className = 'object-cover'></img>
            </li>
            <li>In fact, this weighted sum-like operation is used to find the <i>cosine similarity</i> between two 1-D vectors.</li>
            <li>For two 2-D matrices, they perform matrix multiplication using the <i>last two dimensions</i>, whereby the <i>top matrix is considered the left</i> and the<i>bottom matrix is considered the right</i></li>
            <li>In terms of shapes, this means that the top matrix's last axis should be the same size as the bottom matrix's second-to-last axis</li>
         </ul>
        
        
    </div>
}
export default OperationsMenu