import { createContext, useState } from "react";
import Router from "./router";
import testData from "./test.json";

export const PageContext = createContext<any>({page: "main"});
export const UserContext = createContext<any>({user: ""});
export const TestContext = createContext<any>({questions: testData});

function Providers() {
    const [page, setPage] = useState("main");
    const [user, setUser] = useState("");
    const [questions, setQuestions] = useState(testData);

    return (
        <PageContext.Provider value={{page, setPage}}>
            <UserContext.Provider value={{user, setUser}}>
                <TestContext.Provider value={{questions, setQuestions}}>
                    <Router />
                </TestContext.Provider>
            </UserContext.Provider> 
        </PageContext.Provider>
    )
}

export default Providers;
