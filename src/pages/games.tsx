import { spring } from "motion";
import { useContext, useEffect, useState } from "react";
import * as motion from "motion/react-client";
import galochka from "../assets/galochka.png";
import krest from "../assets/krest.png";
import games from "../games.json";
import { PageContext } from "../providers";

function shuffle(array: any) {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function GamesPage() {
    const {setPage} = useContext(PageContext);
    const [objectList, setObjectList] = useState<any>([]);
    const [timeo, setTimeo] = useState(false);
    const [next, setNext] = useState(false);

    useEffect(() => {
        let arr = shuffle(games[0].objects);
        setObjectList(arr);
    }, [])

    useEffect(() => {
        let d = objectList.filter((object: any) => {
            return object.correct == true && object.disabled != true
        })
        if (d.length == 0 && objectList.length > 0) {
            setNext(true);
        }
    }, [objectList])

    function domHandler(event: any) {
        if (event.key === 'Escape') {
            event.preventDefault();
            setPage("home");
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', domHandler);

        return () => {document.removeEventListener('keydown', domHandler)};
    }, [])

    const handleButtonClick = (index: number) => {
        if (timeo == false) {
            setTimeo(true);
            let d = [...objectList]
            d[index] = {...d[index], selected: true};
            setObjectList(d);
            setTimeout(() => {
                let d = [...objectList]
                if (d[index] && d[index].correct) {
                    d[index] = {...d[index], selected: false, disabled: true};
                } else {
                    d[index] = {...d[index], selected: false};
                }
                
                setObjectList(d);
                setTimeo(false);
            }, 2000);
        }
    };

    return <>
        <main
            style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                width: "100vw",
                overflow: "hidden"
            }}
        >
            <img src="фон.jpg" style={{position: "absolute", width: "100vw", height: "100vh", zIndex: 1}} alt="" />
            {
                next && 
                <button
                    style={{
                        position: "absolute",
                        bottom: "20px",
                        backgroundColor: "#f0fff0",
                        right: "20px",
                        padding: "12px",
                        borderRadius: "6px",
                        zIndex: 10000,
                        cursor: "pointer"
                    }}
                    onClick={() => {setPage("home")}}
                >
                    Дальше
                </button>
            }
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 100
                }}
            >
                <div
                    style={{
                        left: "100px",
                        display: "grid",
                        gridTemplateColumns: "200px 200px",
                        gridGap: "50px",
                    }}
                >
                    {
                        objectList.map((object: any, index: number) => {
                            return (
                                <div 
                                    className="game-element"
                                    key={index}
                                    onClick={() => {object.disabled ? null : handleButtonClick(index)}}
                                >
                                    {
                                        !object.disabled && <img src={object.img} style={{width: "100%", height: "100%", objectFit: "contain"}} alt="" />
                                    }
                                    {
                                        object.selected && 
                                        <motion.div
                                            animate={{
                                                scale: [0, 2, 1.5, 2.5, 1, 2, 0],
                                                rotate: [0, -15, 15, -15, 15, 0],
                                                opacity: [0, 1, 1, 1, 1, 0]
                                            }}
                                            transition={{
                                                duration: 2,
                                                ease: "easeInOut",
                                                times: [0, 0.1, 0.3, 0.6, 0.9, 1],
                                                repeat: 1,
                                                repeatDelay: 0,
                                            }}
                                            style={{
                                                width: 200,
                                                height: 200,
                                                backgroundColor: "none",
                                                position: "absolute"
                                            }}
                                        >
                                            <img src={object.correct ? galochka : krest} alt="" style={{width: "200px", height: "200px", objectFit: "contain"}}/>
                                        </motion.div>
                                    }
                                    
                                    <style>
                                        {`
                                            .ball {
                                                width: 200px;
                                                height: 200px;
                                                background-color: #8df0cc;
                                                border-radius: 200px;
                                                transition: all ${spring(0.5, 0.8)};
                                                transform: scale(-100%);
                                                opacity: 0;
                                            }

                                            .ball[data-state="true"] {
                                                transform: scale(100%) ;
                                                opacity: 1;
                                            }
                                        `}
                                    </style>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </main>
    </>
}

export default GamesPage;
