import '../../App.css'
import DotProductDragElement from './DragElements/DotProductDragElement'
import NormDragElement from './DragElements/NormDragElement'
import TransposeDragElement from './DragElements/TransposeDragElement'
import DenseDragElement from './DragElements/DenseDragElement'
import ConvDragElement from './DragElements/ConvDragElement'
import AddDragElement from './DragElements/AddDragElement'
import ActivationDragElement from './DragElements/ActivationDragElement'
import PoolingDragElement from './DragElements/PoolingDragElement'
import DropoutDragElement from './DragElements/DropoutDragElement'
import CutDragElement from './DragElements/CutDragElement'
const Toolbox = () => {
    return (
        <div className = "border-2 border-black w-full h-full">
            <DenseDragElement />
            <ConvDragElement />
            <PoolingDragElement />
            <hr className = "w-full border-1"></hr>
            <DotProductDragElement />
            <AddDragElement />
            <hr className = "w-full border-1"></hr>
            <TransposeDragElement />
            <CutDragElement />
            <hr className = "w-full border-1"></hr>
            <NormDragElement />
            <ActivationDragElement />
            <DropoutDragElement />
        </div>
    )
}
export default Toolbox