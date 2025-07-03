import { create } from "zustand";

type Help = {
    menu : String | undefined,
    on : boolean,
    setMenu : (new_menu : String) => void,
    turnOff : () => void,
    menuStatus: () => boolean,
    currentMenu: () => String | undefined,
}
export type {Help}
const helpMenuController = create<Help>((set, get) => ({
    on : false,
    menu : undefined,
    setMenu: (new_menu : String) => {
        set({on: true, menu: new_menu})
    },
    turnOff: () => {
        set({on: false, menu: undefined})
    },
    menuStatus: () => get().on,
    currentMenu: () => get().menu
}))
export default helpMenuController