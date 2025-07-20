const CompilationMenu = (props : any) => {
    return (
        <>
        <div className = 'absolute w-full h-full z-10 flex flex-col justify-center items-center'>
            <div className = ' border-black rounded-2xl w-95/100 h-95/100 bg-gray-500 opacity-70 flex flex-col'>
            </div>
        </div>
        <div className = 'absolute w-full h-full z-11 flex flex-col justify-center items-center'>
            <div className = 'w-95/100 h-95/100 overflow-y-scroll'>
                <p className = 'text-[100px] text-white text-center p-[30px]'>Ready to Compile?</p>
                <p className = 'text-[20px] text-white text-center p-[10px]'>Compilation is the process by which we turn your model diagram into a real, functional Keras model. Exciting, right?</p>
                <p className = 'text-[20px] text-white text-center p-[10px]'>Unfortunately, because of our limited computational resources, we can't train your model through the website version. You'll have to get the Desktop version for that.</p>
                <p className = 'text-[20px] text-white text-center p-[10px]'>Instead, we will send the compiled model in a .keras file to your computer, where you can train your data on it. You'll have to accept downloads from us for that to happen, of course.</p>
                <p className = 'text-[20px] text-white text-center p-[10px]'>While this does mean that you'll have to code to use the model, we hope that we've provided a foundation for you to get started!</p>
                <p className = 'text-[20px] text-white text-center p-[75px]'>One final note: We do not keep <i>any</i> of your data. The moment you receive your model, we delete it from our systems. We know you're serious about privacy, so we're serious about keeping it.</p>
                <div className = 'pt-[100px] w-full h-fit flex justify-around items-center pb-[30px]'>
                     <div className = 'w-1/2 flex justify-around items-center'>
                        <button onClick = {props.turnOff}>
                            <div className = 'min-w-fit h-[50px] border-1 rounded-2xl border-black bg-red-400 flex justify-center items-center cursor-pointer'>
                                <div className = 'p-[15px]'>
                                    <p className = 'text-[30px] text-white text-center'>Cancel</p>
                                </div>
                            </div>
                        </button>
                        <button onClick = {() => {
                                props.upload();
                                props.turnOff();
                                }}>
                            <div className = 'min-w-fit h-[50px] border-1 rounded-2xl border-black bg-green-400 flex justify-center items-center cursor-pointer'>
                                <div className = 'p-[15px]'>
                                    <p className = 'text-[30px] text-white text-center'>Compile</p>
                                </div>
                            </div>
                        </button>
                    </div>

                </div>
            </div>
        </div>
        </>
    )
}
export default CompilationMenu