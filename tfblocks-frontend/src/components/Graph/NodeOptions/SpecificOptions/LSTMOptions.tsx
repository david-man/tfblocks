import InputComponent from "../NumericalInputComponent";

const LSTMOptions = (props : any) => 
{
    return (
    <div className = "w-[80px]">
        <hr className = "w-full"/>
        <InputComponent id = {`${props.id}_text_1`} setFunction={props.setUnits} value = {props.units} label = {"Units: "}></InputComponent>
    </div>)
}
export default LSTMOptions