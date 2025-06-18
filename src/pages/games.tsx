import { spring } from "motion";
import { useContext, useEffect, useState } from "react";
import * as motion from "motion/react-client";
import galochka from "../assets/galochka.png";
import krest from "../assets/krest.png";
import { PageContext } from "../providers";
import { getGamePicture, getGames } from "../features/games";

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
    const [setGameList] = useState<any>([]);
    const [stage, setStage] = useState<number>(0);
    const [queue, setQueue] = useState<any>([]);
    
    const getG = async () => {
        let games = await getGames();
        setQueue(shuffle(games)); 
        
        setGameList(games.filter((gme: any) => gme.name.toLocaleLowerCase().includes(gme.name.toLowerCase())));
    }

    useEffect(() => {
        getG();
    }, [])


    const [pictureSet, setPicSet] = useState({
        background: "",
        actor: "",
        images: []
    })

    const getPics = async () => {
        let arr = shuffle(queue[stage].objects);
        setObjectList(arr);
        let background = await getGamePicture(queue[stage].bg);
        let actor = await getGamePicture(queue[stage].actor);

        let rarr: any = await Promise.all([
            getGamePicture(queue[stage].objects[0].img),
            getGamePicture(queue[stage].objects[1].img),
            getGamePicture(queue[stage].objects[2].img),
            getGamePicture(queue[stage].objects[3].img),
            getGamePicture(queue[stage].objects[4].img),
            getGamePicture(queue[stage].objects[5].img),
        ])

        setPicSet({
            background: background,
            actor: actor,
            images: rarr
        })
        
    }

    useEffect(() => {
        
        getPics()
    }, [queue, stage])

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

    const handleNextClick = () => {
        if (queue.length -1 == stage || stage == 4) {
            setPage("home")
        }
        setStage(prev => prev + 1)
        setNext(false)
        
    }

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
            <img src={pictureSet.actor} style={{position: "absolute", height: "50%", zIndex: 100, bottom: "5%", left: "5%"}} alt="" />
            <img src={pictureSet.background} style={{position: "absolute", width: "100vw", height: "100vh", zIndex: 1}} alt="" />
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
                    onClick={handleNextClick}
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
                        position: "absolute",
                        right: "25%",
                        bottom: "10%",
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
                                        !object.disabled && <img src={pictureSet.images[index]} style={{width: "100%", height: "100%", objectFit: "contain"}} alt="" />
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
                                                width: 150,
                                                height: 150,
                                                backgroundColor: "none",
                                                position: "absolute"
                                            }}
                                        >
                                            <img src={object.correct ? galochka : krest} alt="" style={{width: "150px", height: "150px", objectFit: "contain"}}/>
                                        </motion.div>
                                    }
                                    
                                    <style>
                                        {`
                                            .ball {
                                                width: 150px;
                                                height: 150px;
                                                background-color: #8df0cc;
                                                border-radius: 150px;
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
