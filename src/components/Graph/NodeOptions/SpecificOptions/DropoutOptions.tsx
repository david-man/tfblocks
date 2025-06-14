import type { FormEventHandler } from "react";
import InputComponent from "../NumericalInputComponent";

const DropoutOptions = (props : any) => {
    const handleDimChange : FormEventHandler= (event) => {
        const val = event.target.value
        props.set_dim(val ? val : undefined)
    }
    return (
    <div className = "w-[80px] flex flex-col justify-center items-center">
        <label htmlFor = {`${props.id}_text`}>Type:</label>
            <div className = "w-4/5 border-1 border-black text-[0.5rem] flex justify-center items-center" >
                <select id = {`${props.id}_text`} value = {props.dim} onChange = {handleDimChange} >
                    <option value = "indiv">Individual</option>
                    <option value = "1d">Spatial 1d</option>
                    <option value = "2d">Spatial 2d</option>
                    <option value = "3d">Spatial 3d</option>
                </select>
            </div>
        <InputComponent id = {`${props.id}_text_1`} setFunction={(new_rate) => {
            if(!new_rate || new_rate <= 100)props.set_rate(new_rate)}} value = {props.rate} label = {"Rate(%): "}></InputComponent>
    </div>)
}
export default DropoutOptions