import '../../App.css'
import { useState, useEffect } from 'react'
import { DragOverlay } from '@dnd-kit/core'
import {DragElement, DragShadow} from './DragElement'
const Toolbox = (props) => {
    
    const [activeID, setActiveID] = useState<string | null>(null)
    useEffect(() => {
        setActiveID(props.activeID)
    }, [props.activeID])
    return (
        <>
            <div className = "border-2 border-black w-full h-full overflow-y-auto overflow-x-clip">
                <DragElement id = {'dense'} name = {'Dense Layer'} activeID = {activeID}></DragElement>
                <DragElement id = {'conv'} name = {'Conv Layer'} activeID = {activeID}></DragElement>
                <DragElement id = {'pooling'} name = {'Pooling Layer'} activeID = {activeID}></DragElement>
                <hr className = "w-full border-1"></hr>
                <DragElement id = {'add'} name = {'Add Node'} activeID = {activeID}></DragElement>
                <DragElement id = {'multiply'} name = {'Multiply Node'} activeID = {activeID}></DragElement>
                <DragElement id = {'subtract'} name = {'Subtract Node'} activeID = {activeID}></DragElement>
                <DragElement id = {'dot_product'} name = {'Dot Product Node'} activeID = {activeID}></DragElement>
                <DragElement id = {'scalar_ops'} name = {'Scalar Operation Node'} activeID = {activeID}></DragElement>
                <hr className = "w-full border-1"></hr>
                <DragElement id = {'transpose'} name = {'Transpose Node'} activeID = {activeID}></DragElement>
                <DragElement id = {'cut'} name = {'Cut Node'} activeID = {activeID}></DragElement>
                <DragElement id = {'concatenate'} name = {'Concatenate Node'} activeID = {activeID}></DragElement>
                <DragElement id = {'upscale'} name = {'Upscale Node'} activeID = {activeID}></DragElement>
                <DragElement id = {'flatten'} name = {'Flatten Node'} activeID = {activeID}></DragElement>
                <hr className = "w-full border-1"></hr>
                <DragElement id = {'norm'} name = {'Normalization Layer'} activeID = {activeID}></DragElement>
                <DragElement id = {'activation'} name = {'Activation Layer'} activeID = {activeID}></DragElement>
                <DragElement id = {'dropout'} name = {'Dropout Layer'} activeID = {activeID}></DragElement>
                <hr className = "w-full border-1"></hr>
                <DragElement id = {'recurrent_head'} name = {'Recurrent Head'} activeID = {activeID}></DragElement>
                <DragElement id = {'lstm'} name = {'LSTM'} activeID = {activeID}></DragElement>
                <DragElement id = {'gru'} name = {'GRU'} activeID = {activeID}></DragElement>
                <DragElement id = {'rnn'} name = {'RNN'} activeID = {activeID}></DragElement>
            </div>
            <DragOverlay>
                <DragShadow id = {'dense'} name = {'Dense Layer'} activeID = {activeID}></DragShadow>
                <DragShadow id = {'conv'} name = {'Conv Layer'} activeID = {activeID}></DragShadow>
                <DragShadow id = {'pooling'} name = {'Pooling Layer'} activeID = {activeID}></DragShadow>
                <DragShadow id = {'add'} name = {'Add Node'} activeID = {activeID}></DragShadow>
                <DragShadow id = {'dot_product'} name = {'Dot Product Node'} activeID = {activeID}></DragShadow>
                <DragShadow id = {'scalar_ops'} name = {'Scalar Operation Node'} activeID = {activeID}></DragShadow>
                <DragShadow id = {'transpose'} name = {'Transpose Node'} activeID = {activeID}></DragShadow>
                <DragShadow id = {'cut'} name = {'Cut Node'} activeID = {activeID}></DragShadow>
                <DragShadow id = {'concatenate'} name = {'Concatenate Node'} activeID = {activeID}></DragShadow>
                <DragShadow id = {'upscale'} name = {'Upscale Node'} activeID = {activeID}></DragShadow>
                <DragShadow id = {'flatten'} name = {'Flatten Node'} activeID = {activeID}></DragShadow>
                <DragShadow id = {'norm'} name = {'Normalization Layer'} activeID = {activeID}></DragShadow>
                <DragShadow id = {'activation'} name = {'Activation Layer'} activeID = {activeID}></DragShadow>
                <DragShadow id = {'dropout'} name = {'Dropout Layer'} activeID = {activeID}></DragShadow>
                <DragShadow id = {'recurrent_head'} name = {'Recurrent Head'} activeID = {activeID}></DragShadow>
                <DragShadow id = {'lstm'} name = {'LSTM'} activeID = {activeID}></DragShadow>
                <DragShadow id = {'gru'} name = {'GRU'} activeID = {activeID}></DragShadow>
                <DragShadow id = {'rnn'} name = {'RNN'} activeID = {activeID}></DragShadow>
            </DragOverlay>
        </>
    )
}
export default Toolbox