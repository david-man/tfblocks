import { useState } from "react"

const ArrayInputComponent = (props : any) => {

    const [raw_str, setRawStr] = useState('')
    const allowNegative = props?.allowNegative ? props.allowNegative : false
    const allowDecimal = props?.allowDecimal ? props.allowDecimal : false
    const array = props.array
    const setArray = props.setArray
    const id = props.id
    const label = props.label
    
    return (
        <div className = {`flex flex-row w-full items-center justify-center p-1 pt-2 text-[10px]`}>
            <label htmlFor={id} className = "pr-[3px]">{label} </label>
            <input id = {id} type = "text" className = "field-sizing-fixed w-[80px] border-1 rounded-sm border-black nopan nodrag text-center"
            onChange = {(evt) => {
                let input = evt.target.value
                let temp_array : number[] = []
                let new_str = ''
                input.split(',').map((num : string, i : number) => {
                    if(num.length == 0){
                        new_str = new_str + ','
                    }
                    else{
                        let neg = false
                        if(allowNegative){
                            if(num.length >= 1 && num.charAt(0) === '-'){
                                neg = true;
                                num = num.slice(1)
                            }
                        }
                        if(allowDecimal){
                            let split_input = num.split('.', 2)
                            if(split_input.length == 2){
                                num = split_input[0].replace(/[^0-9]/g, '') + '.' + split_input[1].replace(/[^0-9]/g, '')
                            }
                            else{
                                num = num.replace(/[^0-9]/g, '');
                            }
                        }
                        else{
                            num = num.replace(/[^0-9]/g, '');
                        }
                        if(props.filter){
                            num = props.filter(num) ? num : ''
                        }
                        if(num.length != 0){
                            temp_array.push(Number(num))
                            new_str = new_str + num + ','
                        }
                        else if(i > 0){
                            new_str = new_str + ','
                        }
                    }
                })
                new_str = new_str.substring(0, new_str.length - 1)
                setArray(temp_array.length == 0 ? undefined : temp_array)
                setRawStr(new_str)
                
            }}
            value = {raw_str}></input>
        </div>
    )
}
export default ArrayInputComponent