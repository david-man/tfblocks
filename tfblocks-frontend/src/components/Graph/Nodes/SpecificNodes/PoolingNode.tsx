import { Position, useNodeConnections, useNodesData, type NodeConnection, type NodeProps} from '@xyflow/react';
import { Handle, useReactFlow} from '@xyflow/react';
import SingularConnection from '../../Handles/SingularConnection';
import { useEffect, useState } from 'react';
import NodeComponent from '../NodeComponent';
import PoolingOptions from '../../NodeOptions/SpecificOptions/PoolingOptions';
import handleController, {type HandleMap} from '../../../../controllers/handleController';
import { useStore } from 'zustand';
import propertyController from '../../../../controllers/propertyController';
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
        setValid(false)
        set_properties(id, {"valid": false})
        if(IncomingShape && pool && dimensionality && poolSize && strideSize && padding){
            switch (dimensionality){
                case "1d": //ASSUMPTION: CHANNELS_LAST OVER CHANNELS_FIRST
                    if(padding === "valid"){
                        if(IncomingShape.length === 2 && Math.floor((IncomingShape[0] - poolSize) / strideSize) + 1 > 0){
                            set_data_shape([Math.floor((IncomingShape[0] - poolSize) / strideSize) + 1, IncomingShape[1]])
                            setValid(true)
                            set_properties(id, {"valid": true, "input_shape": IncomingShape, "dim": dimensionality,
                                "pooling_size": poolSize, "stride": strideSize, "padding": padding, "pooling_type": pool,
                            "parent_handle_id": ParentHandle,
                                    "output_handle_id": outgoing_handle_id,})
                        }
                    }
                    else{
                        if(IncomingShape.length === 2 && Math.floor((IncomingShape[0]) / strideSize) + 1 > 0){
                            set_data_shape([Math.floor((IncomingShape[0]) / strideSize) + 1, IncomingShape[1]])
                            setValid(true)
                            set_properties(id, {"valid": true, "input_shape": IncomingShape, "dim": dimensionality,
                                "pooling_size": poolSize, "stride": strideSize, "padding": padding, "pooling_type": pool,
                            "parent_handle_id": ParentHandle,
                                    "output_handle_id": outgoing_handle_id,})
                        }
                    }
                    break
                case "2d":
                    if(padding === 'valid'){
                        if(IncomingShape.length === 3 
                            && Math.floor((IncomingShape[0] - poolSize) / strideSize) + 1 > 0 
                            && Math.floor((IncomingShape[1] - poolSize) / strideSize) + 1 > 0){
                            set_data_shape([
                                Math.floor((IncomingShape[0] - poolSize) / strideSize) + 1, 
                                Math.floor((IncomingShape[1] - poolSize) / strideSize) + 1, 
                                IncomingShape[2]])
                            setValid(true)
                            set_properties(id, {"valid": true, "input_shape": IncomingShape, "dim": dimensionality,
                                "pooling_size": poolSize, "stride": strideSize, "padding": padding, "pooling_type": pool,
                            "parent_handle_id": ParentHandle,
                                    "output_handle_id": outgoing_handle_id,})
                        }
                    }
                    else{
                        if(IncomingShape.length === 3 
                            && Math.floor((IncomingShape[0]) / strideSize) + 1 > 0 
                            && Math.floor((IncomingShape[1]) / strideSize) + 1 > 0){
                            set_data_shape([ 
                                Math.floor((IncomingShape[0]) / strideSize) + 1, 
                                Math.floor((IncomingShape[1]) / strideSize) + 1, 
                                IncomingShape[2]])
                            setValid(true)
                            set_properties(id, {"valid": true, "input_shape": IncomingShape, "dim": dimensionality,
                                "pooling_size": poolSize, "stride": strideSize, "padding": padding, "pooling_type": pool,
                            "parent_handle_id": ParentHandle,
                                    "output_handle_id": outgoing_handle_id,})
                        }
                    }
                    
                    break
                case "3d":
                    if(padding === 'valid'){
                        if(IncomingShape.length === 4 
                            && Math.floor((IncomingShape[0] - poolSize) / strideSize) + 1 > 0 
                            && Math.floor((IncomingShape[1] - poolSize) / strideSize) + 1 > 0
                            && Math.floor((IncomingShape[2] - poolSize) / strideSize) + 1){
                            set_data_shape([ 
                                Math.floor((IncomingShape[0] - poolSize) / strideSize) + 1, 
                                Math.floor((IncomingShape[1] - poolSize) / strideSize) + 1,
                                Math.floor((IncomingShape[2] - poolSize) / strideSize) + 1,  
                                IncomingShape[3]])
                            setValid(true)
                            set_properties(id, {"valid": true, "input_shape": IncomingShape, "dim": dimensionality,
                                "pooling_size": poolSize, "stride": strideSize, "padding": padding, "pooling_type": pool,
                            "parent_handle_id": ParentHandle,
                                    "output_handle_id": outgoing_handle_id,})
                        }
                    }
                    else{
                        if(IncomingShape.length === 4 
                            && Math.floor((IncomingShape[0]) / strideSize) + 1 > 0 
                            && Math.floor((IncomingShape[1]) / strideSize) + 1 > 0
                            && Math.floor((IncomingShape[2]) / strideSize) + 1 > 0){
                            set_data_shape([
                                Math.floor((IncomingShape[0]) / strideSize) + 1, 
                                Math.floor((IncomingShape[1]) / strideSize) + 1, 
                                Math.floor((IncomingShape[2]) / strideSize) + 1, 
                                IncomingShape[3]])
                            setValid(true)
                            set_properties(id, {"valid": true, "input_shape": IncomingShape, "dim": dimensionality,
                                "pooling_size": poolSize, "stride": strideSize, "padding": padding, "pooling_type": pool,
                                    "parent_handle_id": ParentHandle,
                                    "output_handle_id": outgoing_handle_id,})
                        }
                    }
                    
                    break
                default:
                    break
            }
        }
    }, [IncomingShape, dimensionality, pool, poolSize, padding, strideSize])

    useEffect(() => {
        set_handle_shape(outgoing_handle_id, data_shape)
    }, [data_shape, dimensionality, pool, poolSize, padding, strideSize])

    const optionsMenu = <PoolingOptions id = {props.id} 
    set_pool_size = {setPoolSize} pool_size = {poolSize} 
    set_dim = {setDimensionality} dim = {dimensionality} 
    set_pool = {setPool} pool = {pool} 
    set_stride_size = {setStrideSize} stride_size = {strideSize}
    set_padding = {setPadding} padding = {padding}/>

    return (
        <div>
            <SingularConnection type="target" position={Position.Left} id={incoming_handle_id}></SingularConnection>
            <Handle type="source" position={Position.Right} id={outgoing_handle_id}/>
            <NodeComponent valid_node = {valid} optionsMenu = {optionsMenu} mainText = {"Pooling"} 
            parent_handles = {[ParentHandle]} 
            child_handles = {ChildHandles}
            width = {"150px"} {...props}
            bg_color = 'bg-purple-400'/>
        </div>
    );
}
export default PoolingNode
