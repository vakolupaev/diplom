import { useContext, useState } from "react";
import Header from "../components/header.component";
import { PageContext } from "../providers";
import { setGame } from "../features/games";

function GameCreationPage() {
    const {setPage} = useContext(PageContext);
    const [file, setFile] = useState<any>(null);

    const CreateHandler = () => {
        console.log(file)
        setGame(file);
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
                                type="file" 
                                placeholder="Путь до файла" 
                                onChange={(e: any) => {
                                    if (!!e.target.files[0]) {
                                        setFile(e.target.files[0]);
                                    }
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
                            <img src="loopa.png" style={{width: "30px", height: "30px", position: "absolute", right: "10px"}} alt="" />
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
                                style={{
                                    padding: "20px",
                                    border: "none", 
                                    borderRadius: "12px",
                                    boxShadow: "0px 2px 10px -5px #00000090",
                                    width: "500px",
                                    outline: "none"
                                }}
                            />
                            <img src="loopa.png" style={{width: "30px", height: "30px", position: "absolute", right: "10px"}} alt="" />
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
                                style={{
                                    padding: "20px",
                                    border: "none", 
                                    borderRadius: "12px",
                                    boxShadow: "0px 2px 10px -5px #00000090",
                                    width: "500px",
                                    outline: "none"
                                }}
                            />
                            <img src="loopa.png" style={{width: "30px", height: "30px", position: "absolute", right: "10px"}} alt="" />
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
                                style={{
                                    padding: "20px",
                                    border: "none", 
                                    borderRadius: "12px",
                                    boxShadow: "0px 2px 10px -5px #00000090",
                                    width: "500px",
                                    outline: "none"
                                }}
                            />
                            <img src="loopa.png" style={{width: "30px", height: "30px", position: "absolute", right: "10px"}} alt="" />
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
                                style={{
                                    padding: "20px",
                                    border: "none", 
                                    borderRadius: "12px",
                                    boxShadow: "0px 2px 10px -5px #00000090",
                                    width: "500px",
                                    outline: "none"
                                }}
                            />
                            <img src="loopa.png" style={{width: "30px", height: "30px", position: "absolute", right: "10px"}} alt="" />
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
                                style={{
                                    padding: "20px",
                                    border: "none", 
                                    borderRadius: "12px",
                                    boxShadow: "0px 2px 10px -5px #00000090",
                                    width: "500px",
                                    outline: "none"
                                }}
                            />
                            <img src="loopa.png" style={{width: "30px", height: "30px", position: "absolute", right: "10px"}} alt="" />
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
                                style={{
                                    padding: "20px",
                                    border: "none", 
                                    borderRadius: "12px",
                                    boxShadow: "0px 2px 10px -5px #00000090",
                                    width: "500px",
                                    outline: "none"
                                }}
                            />
                            <img src="loopa.png" style={{width: "30px", height: "30px", position: "absolute", right: "10px"}} alt="" />
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
                                style={{
                                    padding: "20px",
                                    border: "none", 
                                    borderRadius: "12px",
                                    boxShadow: "0px 2px 10px -5px #00000090",
                                    width: "500px",
                                    outline: "none"
                                }}
                            />
                            <img src="loopa.png" style={{width: "30px", height: "30px", position: "absolute", right: "10px"}} alt="" />
                        </div>
                       
                    </div>
                    </div>
                    <button
                        className="enter-button"
                        style={{
                            width: "300px",
                        }}
                        onClick={() => {
                            CreateHandler(); 
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
