import { create } from "zustand";

type IdPropertyMap = {
    id_map : Map<String, Object | undefined | null>,
    get_map : () => Map<String, Object | undefined | null>,
    set_properties : (id : String, map : Object) => void,
    get_properties : (id: String | undefined) => Object | undefined | null,
    remove_properties : (id : String | undefined) => void
}

export type {IdPropertyMap};

const propertyController = create<IdPropertyMap>((set, get) => ({
    id_map: new Map(),
    get_map : () => get().id_map,
    set_properties: (id : String, map : Object) => {
        let new_map  =get().id_map
        new_map.set(id, map)
        set({id_map: new_map})
    },
    get_properties : (id : String | undefined) =>{
        if(id){
            return get().id_map.get(id)
        }
        else{
            return undefined
        }
    },
    remove_properties: (id : String | undefined) => {
        if(id){
            let new_map  =get().id_map
            new_map.delete(id)
            set({id_map: new_map})
        }
    }
}));

export default propertyController