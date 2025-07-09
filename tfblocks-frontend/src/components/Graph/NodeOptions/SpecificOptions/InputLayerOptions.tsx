import ArrayInputComponent from "../NumericalArrayInputComponent"
const InputOptions = (props : any) => 
{
    return (
    <div>
        <hr className = 'w-full mt-1 border-black'></hr>
        <ArrayInputComponent id = {`${props.id}_text_1`} setArray = {props.setDataShape} value = {props.data_shape} label = {"Shape: "} />
    </div>)
}
export default InputOptions