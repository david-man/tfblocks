import { Position, useNodeConnections, useNodesData, type NodeProps} from '@xyflow/react';
import { Handle, useReactFlow} from '@xyflow/react';
import SingularConnection from '../../Handles/SingularConnection';
import { useEffect, useState} from 'react';
import NodeComponent from '../NodeComponent';
import TransposeOptions from '../../NodeOptions/SpecificOptions/TransposeOptions';
const TransposeNode = (props : NodeProps) =>{
    const [valid, setValid] = useState(false)
    const [data_shape, set_data_shape] = useState<Array<number> | undefined>(undefined)
    const [axis_1, setAxis1] = useState(-1)
    const [axis_2, setAxis2] = useState(-2)
    const id = props.id.toString()
    const {updateNodeData} = useReactFlow()
    const incomingConnection = useNodeConnections({
        handleType: "target",
        handleId: `node_${id}_input_handle_1`
    })
    const ParentNode = useNodesData(incomingConnection[0]?.source)
    useEffect(() => {
        set_data_shape(undefined)
        setValid(false)
        if(ParentNode && ParentNode?.data?.data_shape){
            let Shape= [...ParentNode.data.data_shape as Array<number>] 
            let a1 = (axis_1 >= 0 ? axis_1 : Shape.length + axis_1)
            let a2 = (axis_2 >= 0 ? axis_2 : Shape.length + axis_2)
            if(a1 >= 0 && a2 >= 0 && a1 < Shape.length && a2 < Shape.length && a1 != a2)
            {
                let temp = Shape[a2]
                Shape[a2] = Shape[a1]
                Shape[a1] = temp
                set_data_shape(Shape)
                setValid(true)
            }
        }
    }, [ParentNode])

    useEffect(() => {
        updateNodeData(id, {data_shape: data_shape})
    }, [data_shape])

    const optionsMenu = <TransposeOptions id = {id} axis_1 = {axis_1} axis_2 = {axis_2} setAxis1 = {setAxis1} setAxis2 = {setAxis2}/>
    return (
        <>
        <SingularConnection type="target" position={Position.Left} id={`node_${id}_input_handle_1`}/>
        <Handle type="source" position={Position.Right} id={`node_${id}_output_handle_1`}/>
        <NodeComponent optionsMenu = {optionsMenu} valid_node = {valid} mainText = {"Transpose"} parents = {[ParentNode]} {...props}/>
        </>
    );
}
export default TransposeNode