import { useContext } from "react";
import { PageContext } from "../providers";

function Header() {
    const {page, setPage} = useContext(PageContext);

    return (
        <div className="header">
            <div>
                <button onClick={() => setPage("entertest")} className={`header-button ${page == "test" ? "header-button-active" : ""}`}>
                    Тестирование
                </button>
                <button onClick={() => setPage("games")} className={`header-button ${page == "games" ? "header-button-active" : ""}`}>
                    Игры
                </button>
                <button onClick={() => setPage("results")} className={`header-button ${page == "results" ? "header-button-active" : ""}`}>
                    Динамика
                </button>
            </div>
            <div
                style={{
                    position: "relative"
                }}
            >
                <button
                    className="header-font"
                    onClick={() => setPage("main")}
                >
                    Главная
                </button>
                <button
                    className="header-font"
                    onClick={() => setPage("students")}
                >
                    Воспитанники
                </button>
                <button
                    className="header-font"
                    onClick={() => setPage("gamesvariant")}
                >
                    Варианты игр
                </button>
            </div>
        </div>
    )
}

export default Header;