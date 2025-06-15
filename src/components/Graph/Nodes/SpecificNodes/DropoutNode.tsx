import { Position, useNodeConnections, useNodesData, type NodeProps} from '@xyflow/react';
import { Handle, useReactFlow} from '@xyflow/react';
import SingularConnection from '../../Handles/SingularConnection';
import { useEffect, useState } from 'react';
import NodeComponent from '../NodeComponent';
import DropoutOptions from '../../NodeOptions/SpecificOptions/DropoutOptions';
import handleController, {type HandleMap} from '../../../../controllers/handleController';
import { useStore } from 'zustand';
const DropoutNode = (props : NodeProps) =>{
    const id = props.id.toString()
    const outgoing_handle_id = `node_${id}_output_handle_1`
    const incoming_handle_id = `node_${id}_incoming_handle_1`

    const {set_handle_shape} = handleController()

    const [valid, setValid] = useState(false)

    const [dimensionality, setDimensionality] = useState("indiv")
    const [rate, setRate] = useState(NaN)

    const [data_shape, set_data_shape] = useState<Array<number> | undefined>(undefined)
    const {updateNodeData} = useReactFlow()
    const incomingConnection = useNodeConnections({
        handleType: "target",
        handleId: incoming_handle_id
    })
    const ParentID = incomingConnection[0]?.source
    const ParentHandle = incomingConnection[0]?.sourceHandle
    const IncomingShape = useStore(handleController, (state : HandleMap) => state.get_handle_shape(ParentHandle!))

    useEffect(() => {
        set_data_shape(undefined)
        setValid(false)
        if(IncomingShape && dimensionality && rate){
            const parent_shape = IncomingShape as Array<number>
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
    }, [IncomingShape, dimensionality, rate])

    useEffect(() => {
        updateNodeData(id, {rate: rate, dimensionality: dimensionality})
        set_handle_shape(outgoing_handle_id, data_shape)
    }, [data_shape, dimensionality, rate])

    const optionsMenu = <DropoutOptions id = {id}
    set_rate = {setRate} rate = {rate}
    set_dim = {setDimensionality} dim = {dimensionality}
    />

    return (
        <div className = "w-[150px]">
            <SingularConnection type="target" position={Position.Left} id={incoming_handle_id}></SingularConnection>
            <Handle type="source" position={Position.Right} id={outgoing_handle_id}/>
            <NodeComponent filter = {(num : number) => (num <= 100)}
            valid_node = {valid} optionsMenu = {optionsMenu} mainText = {"Dropout"} parents = {[ParentID]} width = {"150px"} {...props}/>
        </div>
    );
}
export default DropoutNode
