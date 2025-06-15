import InputComponent from "../NumericalInputComponent";

const CutOptions = (props : any) => {
    return (
    <div className = "w-[80px]">
        <hr className = "w-full"/>
        <InputComponent id = {`${props.id}_text_1`} setFunction={props.set_axis} value = {props.axis} label = {"Axis: "} allowNegative = {true}></InputComponent>
        <InputComponent id = {`${props.id}_text_2`} setFunction={props.set_cut1} value = {props.cut1} label = {"Cut 1: "}></InputComponent>
        <InputComponent id = {`${props.id}_text_3`} setFunction={props.set_cut2} value = {props.cut2} label = {"Cut 2: "}></InputComponent>
    </div>)
}
export default CutOptions