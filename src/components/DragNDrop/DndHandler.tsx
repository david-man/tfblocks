import type {DragEndEvent } from "@dnd-kit/core";
import type { MousePosn } from "../../App";
import type { Node} from "@xyflow/react";

const dndNodeAddition = (event : DragEndEvent, mousePosn : MousePosn, screenToFlowPosition : any,
     nodes : Node[], setNodes : (nodes: Node[]) => void, id : number) => {
    if(event.over && event.over.id === 'dropArea'){
        const newNode : Node = {
            type: undefined,
            data: {showMenu: false},
            id: id.toString(),
            position: screenToFlowPosition({x: mousePosn.x, y: mousePosn.y}),
            origin: [0.5, 0]
        }
        switch(event.active.id){
            case "dotproduct":
                newNode.type = "dot_product"
                newNode.data = {label: 'Dot Product'}
                break
            case "transpose":
                newNode.type = "transpose"
                newNode.data = {label: 'Transpose'}
                break
            case "dense":
                newNode.type = "dense"
                newNode.data = {label: 'Dense', units: NaN}
                break
            case "conv1d":
                newNode.type = "conv1d"
                newNode.data = {label: 'Conv1D'}
                break
            default:
                newNode.type = "input"
                newNode.data = {label: "THIS SHOULD NOT EXIST"}
        }
        setNodes(nodes.concat(newNode));
    }
}
export default dndNodeAddition