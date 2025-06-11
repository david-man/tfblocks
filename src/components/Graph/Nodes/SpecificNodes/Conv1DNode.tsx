import { Position, useNodeConnections, useNodesData, type NodeProps} from '@xyflow/react';
import { Handle, useReactFlow} from '@xyflow/react';
import SingularConnection from '../../Handles/SingularConnection';
import { useEffect, useState} from 'react';
import Conv1DOptions from '../../NodeOptions/SpecificOptions/Conv1DOptions';
import NodeComponent from '../NodeComponent';



const Conv1DNode = (props : NodeProps) =>{
    const [valid, setValid] = useState(false)
    const [data_shape, set_data_shape] = useState<Array<number> | undefined>(undefined)
    const [neurons, setNeurons] = useState(NaN)
    const [filters, setFilters] = useState(NaN)
    const [kernelSize, setKernelSize] = useState(NaN)
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
            if(ParentNode?.data?.data_shape)
            {
                const Shape = ParentNode?.data?.data_shape as Array<number>
                if(Shape.length === 3 && !isNaN(Shape[Shape.length - 1] * filters * kernelSize) && Shape[Shape.length - 2] - kernelSize + 1 >= 1)
                {
                    setValid(true)
                    setNeurons(Shape[Shape.length - 1] * filters * kernelSize)
                    set_data_shape([Shape[0], Shape[Shape.length - 2] - kernelSize + 1, filters])
                
                }
            }
        }
    }, [ParentNode, filters, kernelSize])

    useEffect(() => {
        updateNodeData(id, {kernelSize: kernelSize, neurons: neurons, data_shape: data_shape, filters: filters})
    }, [filters, kernelSize, neurons, data_shape])

    const optionsMenu = <Conv1DOptions filters = {filters} setFilters = {setFilters} kernel = {kernelSize} setKernel = {setKernelSize}/>;

    return (
        <>
        <SingularConnection type="target" position={Position.Left} id={`node_${id}_input_handle_1`}/>
        <Handle type="source" position={Position.Right} id={`node_${id}_output_handle_1`}/>
        <NodeComponent optionsMenu = {optionsMenu} valid_node = {valid} neurons = {neurons} mainText = {"Conv1D"} parents = {[ParentNode]} {...props}/>
        </>
    );
}
export default Conv1DNode