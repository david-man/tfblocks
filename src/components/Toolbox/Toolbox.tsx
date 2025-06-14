import '../../App.css'
import DotProductDragElement from './DragElements/DotProductDragElement'
import TransposeDragElement from './DragElements/TransposeDragElement'
import DenseDragElement from './DragElements/DenseDragElement'
import Conv1DDragElement from './DragElements/ConvDragElement'
import AddDragElement from './DragElements/AddDragElement'
import ActivationDragElement from './DragElements/ActivationDragElement'
import PoolingDragElement from './DragElements/PoolingDragElement'
const Toolbox = () => {
    return (
        <div className = "border-2 border-black w-full h-full">
            <DotProductDragElement />
            <TransposeDragElement />
            <DenseDragElement />
            <Conv1DDragElement />
            <AddDragElement />
            <ActivationDragElement />
            <PoolingDragElement />
        </div>
    )
}
export default Toolbox