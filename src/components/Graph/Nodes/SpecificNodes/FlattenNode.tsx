import { Position, useNodeConnections, useNodesData, type NodeConnection, type NodeProps} from '@xyflow/react';
import { Handle, useReactFlow} from '@xyflow/react';
import SingularConnection from '../../Handles/SingularConnection';
import { useEffect, useState} from 'react';
import NodeComponent from '../NodeComponent';
import handleController, {type HandleMap} from '../../../../controllers/handleController';
import { useStore } from 'zustand';
import FlattenOptions from '../../NodeOptions/SpecificOptions/FlattenOptions';
const FlattenNode = (props : NodeProps) =>{
    const id = props.id.toString()
    const outgoing_handle_id_1 = `${id}|output_handle_1`
    const incoming_handle_id = `${id}|incoming_handle_1`

    const {set_handle_shape} = handleController()
    const [valid, setValid] = useState(false)
    const [data_shape, set_data_shape] = useState<Array<number> | undefined>(undefined)
    const [axis, setAxis] = useState(NaN)
    const incomingConnection = useNodeConnections({
        handleType: "target",
        handleId: incoming_handle_id
    })
    const outgoingConnection1 = useNodeConnections({
        handleType: "source",
        handleId: outgoing_handle_id_1
    })
    const ParentHandle = incomingConnection[0]?.sourceHandle
    const ChildHandles = (outgoingConnection1).filter((connection : NodeConnection) => connection.targetHandle ? true : false)
                                            .map((connection : NodeConnection) => connection.targetHandle)
    const IncomingShape = useStore(handleController, (state : HandleMap) => state.get_handle_shape(ParentHandle))
    useEffect(() => {
        set_data_shape(undefined)
        setValid(false)
        if(IncomingShape && IncomingShape.length > 1){
            let new_shape = [...IncomingShape]
            if(isNaN(axis)){//full flatten
                let product = 1
                new_shape.map((dim : number) => product *= dim)
                set_data_shape([product])
                setValid(true)
            }
            else{//flatten one dimension down
                let a1 = (axis >= 0 ? axis : IncomingShape.length + axis)
                if(a1 >= 0 && a1 < IncomingShape.length - 1)
                {
                    let current = new_shape[a1]
                    new_shape.splice(a1, 1)
                    new_shape[a1] = new_shape[a1] * current
                    set_data_shape(new_shape)
                    setValid(true)
                }
            }
            
        }
    }, [IncomingShape, axis])

    useEffect(() => {
        set_handle_shape(outgoing_handle_id_1, data_shape)
    }, [data_shape])

    const optionsMenu = <FlattenOptions id = {id} axis = {axis} setAxis = {setAxis} />
    return (
        <>
        <SingularConnection type="target" position={Position.Left} id={incoming_handle_id}/>
        <Handle type="source" position={Position.Right} id={outgoing_handle_id_1}/>
        <NodeComponent optionsMenu = {optionsMenu} valid_node = {valid} mainText = {"Flatten"} 
        parent_handles = {[ParentHandle]} 
        child_handles = {ChildHandles}{...props}/>
        </>
    );
}
export default FlattenNode