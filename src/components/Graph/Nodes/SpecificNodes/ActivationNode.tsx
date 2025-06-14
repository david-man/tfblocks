import { Position, useNodeConnections, useNodesData, type NodeProps} from '@xyflow/react';
import { Handle, useReactFlow} from '@xyflow/react';
import SingularConnection from '../../Handles/SingularConnection';
import { useEffect, useState } from 'react';
import NodeComponent from '../NodeComponent';
import ActivationOptions from '../../NodeOptions/SpecificOptions/ActivationOptions';
const ActivationNode = (props : NodeProps) =>{
    const [valid, setValid] = useState(false)
    const [activation, setActivation] = useState(undefined)
    const [data_shape, set_data_shape] = useState<Array<number> | undefined>(undefined)
    const id = props.id.toString()
    const {updateNodeData} = useReactFlow()
    const incomingConnectionA = useNodeConnections({
        handleType: "target",
        handleId: `node_${id}_input_handle_1`
    })
    const Parent = useNodesData(incomingConnectionA[0]?.source)
    useEffect(() => {
        set_data_shape(undefined)
        setValid(false)
        if(Parent){
            if(Parent?.data?.data_shape && activation){
                set_data_shape([...Parent?.data?.data_shape as Array<number>])
                setValid(true)
            }
        }
    }, [Parent, activation])

    useEffect(() => {
        updateNodeData(id, {data_shape: data_shape, activation : activation})
    }, [data_shape, activation])

    const optionsMenu = <ActivationOptions id = {props.id} set_activation = {setActivation} activation = {activation}/>

    return (
        <div className = "w-[120px]">
            <SingularConnection type="target" position={Position.Left} id={`node_${id}_input_handle_1`}></SingularConnection>
            <Handle type="source" position={Position.Right} id={`node_${id}_output_handle_1`}/>
            <NodeComponent valid_node = {valid} optionsMenu = {optionsMenu} mainText = {"Activation"} parents = {[Parent]} 
            width = {"120px"} {...props}/>
        </div>
    );
}
export default ActivationNode
