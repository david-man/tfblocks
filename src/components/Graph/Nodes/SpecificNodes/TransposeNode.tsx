import { Position, useNodeConnections, useNodesData, type NodeProps} from '@xyflow/react';
import { Handle, useReactFlow} from '@xyflow/react';
import SingularConnection from '../../Handles/SingularConnection';
import { useEffect, useState} from 'react';
import dependencyController from '../../../../controllers/dependencyController';
import {red, green} from '../../../../constants'
const TransposeNode = (props : NodeProps) =>{
    const [bgColor, setBgColor] = useState(red)
    const {remove_id, set_dependencies} = dependencyController()
    const id = props.id.toString()
    const {updateNodeData} = useReactFlow()
    const incomingConnection = useNodeConnections({
        handleType: "target",
        handleId: `node_${id}_input_handle_1`
    })
    const ParentNode = useNodesData(incomingConnection[0]?.source)

    useEffect(() => {
        set_dependencies(id, [])
        return(() => remove_id(id))
    }, [])

    useEffect(() => {
        // @ts-ignore: filter will get out any undefined's
        set_dependencies(id, [ParentNode?.id].filter((id : String | undefined) => id))

        updateNodeData(id, {data_shape: undefined, neurons: NaN})
        setBgColor(red)
        if(ParentNode){
            if(ParentNode?.data?.data_shape)
            {
                const Shape = ParentNode?.data?.data_shape as Array<number>
                if(Shape.length >= 2)
                {
                    updateNodeData(id, {data_shape: [...Shape.slice(0, Shape.length - 2), Shape[Shape.length - 1], Shape[Shape.length - 2]]})
                    setBgColor(green)
                }
            }
        }
    }, [ParentNode])
    return (
        <>
        <SingularConnection type="target" position={Position.Left} id={`node_${id}_input_handle_1`}/>
        <Handle type="source" position={Position.Right} id={`node_${id}_output_handle_1`}/>
        <div className = "w-[100px] h-[100px] border-2 rounded-xs border-black flex flex-col justify-center items-center"
        style = {{backgroundColor: bgColor}}>
            <p className = "text-center">TRANSPOSE</p>
        </div>
        </>
    );
}
export default TransposeNode