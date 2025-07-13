const Slide25 = () => {
    return (
        <>
            <div className = 'absolute z-5 h-full w-full flex flex-col justify-center items-center'>
                <p className = 'text-[25px] text-white text-center p-[20px]'>
                    When making your model, you'll come across the word 'Shape' a lot. 
                </p>
                <br />
                <p className = 'text-[25px] text-white text-center p-[20px]'>
                    'Shape' refers to the dimensions of the input/output of some layer. Most layers only work when their inputs are configured with certain shapes, so be sure to be aware of this! 
                </p>
                <p className = 'text-[25px] text-white text-center p-[20px]'>You can find more information about shapes through the help menus!</p>
            </div>
        </>
    )
}
export default Slide25