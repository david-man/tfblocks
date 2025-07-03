import helpMenuController from "../../controllers/helpMenuController"

const HelpMenu = () => {
    const {turnOff, currentMenu} = helpMenuController()
    const current_menu = currentMenu() ? currentMenu() : 'none'
    return (
        <div className = 'w-full h-full bg-amber-300 border-2 border-gray-500 relative'>
            <button onClick = {turnOff}>
                <div className = 'absolute right-[5px] top-[5px] cursor-pointer'>
                    <img src="cross.png" alt="x" />
                </div>
            </button>
            <p className = "text-2xl text-center">{current_menu}</p>
        </div>
    )
}
export default HelpMenu