import type { FormEventHandler } from "react"
const ActivationOptions = (props : any) => 
{
    const selection_id = `${props.id}_select`
    const handleChange : FormEventHandler = (event) => {
        const val = (event.target as HTMLSelectElement).value;
        props.set_activation(val ? val : undefined)
    }
    return (
    <div className = "w-[100px]">
        <hr className = "w-full"/>
        <div className = "flex flex-col h-fit w-full justify-center items-center p-2">
            <label htmlFor = {selection_id}>Function:</label>
            <div className = "w-4/5 border-1 border-black text-[0.5rem]">
                <select id = {selection_id} value = {props.activation} onChange = {handleChange}>
                    <option value = "">--Choose--</option>
                    <option value = "relu">ReLU</option>
                    <option value = "leaky_relu">Leaky ReLU</option>
                    <option value = "sigmoid">Sigmoid</option>
                    <option value = "tanh">TanH</option>
                    <option value = "softmax">Softmax</option>
                </select>
            </div>
        </div>
    </div>)
}
export default ActivationOptions