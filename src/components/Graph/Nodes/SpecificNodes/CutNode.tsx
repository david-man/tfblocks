import { Position, useNodeConnections, useNodesData, type NodeProps} from '@xyflow/react';
import { Handle, useReactFlow} from '@xyflow/react';
import SingularConnection from '../../Handles/SingularConnection';
import { useEffect, useState} from 'react';
import NodeComponent from '../NodeComponent';
import handleController, {type HandleMap} from '../../../../controllers/handleController';
import { useStore } from 'zustand';
import CutOptions from '../../NodeOptions/SpecificOptions/CutOptions';
const CutNode = (props : NodeProps) =>{
    const id = props.id.toString()
    const outgoing_handle_id_1 = `node_${id}_output_handle_1`
    const outgoing_handle_id_2 = `node_${id}_output_handle_2`
    const incoming_handle_id = `node_${id}_incoming_handle_1`

    const {set_handle_shape} = handleController()
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
    const ParentID = incomingConnection[0]?.source
    const ParentHandle = incomingConnection[0]?.sourceHandle
    const IncomingShape = useStore(handleController, (state : HandleMap) => state.get_handle_shape(ParentHandle))
    useEffect(() => {
        set_data_shape_1(undefined)
        set_data_shape_2(undefined)
        setValid(false)
        if(IncomingShape){
            let a1 = (axis >= 0 ? axis : IncomingShape.length + axis)
            if(a1 >= 0 && a1 < IncomingShape.length)
            {
                if(cut1 + cut2 === IncomingShape[a1]){
                    let slice_1 = IncomingShape.slice(0, a1)
                    let slice_2 = IncomingShape.slice(a1 + 1)
                    set_data_shape_1(slice_1.concat([cut1].concat(slice_2)))
                    set_data_shape_2(slice_1.concat([cut2].concat(slice_2)))
                    setValid(true)
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
        <NodeComponent optionsMenu = {optionsMenu} valid_node = {valid} mainText = {"Cut"} parents = {[ParentID]} {...props}/>
        </>
    );
}
export default CutNode