const InputComponent = (props : any) => {
    return (
    <div className = "flex flex-col h-fit w-full items-center p-2">
        <label htmlFor="text" className = "text-xs">{props.label} </label>
        <input id="text" type = "number" className = "field-sizing-fixed w-[50px] border-1 border-black text-xs nopan nodrag"
        onChange = {(evt) => {
            let filtered_input = evt.target.value.replace(/[^0-9]/g, '');
            if(props.filter){
                filtered_input = props.filter(filtered_input) ? filtered_input : ''
            }
            props.setFunction(Number(filtered_input))
        }}
        value = {props.value ? props.value : ''}></input>
    </div>)
}
export default InputComponent