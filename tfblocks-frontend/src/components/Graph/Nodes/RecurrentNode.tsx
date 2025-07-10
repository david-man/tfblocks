import { Position, useNodeConnections, type NodeConnection, type NodeProps} from '@xyflow/react';
import { Handle} from '@xyflow/react';
import SingularConnection from '../Handles/SingularConnection';
import { useEffect,  useState } from 'react';
import NodeComponent from './NodeComponent';
import handleController, {type HandleMap} from '../../../controllers/handleController';
import RecurrentOptions from '../NodeOptions/SpecificOptions/RecurrentOptions';
import { useShallow } from 'zustand/shallow';
import dependencyController from '../../../controllers/dependencyController';
import propertyController from "../../../controllers/propertyController"
const RecurrentNode = (props : NodeProps) =>{
    //special component that deals specifically with Recurrent Nodes
    const id = props.id.toString()
    const outgoing_timestep_input_handle_id = `rec_hidden_${id}|timestep_handle`//handle gives the features at a given timestep
    const outgoing_hidden_state_handle_id = `rec_hidden_${id}|output_handle`//handle gives the last hidden state
    const incoming_hidden_handle_id = `rec_hidden_${id}|state_handle`//handle that takes in the new hidden state
    const incoming_handle_id = `rec_external_${id}|input_handle`//handle that takes in all the inputs coming in
    const outgoing_handle_id = `rec_external_${id}|output_handle`//output of the entire RNN

    const {set_handle_shape} = handleController()
    const {set_properties, remove_properties} = propertyController()

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
    const outgoingTimestepInputConnection = useNodeConnections({
        handleType: "source",
        handleId: outgoing_timestep_input_handle_id
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
        outgoingTimestepInputConnection.map((connection : NodeConnection) => 
            (connection?.targetHandle ? children.push(connection?.targetHandle.split("|")[0]) : undefined))
        set_children(`rec_hidden_${id}`, children)
    }, [outgoingHiddenStateConnection, outgoingTimestepInputConnection])
    useEffect(() => {
        add_network_head(`rec_hidden_${id}`)
        return (() => {
            remove_id(`rec_hidden_${id}`)
            remove_id(`rec_external_${id}`)
            remove_properties(`rec_hidden_${id}`)
            remove_properties(`rec_external_${id}`)
        })
    }, [])
    const IncomingHiddenShape = handleController(useShallow((state : HandleMap) => state.get_handle_shape(HiddenParentHandle)))
    const IncomingParentShape = handleController(useShallow((state : HandleMap) => state.get_handle_shape(ExternalParentHandle)))

    useEffect(() => {
        set_hidden_input_shape(undefined)
        set_hidden_state_shape(undefined)
        set_outgoing_state_shape(undefined)
        setValid(false)
        set_properties(id, {"valid": false})
        if(outputUnits){
            set_outgoing_state_shape([outputUnits])
            set_hidden_state_shape([outputUnits])
        }
        if(IncomingParentShape && IncomingParentShape.length === 2){
            set_hidden_input_shape([IncomingParentShape[1]])
            if(outputUnits && 
                IncomingHiddenShape && 
                IncomingHiddenShape.length === 1 &&
                outputUnits === IncomingHiddenShape[0])
                {
                    console.log(IncomingHiddenShape)
                    set_properties(id, {"valid": true, 
                        "input_shape": IncomingParentShape,
                        "hidden_input_shape": IncomingParentShape[1], 
                        "hidden_state_shape": outputUnits,
                        "outgoing_state_shape": [IncomingParentShape[0], outputUnits],
                        "external_parent_handle_id": ExternalParentHandle,
                        "hidden_parent_handle_id": HiddenParentHandle,
                        "external_output_handle_id": outgoing_handle_id,
                        "hidden_state_output_handle_id": outgoing_hidden_state_handle_id,
                        "timestep_state_output_handle_id": outgoing_timestep_input_handle_id})
                    setValid(true)
                }
        }
    }, [IncomingHiddenShape, IncomingParentShape, outputUnits])

    useEffect(() => {
        set_handle_shape(outgoing_handle_id, outgoing_state_shape)
        set_handle_shape(outgoing_hidden_state_handle_id, hidden_state_shape)
        set_handle_shape(outgoing_timestep_input_handle_id, hidden_input_shape)
    }, [outgoing_state_shape, hidden_state_shape, hidden_input_shape])

    const optionsMenu = <RecurrentOptions setOutput = {setOutputUnits} outputUnits = {outputUnits}/>
    return (
        <>
            <SingularConnection type="target" position={Position.Top} id={incoming_hidden_handle_id} style = {{left: "90%"}}/>
            <Handle type="source" position={Position.Top} id={outgoing_hidden_state_handle_id} style = {{left: "15%"}}/>
            <Handle type="source" position={Position.Top} id={outgoing_timestep_input_handle_id} style = {{left: "30%"}}/>
            <SingularConnection type="target" position={Position.Left} id={incoming_handle_id}/>
            <Handle type="source" position={Position.Right} id={outgoing_handle_id}/>
            <NodeComponent optionsMenu = {optionsMenu} valid_node = {valid} mainText = {"Recurrent Head"} {...props}
            bg_color = 'bg-lime-400'/>
        </>
    );
}
export default RecurrentNode
