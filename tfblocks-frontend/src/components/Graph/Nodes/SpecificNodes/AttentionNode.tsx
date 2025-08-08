import { Position, useNodeConnections , type NodeConnection, type NodeProps} from '@xyflow/react';
import { Handle } from '@xyflow/react';
import SingularConnection from '../../Handles/SingularConnection';
import { useEffect, useState } from 'react';
import NodeComponent from '../NodeComponent';
import handleController, {type HandleMap} from '../../../../controllers/handleController';
import { useStore } from 'zustand';
import propertyController from '../../../../controllers/propertyController';
import AttentionOptions from '../../NodeOptions/SpecificOptions/AttentionOptions';
const AttentionNode = (props : NodeProps) =>{
    const id = props.id.toString()
    const outgoing_handle_id = `${id}|output_handle_1`
    const incoming_handle_id_Q = `${id}|incoming_handle_1`
    const incoming_handle_id_KV = `${id}|incoming_handle_2`

    const {set_handle_shape} = handleController()
    const {set_properties} = propertyController()
    const [neurons, setNeurons] = useState(NaN)
    const [heads, setHeads] = useState(1)

    const [valid, setValid] = useState(false)
    const [data_shape, set_data_shape] = useState<Array<number> | undefined>(undefined)
    const incomingConnectionA = useNodeConnections({
        handleType: "target",
        handleId: incoming_handle_id_Q
    })
    const incomingConnectionB = useNodeConnections({
        handleType: "target",
        handleId: incoming_handle_id_KV
    })
    const outgoingConnection = useNodeConnections({
        handleType: "source",
        handleId: outgoing_handle_id
    })
    const ChildHandles = outgoingConnection.filter((connection : NodeConnection) => connection.targetHandle ? true : false)
                                            .map((connection : NodeConnection) => connection.targetHandle)
    const ParentAHandle = incomingConnectionA[0]?.sourceHandle
    const ParentBHandle = incomingConnectionB[0]?.sourceHandle
    const IncomingShapeA = useStore(handleController, (state : HandleMap) => state.get_handle_shape(ParentAHandle))
    const IncomingShapeB = useStore(handleController, (state : HandleMap) => state.get_handle_shape(ParentBHandle))

    useEffect(() => {
        set_data_shape(undefined)
        setValid(false)
        setNeurons(NaN)
        set_properties(id, {"valid": false})
        if(ParentAHandle && ParentBHandle && heads){
            if(IncomingShapeA && IncomingShapeB){
                if(IncomingShapeA.length == 2 && IncomingShapeB.length == 2){
                    let dim_Q = IncomingShapeA[0]
                    //let dim_KV = IncomingShapeB[0]
                    if(IncomingShapeA[1] == IncomingShapeB[1]){
                        let features = IncomingShapeA[1]
                        if(features % heads == 0){//even divisibility between heads
                            setValid(true)
                            set_data_shape([dim_Q, features])
                            setNeurons(4 * features * (features + 1))
                            set_properties(id, {"valid": true, 
                                "input_shape_1": IncomingShapeA, 
                                "input_shape_2": IncomingShapeB,
                                "parent_handle_id_1": ParentAHandle,
                                "parent_handle_id_2": ParentBHandle,
                                "features": features,
                                "heads": heads,
                                "output_handle_id": outgoing_handle_id,
                            })
                        }
                    }
                }
            }
        }
    }, [IncomingShapeA, IncomingShapeB, heads])

    useEffect(() => {
        set_handle_shape(outgoing_handle_id, data_shape)
    }, [data_shape])

    const optionsMenu = <AttentionOptions heads = {heads} setHeads = {setHeads}/>
    return (
        <>
            <SingularConnection type="target" position={Position.Left} id={incoming_handle_id_Q} style = {{top: "25%"}}/>
            <SingularConnection type="target" position={Position.Left} id={incoming_handle_id_KV} style = {{top: "75%"}}/>
            <Handle type="source" position={Position.Right} id={outgoing_handle_id}/>
            <NodeComponent optionsMenu = {optionsMenu} neurons = {neurons} valid_node = {valid} mainText = {"Attention"} 
            parent_handles = {[ParentAHandle, ParentBHandle]}
            child_handles = {ChildHandles}
            bg_color = 'bg-lime-400'

             {...props}/>
        </>
    );
}
export default AttentionNode
