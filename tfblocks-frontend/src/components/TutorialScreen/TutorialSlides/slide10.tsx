import { useEffect } from "react"

const Slide10 = ({setHole} : any) => {
    useEffect(() => {
        setHole(<div className = {`absolute bg-none top-[calc(10%+4px)] left-0 h-9/10 w-[calc(23%+4px)]`} style = {{boxShadow: '0 0 0 10000px rgb(0 0 0 / 0.5)' }} />)
    }, [])
    return (
        <div className = 'absolute z-5 h-full left-1/4 w-3/4 flex items-center'>
            <img className = 'transform rotate-90' src = 'white-down-angle.png' height = {32} width = {32}></img>
            <p className = 'text-[25px] text-white text-center p-[20px]'>
                You can find all the layers supported by tfBlocks here in the toolbox.
            </p>
        </div>
    )
}
export default Slide10