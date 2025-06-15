import { Position, useNodeConnections, useNodesData, type NodeProps} from '@xyflow/react';
import { Handle, useReactFlow} from '@xyflow/react';
import SingularConnection from '../../Handles/SingularConnection';
import { useEffect, useState} from 'react';
import NodeComponent from '../NodeComponent';
import NormalizationOptions from '../../NodeOptions/SpecificOptions/NormalizationOptions';
import handleController, {type HandleMap} from '../../../../controllers/handleController';
import { useStore } from 'zustand';
const NormalizationNode = (props : NodeProps) =>{
    const id = props.id.toString()
    const outgoing_handle_id = `node_${id}_output_handle_1`
    const incoming_handle_id = `node_${id}_incoming_handle_1`

    const {set_handle_shape} = handleController()
    const [valid, setValid] = useState(false)
    const [data_shape, set_data_shape] = useState<Array<number> | undefined>(undefined)
    const [neurons, setNeurons] = useState(NaN)

    const [axis, setAxis] = useState(-1)
    const [normType, setNormType] = useState(undefined)

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
        setNeurons(NaN)
        setValid(false)
        if(IncomingShape && normType && axis){
            let Shape= [...IncomingShape as Array<number>] 
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
    }, [IncomingShape, normType, axis])

    useEffect(() => {
        updateNodeData(id, {neurons: neurons, normType: normType, axis: axis})
        set_handle_shape(outgoing_handle_id, data_shape)
    }, [data_shape, normType, axis, neurons])

    const optionsMenu = <NormalizationOptions id = {id} 
    set_norm_type = {setNormType} norm_type = {normType}
    axis = {axis} set_axis = {setAxis}></NormalizationOptions>
    return (
        <div className = "w-[140px]">
            <SingularConnection type="target" position={Position.Left} id={incoming_handle_id}/>
            <Handle type="source" position={Position.Right} id={outgoing_handle_id}/>
            <NodeComponent neurons = {neurons} optionsMenu = {optionsMenu} valid_node = {valid} mainText = {"Normalization"} parents = {[ParentID]} {...props}/>
        </div>
    );
}
export default NormalizationNode