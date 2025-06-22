import InputComponent from "../NumericalInputComponent";

const RecurrentOptions = (props : any) => 
{
    return (
    <div className = "w-[120px]">
        <hr className = "w-full"/>
        <InputComponent id = {`${props.id}_text_1`} setFunction={props.setHidden} value = {props.hiddenUnits} label = {"Hidden Units: "}></InputComponent>
        <InputComponent id = {`${props.id}_text_2`} setFunction={props.setOutput} value = {props.outputUnits} label = {"Output Units: "}></InputComponent>
    </div>)
}
export default RecurrentOptions