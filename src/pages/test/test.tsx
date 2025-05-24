import { useContext } from "react";
import testData from "../../test.json";
import { PageContext, TestContext, TestUserContext } from "../../providers";
import TestButton from "../../components/testbutton.component";

function TestPage() {
    const {setPage} = useContext(PageContext);
    const {questions, setQuestions} = useContext(TestContext);
    const {setTestUser} = useContext(TestUserContext);

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
                    onClick={() => {
                        setQuestions([...testData]);
                        setTestUser("");
                        setPage("home");
                    }}
                >
                    Завершить
                </button>
        </main>
    )
}

export default TestPage;
