import InputComponent from "../NumericalInputComponent";
import type { FormEventHandler } from "react"
import {Dropdown, type DropdownChangeEvent} from 'primereact/dropdown'
const Conv1DOptions = (props : any) => 
{
    const padding_id = `${props.id}_select_padding`
    const dim_id = `${props.id}_select_dim`
    const handlePaddingChange = (event : DropdownChangeEvent) => {
        const val = (event.target as HTMLSelectElement).value;
        props.setPadding(val ? val : undefined)
    }
    const handleDimChange = (event : DropdownChangeEvent) => {
        const val = (event.target as HTMLSelectElement).value;
        console.log(val)
        props.setDimensionality(val ? val : undefined)
    }

    const padding_options = [
        {label: "Valid", value: "valid"},
        {label: "Same", value: "same"}
    ]
    const dim_options = [
        {label: "1D", value: "1d"},
        {label: "2D", value: "2d"},
        {label: "3D", value: "3d"}
    ]
    return (
    <div>
        <hr className = 'w-full mt-1 border-black'></hr>
        <div className = "flex flex-col h-fit w-full justify-center items-center p-2 text-[10px]">
            <div className = 'flex p-[2px]'>
                <label htmlFor = {padding_id} className = "pr-[2px]">Padding:</label>
                <div className = "border-1 border-black text-[8px] flex justify-center items-center text-center rounded-sm" >
                    <Dropdown value = {props.padding} onChange = {handlePaddingChange} placeholder = "--Select--" id = {padding_id}
                    options = {padding_options} 
                    pt = {{
                        root: {className: 'flex items-center w-[50px]'}, 
                        trigger: {className: "w-[5px] h-[5px]"},
                        input: {className: 'w-9/10 md-[14px]'},
                        list: {className: 'flex flex-col border-black border-1 bg-white p-8 rounded-sm'}}}
                    appendTo = "self"
                    panelStyle = {{padding: "2px"}}></Dropdown>
                </div>
            </div>
            <div className = 'flex p-[2px]'>
                <label htmlFor = {dim_id}>Dimensionality:</label>
                <div className = "border-1 border-black text-[8px] flex justify-center items-center text-center" >
                    <Dropdown value = {props.dim} onChange = {handleDimChange} placeholder = "--Select--" id = {padding_id}
                    options = {dim_options} className = "m-[2px]"></Dropdown>
                </div>
            </div>
            
            <InputComponent id = {`${props.id}_text_1`} setFunction={props.setFilters} value = {props.filters} label = {"Filters: "}></InputComponent>
            <InputComponent id = {`${props.id}_text_2`} setFunction={props.setKernel} value = {props.kernel} label = {"Kernel Size: "}></InputComponent>
            <InputComponent id = {`${props.id}_text_3`} setFunction={props.setFilters} value = {props.stride} label = {"Stride Size: "}></InputComponent>
        </div>
    </div>)
}
export default Conv1DOptions