import { useEffect , useState} from 'react';
import { useNodesData, type Node } from '@xyflow/react';
import { useReactFlow } from '@xyflow/react';
import dependencyController from '../../../controllers/dependencyController';


const NodeComponent = (props : any) =>{
    const id = props.id
    const width = props.width ? props.width : '100px'
    const parent_nodes : Node[] = props.parents
    const [selected, setSelected] = useState(false);
    const {updateNodeData} = useReactFlow()
    const {remove_id, set_dependencies} = dependencyController()
    const CanvasListener = useNodesData(id)

    useEffect(() => {
        let dependencies : String[] = []
        if(parent_nodes && parent_nodes.length != 0)
        {
            parent_nodes.map((parent : Node) => (parent?.id ? dependencies.push(parent.id) : null))
        }
        set_dependencies(id, dependencies)
        return(() => remove_id(id))
    }, [JSON.stringify(parent_nodes)])

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