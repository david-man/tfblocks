import { create } from "zustand";

type DependencyMap = {
  dep_map : Map<String, Array<String>>,
  get_dep_map : () => Map<String, Array<String>>,
  get_dependencies : (id: String) => Array<String> | undefined,
  set_dependencies : (id : String, dependencies : Array<String>) => void
  remove_id : (id : String) => void
};

export type {DependencyMap};

const dependencyController = create<DependencyMap>((set, get) => ({
    dep_map: new Map(),
    get_dep_map : () => get().dep_map,
    get_dependencies: (id : String) => get().dep_map.get(id),
    set_dependencies: (id: String, dependencies : Array<String>) => {
        const this_map = get().dep_map
        this_map.set(id, dependencies)
        set({dep_map : this_map})
    },
    remove_id : (id : String) => {
        const this_map = get().dep_map
        this_map.delete(id)
        set({dep_map : this_map})
    }
}));

export default dependencyController
