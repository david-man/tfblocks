import InputComponent from "../NumericalInputComponent"

const PoolingOptions = (props : any) => 
{
    const pooling_id = `${props.id}_select_pool`
    const type_id = `${props.id}_select_type`
    const padding_id = `${props.id}_select_padding`
    const handlePoolChange  = (event : any) => {
        const val = event.target.value;
        props.set_pool(val ? val : undefined)
    }
    const handleDimChange  = (event : any) => {
        const val = event.target.value;
        props.set_dim(val ? val : undefined)
    }
    const handlePaddingChange  = (event : any) => {
        const val = event.target.value;
        props.set_padding(val ? val : undefined)
    }
    return (
    <div className = "w-[120px]">
        <hr className = "w-full"/>
        <div className = "flex flex-col h-fit w-full justify-center items-center p-2">
            <label htmlFor = {pooling_id}>Type:</label>
            <div className = "w-4/5 border-1 border-black text-[0.5rem] flex justify-center items-center" >
                <select id = {pooling_id} value = {props.pool} onChange = {handlePoolChange} >
                    <option value = "maxpool">MaxPooling</option>
                    <option value = "averagepool">AveragePooling</option>
                </select>
            </div>
            <label htmlFor = {type_id}>Dimensionality:</label>
            <div className = "w-4/5 border-1 border-black text-[0.5rem] flex justify-center items-center" >
                <select id = {type_id} value = {props.dim} onChange = {handleDimChange}>
                    <option value = "">--Choose--</option>
                    <option value = "1d">1D</option>
                    <option value = "2d">2D</option>
                    <option value = "3d">3D</option>
                </select>
            </div>
            <label htmlFor = {padding_id}>Padding:</label>
            <div className = "w-4/5 border-1 border-black text-[0.5rem] flex justify-center items-center" >
                <select id = {padding_id} value = {props.padding} onChange = {handlePaddingChange}>
                    <option value = "valid">Valid</option>
                    <option value = "same">Same</option>
                </select>
            </div>
            <InputComponent id = {`${props.id}_text`} setFunction = {props.set_pool_size} value = {props.pool_size} label = {"Pool Size: "}/>
            <InputComponent id = {`${props.id}_text_1`} setFunction = {props.set_stride_size} value = {props.stride_size} label = {"Stride Size: "}/>
        </div>
    </div>)
}
export default PoolingOptions