import { create } from "zustand";

type Help = {
    helpMenu : String | undefined,
    on : boolean,
    setHelpMenu : (new_menu : String) => void,
    turnHelpMenuOff : () => void,
    isHelpMenuOn: () => boolean,
    currentHelpMenu: () => String | undefined,
}
export type {Help}
const helpMenuController = create<Help>((set, get) => ({
    on : false,
    helpMenu : undefined,
    setHelpMenu: (new_menu : String) => {
        set({on: true, helpMenu: new_menu})
    },
    turnHelpMenuOff: () => {
        set({on: false, helpMenu: undefined})
    },
    isHelpMenuOn: () => get().on,
    currentHelpMenu: () => get().helpMenu
}))
export default helpMenuController