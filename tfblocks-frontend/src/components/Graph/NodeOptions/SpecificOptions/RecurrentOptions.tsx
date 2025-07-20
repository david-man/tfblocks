import InputComponent from "../NumericalInputComponent";

const RecurrentOptions = (props : any) => 
{
    return (
    <div className = "w-[120px]">
        <hr className = "w-full"/>
        <InputComponent id = {`${props.id}_text_2`} setFunction={props.setOutput} value = {props.outputUnits} label = {"Hidden Units: "}></InputComponent>
        <div className = 'flex flex-row w-full items-center justify-center p-1 text-[10px]'>   
            <label htmlFor = {`${props.id}_seq2seq`} className = 'pr-[3px]'>Seq2Seq: </label>
            <input id = {`${props.id}_seq2seq`} type = 'checkbox' checked = {props.seq2seq} onChange = {(event) => props.setSeq2Seq(!props.seq2seq)}></input>
        </div>
    </div>)
}
export default RecurrentOptions