import { useEffect , useState} from 'react';
import { NodeToolbar, Position, useNodesData, useUpdateNodeInternals} from '@xyflow/react';
import { useReactFlow } from '@xyflow/react';
import dependencyController, {type DependencyMap} from '../../../controllers/dependencyController';
import propertyController, {type IdPropertyMap} from '../../../controllers/propertyController';
import helpMenuController, {type Help} from '../../../controllers/helpMenuController';
import { useShallow } from 'zustand/shallow';


const NodeComponent = (props : any) =>{
    //Generic node component with generic style that interacts with general dependencies, properties, and can toggle the respective help menu
    const id = props.id
    const updateNodeInternals = useUpdateNodeInternals();
    const dummy = props?.dummy ? props.dummy : false
    const txt_color = props.txt_color ? props.txt_color : 'black'
    const bg_color = props.bg_color ? props.bg_color : null
    const border_color = props.valid_node ? "border-emerald-500" : "border-gray-500"

    const [selected, setSelected] = useState(false);

    const {updateNodeData} = useReactFlow()//only used so that the canvas can let the node know to release its options menu
    const CanvasListener = useNodesData(id)

    const {setMenu} = helpMenuController(useShallow((state : Help) => {
        return {
            setMenu : state.setHelpMenu
        }
    }))
    const {remove_properties} = propertyController(useShallow((state : IdPropertyMap) => {
        return {
            remove_properties : state.remove_properties
        }
    }))
    
    const {remove_id, set_dependencies, set_children} = dependencyController(useShallow((state : DependencyMap) => {
        return {
            remove_id: state.remove_id,
            set_dependencies : state.set_dependencies,
            set_children : state.set_children
        }
    }))
    

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
                    <div className = "rounded-xl bg-gray-700 flex flex-col justify-center items-center">
                        <p className = 'text-center text-white text-nowrap p-2'>Trainable Weights: {props.neurons}</p>
                    </div>
                </NodeToolbar> 
                : null}
            <div className = {`relative h-full w-full p-1 border-2 rounded-lg flex flex-col justify-center items-center text-nowrap 
            ${selected ? 'shadow-2xl/50' : null} 
            ${bg_color}
            ${border_color}`}
            style = {{color: (txt_color)}}>
            
                <button onClick = {() => !dummy ? setMenu(props.type) : null}>
                    <div className = 'absolute top-[5px] right-[5px] z-1 cursor-help'>
                        <img src="question.png" alt="help" width = "12px" height = "12px"/>
                    </div>
                </button>
                <div className = 'p-[9px]'>
                    <p className = "text-center">{props.mainText}</p>
                    {props.subtext ? <p className = "text-center">{props.subtext}</p> : null}
                </div>
                {props.optionsMenu ? 
                <>
                    <div className = {`flex flex-col justify-center items-center transition-transform ease-linear duration-200 ${CanvasListener?.data?.showMenu ? 'transform rotate-180' : ''}`}>
                        <button onClick = {() => {
                                if(!dummy){
                                    updateNodeData(id, {showMenu: !CanvasListener?.data?.showMenu})
                                    updateNodeInternals(id)
                                }
                            }}>
                            <img src = "arrow-down-angle.svg" alt = "▲" className = "w-[8px] h-[8px] cursor-pointer "/>
                        </button> 
                    </div>
                    <div className = {`ease-in-out transition-all duration-300 ${CanvasListener?.data?.showMenu ? 'opacity-100 max-h-[900px]' : 'opacity-0 max-h-0'}`}>
                        {CanvasListener?.data?.showMenu ? props.optionsMenu : null}
                    </div>
                </>
                : null}
            </div>
            
        
        </>
    );
}
export default NodeComponent