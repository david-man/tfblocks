const InputComponent = (props : any) => {
    const allowNegative = props?.allowNegative ? props.allowNegative : false;

    return (
    <div className = "flex flex-col h-fit w-full items-center p-2">
        <label htmlFor={props.id} className = "text-xs">{props.label} </label>
        <input id = {props.id} type = "number" className = "field-sizing-fixed w-[50px] border-1 border-black text-xs nopan nodrag"
        onChange = {(evt) => {
            if(allowNegative){
                let input_to_filter = evt.target.value
                let neg = false;
                if(input_to_filter.length >= 1 && input_to_filter.charAt(0) === '-'){
                    neg = true;
                    input_to_filter = evt.target.value.slice(1)
                }
                let filtered_input = input_to_filter.replace(/[^0-9]/g, '');
                if(props.filter){
                    filtered_input = props.filter(filtered_input) ? filtered_input : ''
                }
                if(neg){
                    props.setFunction(filtered_input === '' ? NaN : Number(filtered_input) * -1)
                }
                else{
                    props.setFunction(filtered_input === '' ? NaN : Number(filtered_input))
                }
                
            }
            else{
                let filtered_input = evt.target.value.replace(/[^0-9]/g, '');
                if(props.filter){
                    filtered_input = props.filter(filtered_input) ? filtered_input : ''
                }
                props.setFunction(filtered_input === '' ? NaN : Number(filtered_input))
            }
            
        }}
        value = {!isNaN(props.value) ? props.value : ''}></input>
    </div>)
}
export default InputComponent