import { createContext, useLayoutEffect, useState } from "react";
import Router from "./router";
import testData from "./test.json";
import { getUsers } from "./features/users";

export const UsersListContext = createContext<any>([]);
export const PageContext = createContext<any>({page: "main"});
export const TestUserContext = createContext<any>({testUser: ""});
export const UserContext = createContext<any>({user: ""});
export const GameContext = createContext<any>({game: ""});
export const TestContext = createContext<any>({questions: testData});
export const ErrContext = createContext<any>({err: ""})
export const CreateGameContext = createContext<any>({
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
export const GameStageContext = createContext<any>({
    games_pull: [],
    stage: 0
})

function Providers() {
    const [page, setPage] = useState("main");
    const [usersList, setUsersList] = useState([]);
    const [user, setUser] = useState("");
    const [questions, setQuestions] = useState(testData);
    const [game, setGame] = useState("");
    const [testUser, setTestUser] = useState("");
    const [err, setErr] = useState("")
    const [gameStage, setGameStage] = useState({
        games_pull: [],
        stage: 0
    })
    const [createGame, setCreateGame] =  useState({
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

    const getData = async () => {
        let usrs = await getUsers();
        setUsersList(usrs);
    }

    useLayoutEffect(() => {
        getData();
    }, [])

    return (
        <GameStageContext.Provider value={{gameStage, setGameStage}}>
            <ErrContext.Provider value={{err, setErr}}>
                <PageContext.Provider value={{page, setPage}}>
                    <UsersListContext.Provider value={{usersList, setUsersList}}>
                        <TestUserContext.Provider value={{testUser, setTestUser}}>
                            <UserContext.Provider value={{user, setUser}}>
                                <TestContext.Provider value={{questions, setQuestions}}>
                                    <GameContext.Provider value={{game, setGame}}>
                                        <CreateGameContext.Provider value={{createGame, setCreateGame}}>
                                            {/* <ErrComponent /> */}
                                            <Router />
                                        </CreateGameContext.Provider>
                                    </GameContext.Provider>
                                </TestContext.Provider>
                            </UserContext.Provider> 
                        </TestUserContext.Provider>
                    </UsersListContext.Provider>
                </PageContext.Provider>
            </ErrContext.Provider>
        </GameStageContext.Provider>
        
    )
}

export default Providers;
