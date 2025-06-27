import { create } from "zustand";

type DependencyMap = {
network_heads: Array<string>,
  child_map : Map<String, Array<String>>,//node to all child nodes
  dep_map : Map<String, Array<String>>,//node to all parent nodes
  get_dep_map : () => Map<String, Array<String>>,
  get_dependencies : (id: String | undefined) => Array<String>,
  set_dependencies : (id : String, dependencies : Array<String>) => void
  remove_id : (id : String) => void,

  get_child_map: () => Map<String, Array<String>>,
  get_children : (id: String | undefined | null) => Array<String>,
  set_children : (id:String, children: Array<String>) => void

  add_network_head : (head : string) => void,
  remove_network_head : (head : string) => void,
  get_network_heads : () => Array<string>
};

export type {DependencyMap};

const dependencyController = create<DependencyMap>((set, get) => ({
    network_heads : ['in', 'out'],
    child_map : new Map(),
    dep_map: new Map(),
    get_dep_map : () => get().dep_map,
    get_dependencies: (id : String | undefined) => {
        if(id && get().dep_map.get(id)){
            return get().dep_map.get(id)!
        }
        else{
          return []
        }},
    set_dependencies: (id: String, dependencies : Array<String>) => {
        const this_map = new Map(get().dep_map)
        this_map.set(id, dependencies)
        set({dep_map : this_map})
    },
    get_child_map : () => get().child_map,
    get_children : (id : String | undefined | null) => {
        if(id && get().child_map.get(id)){
            return get().child_map.get(id)!
        }
        else{
            return []
        }
    },
    set_children : (id : String, children: Array<String> | undefined) => {
        if(children){
            const this_map = new Map(get().child_map)
            this_map.set(id, children)
            set({child_map : this_map})
        }
    },
    add_network_head : (id : string) => {
        const new_heads = [...get().network_heads]
        new_heads.push(id)
        set({network_heads : new_heads})
    },
    remove_network_head : (id : string) => {
        let new_heads = [...get().network_heads]
        new_heads = new_heads.filter((head : string) => (head != id))
        set({network_heads : new_heads})
    },
    get_network_heads : () => get().network_heads,
    remove_id : (id : String) => {
        const this_map = new Map(get().dep_map)
        this_map.delete(id)

        const this_network = new Map(get().child_map)
        this_network.delete(id)

        let new_heads = [...get().network_heads]
        new_heads = new_heads.filter((head : string) => (head != id))
        set({dep_map : this_map, child_map : this_network, network_heads : new_heads})
    }
}));

export default dependencyController
