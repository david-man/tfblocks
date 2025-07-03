import InputComponent from "../NumericalInputComponent";
import DropdownMenu from "../DropdownComponent";
const ConvOptions = (props : any) => 
{
    const padding_id = `${props.id}_select_padding`
    const dim_id = `${props.id}_select_dim`

    const padding_options = [
        {label: "Valid", value: "valid"},
        {label: "Same", value: "same"}
    ]
    const dim_options = [
        {label: "1D", value: "1d"},
        {label: "2D", value: "2d"},
        {label: "3D", value: "3d"}
    ]
    return (
    <div>
        <hr className = 'w-full mt-1 border-black'></hr>
        <div className = "flex flex-col h-fit w-full justify-center items-center p-2 text-[10px]">
            <div className = 'flex p-[2px]'>
                <label htmlFor = {padding_id} className = "pr-[2px]">Padding:</label>
                <DropdownMenu label_id = {padding_id} value = {props.padding} setValue = {props.setPadding} options = {padding_options}/>
            </div>
            <div className = 'flex p-[2px]'>
                <label htmlFor = {dim_id} className = 'pr-[2px]'>Dimensionality:</label>
                <DropdownMenu label_id = {dim_id} value = {props.dim} setValue = {props.setDimensionality} options = {dim_options}/>
            </div>
            
            <InputComponent id = {`${props.id}_text_1`} setFunction={props.setFilters} value = {props.filters} label = {"Filters: "}></InputComponent>
            <InputComponent id = {`${props.id}_text_2`} setFunction={props.setKernel} value = {props.kernel} label = {"Kernel Size: "}></InputComponent>
            <InputComponent id = {`${props.id}_text_3`} setFunction={props.setFilters} value = {props.stride} label = {"Stride Size: "}></InputComponent>
        </div>
    </div>)
}
export default ConvOptions