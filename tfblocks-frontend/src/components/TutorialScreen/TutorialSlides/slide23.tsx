import { useEffect } from "react"

const Slide23 = ({setHole} : any) => {
    useEffect(() => {
        setHole(<div className = {`absolute bg-none top-0 right-0 h-1/10 w-1/10`} style = {{boxShadow: '0 0 0 10000px rgb(0 0 0 / 0.5)' }} />)
    }, [])
    return (
        <>
            <div className = 'absolute z-5 top-1/30 right-12/100'>
                <img src = 'white-down-angle.png' className = 'transform rotate-270' height = {32} width = {32}></img>
            </div>
            <div className = 'absolute z-5 h-1/10 top-1/10 right-1/10 w-1/5 flex flex-col justify-center items-center'>
                <p className = 'text-[25px] text-white text-center p-[20px]'>
                    Speaking of compilation, you can find the compilation button here!
                </p>
            </div>
            <div className = 'absolute z-5 h-full w-full flex flex-col justify-center items-center'>
                <p className = 'text-[25px] text-white text-center p-[20px]'>Clicking on it will verify your model.</p>
                <p className = 'text-[25px] text-white text-center p-[20px]'>If it's valid, it'll compile it and return the compiled model!</p>
                
            </div>
            <div className = 'absolute z-5 h-2/10 w-full flex bottom-0'>
                <p className = 'text-[25px] text-white text-center p-[20px]'>(Note: Using the Desktop version of the app will turn this button into a 'train' button that you can use to train a model!)</p>
            </div>
        </>
    )
}
export default Slide23