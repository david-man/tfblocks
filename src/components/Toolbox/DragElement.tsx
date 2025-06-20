import { useDraggable } from '@dnd-kit/core';
export const DragElement = (props) => {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({id: props.id});
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
    } : undefined
    return (
        <div className = "flex justify-center w-full">
            {props.activeID != props.id ? <button ref = {setNodeRef} style = {style} {...listeners} {...attributes} className = "w-4/5 m-4">
                <div className = "h-[50px] text-2xl border-2 border-black flex justify-center items-center">
                    <p>{props.name}</p>
                </div>
            </button> 
            : <div className = "h-[50px] w-4/5 m-4">
            </div>
            }
            
        </div>
        
    )

}

export const DragShadow = (props) => {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({id: props.id});
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
    } : undefined
    return (
         <div className = "flex justify-center w-full">
            {props.activeID === props.id ? <button ref = {setNodeRef} style = {style} {...listeners} {...attributes} className = "w-4/5 m-4">
                <div className = "h-[50px] text-2xl border-2 border-black flex justify-center items-center">
                    <p>{props.name}</p>
                </div>
            </button> 
            : null
            }
            
        </div>
        
    )

}