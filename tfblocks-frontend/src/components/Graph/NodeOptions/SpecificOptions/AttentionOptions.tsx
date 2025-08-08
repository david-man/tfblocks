import InputComponent from "../NumericalInputComponent";
const AttentionOptions = (props : any) => 
{
    return (
    <div>
        <hr className = 'w-full mt-1 border-black'></hr>
        <InputComponent id = {`${props.id}_text_1`} setFunction={props.setHeads} value = {props.heads} label = {"Heads: "}></InputComponent>
    </div>)
}
export default AttentionOptions