import Link from "../../../link"
const DropoutMenu = () => {
    return <div className = 'w-full h-95/100 flex flex-col items-center overflow-y-scroll rounded-3xl'>
        <p className = "text-3xl text-center p-2 ">Dropout Layers</p>
        <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
        <p className = 'text-2xl text-center p-1 pt-3'>Reference Sheet</p>
        <ul className = 'list-disc list-inside pl-1 pb-3'>
            <li><b>Input Dimensionality</b>: Dependent</li>
            <li><b>Output Dimensionality</b>: Same as input</li>
            <li><b>Training Load</b>: None</li>
            <li><b>Use Case</b>: Universal</li>
            <li><b>Customizable Parameters</b>
                <ul className = 'list-disc list-inside pl-4'>
                    <li><b>Rate</b> — Rate of Dropout in Percent</li>
                    <li><b>Type</b> — Type of Dropout</li>
                </ul>
            </li>
        </ul>
        <hr className = 'w-5/6 border-black border-1 rounded-2xl'></hr>
        <p className = 'text-2xl text-center p-1 pt-3'>Guide</p>
         <ul className = 'list-disc list-inside pl-2 pb-3 pr-3'>
            <li>Dropout layers are layers used to decrease the chance of model overfitting, which is where a model learns all the noise and irrelevant patterns in the training data</li>
            <li>At their core, they do this by randomly 'turning off' certain neurons, forcing the model to learn more general features</li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <li>Dropout layers are separated by type:
                <ul className = 'list-disc list-inside pl-4'>
                    <li><b>Individual</b> — A dropout layer that randomly picks <i>individual values</i> to turn to 0</li>
                    <li><b>Spatial 1D</b> — A dropout layer that randomly picks <i>1D vectors</i> to turn to 0</li>
                    <li><b>Spatial 2D</b> — A dropout layer that randomly picks <i>2D matrices</i> to turn to 0</li>
                    <li><b>Spatial 3D</b> — A dropout layer that randomly picks <i>3D matrices</i> to turn to 0</li>
                </ul>
            </li>
            <li>Naturally, spatial dropout layers require higher-dimensional inputs than individual dropout layers — you can't drop out a 2D matrix if your input is 1D</li>
            <li>The rate at which a dropout layer drops data is simply the chance that any given value/vector/matrix in the input gets set to 0</li>
            <hr className = 'w-4/5 rounded-2xl border-black border-1 m-5' />
            <li>You can learn more about dropout layers <Link href = "https://machinelearningmastery.com/dropout-for-regularizing-deep-neural-networks/">here</Link></li>
         </ul>
        
        
    </div>
}
export default DropoutMenu