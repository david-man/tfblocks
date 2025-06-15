import { BaseEdge, EdgeLabelRenderer, getBezierPath, type EdgeProps} from '@xyflow/react';
import handleController, { type HandleMap } from '../../../controllers/handleController';
import { useStore } from 'zustand';
 
const AnnotatedEdge = (props : EdgeProps) => {
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX : props.sourceX,
        sourceY : props.sourceY,
        sourcePosition : props.sourcePosition,
        targetX : props.targetX,
        targetY : props.targetY,
        targetPosition : props.targetPosition,
    });
    const source_shape = useStore(handleController, (state : HandleMap) => state.get_handle_shape(props.sourceHandleId))
    return (
        <>
        <BaseEdge path={edgePath} markerEnd = {props.markerEnd}/>
        <EdgeLabelRenderer>
            <div className = "absolute" style = {{transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`}}>
                <p className = "text-xs">From: {`${source_shape ? source_shape : "unknown"}`}</p>
            </div>
        </EdgeLabelRenderer>
        
        </>
    );
}

export default AnnotatedEdge