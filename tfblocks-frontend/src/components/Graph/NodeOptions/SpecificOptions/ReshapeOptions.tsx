import ArrayInputComponent from "../NumericalArrayInputComponent"
const ReshapeOptions = (props : any) => 
{
    return (
    <div>
        <hr className = 'w-full mt-1 border-black'></hr>
        <ArrayInputComponent id = {`${props.id}_text_1`} setArray = {props.setDataShape} value = {props.data_shape} label = {"New Shape: "} />
    </div>)
}
export default ReshapeOptions