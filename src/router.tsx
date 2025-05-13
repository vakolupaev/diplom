import { useContext } from "react";
import { PageContext } from "./providers";
import ResultsPage from "./pages/results";
import TestPage from "./pages/test/test";
import GamesPage from "./pages/games";
import MainPage from "./pages/main";
import EnterTestPage from "./pages/test/enterTest";
import StudentsPage from "./pages/students";
import GamesVariantPage from "./pages/games-variant";

function Router() {
    const {page} = useContext(PageContext);

    switch (page) {
        case "games":
            return <GamesPage/>;
        case "entertest":
            return <EnterTestPage/>;
        case "test":
            return <TestPage/>;
        case "results":
            return <ResultsPage/>;
        case "students":
            return <StudentsPage/>;
        case "gamesvariant":
            return <GamesVariantPage/>;
        default:
            return <MainPage/>;
    }  
}

export default Router;