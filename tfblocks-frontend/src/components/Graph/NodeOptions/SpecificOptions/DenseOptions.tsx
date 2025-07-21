import InputComponent from "../NumericalInputComponent";
const DenseOptions = (props : any) => 
{
    return (
    <div>
        <hr className = 'w-full mt-1 border-black'></hr>
        <InputComponent id = {`${props.id}_text_1`} setFunction={props.setUnits} value = {props.units} label = {"Units: "}></InputComponent>
        <div className = 'flex flex-row w-full items-center justify-center p-1 text-[10px]'>   
            <label htmlFor = {`${props.id}_bias`} className = 'pr-[3px]'>Use Bias: </label>
            <input id = {`${props.id}_bias`} type = 'checkbox' checked = {props.bias} onChange = {() => props.setBias(!props.bias)}></input>
        </div>
    </div>)
}
export default DenseOptions