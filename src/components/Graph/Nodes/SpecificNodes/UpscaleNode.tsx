import { Position, useNodeConnections, useNodesData, type NodeConnection, type NodeProps} from '@xyflow/react';
import { Handle, useReactFlow} from '@xyflow/react';
import SingularConnection from '../../Handles/SingularConnection';
import { useEffect, useState} from 'react';
import NodeComponent from '../NodeComponent';
import handleController, {type HandleMap} from '../../../../controllers/handleController';
import { useStore } from 'zustand';
import UpscaleOptions from '../../NodeOptions/SpecificOptions/UpscaleOptions';
import propertyController from '../../../../controllers/propertyController';
const UpscaleNode = (props : NodeProps) =>{
    const id = props.id.toString()
    const outgoing_handle_id = `${id}|output_handle_1`
    const incoming_handle_id = `${id}|incoming_handle_1`

    const {set_handle_shape} = handleController()
    const {set_properties} = propertyController()
    const [valid, setValid] = useState(false)
    const [data_shape, set_data_shape] = useState<Array<number> | undefined>(undefined)
    const [axis, setAxis] = useState(NaN)
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
        set_data_shape(undefined)
        setValid(false)
        set_properties(id, {"valid": false})
        if(IncomingShape && axis){
            let new_shape = [...IncomingShape]
            let a1 = (axis >= 0 ? axis : IncomingShape.length + 1 + axis)
            if(a1 >= 0 && a1 <= IncomingShape.length)
            {
                new_shape.splice(a1, 0, 1)
                set_data_shape(new_shape)
                setValid(true)
                set_properties(id, {"valid": true, "input_shape": IncomingShape, "axis": a1 - (IncomingShape.length + 1),
                    "parent_handle_id": ParentHandle,
                                    "output_handle_id": outgoing_handle_id,
                })
            }
        }
    }, [IncomingShape, axis])

    useEffect(() => {
        set_handle_shape(outgoing_handle_id, data_shape)
    }, [data_shape])

    const optionsMenu = <UpscaleOptions id = {id} axis = {axis} setAxis = {setAxis} />
    return (
        <>
        <SingularConnection type="target" position={Position.Left} id={incoming_handle_id}/>
        <Handle type="source" position={Position.Right} id={outgoing_handle_id}/>
        <NodeComponent optionsMenu = {optionsMenu} valid_node = {valid} mainText = {"Upscale"} 
        parent_handles = {[ParentHandle]} 
        child_handles = {ChildHandles}{...props}/>
        </>
    );
}
export default UpscaleNode