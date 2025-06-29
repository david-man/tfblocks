import { useEffect , useState, useRef} from 'react';
import { NodeResizer, NodeToolbar, Position, useNodesData, type Node, type NodeConnection } from '@xyflow/react';
import { useReactFlow } from '@xyflow/react';
import dependencyController from '../../../controllers/dependencyController';
import propertyController from '../../../controllers/propertyController';


const NodeComponent = (props : any) =>{
    const id = props.id
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
            {props?.neurons != undefined && !isNaN(props.neurons) ? 
                <NodeToolbar isVisible = {props?.selected} position = {Position.Top}>
                    <div className = "rounded-xl bg-gray-700 flex flex-col justify-center items-center font-[roboto]">
                        <p className = 'text-center text-white text-nowrap p-2'>Neurons: {props.neurons}</p>
                    </div>
                </NodeToolbar> 
                : null}
            <div className = {`h-full w-full p-1 border-2 rounded-lg flex flex-col justify-center items-center text-nowrap font-[roboto]`}
            style = {{backgroundColor: (props.valid_node ? "green" : "red"), borderColor: (selected ? "blue" : "black")}}>
                <div className = 'p-[9px]'>
                    <p className = "text-center">{props.mainText}</p>
                    {props.subtext ? <p className = "text-center">{props.subtext}</p> : null}
                </div>
                {props.optionsMenu ? 
                <>
                    <div className = {`flex flex-col justify-center items-center transition-transform ease-linear duration-200 ${CanvasListener?.data?.showMenu ? 'transform rotate-180' : ''}`}>
                        <button onClick = {() => {updateNodeData(id, {showMenu: !CanvasListener?.data?.showMenu})}}>
                            <img src = "arrow-down-angle.svg" alt = "▲" className = "w-[8px] h-[8px]"/>
                        </button> 
                    </div>
                    <div className = {`ease-in-out transition-all duration-300 ${CanvasListener?.data?.showMenu ? 'opacity-100 max-h-[900px]' : 'opacity-0 max-h-0'}`}>
                        {props.optionsMenu}
                    </div>
                </>
                : null}
            </div>
            
        
        </>
    );
}
export default NodeComponent