import { useContext } from "react";
import testData from "../../test.json";
import { PageContext, TestContext, TestUserContext, UsersListContext } from "../../providers";
import TestButton from "../../components/testbutton.component";
import { getUsers, setUsers } from "../../features/users";

function TestPage() {
    const {setPage} = useContext(PageContext);
    const {questions, setQuestions} = useContext(TestContext);
    const {testUser, setTestUser} = useContext(TestUserContext);
    const {setUsersList} = useContext(UsersListContext);

    function ButtonHandler(index: number) {
        setQuestions((prev: any) => {

            const d = [...prev];

            const inst = prev[index];

            if (d[index].variations == 2) {
                d[index] = inst.selected == "red" ? {...d[index], selected: "green"} : {...d[index], selected: "red"};
                return d
            }
            else {
                d[index] = inst.selected == "red" ? {...d[index], selected: "green"} : inst.selected == "green" ? {...d[index], selected: "orange"} : {...d[index], selected: "red"};
                return d;
            }
            
        });
    }

    async function completeHandler() {
        const d = new Date();
        let qres = questions.map((quest: any) => {
            let {id, variations, rates, selected, label} = quest
            let res = 0;
            if (variations == 2) {
                let success_rate = rates[0];
                let wrong_rate = rates[1];
                res =  selected == "red" ? wrong_rate : selected == "gray" ? wrong_rate : success_rate;
            } else {
                let success_rate = rates[0];
                let medium_rate = rates[1];
                let wrong_rate = rates[2];
                res =  selected == "red" ? wrong_rate : selected == "gray" ? wrong_rate : selected == "green" ? success_rate : medium_rate;
            }

            return {
                id,
                label,
                res
            }

        })

        let users: any[] = await getUsers();
        
        let u = users.find((el) => el.name == testUser);
        let arr = users.filter((el) => el.name != testUser);

        let testResults = {
            date: `${d.getDate().toString().length < 2 ? `0${d.getDate()}` : d.getDate()}.${(d.getMonth() + 1).toString().length < 2 ? `0${d.getMonth() + 1}` : d.getMonth() + 1}.${d.getFullYear()}`,
            results: qres
        }

        console.log(testResults);

        let prevRes = u.results;

        if (prevRes) {
            u = {...u, results: [...prevRes, testResults]};
        } else {
            u = {...u, results: [testResults]};
        }

        let s = [...arr, u].sort((a: any, b: any) => a.name.localeCompare(b.name));

        setUsers(s);
        setUsersList(s);
        setQuestions([...testData]);
        setTestUser("");
        setPage("home");
    }

    return (
        <main
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                alignItems: "center",
                justifyContent: "center"
            }}
        >   
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "40px",
                    backgroundColor: "#ffffff",
                    padding: "40px",
                    borderRadius: "20px",
                    maxWidth: "500px",
                    maxHeight: "60vh",
                    overflowY: "scroll",
                    position: "relative"
                }}
            >
                {questions.map((question: any, index: number) => {
                    return (
                        <div 
                            key={index} 
                            style={{
                                display: "flex", 
                                flexDirection: "column",
                                gap: "12px"
                            }}
                        >
                            <div>
                                {question.label}
                            </div>
                            <TestButton state={question.selected} onClick={() => ButtonHandler(index)}/>
                        </div>
                    )
                })}
                
            </div>
            <button
                className="enter-button"
                style={{
                    width: "400px"
                }}
                onClick={completeHandler}
            >
                    Завершить
            </button>
        </main>
    )
}

export default TestPage;
