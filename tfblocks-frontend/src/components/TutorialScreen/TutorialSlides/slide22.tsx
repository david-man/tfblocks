import { useEffect } from "react"

const Slide22 = ({setHole} : any) => {
    useEffect(() => {
        setHole(<div className = {`absolute bg-none top-[calc(20%+4px)] left-[calc(30%+4px)] h-6/10 w-[calc(100%-30%-40px)]`} style = {{boxShadow: '0 0 0 10000px rgb(0 0 0 / 0.5)' }} />)
    }, [])
    return (
        <div className = 'absolute z-5 h-full left-0 w-30/100 flex justify-center items-center'>
            <p className = 'text-[25px] text-white text-center p-[20px]'>
                For compilation, the only strict requirement for a model is that the input layer leads to the output layer.
            </p>
            <p className = 'text-[25px] text-white text-center p-[20px]'>That's why you start off with an input layer and an output layer, neither of which are deletable.</p>
        </div>
    )
}
export default Slide22