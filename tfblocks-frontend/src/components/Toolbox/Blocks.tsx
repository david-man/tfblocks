import '../../App.css'
import { useState, useEffect } from 'react'
import { DragOverlay } from '@dnd-kit/core'
import {DragElement, DragShadow} from './DragElement'
import helpMenuController, { type Help } from '../../controllers/helpMenuController'
import { useShallow } from 'zustand/shallow'

const Blocks = (props : any) => {
    const [activeID, setActiveID] = useState<string | null>(null)
    useEffect(() => {
        setActiveID(props.activeID)
    }, [props.activeID])
    const {setMenu} = helpMenuController(useShallow((state : Help) => {
        return {
            setMenu : state.setHelpMenu
        }
    }))
    const menuOn = props.menu

    const menus = new Map([
        ['Common', (<>
            <DragElement id = {'dense'} name = {'Dense Layer'} activeID = {activeID} color = {'bg-blue-500'}></DragElement>
                <DragElement id = {'conv'} name = {'Convolutional Layer'} activeID = {activeID} color = {'bg-blue-500'}></DragElement>
                <DragElement id = {'activation'} name = {'Activation Layer'} activeID = {activeID} color = {'bg-blue-500'}></DragElement>
        </>)],
        ['Normalization', (<>
                <DragElement id = {'pooling'} name = {'Pooling Layer'} activeID = {activeID} color = 'bg-purple-400'></DragElement>
                <DragElement id = {'norm'} name = {'Normalization Layer'} activeID = {activeID} color = 'bg-purple-400'></DragElement>
                <DragElement id = {'dropout'} name = {'Dropout Layer'} activeID = {activeID} color = 'bg-purple-400'></DragElement>
        </>)],
        ['Operations',  (<>
            <DragElement id = {'add'} name = {'Add Node'} activeID = {activeID} color = 'bg-yellow-300'></DragElement>
                <DragElement id = {'subtract'} name = {'Subtract Node'} activeID = {activeID} color = 'bg-yellow-300'></DragElement>
                <DragElement id = {'multiply'} name = {'Multiply Node'} activeID = {activeID} color = 'bg-yellow-300'></DragElement>
                <DragElement id = {'divide'} name = {'Divide Node'} activeID = {activeID} color = 'bg-yellow-300'></DragElement>
                <DragElement id = {'dot_product'} name = {'Dot Product Node'} activeID = {activeID} color = 'bg-yellow-300'></DragElement>
        </>)],
        ['Reshape', (<>
            <DragElement id = {'transpose'} name = {'Transpose Node'} activeID = {activeID} color = 'bg-stone-300'></DragElement>
                <DragElement id = {'cut'} name = {'Cut Node'} activeID = {activeID} color = 'bg-stone-300'></DragElement>
                <DragElement id = {'concatenate'} name = {'Concatenate Node'} activeID = {activeID} color = 'bg-stone-300'></DragElement>
                <DragElement id = {'upscale'} name = {'Upscale Node'} activeID = {activeID} color = 'bg-stone-300'></DragElement>
                <DragElement id = {'flatten'} name = {'Flatten Node'} activeID = {activeID} color = 'bg-stone-300'></DragElement>  
                <DragElement id = {'reshape'} name = {'Reshape Node'} activeID = {activeID} color = 'bg-stone-300'></DragElement>  
        </>)],
        ['Recurrent', (<>
                <DragElement id = {'recurrent_head'} name = {'Recurrent Head'} activeID = {activeID} color = 'bg-lime-400'></DragElement>
                <DragElement id = {'lstm'} name = {'LSTM'} activeID = {activeID} color = 'bg-lime-400'></DragElement>
                <DragElement id = {'gru'} name = {'GRU'} activeID = {activeID} color = 'bg-lime-400'></DragElement>
                <DragElement id = {'rnn'} name = {'RNN'} activeID = {activeID} color = 'bg-lime-400'></DragElement>
                <DragElement id = {'attention'} name = {'Attention'} activeID = {activeID} color = 'bg-lime-400'></DragElement>
        </>)],
        ['Custom', (<>
            <DragElement id = {'scalar_ops'} name = {'Scalar Operation Node'} activeID = {activeID} color = 'bg-pink-400'></DragElement>
            <DragElement id = {'custom_matrix'} name = {'Custom Matrix Node'} activeID = {activeID} color = 'bg-pink-400'></DragElement>
        </>)]
        ])
    
    
    return (
        <>
            <div className = "border-t-2 border-l-2 border-b-2 border-gray-500 w-full h-full overflow-y-auto overflow-x-clip">
                <div className = "mt-3 mb-1 ml-3 mr-2 w-full flex">
                    <p className = "text-[18px] font-bold pr-[5px]">{menuOn}</p>
                    {menuOn === 'Recurrent' ? <button onClick = {() => setMenu('recurrent-general')}>
                        <div className = 'w-[12px] h-[12px] cursor-help'>
                            <img src="question.png" alt="help" width = "12px" height = "12px"/>
                        </div>
                    </button> : null}
                </div>
                
                {menus.get(menuOn)}
            </div>
            <DragOverlay>
                <DragShadow id = {'dense'} name = {'Dense Layer'} activeID = {activeID} color = {'bg-blue-500'}></DragShadow>
                <DragShadow id = {'conv'} name = {'Convolutional Layer'} activeID = {activeID} color = {'bg-blue-500'}></DragShadow>
                <DragShadow id = {'activation'} name = {'Activation Layer'} activeID = {activeID} color = {'bg-blue-500'}></DragShadow>
                <DragShadow id = {'pooling'} name = {'Pooling Layer'} activeID = {activeID} color = 'bg-purple-400'></DragShadow>
                <DragShadow id = {'norm'} name = {'Normalization Layer'} activeID = {activeID} color = 'bg-purple-400'></DragShadow>
                <DragShadow id = {'dropout'} name = {'Dropout Layer'} activeID = {activeID} color = 'bg-purple-400'></DragShadow>
                <DragShadow id = {'add'} name = {'Add Node'} activeID = {activeID} color = 'bg-yellow-300'></DragShadow>
                <DragShadow id = {'multiply'} name = {'Multiply Node'} activeID = {activeID} color = 'bg-yellow-300'></DragShadow>
                <DragShadow id = {'divide'} name = {'Divide Node'} activeID = {activeID} color = 'bg-yellow-300'></DragShadow>
                <DragShadow id = {'subtract'} name = {'Subtract Node'} activeID = {activeID} color = 'bg-yellow-300'></DragShadow>
                <DragShadow id = {'dot_product'} name = {'Dot Product Node'} activeID = {activeID} color = 'bg-yellow-300'></DragShadow>
                <DragShadow id = {'scalar_ops'} name = {'Scalar Operation Node'} activeID = {activeID} color = 'bg-pink-400'></DragShadow>
                <DragShadow id = {'custom_matrix'} name = {'Custom Matrix Node'} activeID = {activeID} color = 'bg-pink-400'></DragShadow>
                <DragShadow id = {'transpose'} name = {'Transpose Node'} activeID = {activeID} color = 'bg-stone-300'></DragShadow>
                <DragShadow id = {'cut'} name = {'Cut Node'} activeID = {activeID} color = 'bg-stone-300'></DragShadow>
                <DragShadow id = {'concatenate'} name = {'Concatenate Node'} activeID = {activeID} color = 'bg-stone-300'></DragShadow>
                <DragShadow id = {'upscale'} name = {'Upscale Node'} activeID = {activeID} color = 'bg-stone-300'></DragShadow>
                <DragShadow id = {'flatten'} name = {'Flatten Node'} activeID = {activeID} color = 'bg-stone-300'></DragShadow>
                <DragShadow id = {'reshape'} name = {'Reshape Node'} activeID = {activeID}  color = 'bg-stone-400'></DragShadow>
                <DragShadow id = {'recurrent_head'} name = {'Recurrent Head'} activeID = {activeID}  color = 'bg-lime-400'></DragShadow>
                <DragShadow id = {'lstm'} name = {'LSTM'} activeID = {activeID}  color = 'bg-lime-400'></DragShadow>
                <DragShadow id = {'gru'} name = {'GRU'} activeID = {activeID}  color = 'bg-lime-400'></DragShadow>
                <DragShadow id = {'rnn'} name = {'RNN'} activeID = {activeID}  color = 'bg-lime-400'></DragShadow>
                <DragShadow id = {'attention'} name = {'Attention'} activeID = {activeID} color = 'bg-lime-400'></DragShadow>
            </DragOverlay>
        </>
    )
}
export default Blocks