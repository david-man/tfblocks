import InputComponent from "../NumericalInputComponent";
const DenseOptions = (props : any) => 
{
    return (
    <div>
        <hr className = 'w-full mt-1 border-black'></hr>
        <InputComponent id = {`${props.id}_text_1`} setFunction={props.setUnits} value = {props.units} label = {"Units: "}></InputComponent>
    </div>)
}
export default DenseOptions