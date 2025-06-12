import { Position, useNodeConnections, useNodesData, type NodeProps} from '@xyflow/react';
import { Handle, useReactFlow} from '@xyflow/react';
import SingularConnection from '../../Handles/SingularConnection';
import { useEffect, useState} from 'react';
import DenseOptions from '../../NodeOptions/SpecificOptions/DenseOptions';
import NodeComponent from '../NodeComponent';


const DenseNode = (props : NodeProps) =>{
    const [data_shape, set_data_shape] = useState<Array<number> | undefined>(undefined)
    const [neurons, setNeurons] = useState(NaN)
    const [units, setUnits] = useState(NaN)
    const [valid, setValid] = useState(false)
    const id = props.id.toString()
    const {updateNodeData} = useReactFlow()
    const incomingConnection = useNodeConnections({
        handleType: "target",
        handleId: `node_${id}_input_handle_1`
    })
    const ParentNode = useNodesData(incomingConnection[0]?.source)

    useEffect(() => {
        set_data_shape(undefined)
        setNeurons(NaN)
        setValid(false)
        if(ParentNode?.data?.data_shape){
            const Shape = ParentNode?.data?.data_shape as Array<number>
            if(Shape.length >= 1 && !isNaN(Shape[Shape.length - 1] * units) && units >= 1)
            {
                set_data_shape([...Shape.slice(0, Shape.length - 1), units])
                setNeurons(units * Shape[Shape.length - 1])
                setValid(true)
            }
        }
    }, [ParentNode, units])

    useEffect(() => {
        updateNodeData(id, {units: units, neurons: neurons, data_shape: data_shape})
    }, [units, neurons, data_shape])

    const optionsMenu = <DenseOptions units = {units} setUnits = {setUnits} id = {id}/>;
    
    return (
        <>
        <SingularConnection type="target" position={Position.Left} id={`node_${id}_input_handle_1`}/>
        <Handle type="source" position={Position.Right} id={`node_${id}_output_handle_1`}/>
        <NodeComponent optionsMenu = {optionsMenu} valid_node = {valid} neurons = {neurons} mainText = {"Dense"} parents = {[ParentNode]} {...props}/>
        </>
    );
}
export default DenseNode