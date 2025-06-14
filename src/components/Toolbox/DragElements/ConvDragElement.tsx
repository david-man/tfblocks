import { useDraggable } from '@dnd-kit/core';
const Conv1DDragElement = () => {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({id: "conv"});
    
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
    } : undefined
    return (
        <div className = "flex justify-center w-full">
            <button ref = {setNodeRef} style = {style} {...listeners} {...attributes} className = "w-4/5 m-4">
                <div className = "text-2xl border-2 border-black">
                    <p>Conv Layer</p>
                </div>
            </button>
        </div>
        
    )

}
export default Conv1DDragElement