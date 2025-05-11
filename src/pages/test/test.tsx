import { useContext } from "react";
import testData from "../../test.json";
import { PageContext, TestContext, UserContext } from "../../providers";
import TestButton from "../../components/testbutton.component";

function TestPage() {
    const {setPage} = useContext(PageContext);
    const {setUser} = useContext(UserContext);
    const {questions, setQuestions} = useContext(TestContext);

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
                        setUser("");
                        setTimeout(() => {
                            setPage("home");
                        }, 0.05)
                    }}
                >
                    Завершить
                </button>
        </main>
    )
}

export default TestPage;
