import { useContext, useEffect, useState } from "react";
import Header from "../components/header.component";
import games from "../games.json";
import { GameContext, PageContext } from "../providers";

function GamesVariantPage() {
    const {game, setGame} = useContext(GameContext);
    const [gameList, setGameList] = useState(games);
    const [change, setChange] = useState(false);
    const [create, setCreate] = useState(false);
    const [createUser, setCreateUser] = useState("");
    const {setPage} = useContext(PageContext);

    useEffect(() => {
        setGameList(games.filter((gme) => gme.name.toLocaleLowerCase().includes(gme.name.toLowerCase())));
    }, [])

    function InputHandler(e: any) {
        const inp = e.target.value.toLowerCase();
        setGame(e.target.value);
        setGameList(games.filter((usr) => usr.name.toLocaleLowerCase().includes(inp)));
    }

    function SelectUserHandler(index: number) {
        let d = gameList.map((user) => {
            return {
                ...user,
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

                                    onClick={() => SelectUserHandler(index)}
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

                        onClick={() => {setCreate(!create); setCreateUser(""); setChange(false)}}
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
                        onClick={() => {setChange(!change); setCreateUser(""); setCreate(false)}}
                    >
                        Изменить
                    </button>
                    <button
                        style={{
                            padding: "20px",
                            backgroundColor: "#ffffff",
                            borderRadius: "12px",
                            boxShadow: "0px 2px 10px -5px #00000090",
                            width: "200px"
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
                                value={createUser}
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
                                onChange={(e) => {setCreateUser(e.target.value)}}
                            />
                            <button
                                className="enter-button"
                                onClick={() => {setCreate(false); setPage("gamecreation")}}
                            >
                                Добавить
                            </button>
                        </>
                    }
                    {
                        change && !create
                        &&
                        <>
                            <input
                                autoFocus
                                type="text"
                                value={game}
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
                                onChange={(e) => {setGame(e.target.value)}}
                            />
                            <button
                                className="enter-button"
                                onClick={() => {setChange(false)}}
                            >
                                Сохранить
                            </button>
                        </>
                    }
                    
                </div>
            </main>
        </>
    )
}

export default GamesVariantPage
