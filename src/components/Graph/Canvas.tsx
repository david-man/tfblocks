import { useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import { type Graph } from "../../controllers/nodeController";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useReactFlow,
  type Node,
  type Connection,
  type NodeMouseHandler
} from "@xyflow/react";
import { nodeTypes } from "./nodetypes";
import { edgeTypes } from "./edgetypes";
import "@xyflow/react/dist/style.css";
import AnnotatedConnectionLine from "./ConnectionLines/AnnotatedConnectionLine";
import '../../App.css'
import nodeController from "../../controllers/nodeController";
import dependencyController from "../../controllers/dependencyController";

const selector = (state: Graph) => ({
  nodes: state.nodes,
  edges: state.edges,
  setNodes : state.setNodes,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});
const Canvas = () => {
  const ref = useRef(null)
  const { nodes, edges, setNodes, onNodesChange, onEdgesChange, onConnect} = nodeController(useShallow(selector));
  const {get_dep_map} = dependencyController()
  const { updateNodeData } = useReactFlow()

  const has_dependency = (child_id : String, comparison: String) => {
    if(child_id === comparison){
      return true;
    }
    else if(!get_dep_map().has(child_id) || child_id === 'in'){
      return false
    }
    else{
      let in_branch = false;
      get_dep_map().get(child_id)?.map((parent : String) => {
        in_branch = in_branch || has_dependency(parent, comparison)
      })
      return in_branch
    }
  }

  const handleConnect = (new_connection : Connection) => {
    if(has_dependency(new_connection.source, new_connection.target)){
      alert("This is an illegal connection!")
    }
    else{
      onConnect(new_connection)
    }
  }


  return (
    <div style={{ width: "100%", height: "100%", border: "3px solid black" }}>
      <ReactFlow
        ref = {ref}
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={edges}
        edgeTypes={edgeTypes}
        onEdgesChange={onEdgesChange}
        onConnect={handleConnect}
        connectionLineComponent={AnnotatedConnectionLine}
        onNodeContextMenu={(event, node) => {
          event.preventDefault()
          updateNodeData(node.id, {showMenu:true})}}
        onPaneClick={(event) => {
          event.preventDefault()
          setNodes(nodes.map((node : Node) => ({ ...node, data: {...node.data, showMenu: false}, selected: false })));
        }}

        fitView = {false}
        defaultViewport={{x:0, y:0, zoom: 3}}
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
}
export default Canvas;
