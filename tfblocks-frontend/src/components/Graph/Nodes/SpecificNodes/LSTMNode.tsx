import { Position, useNodeConnections, type NodeConnection, type NodeProps} from '@xyflow/react';
import { Handle, useReactFlow} from '@xyflow/react';
import SingularConnection from '../../Handles/SingularConnection';
import { useEffect, useState} from 'react';
import NodeComponent from '../NodeComponent';
import handleController from '../../../../controllers/handleController';
import { type HandleMap } from '../../../../controllers/handleController';
import { useStore } from 'zustand';
import LSTMOptions from '../../NodeOptions/SpecificOptions/LSTMOptions';
import propertyController from '../../../../controllers/propertyController';


const LSTMNode = (props : NodeProps) =>{
    const id = props.id.toString()
    const incoming_handle_id = `${id}|input_handle_1`
    const outgoing_handle_id = `${id}|output_handle_1`
    const {set_handle_shape} = handleController()
    const [data_shape, set_data_shape] = useState<Array<number> | undefined>(undefined)
    const [neurons, setNeurons] = useState(NaN)
    const [units, setUnits] = useState(NaN)
    const [valid, setValid] = useState(false)
    const [seq2seq, setSeq2Seq] = useState(false)
    const {updateNodeData} = useReactFlow()
    const {set_properties} = propertyController()
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
    const IncomingShape = useStore(handleController, (state : HandleMap) => state.get_handle_shape(ParentHandle!))

    useEffect(() => {
        set_data_shape(undefined)
        setNeurons(NaN)
        setValid(false)
        set_properties(id, {"valid": false})
        if(IncomingShape && units){
            if(IncomingShape.length === 2 && units >= 1)
            {
                set_data_shape(seq2seq ? [IncomingShape[0], units] : [units])
                setNeurons(4 * units * ((IncomingShape[1] + units + 1)))//+1 if/when including bias
                setValid(true)
                set_properties(id, {"valid": true, "input_shape": IncomingShape, "units": units,
                    "seq2seq": seq2seq,
                    "parent_handle_id": ParentHandle,
                    "output_handle_id": outgoing_handle_id,
                })
            }
        }
    }, [IncomingShape, units, seq2seq])

    useEffect(() => {
        set_handle_shape(outgoing_handle_id, data_shape)
    }, [units, neurons, data_shape])

    const optionsMenu = <LSTMOptions units = {units} setUnits = {setUnits} id = {id} seq2seq = {seq2seq} setSeq2Seq = {setSeq2Seq}/>;
    
    return (
        <div>
            <SingularConnection type="target" position={Position.Left} id={incoming_handle_id}/>
            <Handle type="source" position={Position.Right} id={outgoing_handle_id}/>
            <NodeComponent optionsMenu = {optionsMenu} valid_node = {valid} neurons = {neurons} mainText = {"LSTM"} 
            parent_handles = {[ParentHandle]}
            child_handles = {ChildHandles}
            {...props}
            bg_color = 'bg-lime-400'/>
        </div>
    );
}
export default LSTMNode