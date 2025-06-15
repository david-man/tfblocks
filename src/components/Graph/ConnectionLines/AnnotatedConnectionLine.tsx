import { type ConnectionLineComponentProps, getBezierPath, Position, EdgeLabelRenderer} from '@xyflow/react';
import '../../../App.css'
import handleController, { type HandleMap } from '../../../controllers/handleController';
import { useStore } from 'zustand';
const AnnotatedConnectionLine = (props : ConnectionLineComponentProps) => {
  const sourceShape =  useStore(handleController, (state : HandleMap) => state.get_handle_shape(props.fromHandle?.id))
  const [edgePath, labelX, labelY] = getBezierPath({
          sourceX : props.fromX,
          sourceY : props.fromY,
          sourcePosition : props.fromHandle.position,
          targetX : props.toX,
          targetY : props.toY,
          targetPosition: Position.Left
      });
  return (
    <>
      <path
        fill="none"
        stroke = "gray"
        strokeWidth = "1.5"
        d={edgePath}
      />
      <EdgeLabelRenderer>
            <div className = "absolute" style = {{transform: `translate(-50%, -50%) translate(${labelX+10}px,${labelY-10}px)`}}>
                <p className = "text-xs">From: {sourceShape ? sourceShape.toString() : "unknown"}</p>
            </div>
        </EdgeLabelRenderer>
    </>
  )
}
export default AnnotatedConnectionLine