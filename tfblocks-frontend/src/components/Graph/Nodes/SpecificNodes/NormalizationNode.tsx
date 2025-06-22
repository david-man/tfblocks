import { Position, useNodeConnections, useNodesData, type NodeConnection, type NodeProps} from '@xyflow/react';
import { Handle, useReactFlow} from '@xyflow/react';
import SingularConnection from '../../Handles/SingularConnection';
import { useEffect, useState} from 'react';
import NodeComponent from '../NodeComponent';
import NormalizationOptions from '../../NodeOptions/SpecificOptions/NormalizationOptions';
import handleController, {type HandleMap} from '../../../../controllers/handleController';
import { useStore } from 'zustand';
import propertyController from '../../../../controllers/propertyController';
const NormalizationNode = (props : NodeProps) =>{
    const id = props.id.toString()
    const outgoing_handle_id = `${id}|output_handle_1`
    const incoming_handle_id = `${id}|incoming_handle_1`

    const {set_handle_shape} = handleController()
    const [valid, setValid] = useState(false)
    const [data_shape, set_data_shape] = useState<Array<number> | undefined>(undefined)
    const [neurons, setNeurons] = useState(NaN)

    const [axis, setAxis] = useState(-1)
    const [normType, setNormType] = useState(undefined)

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
    const IncomingShape = useStore(handleController, (state : HandleMap) => state.get_handle_shape(ParentHandle))

    useEffect(() => {
        set_data_shape(undefined)
        setNeurons(NaN)
        setValid(false)
        set_properties(id, {"valid": false})
        if(IncomingShape && normType && !isNaN(axis)){
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
                set_properties(id, {"valid": true, "input_shape": IncomingShape, "norm_type": normType, "axis": a - IncomingShape.length,
                    "parent_handle_id": ParentHandle,
                    "output_handle_id": outgoing_handle_id,
                })
            }
        }
    }, [IncomingShape, normType, axis])

    useEffect(() => {
        set_handle_shape(outgoing_handle_id, data_shape)
    }, [data_shape, normType, axis, neurons])

    const optionsMenu = <NormalizationOptions id = {id} 
    set_norm_type = {setNormType} norm_type = {normType}
    axis = {axis} set_axis = {setAxis}></NormalizationOptions>
    return (
        <div className = "w-[140px]">
            <SingularConnection type="target" position={Position.Left} id={incoming_handle_id}/>
            <Handle type="source" position={Position.Right} id={outgoing_handle_id}/>
            <NodeComponent neurons = {neurons} optionsMenu = {optionsMenu} valid_node = {valid} mainText = {"Normalization"} 
            parent_handles = {[ParentHandle]} 
            child_handles = {ChildHandles}{...props}/>
        </div>
    );
}
export default NormalizationNode