import { useEffect , useState} from 'react';
import { useNodesData, type Node, type NodeConnection } from '@xyflow/react';
import { useReactFlow } from '@xyflow/react';
import dependencyController from '../../../controllers/dependencyController';
import propertyController from '../../../controllers/propertyController';
const NodeComponent = (props : any) =>{
    const id = props.id
    const width = props.width ? props.width : 'fit'
    const [selected, setSelected] = useState(false);
    const {updateNodeData} = useReactFlow()
    const {remove_properties} = propertyController()
    
    const {remove_id, set_dependencies, set_children} = dependencyController()
    const CanvasListener = useNodesData(id)

    useEffect(() => {
        return(() => {
            remove_id(id)
            remove_properties(id)
        })
    }, [])

    useEffect(() => {
        let dependencies : String[] = []
        if(props.parent_handles && props.parent_handles.length != 0)
        {
            props.parent_handles.map((parent_handle : String) => (parent_handle ? dependencies.push(parent_handle.split("|")[0]) : null))
        }
        set_dependencies(id, dependencies)
    }, [JSON.stringify(props.parent_handles)])

    useEffect(() => {
        let children : String[] = []
        if(props.child_handles && props.child_handles.length != 0)
        {
            props.child_handles.map((child_handle : String) => (child_handle ? children.push(child_handle.split("|")[0]) : null))
        }
        set_children(id, children)
    }, [JSON.stringify(props.child_handles)])

    useEffect(() => {
        setSelected(props?.selected ? props.selected : false)
    }, [props?.selected])

    return (
        <>
        <div className = {`w-[${width}] h-fit p-2 border-2 rounded-xs flex flex-col justify-center items-center`}
        style = {{backgroundColor: (props.valid_node ? "green" : "red"), borderColor: (selected ? "blue" : "black")}}>
            <p className = "text-center">{props.mainText}{props?.neurons != undefined ? `[${isNaN(props.neurons) ? '' : `${props.neurons}`}]` : ""}</p>
            {props.optionsMenu ? 
                <>
                    {CanvasListener?.data?.showMenu ? 
                        <button onClick = {() => {updateNodeData(id, {showMenu: false})}}>↑</button> : 
                        <button onClick = {() => {updateNodeData(id, {showMenu: true})}}>↓</button>}
                    {CanvasListener?.data?.showMenu ? props.optionsMenu : null}
                </>
            : null}
        </div>
        </>
    );
}
export default NodeComponent