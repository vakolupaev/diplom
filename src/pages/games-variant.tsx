import { useContext, useEffect, useState } from "react";
import Header from "../components/header.component";
import { CreateGameContext, GameContext, PageContext } from "../providers";
import { deleteGameFolder, editGame, getGames } from "../features/games";

function GamesVariantPage() {
    const {game, setGame} = useContext(GameContext);
    const [gameList, setGameList] = useState([]);
    const [change, setChange] = useState(false);
    const [create, setCreate] = useState(false);
    const [createG, setCreateG] = useState("");
    const {setPage} = useContext(PageContext);
    const {setCreateGame} = useContext(CreateGameContext);

    const getG = async () => {
        let games = await getGames();
        setGameList(games.filter((gme: any) => gme.name.toLocaleLowerCase().includes(gme.name.toLowerCase())));
    }

    const DeleteGameHandler = () => {
        let deletegame: any = gameList.find((game: any) => game.selected == true);
        let d = gameList.filter((game: any) => game.selected == false);
        let m = d.map((obj: any) => {
            return {
                name: obj.name,
                actor: obj.actor,
                bg: obj.bg,
                objects: obj.objects
            }
        })

        editGame(m)
        deleteGameFolder(deletegame.name)
        getG()
    }

    useEffect(() => {
        getG()
    }, [])

    let get = async (inp: string) => {
        let games = await getGames();
        setGameList(games.filter((usr: any) => usr.name.toLocaleLowerCase().includes(inp)));
    }

    function InputHandler(e: any) {
        const inp: string = e.target.value.toLowerCase();
        setGame(e.target.value);
        get(inp)
    }

    function SelectGameHandler(index: number) {
        let d: any = gameList.map((game: any) => {
            return {
                ...game,
                selected: false
            }
        });

        d[index] = {...d[index], selected: true};
        setGame(d[index].name);
        setGameList(d);
    }

    return (
        <>
            <Header/>

            <main style={{width: "100%", padding: "20px", position:"relative", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "row", alignItems: "start", justifyContent: "start", gap: "20px"}}>
                <div
                    style={{
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                        height: "calc(100% - 90px)",
                        width: "30%",
                        background: "#f9f9f9",
                        padding: "20px",
                        boxShadow: "0px 2px 10px -5px #00000090",
                        borderRadius: "12px",
                        overflowY: "scroll",
                    }}
                >
                    <input
                        autoFocus
                        type="text"
                        value={game}
                        style={{
                            position: "absolute",
                            width: "calc(100% - 40px)",
                            padding: "20px",
                            borderRadius: "12px",
                            outline: "none",
                            height: "60px",
                            boxSizing:"border-box",
                            border: "none",
                            boxShadow: "0px 2px 10px -5px #00000090",
                            zIndex: 10
                        }}
                        onChange={InputHandler}
                    />

                    <div
                        style={{
                            position: "relative",
                            zIndex: 1,
                            opacity: 0,
                            padding: "20px",
                            borderRadius: "12px",
                            cursor: "default"
                        }}
                    >
                        Hello
                    </div>
                    {
                        gameList.map((game: any, index) => {
                            return (
                                <div
                                    key={index}
                                    style={{
                                        backgroundColor: game.selected ? "#adff2fc0" : "#ffffff",
                                        boxShadow: "0px 2px 10px -5px #00000090",
                                        padding: "20px",
                                        borderRadius: "12px",
                                        cursor: "pointer",
                                    }}

                                    onClick={() => SelectGameHandler(index)}
                                >
                                    {game.name}
                                </div>
                            )
                        })
                    }
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "#f9f9f9",
                        boxShadow: "0px 2px 10px -5px #00000090",
                        padding: "20px",
                        gap: "20px",
                        borderRadius: "12px",
                    }}
                >
                    <button
                        style={{
                            padding: "20px",
                            backgroundColor: "#ffffff",
                            borderRadius: "12px",
                            boxShadow: "0px 2px 10px -5px #00000090",
                            width: "200px"
                        }}

                        onClick={() => {setCreate(!create); setCreateG(""); setChange(false)}}
                    >
                        Добавить
                    </button>
                    <button
                        style={{
                            padding: "20px",
                            backgroundColor: "#ffffff",
                            borderRadius: "12px",
                            boxShadow: "0px 2px 10px -5px #00000090",
                            width: "200px"
                        }}

                        onClick={() => {
                            DeleteGameHandler();
                        }}
                    >
                        Удалить
                    </button>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px"
                    }}
                >
                    {
                        create && !change 
                        &&
                        <>
                            <input
                                autoFocus
                                type="text"
                                value={createG}
                                style={{
                                    width: "400px",
                                    padding: "20px",
                                    borderRadius: "12px",
                                    outline: "none",
                                    height: "60px",
                                    boxSizing:"border-box",
                                    border: "none",
                                    boxShadow: "0px 2px 10px -5px #00000090",
                                    zIndex: 10
                                }}
                                onChange={(e) => {setCreateG(e.target.value)}}
                            />
                            <button
                                className="enter-button"
                                onClick={() => {setCreate(false); setCreateGame((prev: any) => {return {...prev, name: createG}}); setPage("gamecreation")}}
                            >
                                Добавить
                            </button>
                        </>
                    }
                    
                </div>
            </main>
        </>
    )
}

export default GamesVariantPage
