import { create } from "zustand";

type HandleMap = {
    handle_map : Map<String, Array<number> | undefined>,
    get_handle_map : () => Map<String, Array<number> | undefined>,
    get_handle_shape : (id: String | null) => Array<number> | undefined,
    set_handle_shape : (id : String | null, dependencies : Array<number> | undefined) => void
    remove_handle : (id : String | null) => void
}

export type {HandleMap};

const handleController = create<HandleMap>((set, get) => ({
    handle_map: new Map(),
    get_handle_map : () => get().handle_map,
    get_handle_shape: (id : String | null) => {
        if(id)
            return get().handle_map.get(id)
        else
            return undefined
    },
    set_handle_shape: (id: String | null, data_shape : Array<number> | undefined) => {
        if(id){
            const this_map = get().handle_map
            this_map.set(id, data_shape)
            set({handle_map : this_map})
        }
    },
    remove_handle : (id : String | null) => {
        if(id){
            const this_map = get().handle_map
            this_map.delete(id)
            set({handle_map : this_map})
        }
    }
}));

export default handleController