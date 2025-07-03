import { useState, useEffect, useRef} from "react"
import axios from "axios"
const IdleElement = (props : any) => {
    const setTrainingState = props.setTrainingState
    const inputRef = useRef(null)
    const handleInput = async (event : any) => {
        const file = event.target.files[0]
        if(file){
            const formData = new FormData()
            formData.append('input_file', file)
            try{
                const resp = await axios.post('http://localhost:8000/api/setInputData/', formData)
                setTrainingState(true)
            }
            catch(err){
                console.log("Flask upload error!")
            }
        }
        else{
            console.log("File upload error!")
        }
        
    }
    return <div className = 'border-1 rounded-xl border-black w-full h-full flex justify-center items-center'>
        <input ref = {inputRef} type = 'file' style = {{display : 'none'}} accept = '.npy' onChange={handleInput}/>
        <button className = "text-2xl" onClick = {() => inputRef.current.click()}>Input!</button>
    </div>
}

export default IdleElement