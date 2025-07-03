import { BaseEdge, EdgeLabelRenderer, getBezierPath, type EdgeProps} from '@xyflow/react';
import handleController, { type HandleMap } from '../../../controllers/handleController';
import { useStore } from 'zustand';
 
const AnnotatedEdge = (props : EdgeProps) => {
    //this is the connection line that has formed between two nodes
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
        {props.selected ? <EdgeLabelRenderer>
            <div className = "absolute" style = {{transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`}}>
                <div className = 'w-fit h-fit p-[4px] bg-white border-1 border-black rounded-xl'>
                    <p className = "text-xs">From: {`${source_shape ? source_shape : "unknown"}`}</p>
                </div>
            </div>
        </EdgeLabelRenderer> : null}
        
        
        </>
    );
}

export default AnnotatedEdge