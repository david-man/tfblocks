import { Handle, Position, useNodeConnections, useReactFlow, type NodeConnection, type NodeProps } from '@xyflow/react';
import { useEffect} from 'react';
import dependencyController from '../../../controllers/dependencyController';
import handleController from '../../../controllers/handleController';

const InputLayerNode = (props : NodeProps) =>{
    const data_shape = [10, 5]
    const outgoing_handle_id = `in|output_handle`
    const {add_network_head, remove_network_head, remove_id, set_dependencies, set_children} = dependencyController()
    const {remove_handle, set_handle_shape} = handleController()
    const id = props.id
    const {updateNodeData} = useReactFlow()

    const outgoingConnection = useNodeConnections({
            handleType: "source",
            handleId: outgoing_handle_id
        })
    useEffect(() => {
        updateNodeData(id, {data_shape: data_shape, neurons: 0})
        set_dependencies(id, [])
        set_handle_shape(outgoing_handle_id, data_shape)
        add_network_head('in')
        return (() => {
            remove_network_head('in')
            remove_id(id)
            remove_handle(id)
        })
    }, [])
    useEffect(() => {
        let children : String []= []
        outgoingConnection.map((connection : NodeConnection) => {
            if(connection?.targetHandle){
                children.push(connection.targetHandle.split("|")[0])
            }
        })
        set_children('in', children)
    }, [outgoingConnection])
    return (
        <>
        <Handle type="source" position={Position.Right} id={outgoing_handle_id}/>
        <div className = "w-[120px] h-[100px] border-2 rounded-xs border-black flex flex-col justify-center items-center">
            <p className = "text-center">INPUT LAYER</p>
            <p className = "text-center">[{data_shape.toString()}]</p>
        </div>
        </>
    );
}
export default InputLayerNode
