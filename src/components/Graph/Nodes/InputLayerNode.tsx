import { Handle, Position, useReactFlow, type NodeProps } from '@xyflow/react';
import { useEffect} from 'react';
import dependencyController from '../../../controllers/dependencyController';
import handleController from '../../../controllers/handleController';

const InputLayerNode = (props : NodeProps) =>{
    const data_shape = [1, 10, 5]
    const {remove_id, set_dependencies} = dependencyController()
    const {remove_handle, set_handle_shape} = handleController()
    const id = props.id
    const {updateNodeData} = useReactFlow()
    useEffect(() => {
        updateNodeData(id, {data_shape: data_shape, neurons: 0})
        set_dependencies(id, [])
        set_handle_shape(`node_${id}_output_handle`, data_shape)
        return (() => {
            remove_id(id)
            remove_handle(id)
        })
    }, [])
    return (
        <>
        <Handle type="source" position={Position.Right} id={`node_${id}_output_handle`}/>
        <div className = "w-[120px] h-[100px] border-2 rounded-xs border-black flex flex-col justify-center items-center">
            <p className = "text-center">INPUT LAYER</p>
            <p className = "text-center">[{data_shape.toString()}]</p>
        </div>
        </>
    );
}
export default InputLayerNode
