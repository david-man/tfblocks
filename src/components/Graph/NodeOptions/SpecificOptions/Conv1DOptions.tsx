import InputComponent from "../InputComponent";

const Conv1DOptions = (props : any) => 
{
    return (
    <div className = "w-[100px]">
        <hr className = "w-full"/>
        <InputComponent id = {`${props.id}_text_1`} setFunction={props.setFilters} value = {props.filters} label = {"Filters: "}></InputComponent>
        <InputComponent id = {`${props.id}_text_2`} setFunction={props.setKernel} value = {props.kernel} label = {"Kernel Size: "}></InputComponent>
    </div>)
}
export default Conv1DOptions