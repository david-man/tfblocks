import { Handle, Position, useNodeConnections, type NodeConnection} from '@xyflow/react';
import { useEffect} from 'react';
import dependencyController, {type DependencyMap} from '../../../controllers/dependencyController';
import handleController, {type HandleMap} from '../../../controllers/handleController';
import propertyController, {type IdPropertyMap} from '../../../controllers/propertyController';
import { useShallow } from 'zustand/shallow';


const InputLayerNode = (props : any) =>{
    //Special node component designed specifically for inputs.
    const data_shape = props.data.shape
    const outgoing_handle_id = `in|output_handle`
    const {add_network_head, remove_network_head, remove_id, set_dependencies, set_children} = dependencyController(useShallow((state : DependencyMap) => {
        return {add_network_head: state.add_network_head,
        remove_network_head: state.remove_network_head,
        remove_id: state.remove_id,
        set_dependencies: state.set_dependencies,
        set_children: state.set_children}}))
    
    const {remove_handle, set_handle_shape} = handleController(useShallow((state : HandleMap) => {
        return {
            remove_handle: state.remove_handle, 
            set_handle_shape: state.set_handle_shape
        }}))
    const {set_properties} = propertyController(useShallow((state : IdPropertyMap) => {
        return {
            set_properties: state.set_properties
        }
    }))
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
