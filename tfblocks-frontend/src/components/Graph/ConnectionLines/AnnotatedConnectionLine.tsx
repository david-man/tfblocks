import { type ConnectionLineComponentProps, getBezierPath, Position, EdgeLabelRenderer, BaseEdge} from '@xyflow/react';
import '../../../App.css'
import handleController, { type HandleMap } from '../../../controllers/handleController';
import { useStore } from 'zustand';
const AnnotatedConnectionLine = (props : ConnectionLineComponentProps) => {
  //this is the unconnected connection line that the user is currently holding out from a node.
  const sourceShape =  useStore(handleController, (state : HandleMap) => state.get_handle_shape(props.fromHandle?.id))
  const [edgePath] = getBezierPath({
          sourceX : props.fromX,
          sourceY : props.fromY,
          sourcePosition : props.fromHandle.position,
          targetX : props.toX,
          targetY : props.toY,
          targetPosition: Position.Left
      });
  return (
    <>
      <BaseEdge path={edgePath}/>
      <EdgeLabelRenderer>
            <div className = "absolute" style = {{transform: `translate(-100%, -50%) translate(${props.toX}px,${props.toY}px)`}}>
                <div className = 'w-fit h-fit p-[4px] bg-white border-1 border-black rounded-xl'>
                    <p className = "text-xs nodrag nopan">From: {`${sourceShape ? sourceShape : "unknown"}`}</p>
                </div>
            </div>
        </EdgeLabelRenderer>
    </>
  )
}
export default AnnotatedConnectionLine