import { Position, useNodeConnections, useNodesData, type NodeConnection, type NodeProps} from '@xyflow/react';
import { Handle, useReactFlow} from '@xyflow/react';
import SingularConnection from '../../Handles/SingularConnection';
import { useEffect, useState } from 'react';
import NodeComponent from '../NodeComponent';
import PoolingOptions from '../../NodeOptions/SpecificOptions/PoolingOptions';
import handleController, {type HandleMap} from '../../../../controllers/handleController';
import { useStore } from 'zustand';
const PoolingNode = (props : NodeProps) =>{
    const id = props.id.toString()
    const outgoing_handle_id = `${id}|output_handle_1`
    const incoming_handle_id = `${id}|incoming_handle_1`

    const {set_handle_shape} = handleController()
    const [valid, setValid] = useState(false)

    const [pool, setPool] = useState("maxpool")
    const [dimensionality, setDimensionality] = useState(undefined)
    const [padding, setPadding] = useState("valid")
    const [poolSize, setPoolSize] = useState(NaN)
    const [strideSize, setStrideSize] = useState(1)

    const [data_shape, set_data_shape] = useState<Array<number> | undefined>(undefined)
    const {updateNodeData} = useReactFlow()
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
        setValid(false)
        if(IncomingShape && pool && dimensionality && poolSize && strideSize && padding){
            switch (dimensionality){
                case "1d": //ASSUMPTION: CHANNELS_LAST OVER CHANNELS_FIRST
                    if(padding === "valid"){
                        if(IncomingShape.length === 3 && Math.floor((IncomingShape[1] - poolSize) / strideSize) + 1 > 0){
                            set_data_shape([IncomingShape[0], Math.floor((IncomingShape[1] - poolSize) / strideSize) + 1, IncomingShape[2]])
                            setValid(true)
                        }
                    }
                    else{
                        if(IncomingShape.length === 3 && Math.floor((IncomingShape[1]) / strideSize) + 1 > 0){
                            set_data_shape([IncomingShape[0], Math.floor((IncomingShape[1]) / strideSize) + 1, IncomingShape[2]])
                            setValid(true)
                        }
                    }
                    break
                case "2d":
                    if(padding === 'valid'){
                        if(IncomingShape.length === 4 
                            && Math.floor((IncomingShape[1] - poolSize) / strideSize) + 1 > 0 
                            && Math.floor((IncomingShape[2] - poolSize) / strideSize) + 1 > 0){
                            set_data_shape([IncomingShape[0], 
                                Math.floor((IncomingShape[1] - poolSize) / strideSize) + 1, 
                                Math.floor((IncomingShape[2] - poolSize) / strideSize) + 1, 
                                IncomingShape[3]])
                            setValid(true)
                        }
                    }
                    else{
                        if(IncomingShape.length === 4 
                            && Math.floor((IncomingShape[1]) / strideSize) + 1 > 0 
                            && Math.floor((IncomingShape[2]) / strideSize) + 1 > 0){
                            set_data_shape([IncomingShape[0], 
                                Math.floor((IncomingShape[1]) / strideSize) + 1, 
                                Math.floor((IncomingShape[2]) / strideSize) + 1, 
                                IncomingShape[3]])
                            setValid(true)
                        }
                    }
                    
                    break
                case "3d":
                    if(padding === 'valid'){
                        if(IncomingShape.length === 4 
                            && Math.floor((IncomingShape[1] - poolSize) / strideSize) + 1 > 0 
                            && Math.floor((IncomingShape[2] - poolSize) / strideSize) + 1 > 0
                            && Math.floor((IncomingShape[3] - poolSize) / strideSize) + 1){
                            set_data_shape([IncomingShape[0], 
                                Math.floor((IncomingShape[1] - poolSize) / strideSize) + 1, 
                                Math.floor((IncomingShape[2] - poolSize) / strideSize) + 1,
                                Math.floor((IncomingShape[3] - poolSize) / strideSize) + 1,  
                                IncomingShape[4]])
                            setValid(true)
                        }
                    }
                    else{
                        if(IncomingShape.length === 4 
                            && Math.floor((IncomingShape[1]) / strideSize) + 1 > 0 
                            && Math.floor((IncomingShape[2]) / strideSize) + 1 > 0
                            && Math.floor((IncomingShape[3]) / strideSize) + 1 > 0){
                            set_data_shape([IncomingShape[0], 
                                Math.floor((IncomingShape[1]) / strideSize) + 1, 
                                Math.floor((IncomingShape[2]) / strideSize) + 1, 
                                Math.floor((IncomingShape[3]) / strideSize) + 1, 
                                IncomingShape[4]])
                            setValid(true)
                        }
                    }
                    
                    break
                default:
                    break
            }
        }
    }, [IncomingShape, dimensionality, pool, poolSize, padding, strideSize])

    useEffect(() => {
        
        updateNodeData(id, {pool: pool, poolSize: poolSize, dimensionality: dimensionality, padding : padding, strideSize : strideSize})
        set_handle_shape(outgoing_handle_id, data_shape)
    }, [data_shape, dimensionality, pool, poolSize, padding, strideSize])

    const optionsMenu = <PoolingOptions id = {props.id} 
    set_pool_size = {setPoolSize} pool_size = {poolSize} 
    set_dim = {setDimensionality} dim = {dimensionality} 
    set_pool = {setPool} pool = {pool} 
    set_stride_size = {setStrideSize} stride_size = {strideSize}
    set_padding = {setPadding} padding = {padding}/>

    return (
        <div className = "w-[150px]">
            <SingularConnection type="target" position={Position.Left} id={incoming_handle_id}></SingularConnection>
            <Handle type="source" position={Position.Right} id={outgoing_handle_id}/>
            <NodeComponent valid_node = {valid} optionsMenu = {optionsMenu} mainText = {"Pooling"} 
            parent_handles = {[ParentHandle]} 
            child_handles = {ChildHandles}
            width = {"150px"} {...props}/>
        </div>
    );
}
export default PoolingNode
