import axios from "axios"
const CustomMatrixOptions = (props : any) => 
{
    const id = props.id
    const handleInput = async (event : any) => {
        const file : File = event.target.files[0]
        event.target.files = null
        if(file)
        {
            const formData = new FormData()
            formData.append('input_file', file)
            try{
                const resp = await axios.post('http://localhost:8000/api/getMatrixShape/', formData)
                if(resp.status == 200){
                    props.setDataShape(resp.data.data_shape)
                    props.setFile(file)
                }
            }
            catch{
                alert("Matrix upload failed!")
            }
        }
    }
    return (
    <div>
        <hr className = 'w-full mt-1 border-black'></hr>
        <div className = 'w-full mt-2 p-2 h-[20px] border-1 border-black flex justify-center items-center rounded-2xl'>
            <label htmlFor = {`file_input_${id}`} className = 'text-[10px] cursor-pointer'>Upload Matrix Here!</label>
            <input id = {`file_input_${id}`} type = "file" accept = '.npy' hidden onChange={handleInput}></input>
        </div>
    </div>)
}
export default CustomMatrixOptions