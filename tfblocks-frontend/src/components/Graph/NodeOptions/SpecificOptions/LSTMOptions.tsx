import InputComponent from "../NumericalInputComponent";

const LSTMOptions = (props : any) => 
{
    return (
    <div className = "w-[80px]">
        <hr className = "w-full"/>
        <InputComponent id = {`${props.id}_text_1`} setFunction={props.setUnits} value = {props.units} label = {"Units: "}></InputComponent>
        <div className = 'flex flex-row w-full items-center justify-center p-1 text-[10px]'>   
            <label htmlFor = {`${props.id}_seq2seq`} className = 'pr-[3px]'>Seq2Seq: </label>
            <input id = {`${props.id}_seq2seq`} type = 'checkbox' checked = {props.seq2seq} onChange = {() => props.setSeq2Seq(!props.seq2seq)}></input>
        </div>
    </div>)
}
export default LSTMOptions