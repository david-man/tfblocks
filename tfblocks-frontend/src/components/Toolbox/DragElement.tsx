import { useDraggable } from '@dnd-kit/core';
import { useState } from 'react';
export const DragElement = (props : any) => {
    const color = props.color ? props.color : 'bg-gray-500'
    const [hovering, set_hovering] = useState(false)
    const {attributes, listeners, setNodeRef, transform} = useDraggable({id: props.id});
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
    } : undefined
    return (
        <div className = {`flex justify-center w-fit`}>
            {props.activeID != props.id ? 
            <button ref = {setNodeRef} style = {{...style, cursor : (hovering ? 'grab' : 'auto')}} {...listeners} {...attributes} className = "m-4"
            onMouseEnter = {() => set_hovering(true)}
            onMouseLeave = {() => set_hovering(false)}>
                
                <div className = {`${color} min-h-[50px] h-fit min-w-fit text-[16px] border-2 border-black flex justify-center items-center p-3 rounded-xl`}>
                    <p>{props.name}</p>
                </div>
            </button> 
            : 
            <div className = "h-[50px] w-4/5 m-4">
            </div>
            }
            
        </div>
        
    )

}

export const DragShadow = (props : any) => {
    const color = props.color ? props.color : 'bg-gray-500'
    const {attributes, listeners, setNodeRef, transform} = useDraggable({id: props.id});
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
    } : undefined
    return (
         <div className = "flex justify-center w-fit">
            {props.activeID === props.id ? <button ref = {setNodeRef} style = {{...style, cursor: 'grabbing'}} {...listeners} {...attributes} className = "m-1">
                <div className = {`min-h-[50px] h-fit min-w-fit text-[14px] border-2 border-black flex justify-center items-center p-3 rounded-xl ${color}`}>
                    <p>{props.name}</p>
                </div>
            </button> 
            : null
            }
            
        </div>
        
    )

}