import InputLayerNode from './Nodes/SpecificNodes/InputLayerNode';
import DotProductNode from './Nodes/SpecificNodes/DotProductNode';
import TransposeNode from './Nodes/SpecificNodes/TransposeNode';
import DenseNode from './Nodes/SpecificNodes/DenseNode';
import Conv1DNode from './Nodes/SpecificNodes/Conv1DNode';

export const nodeTypes = {
    input_layer : InputLayerNode,
    dot_product : DotProductNode,
    transpose : TransposeNode,
    dense : DenseNode, 
    conv1d : Conv1DNode
}
