import { useRef} from "react"
import axios from "axios"
const InputOverlay = (props : any) => {
    const setInputShape = props.setInputShape
    const inputRef = useRef(null)
    const handleInput = async (event : any) => {
        const file = event.target.files[0]
        if(file){
            const formData = new FormData()
            formData.append('input_file', file)
            try{
                const resp = await axios.post('http://localhost:8000/api/setInputData/', formData)
                console.log(resp)
                setInputShape(resp.data.input_data_shape)
            }
            catch(err){
                console.log("Flask upload error!")
            }
        }
        else{
            console.log("File upload error!")
        }
        
    }
    return (
    <div className = 'border-1 rounded-xl border-black w-full h-full flex justify-center items-center '>
        <input ref = {inputRef} type = 'file' style = {{display : 'none'}} accept = '.npy' onChange={handleInput}/>
        <button className = "text-2xl w-full h-full bg-gray-100/80" onClick = {() => inputRef.current.click()}>Input!</button>
    </div>)
}

export default InputOverlay