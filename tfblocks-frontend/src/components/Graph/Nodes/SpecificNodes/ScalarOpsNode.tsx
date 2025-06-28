import { Position, useNodeConnections, type NodeConnection, type NodeProps} from '@xyflow/react';
import { Handle, useReactFlow} from '@xyflow/react';
import SingularConnection from '../../Handles/SingularConnection';
import { useEffect, useState} from 'react';
import NodeComponent from '../NodeComponent';
import handleController from '../../../../controllers/handleController';
import { type HandleMap } from '../../../../controllers/handleController';
import { useStore } from 'zustand';
import propertyController from "../../../../controllers/propertyController"
import ScalarOpsOptions from '../../NodeOptions/SpecificOptions/ScalarOpsOptions';


const ScalarOpsNode = (props : NodeProps) =>{
    const id = props.id.toString()
    const incoming_handle_id = `${id}|input_handle_1`
    const outgoing_handle_id = `${id}|output_handle_1`
    const {set_handle_shape} = handleController()
    const {set_properties} = propertyController()
    const [data_shape, set_data_shape] = useState<Array<number> | undefined>(undefined)
    const [operation, setOperation] = useState<String>("")
    const [scalar, setScalar] = useState<number>(NaN)
    const [valid, setValid] = useState(false)
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
    const IncomingShape = useStore(handleController, (state : HandleMap) => state.get_handle_shape(ParentHandle!))

    useEffect(() => {
        set_data_shape(undefined)
        setValid(false)
        set_properties(id, {"valid": false})
        if(IncomingShape && !isNaN(scalar) && operation != ""){
            set_data_shape(IncomingShape)
            set_properties(id, {"valid": true, "input_shape": IncomingShape, 
                                "operation": operation,
                                "scalar": scalar,
                                "parent_handle_id": ParentHandle,
                                "output_handle_id": outgoing_handle_id
            })
            setValid(true)
        }
    }, [IncomingShape, scalar, operation])

    useEffect(() => {
        set_handle_shape(outgoing_handle_id, data_shape)
    }, [data_shape])

    const optionsMenu = <ScalarOpsOptions scalar = {scalar} setScalar = {setScalar} id = {id} operation = {operation} setOperation = {setOperation}/>;
    
    return (
        <div>
            <SingularConnection type="target" position={Position.Left} id={incoming_handle_id}/>
            <Handle type="source" position={Position.Right} id={outgoing_handle_id}/>
            <NodeComponent optionsMenu = {optionsMenu} valid_node = {valid} mainText = {"Scalar Operations"} 
            parent_handles = {[ParentHandle]}
            child_handles = {ChildHandles}
            {...props}/>
        </div>
    );
}
export default ScalarOpsNode