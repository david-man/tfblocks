import { Handle, Position, useReactFlow, type NodeProps } from '@xyflow/react';
import { useEffect} from 'react';
import dependencyController from '../../../controllers/dependencyController';

const InputLayerNode = (props : NodeProps) =>{
    const data_shape = [1, 10, 5]
    const {remove_id, set_dependencies} = dependencyController()
    const id = props.id
    const {updateNodeData} = useReactFlow()
    useEffect(() => {
        updateNodeData(props.id, {data_shape: data_shape, neurons: 0})
        set_dependencies(props.id, [])
        return (() => {remove_id(props.id)})
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
