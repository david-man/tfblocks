import {useDroppable} from '@dnd-kit/core'
import '../../App.css'

const DndOverlay = () => {
    //simple dropArea overlay used to make drag@drop possible
    const {setNodeRef} = useDroppable({id: "dropArea"})
    return (
        <div ref = {setNodeRef} className = "absolute z-1" style = {{height: 'calc(87.5% - 12px)', width: 'calc(75% - 12px)'}}/>
    )
}
export default DndOverlay
