import InputComponent from "../NumericalInputComponent";
import type { FormEventHandler } from "react"
const Conv1DOptions = (props : any) => 
{
    const padding_id = `${props.id}_select_padding`
    const dim_id = `${props.id}_select_dim`
    const handlePaddingChange : FormEventHandler = (event) => {
        const val = (event.target as HTMLSelectElement).value;
        props.setPadding(val ? val : undefined)
    }
    const handleDimChange : FormEventHandler = (event) => {
        const val = (event.target as HTMLSelectElement).value;
        props.setDimensionality(val ? val : undefined)
    }
    return (
    <div className = "w-[120px]">
        <hr className = "w-full"/>
        <div className = "flex flex-col h-fit w-full justify-center items-center p-2">
            <label htmlFor = {padding_id}>Padding:</label>
            <div className = "w-4/5 border-1 border-black text-[0.5rem] flex justify-center items-center" >
                <select id = {padding_id} value = {props.padding} onChange = {handlePaddingChange} >
                    <option value = "valid">Valid</option>
                    <option value = "same">Same</option>
                </select>
            </div>
            <label htmlFor = {dim_id}>Dimensionality:</label>
            <div className = "w-4/5 border-1 border-black text-[0.5rem] flex justify-center items-center" >
                <select id = {dim_id} value = {props.dim} onChange = {handleDimChange}>
                    <option value = "">--Choose--</option>
                    <option value = "1d">1D</option>
                    <option value = "2d">2D</option>
                    <option value = "3d">3D</option>
                </select>
            </div>
            <InputComponent id = {`${props.id}_text_1`} setFunction={props.setFilters} value = {props.filters} label = {"Filters: "}></InputComponent>
            <InputComponent id = {`${props.id}_text_2`} setFunction={props.setKernel} value = {props.kernel} label = {"Kernel Size: "}></InputComponent>
            <InputComponent id = {`${props.id}_text_3`} setFunction={props.setFilters} value = {props.stride} label = {"Stride Size: "}></InputComponent>
        </div>
    </div>)
}
export default Conv1DOptions