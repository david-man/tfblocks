import { useState, useEffect } from "react"
import axios from "axios"
const TrainingElement = (props : any) => {
    const setTrainingState = props.setTrainingState
    const [lastState, setLastState] = useState(null)
    const fetchProgress = async () => {
        try{
            const resp = await axios.get(`${import.meta.env.API_ROUTE}//api/progressStatus/`)
            if(resp.data['progress']){
                setLastState(resp.data['progress'])
                if(resp.data['progress'] >= 10){
                    setTrainingState(false)
                }
            }
        }
        catch (err){
            
        }
    }
    useEffect(() => {
        const progressGetter = setInterval(fetchProgress, 1000)
        return () => {clearInterval(progressGetter)}
    }, [])
    return <div className = 'border-1 rounded-xl border-black w-full h-full flex justify-center items-center'>
        <p className = 'text-2xl text-center'>{lastState ? lastState : '?'}</p>
    </div>
}

export default TrainingElement