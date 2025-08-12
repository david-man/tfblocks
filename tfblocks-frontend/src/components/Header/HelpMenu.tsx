import { useState } from "react"
import helpMenuController from "../../controllers/helpMenuController"

const HelpMenu = (props : any) => {
    const [text, setText] = useState('')
    const [uploadClicked, setUploadClicked] = useState(false)
    const {setHelpMenu} = helpMenuController()
    const keyMapping: { [key: string]: string } = {
        'dense': 'Dense Layers',
        'conv': 'Convolutional Layers',
        'activation': 'Activation Functions',
        'pooling': 'Pooling Layers',
        'norm': 'Normalization Layers',
        'dropout': 'Dropout Layers',
        'add': 'Add Layers',
        'subtract': 'Subtract Layers',
        'dot_product': 'Dot Products',
        'multiply': 'Multiply Layers',
        'divide': 'Divide Layers',
        'cut': 'Cut Operations',
        'concatenate': 'Concatenate Operations',
        'upscale': 'Upscale Operations',
        'flatten': 'Flattening Operations',
        'reshape': 'Rescaling Operations',
        'scalar_ops': 'Scalar Operations',
        'custom_matrix': 'Custom Matrices',
        'recurrent-general': 'Recurrence',
        'rnn': 'Simple RNN Layer',
        'lstm': 'LSTM Layers',
        'gru': 'GRU Layers',
        'input_layer': 'Inputs',
        'output_layer': 'Outputs',
        'recurrent_head': 'Custom Recurrent Heads',
        'attention': 'Attention Layers'
    }
    return (<>
        <div className = 'absolute w-full h-full z-10 flex flex-col justify-center items-center'>
            <div className = ' border-black rounded-2xl w-95/100 h-95/100 bg-gray-500 opacity-70 flex flex-col'>
            </div>
        </div>
        <div className = 'absolute w-full h-full z-11 flex flex-col justify-center items-center'>
            <div className = 'w-95/100 h-95/100 overflow-y-auto'>
                {props.helpResults ? (props.helpResults.length == 0 ? 
                    <>
                        <p className = 'text-[75px] text-white text-center p-[30px]'>Sorry, we couldn't find a help menu that might assist you :(</p>
                        <div className = 'pt-[40px] w-full h-fit flex justify-around items-center pb-[30px]'>
                            <button onClick = {props.turnOff}>
                                <div className = 'min-w-fit h-[50px] border-1 rounded-2xl border-black bg-red-400 flex justify-center items-center cursor-pointer'>
                                    <div className = 'p-[15px]'>
                                        <p className = 'text-[30px] text-white text-center'>Close</p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </> : 
                    <>
                        <p className = 'text-[75px] text-white text-center p-[30px]'>We think these help menus might help you!</p>
                        {props.helpResults.map((key : string) => 
                            <div key = {key} className = 'pt-[40px] w-full h-fit flex justify-around items-center pb-[30px]'>
                                <button onClick = {() => {
                                    setHelpMenu(key)
                                    props.turnOff();
                                    }}>
                                    <div className = 'min-w-fit h-[50px] border-1 rounded-2xl border-black bg-blue-400 flex justify-center items-center cursor-pointer'>
                                        <div className = 'p-[15px]'>
                                            <p className = 'text-[30px] text-white text-center'>{keyMapping[key] ? keyMapping[key] : 'unknown'}</p>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        )}
                        <div className = 'pt-[40px] w-full h-fit flex justify-around items-center pb-[30px]'>
                            <button onClick = {props.turnOff}>
                                <div className = 'min-w-fit h-[50px] border-1 rounded-2xl border-black bg-red-400 flex justify-center items-center cursor-pointer'>
                                    <div className = 'p-[15px]'>
                                        <p className = 'text-[30px] text-white text-center'>Close</p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </>
                    
                ) :
                <>
                <p className = 'text-[100px] text-white text-center pb-[5px]'>Have a Question?</p>
                <p className = 'text-[20px] text-white text-center pb-[30px]'>(For the best results, try being as specific as possible!)</p>
                <div className = {`flex flex-row w-full items-center justify-center p-1 text-[20px]`}>
                    <input id = 'ask_question' type = 'text' className = 'field-sizing-fixed w-1/2 border-1 rounded-sm border-black nopan nodrag text-center'
                    onChange = {(evt) => {
                        setText(evt.target.value)
                    }}
                    value = {text}
                    ></input>
                </div>
                <div className = 'pt-[40px] w-full h-fit flex justify-around items-center pb-[30px]'>
                    <div className = 'w-1/2 flex justify-around items-center'>
                        <button onClick = {props.turnOff}>
                            <div className = 'min-w-fit h-[50px] border-1 rounded-2xl border-black bg-red-400 flex justify-center items-center cursor-pointer'>
                                <div className = 'p-[15px]'>
                                    <p className = 'text-[30px] text-white text-center'>Cancel</p>
                                </div>
                            </div>
                        </button>
                        <button onClick = {() => {
                            if(!uploadClicked)
                            {
                                setText('')
                                setUploadClicked(true)
                                props.askQuestion(text);
                            }
                                }}>
                            <div className = {`${uploadClicked ? 'bg-green-800' : 'bg-green-400'} min-w-fit h-[50px] border-1 rounded-2xl border-black flex justify-center items-center cursor-pointer`}>
                                <div className = 'p-[15px]'>
                                    <p className = 'text-[30px] text-white text-center'>Ask!</p>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
                </>}
            </div>
        </div>
        
        </>)
}
export default HelpMenu