import InputComponent from "../InputComponent";

const DenseOptions = (props : any) => 
{
    return (
    <div className = "w-[80px]">
        <hr className = "w-full"/>
        <InputComponent setFunction={props.setUnits} value = {props.units} label = {"Units: "}></InputComponent>
    </div>)
}
export default DenseOptions