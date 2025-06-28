import InputComponent from "../NumericalInputComponent";

const UpscaleOptions = (props : any) => {
    return (
    <div>
        <hr className = "w-full"/>
        <InputComponent id = {`${props.id}_text_1`} setFunction={props.setAxis} value = {props.axis} label = {"Axis"} allowNegative = {true}></InputComponent>
    </div>)
}
export default UpscaleOptions