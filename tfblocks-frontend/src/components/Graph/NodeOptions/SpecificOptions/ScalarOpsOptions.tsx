import type { FormEventHandler } from "react"
import InputComponent from "../NumericalInputComponent"
const ScalarOpsOptions = (props : any) => 
{
    const selection_id = `${props.id}_select`
    const handleChange : FormEventHandler = (event) => {
        const val = (event.target as HTMLSelectElement).value;
        props.setOperation(val ? val : undefined)
    }
    return (
    <div className = "w-[100px]">
        <hr className = "w-full"/>
        <div className = "flex flex-col h-fit w-full justify-center items-center p-2">
            <InputComponent id = {`${props.id}_text`} setFunction = {props.setScalar} value = {props.scalar} label = {"Scalar: "}
            allowNegative = {true} allowDecimal = {true}/>
            <label htmlFor = {selection_id}>Operation:</label>
            <div className = "w-4/5 border-1 border-black text-[0.5rem]">
                <select id = {selection_id} value = {props.operation} onChange = {handleChange}>
                    <option value = "">--Choose--</option>
                    <option value = "add">Add</option>
                    <option value = "multiply">Multiply</option>
                    <option value = "exponentiate">Exponentiate</option>
                </select>
            </div>
        </div>
    </div>)
}
export default ScalarOpsOptions