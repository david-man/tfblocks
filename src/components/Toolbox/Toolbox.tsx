import '../../App.css'
import DotProductDragElement from './DragElements/DotProductDragElement'
import TransposeDragElement from './DragElements/TransposeDragElement'
import DenseDragElement from './DragElements/DenseDragElement'
import Conv1DDragElement from './DragElements/Conv1DDragElement'
const Toolbox = () => {
    return (
        <div className = "border-2 border-black w-full h-full">
            <DotProductDragElement />
            <TransposeDragElement />
            <DenseDragElement />
            <Conv1DDragElement />
        </div>
    )
}
export default Toolbox