import { Position, useNodeConnections, type NodeConnection, type NodeProps} from '@xyflow/react';
import { Handle } from '@xyflow/react';
import SingularConnection from '../../Handles/SingularConnection';
import { useEffect, useState} from 'react';
import DenseOptions from '../../NodeOptions/SpecificOptions/DenseOptions';
import NodeComponent from '../NodeComponent';
import handleController from '../../../../controllers/handleController';
import { type HandleMap } from '../../../../controllers/handleController';
import { useStore } from 'zustand';
import propertyController from "../../../../controllers/propertyController"


const DenseNode = (props : NodeProps) =>{
    const id = props.id.toString()
    const incoming_handle_id = `${id}|input_handle_1`
    const outgoing_handle_id = `${id}|output_handle_1`
    const {set_handle_shape} = handleController()
    const {set_properties} = propertyController()
    const [data_shape, set_data_shape] = useState<Array<number> | undefined>(undefined)
    const [neurons, setNeurons] = useState(NaN)
    const [units, setUnits] = useState(NaN)
    const [bias, setBias] = useState(true)
    const [valid, setValid] = useState(false)
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
        if(IncomingShape){
            if(IncomingShape.length >= 1 && !isNaN(IncomingShape[IncomingShape.length - 1] * units) && units >= 1)
            {
                set_data_shape([...IncomingShape.slice(0, IncomingShape.length - 1), units])
                setNeurons(units * IncomingShape[IncomingShape.length - 1] + (bias ? units : 0))
                set_properties(id, {"valid": true, "input_shape": IncomingShape, "units": units,
                    "bias": bias,
                                    "parent_handle_id": ParentHandle,
                                    "output_handle_id": outgoing_handle_id
                })
                setValid(true)
            }
        }
    }, [IncomingShape, units, bias])

    useEffect(() => {
        set_handle_shape(outgoing_handle_id, data_shape)
    }, [units, neurons, data_shape])

    const optionsMenu = <DenseOptions units = {units} setUnits = {setUnits} id = {id} bias = {bias} setBias = {setBias}/>;
    
    return (
        <div className = 'w-[100px]'>
            <SingularConnection type="target" position={Position.Left} id={incoming_handle_id}/>
            <Handle type="source" position={Position.Right} id={outgoing_handle_id}/>
            <NodeComponent optionsMenu = {optionsMenu} valid_node = {valid} neurons = {neurons} mainText = {"Dense"} 
            parent_handles = {[ParentHandle]}
            child_handles = {ChildHandles}
            bg_color = 'bg-blue-500'
            {...props}/>
        </div>
    );
}
export default DenseNode