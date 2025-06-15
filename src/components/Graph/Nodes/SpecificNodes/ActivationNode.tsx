import { Position, useNodeConnections, useNodesData, type NodeProps} from '@xyflow/react';
import { Handle, useReactFlow} from '@xyflow/react';
import SingularConnection from '../../Handles/SingularConnection';
import { useEffect, useState } from 'react';
import NodeComponent from '../NodeComponent';
import ActivationOptions from '../../NodeOptions/SpecificOptions/ActivationOptions';
import handleController, {type HandleMap} from '../../../../controllers/handleController';
import { useStore } from 'zustand';


const ActivationNode = (props : NodeProps) =>{
    const id = props.id.toString()
    const outgoing_handle_id = `node_${id}_output_handle_1`
    const incoming_handle_id = `node_${id}_incoming_handle_1`
    const {set_handle_shape} = handleController()

    const [valid, setValid] = useState(false)
    const [activation, setActivation] = useState(undefined)
    const [data_shape, set_data_shape] = useState<Array<number> | undefined>(undefined)
    const {updateNodeData} = useReactFlow()
    const incomingConnection = useNodeConnections({
        handleType: "target",
        handleId: incoming_handle_id
    })
    const ParentID = incomingConnection[0]?.source
    const ParentHandle = incomingConnection[0]?.sourceHandle
    const IncomingShape = useStore(handleController, (state : HandleMap) => state.get_handle_shape(ParentHandle))

    useEffect(() => {
        set_data_shape(undefined)
        setValid(false)
        if(IncomingShape && activation){
            set_data_shape([...IncomingShape])
            setValid(true)
        }
    }, [IncomingShape, activation])

    useEffect(() => {
        updateNodeData(id, {data_shape: data_shape, activation : activation})
        set_handle_shape(outgoing_handle_id, data_shape)
    }, [data_shape, activation])

    const optionsMenu = <ActivationOptions id = {props.id} set_activation = {setActivation} activation = {activation}/>

    return (
        <div className = "w-[120px]">
            <SingularConnection type="target" position={Position.Left} id={incoming_handle_id}></SingularConnection>
            <Handle type="source" position={Position.Right} id={outgoing_handle_id}/>
            <NodeComponent valid_node = {valid} optionsMenu = {optionsMenu} mainText = {"Activation"} parents = {[ParentID]} 
            width = {"120px"} {...props}/>
        </div>
    );
}
export default ActivationNode
