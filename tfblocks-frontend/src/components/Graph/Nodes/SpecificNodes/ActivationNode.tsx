import { Position, useNodeConnections , type NodeConnection, type NodeProps} from '@xyflow/react';
import { Handle } from '@xyflow/react';
import SingularConnection from '../../Handles/SingularConnection';
import { useEffect, useState } from 'react';
import NodeComponent from '../NodeComponent';
import ActivationOptions from '../../NodeOptions/SpecificOptions/ActivationOptions';
import handleController, {type HandleMap} from '../../../../controllers/handleController';
import { useStore } from 'zustand';
import propertyController from "../../../../controllers/propertyController"


const ActivationNode = (props : NodeProps) =>{
    const id = props.id.toString()
    const outgoing_handle_id = `${id}|output_handle_1`
    const incoming_handle_id = `${id}|incoming_handle_1`
    const {set_handle_shape} = handleController()
    const {set_properties} = propertyController()
    

    const [valid, setValid] = useState(false)
    const [activation, setActivation] = useState(undefined)
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
    const ChildHandles = outgoingConnection.filter((connection : NodeConnection) => connection.targetHandle ? true : false)
                                            .map((connection : NodeConnection) => connection.targetHandle)
    const IncomingShape = useStore(handleController, (state : HandleMap) => state.get_handle_shape(ParentHandle))

    useEffect(() => {
        set_data_shape(undefined)
        setValid(false)
        set_properties(id, {"valid": false})
        if(IncomingShape && activation){
            set_data_shape([...IncomingShape])
            set_properties(id, {"valid": true, "input_shape": IncomingShape, 
                "parent_handle_id": ParentHandle,
                "output_handle_id": outgoing_handle_id, 
                "activation": activation})
            setValid(true)
        }
    }, [IncomingShape, activation])

    useEffect(() => {
        set_handle_shape(outgoing_handle_id, data_shape)
    }, [data_shape, activation])

    const optionsMenu = <ActivationOptions id = {props.id} set_activation = {setActivation} activation = {activation}/>

    return (
        <div>
            <SingularConnection type="target" position={Position.Left} id={incoming_handle_id}></SingularConnection>
            <Handle type="source" position={Position.Right} id={outgoing_handle_id}/>
            <NodeComponent valid_node = {valid} optionsMenu = {optionsMenu} mainText = {"Activation"} 
            parent_handles = {[ParentHandle]}
            child_handles = {ChildHandles}
            width = {"120px"} {...props}
            bg_color = 'bg-blue-500'/>
        </div>
    );
}
export default ActivationNode
