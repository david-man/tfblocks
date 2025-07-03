import { Position, useNodeConnections, useNodesData, type NodeConnection, type NodeProps} from '@xyflow/react';
import { Handle, useReactFlow} from '@xyflow/react';
import SingularConnection from '../../Handles/SingularConnection';
import { useEffect, useState } from 'react';
import NodeComponent from '../NodeComponent';
import DropoutOptions from '../../NodeOptions/SpecificOptions/DropoutOptions';
import handleController, {type HandleMap} from '../../../../controllers/handleController';
import { useStore } from 'zustand';
import propertyController from '../../../../controllers/propertyController';
const DropoutNode = (props : NodeProps) =>{
    const id = props.id.toString()
    const outgoing_handle_id = `${id}|output_handle_1`
    const incoming_handle_id = `${id}|incoming_handle_1`

    const {set_handle_shape} = handleController()

    const [valid, setValid] = useState(false)

    const [dimensionality, setDimensionality] = useState("indiv")
    const [rate, setRate] = useState(NaN)

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
    const IncomingShape = useStore(handleController, (state : HandleMap) => state.get_handle_shape(ParentHandle!))

    useEffect(() => {
        set_data_shape(undefined)
        setValid(false)
        set_properties(id, {"valid": false})
        if(IncomingShape && dimensionality && rate){
            const parent_shape = IncomingShape as Array<number>
            switch (dimensionality){
                case "1d":
                    if(parent_shape.length === 3){
                        set_data_shape([...parent_shape])
                        setValid(true)
                        set_properties(id, {"valid": true, "input_shape": parent_shape, "dimensionality": dimensionality, "rate": rate,
                            "parent_handle_id": ParentHandle,
                            "output_handle_id": outgoing_handle_id,
                        })
                    }
                    break
                case "2d":
                    if(parent_shape.length === 4){
                        set_data_shape([...parent_shape])
                        setValid(true)
                        set_properties(id, {"valid": true, "input_shape": parent_shape, "dimensionality": dimensionality, "rate": rate,
                            "parent_handle_id": ParentHandle,
                            "output_handle_id": outgoing_handle_id,
                        })
                    }
                    
                    break
                case "3d":
                    if(parent_shape.length === 5){
                        set_data_shape([...parent_shape])
                        setValid(true)
                        set_properties(id, {"valid": true, "input_shape": parent_shape, "dimensionality": dimensionality, "rate": rate,
                            "parent_handle_id": ParentHandle,
                            "output_handle_id": outgoing_handle_id,
                        })
                    }
                    break
                case "indiv":
                    set_data_shape([...parent_shape])
                    setValid(true)
                    set_properties(id, {"valid": true, "input_shape": parent_shape, "dimensionality": dimensionality, "rate": rate,
                        "parent_handle_id": ParentHandle,
                        "output_handle_id": outgoing_handle_id,
                    })
                    break
                default:
                    break
            }
        }
    }, [IncomingShape, dimensionality, rate])

    useEffect(() => {
        set_handle_shape(outgoing_handle_id, data_shape)
    }, [data_shape, dimensionality, rate])

    const optionsMenu = <DropoutOptions id = {id}
    set_rate = {setRate} rate = {rate}
    set_dim = {setDimensionality} dim = {dimensionality}
    />

    return (
        <div>
            <SingularConnection type="target" position={Position.Left} id={incoming_handle_id}></SingularConnection>
            <Handle type="source" position={Position.Right} id={outgoing_handle_id}/>
            <NodeComponent filter = {(num : number) => (num <= 100)}
            valid_node = {valid} optionsMenu = {optionsMenu} mainText = {"Dropout"} 
            parents_handles = {[ParentHandle]} 
            child_handles = {ChildHandles}
            width = {"150px"} {...props}
            bg_color = 'bg-purple-400'/>
        </div>
    );
}
export default DropoutNode
