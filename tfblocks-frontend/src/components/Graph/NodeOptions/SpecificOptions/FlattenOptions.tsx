import InputComponent from "../NumericalInputComponent";

const FlattenOptions = (props : any) => {
    return (
    <div className = "w-[80px]">
        <hr className = "w-full"/>
        <InputComponent id = {`${props.id}_text_1`} setFunction={props.setAxis} value = {props.axis} label = {"Axis"} allowNegative = {true}></InputComponent>
    </div>)
}
export default FlattenOptions