import InputLayerNode from './Nodes/InputLayerNode';
import DotProductNode from './Nodes/SpecificNodes/DotProductNode';
import TransposeNode from './Nodes/SpecificNodes/TransposeNode';
import DenseNode from './Nodes/SpecificNodes/DenseNode';
import ConvNode from './Nodes/SpecificNodes/ConvNode';
import AddNode from './Nodes/SpecificNodes/AddNode';
import ActivationNode from './Nodes/SpecificNodes/ActivationNode';
import PoolingNode from './Nodes/SpecificNodes/PoolingNode';
import NormalizationNode from './Nodes/SpecificNodes/NormalizationNode';
import DropoutNode from './Nodes/SpecificNodes/DropoutNode';
import CutNode from './Nodes/SpecificNodes/CutNode';
import RecurrentNode from './Nodes/RecurrentNode';

export const nodeTypes = {
    input_layer : InputLayerNode,
    dot_product : DotProductNode,
    transpose : TransposeNode,
    dense : DenseNode, 
    conv : ConvNode,
    add : AddNode,
    activation : ActivationNode,
    pooling : PoolingNode,
    norm : NormalizationNode,
    dropout : DropoutNode,
    cut : CutNode,
    recurrent_head : RecurrentNode
}
