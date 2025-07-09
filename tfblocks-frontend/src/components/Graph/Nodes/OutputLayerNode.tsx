import { Position, useNodeConnections} from '@xyflow/react';
import { useEffect, useState} from 'react';
import dependencyController, { type DependencyMap } from '../../../controllers/dependencyController';
import handleController, { type HandleMap } from '../../../controllers/handleController';
import SingularConnection from '../Handles/SingularConnection';
import NodeComponent from './NodeComponent';
import { useStore } from 'zustand';
import propertyController, {type IdPropertyMap} from '../../../controllers/propertyController';
import { useShallow } from 'zustand/shallow';
import OutputOptions from '../NodeOptions/SpecificOptions/OutputLayerOptions';
const OutputLayerNode = (props : any) =>{
    //special component that deals with output nodes
    const id = props.id.toString()
    const [data_shape, setDataShape] = useState(undefined)
    const input_handle_id = `${id}|input_handle`
    const [valid, setValid] = useState(false)
    const {set_properties} = propertyController(useShallow((state : IdPropertyMap) => {
        return {
            set_properties: state.set_properties
        }
    }))
    const {add_network_head, remove_network_head} = dependencyController()
    useEffect(() => {
        add_network_head('out')
        return (() => {
            remove_network_head('out')
        })
    }, [])
    const incomingConnection = useNodeConnections({
            handleType: "target",
            handleId: input_handle_id
        })
    const ParentHandle = incomingConnection[0]?.sourceHandle
    const IncomingShape = useStore(handleController, (state : HandleMap) => state.get_handle_shape(ParentHandle))
    useEffect(() => {
        let validity = (data_shape && JSON.stringify(IncomingShape) === JSON.stringify(data_shape))
        setValid(validity)
        set_properties(id, {"valid": validity, "parent_handle_id" : ParentHandle})
    }, [IncomingShape, data_shape])
    const optionsMenu = <OutputOptions data_shape = {data_shape} setDataShape = {setDataShape} id = {id} />
    return (
        <>
        <SingularConnection type="target" position={Position.Left} id={input_handle_id}/>
        <NodeComponent valid_node = {valid} mainText = {"Output Layer"} subtext = {`[${data_shape ? data_shape.toString() : ''}]`}parent_handles = {[ParentHandle]}
        bg_color = "bg-orange-400"
        optionsMenu = {optionsMenu}
        {...props}/>
        </>
    );
}
export default OutputLayerNode
