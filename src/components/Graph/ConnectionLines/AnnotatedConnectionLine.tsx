import { useConnection, type ConnectionLineComponentProps, MarkerType, getBezierPath, Position, EdgeLabelRenderer} from '@xyflow/react';
import '../../../App.css'
const AnnotatedConnectionLine = (props : ConnectionLineComponentProps) => {
  const { fromNode } = useConnection();
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
                <p className = "text-xs">{fromNode?.data?.data_shape ? fromNode?.data?.data_shape.toString() : "unknown"}</p>
            </div>
        </EdgeLabelRenderer>
    </>
  )
}
export default AnnotatedConnectionLine