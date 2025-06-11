import { type Graph } from './controllers/nodeController'
import { useShallow } from 'zustand/shallow'
import { useState, type MouseEvent} from 'react'
import { ReactFlowProvider, useReactFlow} from '@xyflow/react'
import { DndContext, type DragEndEvent, type DragStartEvent } from '@dnd-kit/core'
import {restrictToWindowEdges} from '@dnd-kit/modifiers'
import './App.css'
import DndOverlay from './components/DragNDrop/DndOverlay'
import dndNodeAddition from './components/DragNDrop/DndHandler'
import Toolbox from './components/Toolbox/Toolbox'
import Header from './components/Header/Header'
import Canvas from './components/Graph/Canvas'
import nodeController from "./controllers/nodeController";
export type MousePosn = {
  x : number,
  y : number
}
function PreApp() {
  const {nodes, setNodes, id, setId} = nodeController(useShallow((state : Graph) => ({id: state.id, nodes: state.nodes, setNodes : state.setNodes, setId: state.setId})));
  const [mousePosn, setMousePosn] = useState<MousePosn>({x: 0, y: 0})
  const [dragging, setDragging] = useState<boolean>(false);
  const {screenToFlowPosition} = useReactFlow();
  const handleMouseMove = (event : MouseEvent<HTMLDivElement>) => {
    setMousePosn({x: event.clientX, y: event.clientY})
  }
  
  const handleDragStart = (event : DragStartEvent) => {
    setDragging(true)
  }
  const handleDragEnd = (event : DragEndEvent) => {
    setDragging(false)
    if(event.over){
      setId(id + 1)
      dndNodeAddition(event, mousePosn, screenToFlowPosition, nodes, setNodes, id)
    }
  }
  return (
    <div onMouseMove = {handleMouseMove} className = "w-full h-full">
      <DndContext onDragEnd = {handleDragEnd} onDragStart = {handleDragStart} modifiers = {[restrictToWindowEdges]}>
        <div className = "flex flex-col w-full h-full">
          <div className = "p-2" style = {{height: `calc(12.5% - 2px)`}}>
            <Header />
          </div>
          <div className = "h-7/8 w-full flex">
            <div className = "w-1/4 h-full p-2">
              <Toolbox />
            </div>
            <div className = "flex-grow h-full p-2">
              {dragging ? <DndOverlay /> : null}
              <Canvas />
            </div>
          </div>
        </div>
      </DndContext>
    </div>
  )
}

function App() {
  return (<ReactFlowProvider>
    <PreApp />
  </ReactFlowProvider>)
}
export default App
