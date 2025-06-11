import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type Edge,
  type Node,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  type Connection,
  MarkerType
} from "@xyflow/react";
import { initialNodes } from "../components/Graph/initialNodes";

type Graph = {
  id: number,
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange<Node>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  setId: (id : number) => void;
};

export type {Graph};

const nodeController = create<Graph>((set, get) => ({
  id: 0,
  nodes: initialNodes,
  edges: [],
  onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes)});
  },
  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },
  onConnect: (connection : Connection) => {
    const edge : Edge = {id : `${connection.sourceHandle}->${connection.targetHandle}`, 
      markerEnd: {type: MarkerType.ArrowClosed},
      source: connection.source, target: connection.target,
      sourceHandle:connection.sourceHandle, targetHandle: connection.targetHandle,
      type: "annotated_edge"
    }
    
    set({ edges: addEdge(edge, get().edges) });
  },
  setNodes: (nodes) => {
    set({ nodes : nodes});
  },
  setEdges: (edges) => {
    set({ edges });
  },
  setId: (id) => {set({id})}
}));

export default nodeController
