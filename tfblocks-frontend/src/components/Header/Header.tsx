import '../../App.css'
import dependencyController from '../../controllers/dependencyController'
import nodeController from '../../controllers/nodeController'
import propertyController from '../../controllers/propertyController'
import axios from 'axios'
import type { Node } from '@xyflow/react'
import FileController from '../../controllers/fileManager'
import { useEffect, useState } from 'react'
import CompilationMenu from './CompilationMenu'

const Header = () => {
    const {nodes} = nodeController()
    const {get_file} = FileController()
    const {get_map, get_properties} = propertyController()
    const {get_dep_map, get_child_map, get_network_heads, get_dependencies, get_children} = dependencyController()
    const [userCompile, setUserCompile] = useState(false)
    const [instanceID, setInstanceID] = useState(-1)

    const findNetwork = (id : String) => {
        let to_ret = "hanging"
        get_network_heads().map((network_head : String) => {
        let nodes_to_search = [network_head]
        let nodes_searched : Array<String> = []
        while(!(nodes_to_search.length === 0) && to_ret  === 'hanging'){
            let next_node = nodes_to_search.pop()!
            if(next_node === id){
            to_ret = network_head as string
            }
            let dep = get_dependencies(next_node)
            let children = get_children(next_node)
            let surroundings = dep.concat(children).filter((next : String) => !nodes_searched.includes(next))

            if(surroundings.includes(id)){
            to_ret = network_head as string
            }
            else{
            nodes_to_search = nodes_to_search.concat(surroundings)
            nodes_searched.push(next_node)
            }
        }
        })
        if(to_ret == 'out'){
            to_ret = 'in'//the network for the output layer should ALWAYS be the same as the network for the input layer.
        }
        return to_ret
    }

    const upload = async () => {
        const filtered_network_heads = get_network_heads().filter((id : string) => (id != 'out'))
        try{
            const resp = await axios.post('http://localhost:8000/api/sendModel/', {
                active_nodes : [...nodes.map((node : Node) => {
                    return {id: node.id, type: node.type}
                }).filter((node) => findNetwork(node.id) != 'hanging')],//active nodes defined as nodes that aren't floating around
                properties_map: [...get_map()],
                dependency_map : [...get_dep_map()],
                child_map : [...get_child_map()],
                network_heads : filtered_network_heads,
                instance_id : instanceID
            }, {responseType: 'blob'})
            if(resp.status == 200){
                const url = window.URL.createObjectURL(new Blob([resp.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'model.keras'); // Use the desired filename
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.URL.revokeObjectURL(url); // Clean up the URL object
            }
            else{
                alert("There was an error in the backend somewhere! Sorry :(")
            }
            
        }
        catch (err){
            alert("There was an error uploading your model! Perhaps the backend server is down :(")
        }
        try{
            await axios.post('http://localhost:8000/api/release_data/', {'instance_id': instanceID})
        }
        catch(err){
            return
        }
    }

    const handleClick = async () => {
        let send = true;
        let files : File[] = []
        let file_ids : string[] = []
        nodes.map((node : Node) => {
            const id = node.id
            if(node.type == 'recurrent_head'){
                const external_id = 'rec_hidden_' + id.toString()
                if(!get_properties(id) || !get_properties(id)?.valid){
                    if(findNetwork(external_id) != 'hanging'){
                        send = false
                    }
                }
            }
            else {
                if((!get_properties(id) || !(get_properties(id)?.valid)) && findNetwork(id) != 'hanging'){
                    send = false;
                }
                else{
                    if(node.type == 'custom_matrix' && findNetwork(id) != 'hanging'){//compile all the files that need to be sent to the main server
                        if(get_file(id)){
                            files.push(get_file(id)!)
                            file_ids.push(id)
                        }
                        else{
                            alert("Something went wrong when retrieving your custom matrices. Aborting compilation.")
                            return
                        }
                    }
                }

                
            }
        })
        
        if(!send){
            alert("This graph isn't ready to be parsed yet! Make sure you have a valid configuration!")
        }
        else{
            let i = 0
            while(i < files.length){
                const file = files[i]
                const formData = new FormData()
                formData.append('instance_id', instanceID.toString())
                formData.append('matrix', file)
                formData.append('save_as', file_ids[i])
                try{
                    const resp = await axios.post('http://localhost:8000/api/sendMatrices/', formData)
                    if(resp.status != 200){
                        alert("Something went wrong when uploading your custom matrices. Aborting compilation.")
                        return
                    }
                    i = i+1
                }
                catch(err){
                    alert("Something went wrong when uploading your custom matrices. Aborting compilation.")
                    return
                }
            }
            setUserCompile(true)
        }
    }

    const turnOff = async () => {
        setUserCompile(false)
    }
    useEffect(() => {
        setInstanceID(Date.now())
    }, [])
    return (
        <>
            {userCompile ? <CompilationMenu turnOff = {turnOff} upload = {upload}/> : null}
            <div className = "border-2 border-gray-500 w-full h-full relative">
                <div className = 'h-full w-1/12 flex flex-col items-center justify-center absolute left-8'>
                    <img src = {'logo.png'} width = '60px' height = '60px'></img>
                </div>
                <div className = "absolute top-1/8 right-10 h-3/4 rounded-full border-2 border-gray-500 bg-green-300 flex justify-center items-center aspect-square">
                    <button onClick = {handleClick} className = 'text-[10px] flex flex-col justify-center items-center cursor-pointer'>
                        <img src = 'upload.png' height = {25} width = {25}></img>
                        <p>Compile!</p>
                    </button>
                </div>
                
                {/* <div className = 'absolute top-1/8 right-2/5 w-1/5 h-3/4'>
                    {trainingState ? <TrainingElement setTrainingState = {setTrainingState}/> : <IdleElement setTrainingState = {setTrainingState}/>}
                </div> 
                this element will only be included on the desktop version
                */}
            </div>
        </>
    )
}
export default Header