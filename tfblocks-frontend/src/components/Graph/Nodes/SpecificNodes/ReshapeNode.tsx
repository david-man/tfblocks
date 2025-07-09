import { Position, useNodeConnections, useNodesData, type NodeConnection, type NodeProps} from '@xyflow/react';
import { Handle, useReactFlow} from '@xyflow/react';
import SingularConnection from '../../Handles/SingularConnection';
import { useEffect, useState} from 'react';
import NodeComponent from '../NodeComponent';
import handleController, {type HandleMap} from '../../../../controllers/handleController';
import { useStore } from 'zustand';
import FlattenOptions from '../../NodeOptions/SpecificOptions/FlattenOptions';
import propertyController from '../../../../controllers/propertyController';
import ReshapeOptions from '../../NodeOptions/SpecificOptions/ReshapeOptions';
const ReshapeNode = (props : NodeProps) =>{
    const id = props.id.toString()
    const outgoing_handle_id = `${id}|output_handle_1`
    const incoming_handle_id = `${id}|incoming_handle_1`

    const {set_handle_shape} = handleController()
    const {set_properties} = propertyController()
    const [valid, setValid] = useState(false)
    const [data_shape, set_data_shape] = useState<Array<number> | undefined>(undefined)
    const incomingConnection = useNodeConnections({
        handleType: "target",
        handleId: incoming_handle_id
    })
    const outgoingConnection = useNodeConnections({
        handleType: "source",
        handleId: outgoing_handle_id
    })
    const ParentHandle = incomingConnection[0]?.sourceHandle
    const ChildHandles = (outgoingConnection).filter((connection : NodeConnection) => connection.targetHandle ? true : false)
                                            .map((connection : NodeConnection) => connection.targetHandle)
    const IncomingShape = useStore(handleController, (state : HandleMap) => state.get_handle_shape(ParentHandle))
    useEffect(() => {
        set_handle_shape(outgoing_handle_id, data_shape)
        setValid(false)
        set_properties(id, {"valid": false})
        if(IncomingShape && data_shape && IncomingShape.reduce((prev_val, current_val) => prev_val * current_val, 1) 
            == data_shape.reduce((prev_val, current_val) => prev_val * current_val, 1)){
            setValid(true)
            set_properties(id, {"valid": true, "input_shape": IncomingShape,
                    "parent_handle_id": ParentHandle,
                    "output_handle_id": outgoing_handle_id,
                    "output_shape": data_shape
            })
        }
    }, [IncomingShape, data_shape])


    const optionsMenu = <ReshapeOptions id = {id} data_shape = {data_shape} setDataShape = {set_data_shape} />
    return (
        <>
        <SingularConnection type="target" position={Position.Left} id={incoming_handle_id}/>
        <Handle type="source" position={Position.Right} id={outgoing_handle_id}/>
        <NodeComponent optionsMenu = {optionsMenu} valid_node = {valid} mainText = {"Reshape"} 
        parent_handles = {[ParentHandle]} 
        child_handles = {ChildHandles}{...props}
        bg_color = 'bg-stone-300'/>
        </>
    );
}
export default ReshapeNode