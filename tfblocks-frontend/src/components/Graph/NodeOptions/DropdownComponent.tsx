import { Dropdown, type DropdownChangeEvent } from "primereact/dropdown"


const DropdownMenu = (props : any) => {
    //reusable component that creates a Dropdown Menu with help from PrimeReact
    const handleValueChange = (event : DropdownChangeEvent) => {
        const val = (event.target as HTMLSelectElement).value;
        props.setValue(val ? val : undefined)
    }
    return  (
    <div className = "border-1 border-black text-[8px] flex justify-center items-center text-center rounded-sm" >
        <Dropdown value = {props.value} onChange = {handleValueChange} placeholder = "--Select--" id = {props.label_id}
                        options = {props.options} 
                        pt = {{
                            root: {className: 'flex items-center w-[50px]'}, 
                            trigger: {className: "w-[5px] h-[5px]"},
                            input: {className: 'w-9/10 md-[14px]'},
                            list: {className: 'flex flex-col border-black border-1 bg-white p-8 rounded-sm'}}}
                        appendTo = "self"
                        panelStyle = {{padding: "2px"}}></Dropdown>
    </div>)
}
export default DropdownMenu