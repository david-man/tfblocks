import { Position, useNodeConnections, useNodesData, type NodeProps} from '@xyflow/react';
import { Handle, useReactFlow} from '@xyflow/react';
import SingularConnection from '../../Handles/SingularConnection';
import { useEffect, useState } from 'react';
import NodeComponent from '../NodeComponent';
import DropoutOptions from '../../NodeOptions/SpecificOptions/DropoutOptions';
const DropoutNode = (props : NodeProps) =>{
    const [valid, setValid] = useState(false)

    const [dimensionality, setDimensionality] = useState("indiv")
    const [rate, setRate] = useState(NaN)

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
            if(Parent?.data?.data_shape && dimensionality && rate){
                const parent_shape = Parent?.data?.data_shape as Array<number>
                switch (dimensionality){
                    case "1d":
                        if(parent_shape.length === 3){
                            set_data_shape([...parent_shape])
                            setValid(true)
                        }
                        break
                    case "2d":
                        if(parent_shape.length === 4){
                            set_data_shape([...parent_shape])
                            setValid(true)
                        }
                        
                        break
                    case "3d":
                        if(parent_shape.length === 5){
                            set_data_shape([...parent_shape])
                            setValid(true)
                        }
                        break
                    case "indiv":
                        set_data_shape([...parent_shape])
                        setValid(true)
                        break
                    default:
                        break
                }
            }
        }
    }, [Parent, dimensionality, rate])

    useEffect(() => {
        updateNodeData(id, {data_shape: data_shape, rate: rate, dimensionality: dimensionality})
    }, [data_shape, dimensionality, rate])

    const optionsMenu = <DropoutOptions id = {id}
    set_rate = {setRate} rate = {rate}
    set_dim = {setDimensionality} dim = {dimensionality}
    />

    return (
        <div className = "w-[150px]">
            <SingularConnection type="target" position={Position.Left} id={`node_${id}_input_handle_1`}></SingularConnection>
            <Handle type="source" position={Position.Right} id={`node_${id}_output_handle_1`}/>
            <NodeComponent filter = {(num : number) => (num <= 100)}
            valid_node = {valid} optionsMenu = {optionsMenu} mainText = {"Dropout"} parents = {[Parent]} width = {"150px"} {...props}/>
        </div>
    );
}
export default DropoutNode
