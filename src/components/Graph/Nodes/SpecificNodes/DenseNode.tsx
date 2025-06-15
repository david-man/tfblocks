import { Position, useNodeConnections, type NodeProps} from '@xyflow/react';
import { Handle, useReactFlow} from '@xyflow/react';
import SingularConnection from '../../Handles/SingularConnection';
import { useEffect, useState} from 'react';
import DenseOptions from '../../NodeOptions/SpecificOptions/DenseOptions';
import NodeComponent from '../NodeComponent';
import handleController from '../../../../controllers/handleController';
import { type HandleMap } from '../../../../controllers/handleController';
import { useStore } from 'zustand';


const DenseNode = (props : NodeProps) =>{
    const id = props.id.toString()
    const outgoing_handle_id = `node_${id}_output_handle_1`
    const {set_handle_shape} = handleController()
    const [data_shape, set_data_shape] = useState<Array<number> | undefined>(undefined)
    const [neurons, setNeurons] = useState(NaN)
    const [units, setUnits] = useState(NaN)
    const [valid, setValid] = useState(false)
    const {updateNodeData} = useReactFlow()
    const incomingConnection = useNodeConnections({
        handleType: "target",
        handleId: `node_${id}_input_handle_1`
    })
    const ParentID = incomingConnection[0]?.source
    const ParentHandle = incomingConnection[0]?.sourceHandle
    const IncomingShape = useStore(handleController, (state : HandleMap) => state.get_handle_shape(ParentHandle!))

    useEffect(() => {
        set_data_shape(undefined)
        setNeurons(NaN)
        setValid(false)
        if(IncomingShape){
            if(IncomingShape.length >= 1 && !isNaN(IncomingShape[IncomingShape.length - 1] * units) && units >= 1)
            {
                set_data_shape([...IncomingShape.slice(0, IncomingShape.length - 1), units])
                setNeurons(units * IncomingShape[IncomingShape.length - 1])
                setValid(true)
            }
        }
    }, [IncomingShape, units])

    useEffect(() => {
        updateNodeData(id, {units: units, neurons: neurons})
        set_handle_shape(outgoing_handle_id, data_shape)
    }, [units, neurons, data_shape])

    const optionsMenu = <DenseOptions units = {units} setUnits = {setUnits} id = {id}/>;
    
    return (
        <div className = "w-[120px]">
            <SingularConnection type="target" position={Position.Left} id={`node_${id}_input_handle_1`}/>
            <Handle type="source" position={Position.Right} id={`node_${id}_output_handle_1`}/>
            <NodeComponent optionsMenu = {optionsMenu} valid_node = {valid} neurons = {neurons} mainText = {"Dense"} parents = {[ParentID]} {...props}/>
        </div>
    );
}
export default DenseNode