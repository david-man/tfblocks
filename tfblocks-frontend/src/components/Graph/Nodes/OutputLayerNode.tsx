import { Handle, Position, useNodeConnections, useReactFlow, type NodeConnection, type NodeProps } from '@xyflow/react';
import { useEffect, useState} from 'react';
import dependencyController from '../../../controllers/dependencyController';
import handleController, { type HandleMap } from '../../../controllers/handleController';
import SingularConnection from '../Handles/SingularConnection';
import NodeComponent from './NodeComponent';
import { useStore } from 'zustand';
import propertyController from '../../../controllers/propertyController';

const OutputLayerNode = (props : NodeProps) =>{
    const id = props.id.toString()
    const data_shape = [3]
    const input_handle_id = `${id}|input_handle`
    const [valid, setValid] = useState(false)
    const {set_properties} = propertyController()

    const incomingConnection = useNodeConnections({
            handleType: "target",
            handleId: input_handle_id
        })
    const ParentHandle = incomingConnection[0]?.sourceHandle
    const IncomingShape = useStore(handleController, (state : HandleMap) => state.get_handle_shape(ParentHandle))
    useEffect(() => {
        let validity = (JSON.stringify(IncomingShape) === JSON.stringify(data_shape))
        console.log(validity)
        setValid(validity)
        set_properties(id, {"valid": validity, "parent_handle_id" : ParentHandle})
    }, [IncomingShape])
    return (
        <>
        <SingularConnection type="target" position={Position.Left} id={input_handle_id}/>
        <NodeComponent valid_node = {valid} mainText = {"Output Layer"} subtext = {`[${data_shape}]`}parent_handles = {[ParentHandle]}
        {...props}/>
        </>
    );
}
export default OutputLayerNode
