import helpMenuController from "../../controllers/helpMenuController"
import ActivationMenu from "./Menus/ActivationMenu"
import ConvolutionalMenu from "./Menus/ConvolutionalMenu"
import DenseMenu from "./Menus/DenseMenu"
import PoolingMenu from "./Menus/PoolingMenu"

const HelpMenu = () => {
    const {turnHelpMenuOff, currentHelpMenu} = helpMenuController()
    const current_menu = currentHelpMenu() ? currentHelpMenu() : ""
    const menuMap : Object = {
        'dense': <DenseMenu />,
        'convolution': <ConvolutionalMenu />,
        'activation': <ActivationMenu />,
        'pooling': <PoolingMenu />
    }
    return (
        <div className = 'w-full h-full bg-gray-100 rounded-2xl border-2 border-gray-500 relative'>
            <button onClick = {turnHelpMenuOff}>
                <div className = 'absolute right-[5px] top-[5px] cursor-pointer'>
                    <img src="cross.png" alt="x" />
                </div>
            </button>
           {menuMap.hasOwnProperty(current_menu) ? menuMap[current_menu] : null}
        </div>
    )
}
export default HelpMenu