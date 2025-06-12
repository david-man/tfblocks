import { Position, useNodeConnections, useNodesData, type NodeProps} from '@xyflow/react';
import { Handle, useReactFlow} from '@xyflow/react';
import SingularConnection from '../../Handles/SingularConnection';
import { useEffect, useState } from 'react';
import {red, green} from '../../../../constants'
import NodeComponent from '../NodeComponent';
const DotProductNode = (props : NodeProps) =>{
    const [valid, setValid] = useState(false)
    const [data_shape, set_data_shape] = useState<Array<number> | undefined>(undefined)
    const id = props.id.toString()
    const {updateNodeData} = useReactFlow()
    const incomingConnectionA = useNodeConnections({
        handleType: "target",
        handleId: `node_${id}_input_handle_1`
    })
    const incomingConnectionB = useNodeConnections({
        handleType: "target",
        handleId: `node_${id}_input_handle_2`
    })
    const ParentA = useNodesData(incomingConnectionA[0]?.source)
    const ParentB = useNodesData(incomingConnectionB[0]?.source)
    useEffect(() => {
        set_data_shape(undefined)
        setValid(false)
        if(ParentA && ParentB){
            if(ParentA?.data?.data_shape && ParentB?.data?.data_shape){
                const ShapeA = ParentA?.data?.data_shape as Array<number>
                const ShapeB = ParentB?.data?.data_shape as Array<number>
                if(ShapeA.length === ShapeB.length && 
                    ShapeA.length >= 2 && ShapeB.length >= 2 && 
                    ShapeA[ShapeA.length - 1] === ShapeB[ShapeB.length - 2]){
                    set_data_shape([...ShapeA.slice(0, ShapeA.length - 2), ShapeA[ShapeA.length - 2], ShapeB[ShapeB.length - 1]])
                    setValid(true)
                }
            }
        }
    }, [ParentA, ParentB])

    useEffect(() => {
        updateNodeData(id, {data_shape: data_shape})
    }, [data_shape])
    return (
        <>
            <SingularConnection type="target" position={Position.Left} id={`node_${id}_input_handle_1`} style = {{top: "25%"}}/>
            <SingularConnection type="target" position={Position.Left} id={`node_${id}_input_handle_2`} style = {{top: "75%"}}/>
            <Handle type="source" position={Position.Right} id={`node_${id}_output_handle_1`}/>
            <NodeComponent valid_node = {valid} mainText = {"Dot"} parents = {[ParentA, ParentB]} {...props}/>
        </>
    );
}
export default DotProductNode
