import { Position, useNodeConnections, useNodesData, type NodeProps} from '@xyflow/react';
import { Handle, useReactFlow} from '@xyflow/react';
import SingularConnection from '../../Handles/SingularConnection';
import { useEffect, useState } from 'react';
import NodeComponent from '../NodeComponent';
import handleController, {type HandleMap} from '../../../../controllers/handleController';
import { useStore } from 'zustand';
const AddNode = (props : NodeProps) =>{
    const id = props.id.toString()
    const outgoing_handle_id = `node_${id}_output_handle_1`
    const incoming_handle_id_A = `node_${id}_incoming_handle_1`
    const incoming_handle_id_B = `node_${id}_incoming_handle_2`

    const {set_handle_shape} = handleController()

    const [valid, setValid] = useState(false)
    const [data_shape, set_data_shape] = useState<Array<number> | undefined>(undefined)
    const {updateNodeData} = useReactFlow()
    const incomingConnectionA = useNodeConnections({
        handleType: "target",
        handleId: incoming_handle_id_A
    })
    const incomingConnectionB = useNodeConnections({
        handleType: "target",
        handleId: incoming_handle_id_B
    })
    const ParentAID = incomingConnectionA[0]?.source
    const ParentBID = incomingConnectionB[0]?.source
    const ParentAHandle = incomingConnectionA[0]?.sourceHandle
    const ParentBHandle = incomingConnectionB[0]?.sourceHandle
    const IncomingShapeA = useStore(handleController, (state : HandleMap) => state.get_handle_shape(ParentAHandle))
    const IncomingShapeB = useStore(handleController, (state : HandleMap) => state.get_handle_shape(ParentBHandle))

    useEffect(() => {
        set_data_shape(undefined)
        setValid(false)
        if(ParentAHandle && ParentBHandle){
            if(IncomingShapeA && IncomingShapeB){
                const equal = JSON.stringify(IncomingShapeA) === JSON.stringify(IncomingShapeB);
                setValid(equal)
                set_data_shape(equal ? IncomingShapeA : undefined)
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
            <NodeComponent valid_node = {valid} mainText = {"Add"} parents = {[ParentAID, ParentBID]} {...props}/>
        </>
    );
}
export default AddNode
