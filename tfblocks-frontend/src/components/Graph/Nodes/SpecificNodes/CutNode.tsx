import { Position, useNodeConnections, useNodesData, type NodeConnection, type NodeProps} from '@xyflow/react';
import { Handle, useReactFlow} from '@xyflow/react';
import SingularConnection from '../../Handles/SingularConnection';
import { useEffect, useState} from 'react';
import NodeComponent from '../NodeComponent';
import handleController, {type HandleMap} from '../../../../controllers/handleController';
import { useStore } from 'zustand';
import CutOptions from '../../NodeOptions/SpecificOptions/CutOptions';
import propertyController from '../../../../controllers/propertyController';
const CutNode = (props : NodeProps) =>{
    const id = props.id.toString()
    const outgoing_handle_id_1 = `${id}|output_handle_1`
    const outgoing_handle_id_2 = `${id}|output_handle_2`
    const incoming_handle_id = `${id}|incoming_handle_1`

    const {set_handle_shape} = handleController()
    const {set_properties} = propertyController()
    const [valid, setValid] = useState(false)
    const [data_shape_1, set_data_shape_1] = useState<Array<number> | undefined>(undefined)
    const [data_shape_2, set_data_shape_2] = useState<Array<number> | undefined>(undefined)
    const [axis, setAxis] = useState(NaN)
    const [cut1, setCut1] = useState(NaN)
    const [cut2, setCut2] = useState(NaN)
    const incomingConnection = useNodeConnections({
        handleType: "target",
        handleId: incoming_handle_id
    })
    const outgoingConnection1 = useNodeConnections({
        handleType: "source",
        handleId: outgoing_handle_id_1
    })
    const outgoingConnection2 = useNodeConnections({
        handleType: "source",
        handleId: outgoing_handle_id_2
    })
    const ParentHandle = incomingConnection[0]?.sourceHandle
    const ChildHandles = (outgoingConnection1.concat(outgoingConnection2)).filter((connection : NodeConnection) => connection.targetHandle ? true : false)
                                            .map((connection : NodeConnection) => connection.targetHandle)
    const IncomingShape = useStore(handleController, (state : HandleMap) => state.get_handle_shape(ParentHandle))
    useEffect(() => {
        set_data_shape_1(undefined)
        set_data_shape_2(undefined)
        setValid(false)
        set_properties(id, {"valid": false})
        if(IncomingShape && !isNaN(axis) && cut1 && cut2){
            let a1 = (axis >= 0 ? axis : IncomingShape.length + axis)
            if(a1 >= 0 && a1 < IncomingShape.length)
            {
                if(cut1 + cut2 === IncomingShape[a1]){
                    let slice_1 = IncomingShape.slice(0, a1)
                    let slice_2 = IncomingShape.slice(a1 + 1)
                    set_data_shape_1(slice_1.concat([cut1].concat(slice_2)))
                    set_data_shape_2(slice_1.concat([cut2].concat(slice_2)))
                    setValid(true)
                    set_properties(id, {"valid": true, "input_shape": IncomingShape, "axis": a1 - IncomingShape.length,
                        "cut_1" : cut1, "cut_2": cut2,
                        "parent_handle_id": ParentHandle,
                        "output_handle_id_1": outgoing_handle_id_1,
                        "output_handle_id_2": outgoing_handle_id_2
                    })
                }
            }
        }
    }, [IncomingShape, axis, cut1, cut2])

    useEffect(() => {
        set_handle_shape(outgoing_handle_id_1, data_shape_1)
        set_handle_shape(outgoing_handle_id_2, data_shape_2)
    }, [data_shape_1, data_shape_2])

    const optionsMenu = <CutOptions id = {id} axis = {axis} set_axis = {setAxis} cut1 = {cut1} set_cut1 = {setCut1}
    cut2 = {cut2} set_cut2 = {setCut2}/>
    return (
        <>
        <SingularConnection type="target" position={Position.Left} id={incoming_handle_id}/>
        <Handle type="source" position={Position.Right} id={outgoing_handle_id_1} style = {{top: "25%"}}/>
        <Handle type="source" position={Position.Right} id={outgoing_handle_id_2} style = {{top: "75%"}}/>
        <NodeComponent optionsMenu = {optionsMenu} valid_node = {valid} mainText = {"Cut"} 
        parent_handles = {[ParentHandle]} 
        child_handles = {ChildHandles}{...props}
        bg_color = 'bg-stone-300'/>
        </>
    );
}
export default CutNode