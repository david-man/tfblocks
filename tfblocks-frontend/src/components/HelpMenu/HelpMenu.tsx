import helpMenuController from "../../controllers/helpMenuController"
import ActivationMenu from "./Menus/ActivationMenu"
import AttentionMenu from "./Menus/AttentionMenu"
import ConcatenateMenu from "./Menus/ConcatenateMenu"
import ConvolutionalMenu from "./Menus/ConvolutionalMenu"
import CustomMatrixMenu from "./Menus/CustomMatrixMenu"
import CutMenu from "./Menus/CutMenu"
import DenseMenu from "./Menus/DenseMenu"
import DropoutMenu from "./Menus/DropoutMenu"
import FlattenMenu from "./Menus/FlattenMenu"
import GeneralRecurrentMenu from "./Menus/GeneralRecurrentMenu"
import GRUMenu from "./Menus/GRUMenu"
import InputMenu from "./Menus/InputMenu"
import LSTMMenu from "./Menus/LSTMMenu"
import NormalizationMenu from "./Menus/NormalizationMenu"
import OperationsMenu from "./Menus/OperationsMenu"
import OutputMenu from "./Menus/OutputMenu"
import PoolingMenu from "./Menus/PoolingMenu"
import RecurrentHeadMenu from "./Menus/RecurrentHeadMenu"
import ReshapeMenu from "./Menus/ReshapeMenu"
import RNNMenu from "./Menus/RNNMenu"
import ScaleOpsMenu from "./Menus/ScalarOperationsMenu"
import UpscaleMenu from "./Menus/UpscaleMenu"

const HelpMenu = () => {
    const {turnHelpMenuOff, currentHelpMenu} = helpMenuController()
    const current_menu = currentHelpMenu() ? currentHelpMenu() : ""
    const menuMap : any = {
        'dense': <DenseMenu />,
        'conv': <ConvolutionalMenu />,
        'activation': <ActivationMenu />,
        'pooling': <PoolingMenu />,
        'norm': <NormalizationMenu />,
        'dropout': <DropoutMenu />,
        'add': <OperationsMenu />,
        'subtract': <OperationsMenu />,
        'dot_product': <OperationsMenu />,
        'multiply': <OperationsMenu />,
        'divide': <OperationsMenu />,
        'cut': <CutMenu />,
        'concatenate': <ConcatenateMenu />,
        'upscale': <UpscaleMenu />,
        'flatten': <FlattenMenu />,
        'reshape': <ReshapeMenu />,
        'scalar_ops': <ScaleOpsMenu />,
        'custom_matrix': <CustomMatrixMenu />,
        'recurrent-general': <GeneralRecurrentMenu />,
        'rnn': <RNNMenu />,
        'lstm': <LSTMMenu />,
        'gru': <GRUMenu />,
        'input_layer': <InputMenu />,
        'output_layer': <OutputMenu />,
        'recurrent_head': <RecurrentHeadMenu />,
        'attention': <AttentionMenu />
    }
    return (
        <div className = 'w-full h-full bg-gray-100 rounded-2xl border-2 border-gray-500 relative p-[10px]'>
            <button onClick = {turnHelpMenuOff}>
                <div className = 'absolute right-[5px] top-[5px] cursor-pointer'>
                    <img src="cross.png" alt="x" />
                </div>
            </button>
           {menuMap.hasOwnProperty(current_menu!) ? menuMap[current_menu!] : null}
        </div>
    )
}
export default HelpMenu