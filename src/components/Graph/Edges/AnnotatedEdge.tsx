import { BaseEdge, EdgeLabelRenderer, getBezierPath, type EdgeProps} from '@xyflow/react';
import nodeController, { type Graph } from '../../../controllers/nodeController';
import { useShallow } from 'zustand/shallow';
 
const AnnotatedEdge = (props : EdgeProps) => {
    const {nodes} = nodeController(useShallow((state : Graph) => ({nodes : state.nodes})))
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX : props.sourceX,
        sourceY : props.sourceY,
        sourcePosition : props.sourcePosition,
        targetX : props.targetX,
        targetY : props.targetY,
        targetPosition : props.targetPosition,
    });
    const source_node = nodes.find(node => node.id === props.source)
    return (
        <>
        <BaseEdge path={edgePath} markerEnd = {props.markerEnd}/>
        <EdgeLabelRenderer>
            <div className = "absolute" style = {{transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`}}>
                <p className = "text-xs">From: {`${source_node?.data.data_shape ? source_node?.data.data_shape : "unknown"}`}</p>
            </div>
        </EdgeLabelRenderer>
        
        </>
    );
}

export default AnnotatedEdge