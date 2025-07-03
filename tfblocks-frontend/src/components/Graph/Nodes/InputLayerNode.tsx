import { Handle, Position, useNodeConnections, useReactFlow, type NodeConnection, type NodeProps } from '@xyflow/react';
import { useEffect} from 'react';
import dependencyController from '../../../controllers/dependencyController';
import handleController from '../../../controllers/handleController';
import propertyController from '../../../controllers/propertyController';
import nodeController, {type Graph} from '../../../controllers/nodeController';
import { useShallow } from 'zustand/shallow';


const InputLayerNode = (props : any) =>{
    const data_shape = props.data.shape
    const outgoing_handle_id = `in|output_handle`
    const {add_network_head, remove_network_head, remove_id, set_dependencies, set_children} = dependencyController()
    const {remove_handle, set_handle_shape} = handleController()
    const {set_properties} = propertyController()
    const id = props.id
    const selected = props.selected

    const outgoingConnection = useNodeConnections({
            handleType: "source",
            handleId: outgoing_handle_id
        })
    useEffect(() => {
        set_handle_shape(outgoing_handle_id, data_shape)
        set_properties(id, {"valid": true, "input_shape": data_shape})
        set_dependencies(id, [])
        add_network_head('in')
        return (() => {
            remove_network_head('in')
            remove_id(id)
            remove_handle(id)
        })
    }, [])
    useEffect(() => {
        let children : String []= []
        outgoingConnection.map((connection : NodeConnection) => {
            if(connection?.targetHandle){
                children.push(connection.targetHandle.split("|")[0])
            }
        })
        set_children('in', children)
    }, [outgoingConnection])
    return (
        <>
        <Handle type="source" position={Position.Right} id={outgoing_handle_id}/>
        <div className = {`h-full w-full bg-orange-400 p-1 border-2 rounded-lg flex flex-col justify-center items-center text-nowrap font-[roboto] 
            ${selected ? 'shadow-2xl/50' : null} border-black`}>
            <div className = 'p-[9px]'>
                <p className = "text-center">Input Layer</p>
                <p className = "text-center">[{data_shape.toString()}]</p>
            </div>
        </div>
        </>
    );
}
export default InputLayerNode
