import { useEffect } from "react"

const Slide12 = ({setHole} : any) => {
    useEffect(() => {
        setHole(<div className = {`absolute bg-none top-[calc(20%+4px)] left-[calc(30%+4px)] h-6/10 w-[calc(100%-30%-40px)]`} style = {{boxShadow: '0 0 0 10000px rgb(0 0 0 / 0.5)' }} />)
    }, [])
    return (
        <div className = 'absolute z-5 h-full left-0 w-30/100 flex justify-center items-center'>
            <p className = 'text-[25px] text-white text-center p-[20px]'>
                To begin building your model, you need to drag layers into the canvas, located in this area!
            </p>
            <img className = 'transform rotate-270' src = 'white-down-angle.png' height = {32} width = {32}></img>
        </div>
    )
}
export default Slide12