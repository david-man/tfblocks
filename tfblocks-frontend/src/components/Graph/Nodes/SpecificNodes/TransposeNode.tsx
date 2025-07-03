import { Position, useNodeConnections, useNodesData, type NodeConnection, type NodeProps} from '@xyflow/react';
import { Handle, useReactFlow} from '@xyflow/react';
import SingularConnection from '../../Handles/SingularConnection';
import { useEffect, useState} from 'react';
import NodeComponent from '../NodeComponent';
import TransposeOptions from '../../NodeOptions/SpecificOptions/TransposeOptions';
import handleController, {type HandleMap} from '../../../../controllers/handleController';
import { useStore } from 'zustand';
import propertyController from '../../../../controllers/propertyController';
const TransposeNode = (props : NodeProps) =>{
    const id = props.id.toString()
    const outgoing_handle_id = `${id}|output_handle_1`
    const incoming_handle_id = `${id}|incoming_handle_1`

    const {set_handle_shape} = handleController()
    const {set_properties} = propertyController()
    const [valid, setValid] = useState(false)
    const [data_shape, set_data_shape] = useState<Array<number> | undefined>(undefined)
    const [axis_1, setAxis1] = useState(-1)
    const [axis_2, setAxis2] = useState(-2)
    const incomingConnection = useNodeConnections({
        handleType: "target",
        handleId: incoming_handle_id
    })
    const outgoingConnection = useNodeConnections({
        handleType: "source",
        handleId: outgoing_handle_id
    })
    const ParentHandle = incomingConnection[0]?.sourceHandle
    const ChildHandles = outgoingConnection.filter((connection : NodeConnection) => connection.targetHandle ? true : false)
                                            .map((connection : NodeConnection) => connection.targetHandle)
    const IncomingShape = useStore(handleController, (state : HandleMap) => state.get_handle_shape(ParentHandle))
    useEffect(() => {
        set_data_shape(undefined)
        setValid(false)
        set_properties(id, {"valid": false})
        if(IncomingShape && !isNaN(axis_1) && !isNaN(axis_2)){
            let Shape= [...IncomingShape as Array<number>] 
            let a1 = (axis_1 >= 0 ? axis_1 : Shape.length + axis_1)
            let a2 = (axis_2 >= 0 ? axis_2 : Shape.length + axis_2)
            if(a1 >= 0 && a2 >= 0 && a1 < Shape.length && a2 < Shape.length && a1 != a2)
            {
                let temp = Shape[a2]
                Shape[a2] = Shape[a1]
                Shape[a1] = temp
                set_data_shape(Shape)
                setValid(true)
                set_properties(id, {"valid": true, "input_shape": IncomingShape, "axis_1": a1 - IncomingShape.length,
                    "axis_2": a2-IncomingShape.length,
                    "shapelen": Shape.length,
                    "parent_handle_id": ParentHandle,
                                    "output_handle_id": outgoing_handle_id,
                })
            }
        }
    }, [IncomingShape, axis_1, axis_2])

    useEffect(() => {
        set_handle_shape(outgoing_handle_id, data_shape)
    }, [data_shape])

    const optionsMenu = <TransposeOptions id = {id} axis_1 = {axis_1} axis_2 = {axis_2} setAxis1 = {setAxis1} setAxis2 = {setAxis2}/>
    return (
        <>
        <SingularConnection type="target" position={Position.Left} id={incoming_handle_id}/>
        <Handle type="source" position={Position.Right} id={outgoing_handle_id}/>
        <NodeComponent optionsMenu = {optionsMenu} valid_node = {valid} mainText = {"Transpose"} 
        parent_handles = {[ParentHandle]}
        child_handles = {ChildHandles} {...props}
        bg_color = 'bg-stone-300'/>
        </>
    );
}
export default TransposeNode