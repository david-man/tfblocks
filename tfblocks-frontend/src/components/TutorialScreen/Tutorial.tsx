import { useState } from "react";
import WelcomeScreen from "./TutorialSlides/welcome";
import Slide1 from "./TutorialSlides/slide1";
import Slide2 from "./TutorialSlides/slide2";
import Slide3 from "./TutorialSlides/slide3";
import Slide4 from "./TutorialSlides/slide4";
import Slide6 from "./TutorialSlides/slide6";
import Slide9 from "./TutorialSlides/slide9";
import Slide10 from "./TutorialSlides/slide10";
import Slide12 from "./TutorialSlides/slide12";
import Slide13 from "./TutorialSlides/slide13";
import Slide14 from "./TutorialSlides/slide14";
import Slide15 from "./TutorialSlides/slide15";
import Slide16 from "./TutorialSlides/slide16";
import Slide17 from "./TutorialSlides/slide17";
import Slide18 from "./TutorialSlides/slide18";
import Slide19 from "./TutorialSlides/slide19";
import Slide20 from "./TutorialSlides/slide20";
import Slide22 from "./TutorialSlides/slide22";
import Slide24 from "./TutorialSlides/slide24";
import Slide23 from "./TutorialSlides/slide23";
import Slide5 from "./TutorialSlides/slide5";
import Slide21 from "./TutorialSlides/slide21";
import Slide25 from "./TutorialSlides/slide25";
import Slide26 from "./TutorialSlides/slide26";
import Slide11 from "./TutorialSlides/slide11";
import Slide8 from "./TutorialSlides/slide8";
import Slide7 from "./TutorialSlides/slide7";
import Slide25a from "./TutorialSlides/slide25a";

const TutorialMenu = ({turnOff} : any) => {
    const [slide, setSlide] = useState<number>(0)
    const [hole, setHole] = useState(undefined)
    const slides = [<WelcomeScreen />,
                     <Slide1 />,
                      <Slide2 />,
                       <Slide3 />,
                        <Slide4 />,
                         <Slide5 />,
                          <Slide6 />,
                           <Slide7 />,
                            <Slide8 />,
                             <Slide9 />,
                              <Slide10 setHole = {setHole}/>,
                               <Slide11 setHole = {setHole}/>,
                                <Slide12 setHole = {setHole}/>,
                                 <Slide13 />,
                                  <Slide14 />,
                                   <Slide15 />,
                                    <Slide16 />,
                                     <Slide17 />,
                                      <Slide18 />,
                                       <Slide19 />,
                                        <Slide20 />,
                                         <Slide21 />,
                                          <Slide22 setHole = {setHole}/>,
                                           <Slide23 setHole = {setHole}/>,
                                            <Slide24 />,
                                             <Slide25 />,
                                             <Slide25a />,
                                              <Slide26 />]
    const slideToShow = () => {
        if(slide < slides.length){
            return slides[slide]
        }
        else{
            turnOff()
        }
    }
    return (
        <>
            <div className = 'absolute top-10 right-10 z-10'>
                <button onClick = {turnOff} className = 'cursor-pointer flex flex-col justify-center items-center'>
                    <img src = 'gray_cancel.png' height = '50px' width = '50px'></img>
                    <p className = 'text-lg text-gray-100'>Exit Tutorial</p>
                </button>
            </div>
            <div className = 'absolute bottom-10 right-10 z-10'>
                <button onClick = {() => {setHole(undefined); setSlide(slide + 1)}} className = 'cursor-pointer flex flex-col justify-center items-center'>
                    <img src = 'gray_right_arrow.png' height = '30' width = '50' className = 'object-cover'></img>
                    <p className = 'text-lg text-gray-100'>Next</p>
                </button>
            </div>
            {slide == 0 ? null : 
            <div className = 'absolute bottom-10 left-10 z-10'>
                <button onClick = {() => {setHole(undefined); setSlide(slide - 1)}} className = 'cursor-pointer flex flex-col justify-center items-center'>
                    <img src = 'gray_right_arrow.png' height = '30' width = '50' className = 'object-cover transform rotate-180'></img>
                    <p className = 'text-lg text-gray-100'>Back</p>
                </button>
            </div>}
            {slideToShow()}
            {hole ? hole : 
            <div className = {`absolute bg-none top-0 right-0 h-0 w-0`} style = {{boxShadow: '0 0 0 10000px rgb(0 0 0 / 0.5)' }} />}
        </>
    );
};

export default TutorialMenu;