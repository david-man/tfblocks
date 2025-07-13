import { create } from "zustand";

type FileMap = {
    map: Map<String, File>,
    add_id: (s : String, f : File) => void,
    remove_id : (s: String) => void,
    get_file: (s : String) => File | undefined
}

export type {FileMap}

const FileController = create<FileMap>((set, get) => ({
    map: new Map,
    add_id: (s: String, f: File) => {
        const new_map = get().map
        new_map.set(s, f)
        set({map: new_map})
    },
    remove_id: (s: String) => {
        const new_map = get().map
        new_map.delete(s)
        set({map: new_map})
    },
    get_file : (s : String) => get().map.get(s)
}))

export default FileController