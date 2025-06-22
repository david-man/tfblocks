import { Position, useNodeConnections, useNodesData, type NodeConnection, type NodeProps} from '@xyflow/react';
import { Handle, useReactFlow} from '@xyflow/react';
import SingularConnection from '../../Handles/SingularConnection';
import { useEffect, useState} from 'react';
import ConvOptions from '../../NodeOptions/SpecificOptions/ConvOptions';
import NodeComponent from '../NodeComponent';
import handleController, {type HandleMap} from '../../../../controllers/handleController';
import { useStore } from 'zustand';
import propertyController from '../../../../controllers/propertyController';

const ConvNode = (props : NodeProps) =>{
    const id = props.id.toString()
    const incoming_handle_id = `${id}|incoming_handle_1`
    const outgoing_handle_id = `${id}|output_handle_1`
    const {set_handle_shape} = handleController()

    const [valid, setValid] = useState(false)
    const [data_shape, set_data_shape] = useState<Array<number> | undefined>(undefined)
    const [neurons, setNeurons] = useState(NaN)

    const [filters, setFilters] = useState(NaN)
    const [kernelSize, setKernelSize] = useState(NaN)
    const [stride, setStride] = useState(1)
    const [padding, setPadding] = useState("valid")
    const [dimensionality, setDimensionality] = useState(undefined)

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
    const ChildHandles = outgoingConnection.filter((connection : NodeConnection) => connection.targetHandle ? true : false)
                                            .map((connection : NodeConnection) => connection.targetHandle)
    const ParentHandle = incomingConnection[0]?.sourceHandle
    const IncomingShape = useStore(handleController, (state : HandleMap) => state.get_handle_shape(ParentHandle!))

    useEffect(() => {
        setNeurons(NaN)
        set_data_shape(undefined)
        setValid(false)
        set_properties(id, {"valid": false})
        if(IncomingShape){
            if(IncomingShape && filters && kernelSize && stride && padding && dimensionality)
            {
                const channels = IncomingShape[IncomingShape.length - 1]
                switch(dimensionality){
                    case "1d"://ASSUMPTION: CHANNELS_LAST > CHANNELS_FIRST
                        if(padding === 'valid'){
                            if(IncomingShape.length === 2  && Math.floor((IncomingShape[0] - kernelSize) / stride) + 1 > 0 )
                            {
                                set_data_shape([Math.floor((IncomingShape[1] - kernelSize) / stride) + 1, filters])
                                setNeurons(channels * filters * kernelSize)
                                setValid(true)
                                set_properties(id, {"valid": true,
                                    "input_shape": IncomingShape,
                                     "dim": dimensionality, "filters": filters, 
                                    "kernel_size": kernelSize, "stride": stride, "padding": padding,
                                    "parent_handle_id": ParentHandle,
                                    "output_handle_id": outgoing_handle_id
                                })
                            }
                        }
                        else
                        {
                            if(IncomingShape.length === 2  && Math.ceil((IncomingShape[0]) / stride) > 0 )
                            {
                                set_data_shape([Math.ceil((IncomingShape[1]) / stride), filters])
                                setNeurons(channels * filters * kernelSize)
                                setValid(true)
                                set_properties(id, {"valid": true,
                                    "input_shape": IncomingShape,
                                     "dim": dimensionality, "filters": filters, 
                                    "kernel_size": kernelSize, "stride": stride, 
                                    "padding": padding,
                                    "parent_handle_id": ParentHandle,
                                    "output_handle_id": outgoing_handle_id,
                                })
                            }
                        }
                        break
                    case "2d":
                        if(padding === 'valid'){
                            if(IncomingShape.length === 3 && 
                                Math.floor((IncomingShape[0] - kernelSize) / stride) + 1 > 0 &&
                                Math.floor((IncomingShape[1] - kernelSize) / stride) + 1 > 0 )
                            {
                                set_data_shape([ 
                                    Math.floor((IncomingShape[0] - kernelSize) / stride) + 1, 
                                    Math.floor((IncomingShape[1] - kernelSize) / stride) + 1,
                                    filters])
                                setNeurons(channels * filters * (kernelSize**2))
                                setValid(true)
                                set_properties(id, {"valid": true,
                                    "input_shape": IncomingShape,
                                     "dim": dimensionality, "filters": filters, 
                                    "kernel_size": kernelSize, "stride": stride, 
                                    "padding": padding,
                                    "parent_handle_id": ParentHandle,
                                    "output_handle_id": outgoing_handle_id,
                                })
                            }
                        }
                        else
                        {
                            if(IncomingShape.length === 3 && 
                                Math.ceil((IncomingShape[0]) / stride) > 0 && 
                                Math.ceil((IncomingShape[1]) / stride) > 0 )
                            {
                                set_data_shape([Math.ceil((IncomingShape[0]) / stride), Math.ceil((IncomingShape[1]) / stride), filters])
                                setNeurons(channels * filters * (kernelSize**2))
                                setValid(true)
                                set_properties(id, {"valid": true,
                                    "input_shape": IncomingShape,
                                     "dim": dimensionality, "filters": filters, 
                                    "kernel_size": kernelSize, "stride": stride, 
                                    "padding": padding,
                                    "parent_handle_id": ParentHandle,
                                    "output_handle_id": outgoing_handle_id,
                                })
                            }
                        }
                        break
                    case "3d":
                        if(padding === 'valid'){
                            if(IncomingShape.length === 4 && 
                                Math.floor((IncomingShape[0] - kernelSize) / stride) + 1 > 0&&
                                Math.floor((IncomingShape[1] - kernelSize) / stride) + 1 > 0&& 
                                Math.floor((IncomingShape[2] - kernelSize) / stride) + 1 > 0 )
                            {
                                set_data_shape([ 
                                    Math.floor((IncomingShape[0] - kernelSize) / stride) + 1, 
                                    Math.floor((IncomingShape[1] - kernelSize) / stride) + 1,
                                    Math.floor((IncomingShape[2] - kernelSize) / stride) + 1,
                                    filters])
                                setNeurons(channels * filters * (kernelSize**3))
                                setValid(true)
                                set_properties(id, {"valid": true,
                                    "input_shape": IncomingShape,
                                     "dim": dimensionality, "filters": filters, 
                                    "kernel_size": kernelSize, "stride": stride,
                                    "padding": padding,
                                    "parent_handle_id": ParentHandle,
                                    "output_handle_id": outgoing_handle_id,
                                })
                            }
                        }
                        else
                        {
                            if(IncomingShape.length === 4 && 
                                Math.ceil((IncomingShape[0]) / stride) > 0&& 
                                Math.ceil((IncomingShape[1]) / stride) > 0 &&
                                Math.ceil((IncomingShape[2]) / stride) > 0)
                            {
                                set_data_shape([
                                    Math.ceil((IncomingShape[0]) / stride), 
                                    Math.ceil((IncomingShape[1]) / stride), 
                                    Math.ceil((IncomingShape[2]) / stride),
                                    filters])
                                setNeurons(channels * filters * (kernelSize**3))
                                setValid(true)
                                set_properties(id, {"valid": true,
                                    "input_shape": IncomingShape,
                                     "dim": dimensionality, "filters": filters, 
                                    "kernel_size": kernelSize, "stride": stride,
                                    "padding": padding,
                                    "parent_handle_id": ParentHandle,
                                    "output_handle_id": outgoing_handle_id,
                                })
                            }
                        }
                        break
                    default:
                        break
                        
                }
            }
        }
    }, [IncomingShape, filters, kernelSize, stride, padding, dimensionality])

    useEffect(() => {
        set_handle_shape(outgoing_handle_id, data_shape)
    }, [filters, kernelSize, neurons, data_shape, stride, padding, dimensionality])

    const optionsMenu = <ConvOptions id = {id} 
        filters = {filters} setFilters = {setFilters} 
        kernel = {kernelSize} setKernel = {setKernelSize}
        stride = {stride} setStride = {setStride}
        padding = {padding} setPadding = {setPadding}
        dim = {dimensionality} setDimensionality = {setDimensionality}/>;

    return (
        <div className = "w-[120px]">
            <SingularConnection type="target" position={Position.Left} id={incoming_handle_id}/>
            <Handle type="source" position={Position.Right} id={outgoing_handle_id}/>
            <NodeComponent width = "120px" optionsMenu = {optionsMenu} valid_node = {valid} neurons = {neurons} mainText = {"Conv"} 
            parent_handles = {[ParentHandle]}
            child_handles = {ChildHandles} 
            {...props}/>
        </div>
    );
}
export default ConvNode