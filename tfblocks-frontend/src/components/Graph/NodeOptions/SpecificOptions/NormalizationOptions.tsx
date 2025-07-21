import type { FormEventHandler } from "react";
import InputComponent from "../NumericalInputComponent";

const NormalizationOptions = (props : any) => {
    const handleTypeChange : FormEventHandler= (event : any) => {
        const val = event.target.value;
        props.set_norm_type(val ? val : undefined)
    }
    return (
    <div className = "w-[80px] flex flex-col justify-center items-center">
        <label htmlFor = {`${props.id}_text`}>Type:</label>
            <div className = "w-4/5 border-1 border-black text-[0.5rem] flex justify-center items-center" >
                <select id = {`${props.id}_text`} value = {props.norm_type} onChange = {handleTypeChange} >
                    <option value = "">--Choose--</option>
                    <option value = "unit">Unit</option>
                    <option value = "batch">Batch</option>
                    <option value = "layer">Layer</option>
                </select>
            </div>
        <InputComponent id = {`${props.id}_text_1`} setFunction={props.set_axis} value = {props.axis} label = {"Axis: "} allowNegative = {true}></InputComponent>
        <div className = 'flex flex-row w-full items-center justify-center p-1 text-[10px]'>   
            <label htmlFor = {`${props.id}_scale`} className = 'pr-[3px]'>Scale: </label>
            <input id = {`${props.id}_scale`} type = 'checkbox' checked = {props.scale} onChange = {() => props.set_scale(!props.scale)}></input>
        </div>
    </div>)
}
export default NormalizationOptions