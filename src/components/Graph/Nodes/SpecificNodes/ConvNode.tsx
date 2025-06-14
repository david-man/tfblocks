import { Position, useNodeConnections, useNodesData, type NodeProps} from '@xyflow/react';
import { Handle, useReactFlow} from '@xyflow/react';
import SingularConnection from '../../Handles/SingularConnection';
import { useEffect, useState} from 'react';
import ConvOptions from '../../NodeOptions/SpecificOptions/ConvOptions';
import NodeComponent from '../NodeComponent';



const ConvNode = (props : NodeProps) =>{
    const [valid, setValid] = useState(false)
    const [data_shape, set_data_shape] = useState<Array<number> | undefined>(undefined)
    const [neurons, setNeurons] = useState(NaN)

    const [filters, setFilters] = useState(NaN)
    const [kernelSize, setKernelSize] = useState(NaN)
    const [stride, setStride] = useState(1)
    const [padding, setPadding] = useState("valid")
    const [dimensionality, setDimensionality] = useState(undefined)
    
    const id = props.id.toString()
    const {updateNodeData} = useReactFlow()
    const incomingConnection = useNodeConnections({
        handleType: "target",
        handleId: `node_${id}_input_handle_1`
    })
    const ParentNode = useNodesData(incomingConnection[0]?.source)

    useEffect(() => {
        setNeurons(NaN)
        set_data_shape(undefined)
        setValid(false)
        if(ParentNode){
            if(ParentNode?.data?.data_shape && filters && kernelSize && stride && padding && dimensionality)
            {
                const Shape = ParentNode?.data?.data_shape as Array<number>
                const channels = Shape[Shape.length - 1]
                switch(dimensionality){
                    case "1d"://ASSUMPTION: CHANNELS_LAST > CHANNELS_FIRST
                        if(padding === 'valid'){
                            if(Shape.length === 3  && Math.floor((Shape[1] - kernelSize) / stride) + 1 > 0 )
                            {
                                set_data_shape([Shape[0], Math.floor((Shape[1] - kernelSize) / stride) + 1, filters])
                                setNeurons(channels * filters * kernelSize)
                                setValid(true)
                            }
                        }
                        else
                        {
                            if(Shape.length === 3  && Math.ceil((Shape[1]) / stride) > 0 )
                            {
                                set_data_shape([Shape[0], Math.ceil((Shape[1]) / stride), filters])
                                setNeurons(channels * filters * kernelSize)
                                setValid(true)
                            }
                        }
                        break
                    case "2d":
                        if(padding === 'valid'){
                            if(Shape.length === 4 && 
                                Math.floor((Shape[1] - kernelSize) / stride) + 1 > 0 &&
                                Math.floor((Shape[2] - kernelSize) / stride) + 1 > 0 )
                            {
                                set_data_shape([Shape[0], 
                                    Math.floor((Shape[1] - kernelSize) / stride) + 1, 
                                    Math.floor((Shape[2] - kernelSize) / stride) + 1,
                                    filters])
                                setNeurons(channels * filters * (kernelSize**2))
                                setValid(true)
                            }
                        }
                        else
                        {
                            if(Shape.length === 4 && 
                                Math.ceil((Shape[1]) / stride) > 0 && 
                                Math.ceil((Shape[2]) / stride) > 0 )
                            {
                                set_data_shape([Shape[0], Math.ceil((Shape[1]) / stride), Math.ceil((Shape[2]) / stride), filters])
                                setNeurons(channels * filters * (kernelSize**2))
                                setValid(true)
                            }
                        }
                        break
                    case "3d":
                        if(padding === 'valid'){
                            if(Shape.length === 5 && 
                                Math.floor((Shape[1] - kernelSize) / stride) + 1 > 0&&
                                Math.floor((Shape[2] - kernelSize) / stride) + 1 > 0&& 
                                Math.floor((Shape[3] - kernelSize) / stride) + 1 > 0 )
                            {
                                set_data_shape([Shape[0], 
                                    Math.floor((Shape[1] - kernelSize) / stride) + 1, 
                                    Math.floor((Shape[2] - kernelSize) / stride) + 1,
                                    Math.floor((Shape[3] - kernelSize) / stride) + 1,
                                    filters])
                                setNeurons(channels * filters * (kernelSize**3))
                                setValid(true)
                            }
                        }
                        else
                        {
                            if(Shape.length === 5 && 
                                Math.ceil((Shape[1]) / stride) > 0&& 
                                Math.ceil((Shape[2]) / stride) > 0 &&
                                Math.ceil((Shape[3]) / stride) > 0)
                            {
                                set_data_shape([Shape[0], 
                                    Math.ceil((Shape[1]) / stride), 
                                    Math.ceil((Shape[2]) / stride), 
                                    Math.ceil((Shape[3]) / stride),
                                    filters])
                                setNeurons(channels * filters * (kernelSize**3))
                                setValid(true)
                            }
                        }
                        break
                    default:
                        break
                        
                }
            }
        }
    }, [ParentNode, filters, kernelSize, stride, padding, dimensionality])

    useEffect(() => {
        updateNodeData(id, {kernelSize: kernelSize, neurons: neurons, data_shape: data_shape, filters: filters,
            padding: padding, stride : stride, dimensionality : dimensionality
        })
    }, [filters, kernelSize, neurons, data_shape, stride, padding, dimensionality])

    const optionsMenu = <ConvOptions id = {id} 
        filters = {filters} setFilters = {setFilters} 
        kernel = {kernelSize} setKernel = {setKernelSize}
        stride = {stride} setStride = {setStride}
        padding = {padding} setPadding = {setPadding}
        dimensionality = {dimensionality} setDimensionality = {setDimensionality}/>;

    return (
        <div className = "w-[120px]">
            <SingularConnection type="target" position={Position.Left} id={`node_${id}_input_handle_1`}/>
            <Handle type="source" position={Position.Right} id={`node_${id}_output_handle_1`}/>
            <NodeComponent width = "120px" optionsMenu = {optionsMenu} valid_node = {valid} neurons = {neurons} mainText = {"Conv"} parents = {[ParentNode]} {...props}/>
        </div>
    );
}
export default ConvNode