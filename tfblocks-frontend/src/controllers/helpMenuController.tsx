import { create } from "zustand";

type Help = {
    helpMenu : string | undefined,
    on : boolean,
    setHelpMenu : (new_menu : string) => void,
    turnHelpMenuOff : () => void,
    isHelpMenuOn: () => boolean,
    currentHelpMenu: () => string | undefined,
}
export type {Help}
const helpMenuController = create<Help>((set, get) => ({
    on : false,
    helpMenu : undefined,
    setHelpMenu: (new_menu : string) => {
        set({on: true, helpMenu: new_menu})
    },
    turnHelpMenuOff: () => {
        set({on: false, helpMenu: undefined})
    },
    isHelpMenuOn: () => get().on,
    currentHelpMenu: () => get().helpMenu
}))
export default helpMenuController