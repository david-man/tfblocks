import { Handle, Position, useNodeConnections, type NodeConnection} from '@xyflow/react';
import { useEffect, useState} from 'react';
import dependencyController, {type DependencyMap} from '../../../controllers/dependencyController';
import handleController, {type HandleMap} from '../../../controllers/handleController';
import propertyController, {type IdPropertyMap} from '../../../controllers/propertyController';
import { useShallow } from 'zustand/shallow';
import NodeComponent from './NodeComponent';
import InputOptions from '../NodeOptions/SpecificOptions/InputLayerOptions';


const InputLayerNode = (props : any) =>{
    //Special node component designed specifically for inputs.
    const id = 'in'
    const [data_shape, setDataShape] = useState<Array<number> | undefined>(undefined)
    const [valid, setValid] = useState(false)
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

    const outgoingConnection = useNodeConnections({
            handleType: "source",
            handleId: outgoing_handle_id
        })
    useEffect(() => {
        set_dependencies(id, [])
        add_network_head('in')
        return (() => {
            remove_network_head('in')
            remove_id(id)
            remove_handle(id)
        })
    }, [])

    useEffect(() => {
        set_handle_shape(outgoing_handle_id, data_shape)
        setValid(false)
        set_properties(id, {"valid": false, "input_shape": data_shape})
        if(data_shape){
            set_properties(id, {"valid": true, "input_shape": data_shape})
            setValid(true)
        }
    }, [data_shape])
    useEffect(() => {
        let children : String []= []
        outgoingConnection.map((connection : NodeConnection) => {
            if(connection?.targetHandle){
                children.push(connection.targetHandle.split("|")[0])
            }
        })
        set_children('in', children)
    }, [outgoingConnection])

    const optionsMenu = <InputOptions id = {id} setDataShape = {setDataShape} data_shape = {data_shape} />
    return (
        <>
        <Handle type="source" position={Position.Right} id={outgoing_handle_id}/>
        <NodeComponent id = {id} valid_node = {valid} mainText = {"Input Layer"} subtext = {`[${(!data_shape == undefined) ? data_shape!.toString() : ''}]`} parent_handles = {[]}
        bg_color = "bg-orange-400"
        optionsMenu = {optionsMenu}
        {...props}/>
        </>
    );
}
export default InputLayerNode
