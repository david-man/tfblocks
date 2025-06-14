import { Position, useNodeConnections, useNodesData, type NodeProps} from '@xyflow/react';
import { Handle, useReactFlow} from '@xyflow/react';
import SingularConnection from '../../Handles/SingularConnection';
import { useEffect, useState } from 'react';
import NodeComponent from '../NodeComponent';
import PoolingOptions from '../../NodeOptions/SpecificOptions/PoolingOptions';
const PoolingNode = (props : NodeProps) =>{
    const [valid, setValid] = useState(false)

    const [pool, setPool] = useState("maxpool")
    const [dimensionality, setDimensionality] = useState(undefined)
    const [padding, setPadding] = useState("valid")
    const [poolSize, setPoolSize] = useState(NaN)
    const [strideSize, setStrideSize] = useState(1)

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
            if(Parent?.data?.data_shape && pool && dimensionality && poolSize && strideSize && padding){
                const parent_shape = Parent?.data?.data_shape as Array<number>
                switch (dimensionality){
                    case "1d": //ASSUMPTION: CHANNELS_LAST OVER CHANNELS_FIRST
                        if(padding === "valid"){
                            if(parent_shape.length === 3 && Math.floor((parent_shape[1] - poolSize) / strideSize) + 1 > 0){
                                set_data_shape([parent_shape[0], Math.floor((parent_shape[1] - poolSize) / strideSize) + 1, parent_shape[2]])
                                setValid(true)
                            }
                        }
                        else{
                            if(parent_shape.length === 3 && Math.floor((parent_shape[1]) / strideSize) + 1 > 0){
                                set_data_shape([parent_shape[0], Math.floor((parent_shape[1]) / strideSize) + 1, parent_shape[2]])
                                setValid(true)
                            }
                        }
                        break
                    case "2d":
                        if(padding === 'valid'){
                            if(parent_shape.length === 4 
                                && Math.floor((parent_shape[1] - poolSize) / strideSize) + 1 > 0 
                                && Math.floor((parent_shape[2] - poolSize) / strideSize) + 1 > 0){
                                set_data_shape([parent_shape[0], 
                                    Math.floor((parent_shape[1] - poolSize) / strideSize) + 1, 
                                    Math.floor((parent_shape[2] - poolSize) / strideSize) + 1, 
                                    parent_shape[3]])
                                setValid(true)
                            }
                        }
                        else{
                            if(parent_shape.length === 4 
                                && Math.floor((parent_shape[1]) / strideSize) + 1 > 0 
                                && Math.floor((parent_shape[2]) / strideSize) + 1 > 0){
                                set_data_shape([parent_shape[0], 
                                    Math.floor((parent_shape[1]) / strideSize) + 1, 
                                    Math.floor((parent_shape[2]) / strideSize) + 1, 
                                    parent_shape[3]])
                                setValid(true)
                            }
                        }
                        
                        break
                    case "3d":
                        if(padding === 'valid'){
                            if(parent_shape.length === 4 
                                && Math.floor((parent_shape[1] - poolSize) / strideSize) + 1 > 0 
                                && Math.floor((parent_shape[2] - poolSize) / strideSize) + 1 > 0
                                && Math.floor((parent_shape[3] - poolSize) / strideSize) + 1){
                                set_data_shape([parent_shape[0], 
                                    Math.floor((parent_shape[1] - poolSize) / strideSize) + 1, 
                                    Math.floor((parent_shape[2] - poolSize) / strideSize) + 1,
                                    Math.floor((parent_shape[3] - poolSize) / strideSize) + 1,  
                                    parent_shape[4]])
                                setValid(true)
                            }
                        }
                        else{
                            if(parent_shape.length === 4 
                                && Math.floor((parent_shape[1]) / strideSize) + 1 > 0 
                                && Math.floor((parent_shape[2]) / strideSize) + 1 > 0
                                && Math.floor((parent_shape[3]) / strideSize) + 1 > 0){
                                set_data_shape([parent_shape[0], 
                                    Math.floor((parent_shape[1]) / strideSize) + 1, 
                                    Math.floor((parent_shape[2]) / strideSize) + 1, 
                                    Math.floor((parent_shape[3]) / strideSize) + 1, 
                                    parent_shape[4]])
                                setValid(true)
                            }
                        }
                        
                        break
                    default:
                        break
                }
            }
        }
    }, [Parent, dimensionality, pool, poolSize, padding, strideSize])

    useEffect(() => {
        
        updateNodeData(id, {data_shape: data_shape, pool: pool, poolSize: poolSize, dimensionality: dimensionality, padding : padding, strideSize : strideSize})
    }, [data_shape, dimensionality, pool, poolSize, padding, strideSize])

    const optionsMenu = <PoolingOptions id = {props.id} 
    set_pool_size = {setPoolSize} pool_size = {poolSize} 
    set_dim = {setDimensionality} dim = {dimensionality} 
    set_pool = {setPool} pool = {pool} 
    set_stride_size = {setStrideSize} stride_size = {strideSize}
    set_padding = {setPadding} padding = {padding}/>

    return (
        <div className = "w-[150px]">
            <SingularConnection type="target" position={Position.Left} id={`node_${id}_input_handle_1`}></SingularConnection>
            <Handle type="source" position={Position.Right} id={`node_${id}_output_handle_1`}/>
            <NodeComponent valid_node = {valid} optionsMenu = {optionsMenu} mainText = {"Pooling"} parents = {[Parent]} width = {"150px"} {...props}/>
        </div>
    );
}
export default PoolingNode
