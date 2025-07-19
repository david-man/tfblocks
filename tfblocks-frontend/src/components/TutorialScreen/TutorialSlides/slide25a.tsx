const Slide25a = () => {
    return (
    <div className = 'absolute z-5 h-full w-full flex flex-col justify-center items-center'>
        <p className = 'text-[30px] text-white text-center p-[20px] pb-[10px]'>
                    'Axis', on the other hand, refers to the dimension you're interested in, and it is zero-indexed. For example, if your input is of shape [10,4,9], the 0th axis is of size 10, the 1st axis is of size 4, and the 2nd axis is of size 9. Many layers will only act along one axis, so take care to be specific!
                </p>
                <p className = 'text-white text-center pb-[20px]'>
                    PS: the -1st axis always refers to the last axis! Weird, yes, but it's actually common notation!
                </p>
                <p className = 'text-[30px] text-white text-center p-[20px]'>
                    To 'go along an axis', then, refers to looking at each item along that axis. For example, if your input is of shape [10,4,9], going along the 1st axis would mean considering 4 matrices, or 'features', of size [10, 1, 9].
                </p>
                <p className = 'text-[30px] text-white text-center p-[20px]'>You can find more information about shapes and axes through the individual layer help menus!</p>
            </div>)
}
export default Slide25a;