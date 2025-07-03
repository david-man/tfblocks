import { useRef} from "react"
import axios from "axios"
const OutputOverlay = (props : any) => {
    const setOutputShape = props.setOutputShape
    const inputRef = useRef(null)
    const handleInput = async (event : any) => {
        const file = event.target.files[0]
        if(file){
            const formData = new FormData()
            formData.append('output_file', file)
            try{
                const resp = await axios.post('http://localhost:8000/api/setOutputData/', formData)
                setOutputShape(resp.data.output_data_shape)
            }
            catch(err){
                alert("Flask upload error! Perhaps the data isn't formatted correctly?")
            }
        }
        else{
            alert("File upload error! Perhaps the server isn't on?")
        }
        
    }
    return (
    <div className = 'border-1 rounded-xl border-black w-full h-full flex justify-center items-center '>
        <input ref = {inputRef} type = 'file' style = {{display : 'none'}} accept = '.npy' onChange={handleInput}/>
        <button className = "text-2xl w-full h-full bg-gray-100/80" onClick = {() => inputRef.current.click()}>Output!</button>
    </div>)
}

export default OutputOverlay