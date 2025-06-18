import { useContext } from "react";
import Header from "../components/header.component";
import { CreateGameContext, PageContext } from "../providers";
import { getSrcPath, setGame } from "../features/games";

function GameCreationPage() {
    const {setPage} = useContext(PageContext);
    const {createGame, setCreateGame} = useContext(CreateGameContext);

    const saveGameHandler = () => {
        setGame(createGame);
    }

    return (
        <>
            <Header/>
                <main style={{width: "100%", padding: "20px", position:"relative", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "start", gap: "40px"}}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "end",
                            gap: "20px"
                        }}
                    >
                        <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "20px"
                        }}
                    >
                        <div>
                            Загрузить изображение персонажа:
                        </div>
                        <div
                            style={{
                                position: "relative",
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            <input
                                type="text" 
                                placeholder="Путь до файла" 
                                value={createGame.actor}
                                onChange={(e: any) => {
                                    setCreateGame((prev: any) => {
                                        let d = {...prev};
                                        d.actor = e.target.value;
                                        return d
                                        
                                    })
                                }}
                                style={{
                                    padding: "20px",
                                    border: "none", 
                                    borderRadius: "12px",
                                    boxShadow: "0px 2px 10px -5px #00000090",
                                    width: "500px",
                                    outline: "none"
                                }}
                            />
                            <img 
                                src="loopa.png"
                                style={{width: "30px", height: "30px", position: "absolute", right: "10px"}} 
                                onClick={async () => {
                                    let path = await getSrcPath();
                                    setCreateGame((prev: any) => {
                                        let d = {...prev};
                                        d.actor = path;
                                        return d;
                                    })
                                }}
                                alt="" />
                        </div>
                       
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "20px"
                        }}
                    >
                        <div>
                            Загрузить изображение фона:
                        </div>
                        <div
                            style={{
                                position: "relative",
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            <input
                                type="text" 
                                placeholder="Путь до файла" 
                                value={createGame.bg}
                                onChange={(e: any) => {
                                    setCreateGame((prev: any) => {
                                        let d = {...prev}
                                        d.bg = e.target.value;
                                        return d
                                    })
                                }}
                                style={{
                                    padding: "20px",
                                    border: "none", 
                                    borderRadius: "12px",
                                    boxShadow: "0px 2px 10px -5px #00000090",
                                    width: "500px",
                                    outline: "none"
                                }}
                            />
                            <img 
                                src="loopa.png"
                                style={{width: "30px", height: "30px", position: "absolute", right: "10px"}} 
                                onClick={async () => {
                                    let path = await getSrcPath();
                                    setCreateGame((prev: any) => {
                                        let d = {...prev};
                                        d.bg = path;
                                        console.log(d)
                                        return d;
                                    })
                                    
                                }}
                                alt="" />
                        </div>
                       
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "20px"
                        }}
                    >
                        <div>
                            Загрузить изображение правильного предмета №1:
                        </div>
                        <div
                            style={{
                                position: "relative",
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            <input
                                type="text" 
                                placeholder="Путь до файла" 
                                value={createGame.objects[0].img}
                                onChange={(e: any) => {
                                    setCreateGame((prev: any) => {
                                        let d = {...prev}
                                        d.objects[0].img = e.target.value;
                                        return d
                                    })
                                }}
                                style={{
                                    padding: "20px",
                                    border: "none", 
                                    borderRadius: "12px",
                                    boxShadow: "0px 2px 10px -5px #00000090",
                                    width: "500px",
                                    outline: "none"
                                }}
                            />
                            <img 
                                src="loopa.png"
                                style={{width: "30px", height: "30px", position: "absolute", right: "10px"}} 
                                onClick={async () => {
                                    let path = await getSrcPath();
                                    setCreateGame((prev: any) => {
                                        let d = {...prev};
                                        d.objects[0].img = path;
                                        console.log(d)
                                        return d;
                                    })
                                    
                                }}
                                alt="" />
                        </div>
                       
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "20px"
                        }}
                    >
                        <div>
                            Загрузить изображение правильного предмета №2:
                        </div>
                        <div
                            style={{
                                position: "relative",
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            <input
                                type="text" 
                                placeholder="Путь до файла" 
                                value={createGame.objects[1].img}
                                onChange={(e: any) => {
                                    setCreateGame((prev: any) => {
                                        let d = {...prev}
                                        d.objects[1].img = e.target.value;
                                        return d
                                    })
                                }}
                                style={{
                                    padding: "20px",
                                    border: "none", 
                                    borderRadius: "12px",
                                    boxShadow: "0px 2px 10px -5px #00000090",
                                    width: "500px",
                                    outline: "none"
                                }}
                            />
                            <img 
                                src="loopa.png"
                                style={{width: "30px", height: "30px", position: "absolute", right: "10px"}} 
                                onClick={async () => {
                                    let path = await getSrcPath();
                                    setCreateGame((prev: any) => {
                                        let d = {...prev};
                                        d.objects[1].img = path;
                                        console.log(d)
                                        return d;
                                    })
                                    
                                }}
                                alt="" />
                        </div>
                       
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "20px"
                        }}
                    >
                        <div>
                            Загрузить изображение правильного предмета №3:
                        </div>
                        <div
                            style={{
                                position: "relative",
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            <input
                                type="text" 
                                placeholder="Путь до файла" 
                                value={createGame.objects[2].img}
                                onChange={(e: any) => {
                                    setCreateGame((prev: any) => {
                                        let d = {...prev}
                                        d.objects[2].img = e.target.value;
                                        return d
                                    })
                                }}
                                style={{
                                    padding: "20px",
                                    border: "none", 
                                    borderRadius: "12px",
                                    boxShadow: "0px 2px 10px -5px #00000090",
                                    width: "500px",
                                    outline: "none"
                                }}
                            />
                            <img 
                                src="loopa.png"
                                style={{width: "30px", height: "30px", position: "absolute", right: "10px"}} 
                                onClick={async () => {
                                    let path = await getSrcPath();
                                    setCreateGame((prev: any) => {
                                        let d = {...prev};
                                        d.objects[2].img = path;
                                        console.log(d)
                                        return d;
                                    })
                                    
                                }}
                                alt="" />
                        </div>
                       
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "20px"
                        }}
                    >
                        <div>
                            Загрузить изображение правильного предмета №4:
                        </div>
                        <div
                            style={{
                                position: "relative",
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            <input
                                type="text" 
                                placeholder="Путь до файла" 
                                value={createGame.objects[3].img}
                                onChange={(e: any) => {
                                    setCreateGame((prev: any) => {
                                        let d = {...prev}
                                        d.objects[3].img = e.target.value;
                                        return d
                                    })
                                }}
                                style={{
                                    padding: "20px",
                                    border: "none", 
                                    borderRadius: "12px",
                                    boxShadow: "0px 2px 10px -5px #00000090",
                                    width: "500px",
                                    outline: "none"
                                }}
                            />
                            <img 
                                src="loopa.png"
                                style={{width: "30px", height: "30px", position: "absolute", right: "10px"}} 
                                onClick={async () => {
                                    let path = await getSrcPath();
                                    setCreateGame((prev: any) => {
                                        let d = {...prev};
                                        d.objects[3].img = path;
                                        console.log(d)
                                        return d;
                                    })
                                    
                                }}
                                alt="" />
                        </div>
                       
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "20px"
                        }}
                    >
                        <div>
                            Загрузить изображение неправильного предмета №1:
                        </div>
                        <div
                            style={{
                                position: "relative",
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            <input
                                type="text" 
                                placeholder="Путь до файла" 
                                value={createGame.objects[4].img}
                                onChange={(e: any) => {
                                    setCreateGame((prev: any) => {
                                        let d = {...prev}
                                        d.objects[4].img = e.target.value;
                                        return d
                                    })
                                }}
                                style={{
                                    padding: "20px",
                                    border: "none", 
                                    borderRadius: "12px",
                                    boxShadow: "0px 2px 10px -5px #00000090",
                                    width: "500px",
                                    outline: "none"
                                }}
                            />
                            <img 
                                src="loopa.png"
                                style={{width: "30px", height: "30px", position: "absolute", right: "10px"}} 
                                onClick={async () => {
                                    let path = await getSrcPath();
                                    setCreateGame((prev: any) => {
                                        let d = {...prev};
                                        d.objects[4].img = path;
                                        console.log(d)
                                        return d;
                                    })
                                    
                                }}
                                alt="" />
                        </div>
                       
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "20px"
                        }}
                    >
                        <div>
                            Загрузить изображение неправильного предмета №2:
                        </div>
                        <div
                            style={{
                                position: "relative",
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            <input
                                type="text" 
                                placeholder="Путь до файла" 
                                value={createGame.objects[5].img}
                                onChange={(e: any) => {
                                    setCreateGame((prev: any) => {
                                        let d = {...prev}
                                        d.objects[5].img = e.target.value;
                                        return d
                                    })
                                }}
                                style={{
                                    padding: "20px",
                                    border: "none", 
                                    borderRadius: "12px",
                                    boxShadow: "0px 2px 10px -5px #00000090",
                                    width: "500px",
                                    outline: "none"
                                }}
                            />
                            <img 
                                src="loopa.png"
                                style={{width: "30px", height: "30px", position: "absolute", right: "10px"}} 
                                onClick={async () => {
                                    let path = await getSrcPath();
                                    setCreateGame((prev: any) => {
                                        let d = {...prev};
                                        d.objects[5].img = path;
                                        console.log(d)
                                        return d;
                                    })
                                    
                                }}
                                alt="" />
                        </div>
                       
                    </div>
                    </div>
                    <button
                        className="enter-button"
                        style={{
                            width: "300px",
                        }}
                        onClick={() => {
                            saveGameHandler();
                            setCreateGame({
                                name: "",
                                actor: "",
                                bg: "",
                                objects: [
                                    {
                                        "correct": true,
                                        "img": ""
                                    },
                                    {
                                        "correct": true,
                                        "img": ""
                                    },
                                    {
                                        "correct": true,
                                        "img": ""
                                    },
                                    {
                                        "correct": true,
                                        "img": ""
                                    },
                                    {
                                        "correct": false,
                                        "img": ""
                                    },
                                    {
                                        "correct": false,
                                        "img": ""
                                    }
                                ]
                            })
                            setPage("main");
                        }}
                    >
                        Сохранить
                    </button>
                </main>
        </>
    )
}

export default GameCreationPage;
