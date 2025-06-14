import { Position, useNodeConnections, useNodesData, type NodeProps} from '@xyflow/react';
import { Handle, useReactFlow} from '@xyflow/react';
import SingularConnection from '../../Handles/SingularConnection';
import { useEffect, useState} from 'react';
import NodeComponent from '../NodeComponent';
import NormalizationOptions from '../../NodeOptions/SpecificOptions/NormalizationOptions';
const NormalizationNode = (props : NodeProps) =>{
    const [valid, setValid] = useState(false)
    const [data_shape, set_data_shape] = useState<Array<number> | undefined>(undefined)
    const [neurons, setNeurons] = useState(NaN)

    const [axis, setAxis] = useState(-1)
    const [normType, setNormType] = useState(undefined)

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
        if(ParentNode && ParentNode?.data?.data_shape && normType && axis){
            let Shape= [...ParentNode.data.data_shape as Array<number>] 
            let a = (axis >= 0 ? axis : Shape.length + axis)
            if(a >= 0 && a < Shape.length)
            {
                set_data_shape(Shape)
                switch(normType){
                    case "unit":
                        setNeurons(0)
                        break
                    case "batch":
                        setNeurons(Shape[a] * 2)
                        break
                    case "layer":
                        setNeurons(Shape[a] * 2)
                        break
                    default:
                        break
                }
                setValid(true)
            }
        }
    }, [ParentNode, normType, axis])

    useEffect(() => {
        updateNodeData(id, {data_shape: data_shape, neurons: neurons, normType: normType, axis: axis})
    }, [data_shape, normType, axis, neurons])

    const optionsMenu = <NormalizationOptions id = {id} 
    set_norm_type = {setNormType} norm_type = {normType}
    axis = {axis} set_axis = {setAxis}></NormalizationOptions>
    return (
        <div className = "w-[140px]">
            <SingularConnection type="target" position={Position.Left} id={`node_${id}_input_handle_1`}/>
            <Handle type="source" position={Position.Right} id={`node_${id}_output_handle_1`}/>
            <NodeComponent neurons = {neurons} optionsMenu = {optionsMenu} valid_node = {valid} mainText = {"Normalization"} parents = {[ParentNode]} {...props}/>
        </div>
    );
}
export default NormalizationNode