import InputComponent from "../InputComponent";

const Conv1DOptions = (props : any) => 
{
    return (
    <div className = "w-[100px]">
        <hr className = "w-full"/>
        <InputComponent setFunction={props.setFilters} value = {props.filters} label = {"Filters: "}></InputComponent>
        <InputComponent setFunction={props.setKernel} value = {props.kernel} label = {"Kernel Size: "}></InputComponent>
    </div>)
}
export default Conv1DOptions