const Slide25 = () => {
    return (
        <>
            <div className = 'absolute z-5 h-full w-full flex flex-col justify-center items-center'>
                <p className = 'text-[30px] text-white text-center p-[20px]'>
                    When making your model, you'll come across the words 'Shape' and 'Axis' a lot. 
                </p>
                <br />
                <p className = 'text-[30px] text-white text-center p-[20px]'>
                    'Shape' refers to the dimensions of the input/output of some layer. For example, if you had a 16x16 3-channel RGB image, your input shape would be [16,16,3].
                </p>
                </div>
        </>
    )
}
export default Slide25