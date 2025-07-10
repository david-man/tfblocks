import { Position, useNodeConnections, useNodesData, type NodeConnection, type NodeProps} from '@xyflow/react';
import { Handle, useReactFlow} from '@xyflow/react';
import SingularConnection from '../../Handles/SingularConnection';
import { useEffect, useState } from 'react';
import NodeComponent from '../NodeComponent';
import handleController, {type HandleMap} from '../../../../controllers/handleController';
import { useStore } from 'zustand';
import propertyController from '../../../../controllers/propertyController';
const DotProductNode = (props : NodeProps) =>{
    const id = props.id.toString()
    const outgoing_handle_id = `${id}|output_handle_1`
    const incoming_handle_id_A = `${id}|incoming_handle_1`
    const incoming_handle_id_B = `${id}|incoming_handle_2`

    const {set_handle_shape} = handleController()
    const {set_properties} = propertyController()

    const [valid, setValid] = useState(false)
    const [data_shape, set_data_shape] = useState<Array<number> | undefined>(undefined)
    const incomingConnectionA = useNodeConnections({
        handleType: "target",
        handleId: incoming_handle_id_A
    })
    const incomingConnectionB = useNodeConnections({
        handleType: "target",
        handleId: incoming_handle_id_B
    })
    const outgoingConnection = useNodeConnections({
        handleType: "source",
        handleId: outgoing_handle_id
    })
    const ParentAHandle = incomingConnectionA[0]?.sourceHandle
    const ParentBHandle = incomingConnectionB[0]?.sourceHandle
    const ChildHandles = outgoingConnection.filter((connection : NodeConnection) => connection.targetHandle ? true : false)
                                            .map((connection : NodeConnection) => connection.targetHandle)
    const IncomingShapeA = useStore(handleController, (state : HandleMap) => state.get_handle_shape(ParentAHandle))
    const IncomingShapeB = useStore(handleController, (state : HandleMap) => state.get_handle_shape(ParentBHandle))

    useEffect(() => {
        set_data_shape(undefined)
        setValid(false)
        set_properties(id, {"valid": false})
        if(IncomingShapeA && IncomingShapeB){
            if(IncomingShapeA.length === IncomingShapeB.length && 
                IncomingShapeA.length == 2 && 
                IncomingShapeA[IncomingShapeA.length - 1] === IncomingShapeB[IncomingShapeB.length - 2]){
                set_data_shape([...IncomingShapeA.slice(0, IncomingShapeA.length - 2), 
                    IncomingShapeA[IncomingShapeA.length - 2], IncomingShapeB[IncomingShapeB.length - 1]])
                setValid(true)
                set_properties(id, {"valid": true, "input_shape_1": IncomingShapeA, "input_shape_2": IncomingShapeB,
                    "parent_handle_id_1": ParentAHandle,
                    "parent_handle_id_2": ParentBHandle,
                    "output_handle_id": outgoing_handle_id,
                })
            }
            else if(IncomingShapeA.length === 1 && IncomingShapeB.length === 1 &&
                IncomingShapeA[0] === IncomingShapeB[0]
            )
            {
                set_data_shape([1])
                setValid(true)
                set_properties(id, {"valid": true, "input_shape_1": IncomingShapeA, "input_shape_2": IncomingShapeB,
                    "parent_handle_id_1": ParentAHandle,
                    "parent_handle_id_2": ParentBHandle,
                    "output_handle_id": outgoing_handle_id,
                })
            }
        }
    }, [IncomingShapeA, IncomingShapeB])

    useEffect(() => {
        set_handle_shape(outgoing_handle_id, data_shape)
    }, [data_shape])
    return (
        <>
            <SingularConnection type="target" position={Position.Left} id={incoming_handle_id_A} style = {{top: "25%"}}/>
            <SingularConnection type="target" position={Position.Left} id={incoming_handle_id_B} style = {{top: "75%"}}/>
            <Handle type="source" position={Position.Right} id={outgoing_handle_id}/>
            <NodeComponent valid_node = {valid} mainText = {"Dot"} parent_handles = {[ParentAHandle, ParentBHandle]}
            child_handles = {ChildHandles} {...props}
            bg_color = 'bg-yellow-300'/>
        </>
    );
}
export default DotProductNode
