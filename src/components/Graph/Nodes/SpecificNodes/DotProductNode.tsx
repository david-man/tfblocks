import { Position, useNodeConnections, useNodesData, type NodeProps} from '@xyflow/react';
import { Handle, useReactFlow} from '@xyflow/react';
import SingularConnection from '../../Handles/SingularConnection';
import { useEffect, useState } from 'react';
import dependencyController from '../../../../controllers/dependencyController';
import {red, green} from '../../../../constants'
const DotProductNode = (props : NodeProps) =>{
    const [bgColor, setBgColor] = useState(red)
    const {remove_id, set_dependencies} = dependencyController()
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
        set_dependencies(id, [])
        return(() => remove_id(id))
    }, [])
    useEffect(() => {
        // @ts-ignore: filter will get out any undefined's
        set_dependencies(id, [ParentA?.id, ParentB?.id].filter((id : String | undefined) => id))
        updateNodeData(id, {data_shape: undefined, neurons: 0})
        setBgColor(red)
        if(ParentA && ParentB){
            if(ParentA?.data?.data_shape && ParentB?.data?.data_shape){
                const ShapeA = ParentA?.data?.data_shape as Array<number>
                const ShapeB = ParentB?.data?.data_shape as Array<number>
                if(ShapeA.length >= 2 && ShapeB.length >= 2 && ShapeA[ShapeA.length - 1] === ShapeB[ShapeB.length - 2]){
                    updateNodeData(id, {data_shape: [ShapeA[ShapeA.length - 2], ShapeB[ShapeB.length - 1]]})
                    setBgColor(green)
                }
            }
        }
        else if(ParentA){
            updateNodeData(id, {data_shape: undefined, parents: [incomingConnectionA[0]?.source]})
        }
        else if(ParentB){
            updateNodeData(id, {data_shape: undefined, parents: [incomingConnectionB[0]?.source]})
        }
    }, [ParentA, ParentB])
    return (
        <>
            <SingularConnection type="target" position={Position.Left} id={`node_${id}_input_handle_1`} style = {{top: "25%"}}/>
            <SingularConnection type="target" position={Position.Left} id={`node_${id}_input_handle_2`} style = {{top: "75%"}}/>
            <Handle type="source" position={Position.Right} id={`node_${id}_output_handle_1`}/>
            
            <div className = "w-[100px] h-[100px] border-2 rounded-xs border-black flex flex-col justify-center items-center opacity-100" 
            style = {{backgroundColor: bgColor}}>
                <p className = "text-center" >DOT PRODUCT</p>
            </div>
        </>
    );
}
export default DotProductNode
