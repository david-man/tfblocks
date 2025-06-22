import InputComponent from "../NumericalInputComponent";

const TransposeOptions = (props : any) => {
    return (
    <div className = "w-[80px]">
        <hr className = "w-full"/>
        <InputComponent id = {`${props.id}_text_1`} setFunction={props.setAxis1} value = {props.axis_1} label = {"Axis 1: "} allowNegative = {true}></InputComponent>
        <InputComponent id = {`${props.id}_text_2`} setFunction={props.setAxis2} value = {props.axis_2} label = {"Axis 2: "} allowNegative = {true}></InputComponent>
    </div>)
}
export default TransposeOptions