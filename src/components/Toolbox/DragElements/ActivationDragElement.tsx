import { useDraggable } from '@dnd-kit/core';
const ActivationDragElement = () => {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({id: "activation"});
    
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
    } : undefined
    return (
        <div className = "flex justify-center w-full">
            <button ref = {setNodeRef} style = {style} {...listeners} {...attributes} className = "w-4/5 m-4">
                <div className = "text-2xl border-2 border-black">
                    <p>Activation</p>
                </div>
            </button>
        </div>
        
    )

}
export default ActivationDragElement