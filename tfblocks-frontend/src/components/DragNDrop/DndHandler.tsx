import type {DragEndEvent } from "@dnd-kit/core";
import type { MousePosn } from "../../App";
import type { Node} from "@xyflow/react";

const dndNodeAddition = (event : DragEndEvent, mousePosn : MousePosn, screenToFlowPosition : any,
     nodes : Node[], setNodes : (nodes: Node[]) => void, id : number) => {
    if(event.over && event.over.id === 'dropArea'){
        const newNode : Node = {
            type: String(event.active.id),
            data: {showMenu: false},
            id: id.toString(),
            position: screenToFlowPosition({x: mousePosn.x, y: mousePosn.y}),
            origin: [0.5, 0]
        }
        setNodes(nodes.concat(newNode));
    }
}
export default dndNodeAddition