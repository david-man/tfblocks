import '../../App.css'
import { useState, useEffect } from 'react'
import Blocks from './Blocks'


const Toolbox = (props) => {
    const [menuOn, setMenuOn] = useState('Common')
    const Choice = (props) => {
        return <div className = {`w-full flex justify-center items-center ${menuOn == props.choice ? 'bg-gray-200' : ''}`}>
                    <button className = 'w-1/4 cursor-pointer aspect-square mt-[18px] mb-[6px] flex flex-col justify-center items-center' onClick = {() => setMenuOn(props.choice)}>
                        <div className = {`w-full h-full rounded-full ${props.bgColor} border-black border-1`}></div>
                        <p className = "text-[12px] text-center">{props.choice}</p>
                    </button>
                </div>
    }
    
    return (
        <div className = 'flex h-full w-full'>
            <div className = 'w-3/10 h-full flex flex-col items-center border-gray-500 border-l-2 border-t-2 border-b-2'>
                <Choice choice = 'Common' bgColor = 'bg-blue-500'></Choice>
                <Choice choice = 'Normalization' bgColor = 'bg-purple-400'></Choice>
                <Choice choice = 'Operations' bgColor = 'bg-yellow-300'></Choice>
                <Choice choice = 'Reshape' bgColor = 'bg-stone-300'></Choice>
                <Choice choice = 'Recurrent' bgColor = 'bg-lime-400'></Choice>
                <Choice choice = 'Custom' bgColor = 'bg-pink-400'></Choice>
            </div>
            <div className = 'w-7/10 h-full max-w-7/10'>
                <Blocks activeID = {props.activeID} menu = {menuOn}/>
            </div>
        </div>
    )
}
export default Toolbox