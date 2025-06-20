import { Position, useNodeConnections, useNodesData, type NodeConnection, type NodeProps} from '@xyflow/react';
import { Handle, useReactFlow} from '@xyflow/react';
import SingularConnection from '../Handles/SingularConnection';
import { useEffect, useState } from 'react';
import NodeComponent from './NodeComponent';
import handleController, {type HandleMap} from '../../../controllers/handleController';
import RecurrentOptions from '../NodeOptions/SpecificOptions/RecurrentOptions';
import { useShallow } from 'zustand/shallow';
import dependencyController from '../../../controllers/dependencyController';
const RecurrentNode = (props : NodeProps) =>{
    const id = props.id.toString()
    const outgoing_hidden_input_handle_id = `rec_hidden_${id}|in_handle`//handle gives the features at a given timestep
    const outgoing_hidden_state_handle_id = `rec_hidden_${id}|output_handle`//handle gives the last hidden state
    const incoming_hidden_handle_id = `rec_hidden_${id}|input_handle`//handle that takes in the new hidden state
    const incoming_handle_id = `rec_external_${id}|input_handle`//handle that takes in all the inputs coming in
    const outgoing_handle_id = `rec_external_${id}|output_handle`//output of the entire RNN

    const {set_handle_shape} = handleController()

    const [hiddenUnits, setHiddenUnits] = useState(NaN)
    const [outputUnits, setOutputUnits] = useState(NaN)

    const [valid, setValid] = useState(false)
    const [hidden_input_shape, set_hidden_input_shape] = useState<Array<number> | undefined>(undefined)//data shape of each input([B, T, F] => [B, F])
    const [hidden_state_shape, set_hidden_state_shape] = useState<Array<number> | undefined>(undefined)//data shape of the hidden state([B, T, F] => [B, H])
    const [outgoing_state_shape, set_outgoing_state_shape] = useState<Array<number> | undefined>(undefined)//data shape that will leave([B, T, F] => [B, T, H])
    const {set_dependencies, set_children, add_network_head, remove_id} = dependencyController()
    const incomingHiddenConnection = useNodeConnections({
        handleType: "target",
        handleId: incoming_hidden_handle_id
    })
    const incomingExternalConnection = useNodeConnections({
        handleType: "target",
        handleId: incoming_handle_id
    })
    const outgoingHiddenStateConnection = useNodeConnections({
        handleType: "source",
        handleId: outgoing_hidden_state_handle_id
    })
    const outgoingHiddenInputConnection = useNodeConnections({
        handleType: "source",
        handleId: outgoing_hidden_input_handle_id
    })
    const outgoingExternalConnection = useNodeConnections({
        handleType: "source",
        handleId: outgoing_handle_id
    })
    const ExternalParentHandle = incomingExternalConnection[0]?.sourceHandle
    const HiddenParentHandle = incomingHiddenConnection[0]?.sourceHandle
    //calculate dependents as if there were 2 different nodes
    useEffect(() => {
        set_dependencies(`rec_external_${id}`, (ExternalParentHandle ? [ExternalParentHandle.split("|")[0]] : []))
    }, [ExternalParentHandle])
    useEffect(() => {
        set_dependencies(`rec_hidden_${id}`, (HiddenParentHandle ? [HiddenParentHandle.split("|")[0]] : []))
    }, [HiddenParentHandle])

    //calculate children as if there were 2 different nodes
    useEffect(() => {
        let children : String[] = []
        outgoingExternalConnection.map((connection : NodeConnection) => 
            (connection?.targetHandle ? children.push(connection?.targetHandle.split("|")[0]) : undefined))
        set_children(`rec_external_${id}`, children)
    }, [outgoingExternalConnection])
    useEffect(() => {
        let children : String[] = []
        outgoingHiddenStateConnection.map((connection : NodeConnection) => 
            (connection?.targetHandle ? children.push(connection?.targetHandle.split("|")[0]) : undefined))
        outgoingHiddenInputConnection.map((connection : NodeConnection) => 
            (connection?.targetHandle ? children.push(connection?.targetHandle.split("|")[0]) : undefined))
        set_children(`rec_hidden_${id}`, children)
    }, [outgoingHiddenStateConnection, outgoingHiddenInputConnection])
    useEffect(() => {
        add_network_head(`rec_hidden_${id}`)
        return (() => {
            remove_id(`rec_hidden_${id}`)
            remove_id(`rec_external_${id}`)
        })
    }, [])
    const IncomingHiddenShape = handleController(useShallow((state : HandleMap) => state.get_handle_shape(HiddenParentHandle)))
    const IncomingParentShape = handleController(useShallow((state : HandleMap) => state.get_handle_shape(ExternalParentHandle)))

    useEffect(() => {
        set_hidden_input_shape(undefined)
        set_hidden_state_shape(undefined)
        set_outgoing_state_shape(undefined)
        setValid(false)

        if(IncomingParentShape && IncomingParentShape.length === 2){
            set_hidden_input_shape([IncomingParentShape[1]])
            if(outputUnits){
                set_outgoing_state_shape([IncomingParentShape[0], outputUnits])
            }
            if(hiddenUnits){
                set_hidden_state_shape([hiddenUnits])
            }

            if(outputUnits && 
                hiddenUnits && 
                IncomingHiddenShape && 
                IncomingHiddenShape.length === 1 &&
                hiddenUnits === IncomingHiddenShape[0])
                {
                    setValid(true)
                }
        }
    }, [IncomingHiddenShape, IncomingParentShape, hiddenUnits, outputUnits])

    useEffect(() => {
        set_handle_shape(outgoing_handle_id, outgoing_state_shape)
        set_handle_shape(outgoing_hidden_state_handle_id, hidden_state_shape)
        set_handle_shape(outgoing_hidden_input_handle_id, hidden_input_shape)
    }, [outgoing_state_shape, hidden_state_shape, hidden_input_shape])

    const optionsMenu = <RecurrentOptions setHidden = {setHiddenUnits} hiddenUnits = {hiddenUnits} setOutput = {setOutputUnits} outputUnits = {outputUnits}/>
    return (
        <>
            <SingularConnection type="target" position={Position.Top} id={incoming_hidden_handle_id} style = {{left: "25%"}}/>
            <Handle type="source" position={Position.Right} id={outgoing_hidden_state_handle_id} style = {{top: "25%"}}/>
            <Handle type="source" position={Position.Right} id={outgoing_hidden_input_handle_id} style = {{top: "75%"}}/>
            <SingularConnection type="target" position={Position.Left} id={incoming_handle_id}/>
            <Handle type="source" position={Position.Bottom} id={outgoing_handle_id} style = {{left: "75%"}}/>
            <NodeComponent optionsMenu = {optionsMenu} valid_node = {valid} mainText = {"Recurrent Head"} {...props}/>
        </>
    );
}
export default RecurrentNode
