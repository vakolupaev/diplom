import { useContext, useEffect, useState } from "react";
import Header from "../../components/header.component";
import { PageContext, TestUserContext, UsersListContext } from "../../providers";

function EnterTestPage() {
    const {usersList} = useContext(UsersListContext);
    const {setPage} = useContext(PageContext);
    const {testUser, setTestUser} = useContext(TestUserContext);
    const [userList, setUserList] = useState(usersList);
    

    function InputHandler(e: any) {
        const inp = e.target.value.toLowerCase();
        setTestUser(e.target.value);
        setUserList(usersList.filter((usr: any) => usr.name === e.target.value).length == 1 ? [] : usersList.filter((usr: any) => usr.name.toLocaleLowerCase().includes(inp)));
    }

    useEffect(() => {
        setUserList(usersList.filter((usr: any) => usr.name === testUser).length == 1 ? [] : usersList.filter((usr: any) => usr.name.toLocaleLowerCase().includes(testUser.toLowerCase())));
    }, [])

    return (
        <>
            <Header/>
            <main
                style={{width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}
            >
                <div
                    style={{display: "flex", flexDirection: "column", gap: "20px"}}
                >

                    <div
                        style={{position: "relative"}}
                    >
                        <input
                            autoFocus
                            type="text"
                            value={testUser}
                            style={{
                                width: "300px",
                                padding: "20px",
                                borderRadius: "12px",
                                outline: "none",
                                border: "none",
                                boxShadow: "0px 2px 10px -5px #00000090"
                            }}
                            onChange={InputHandler}
                        />
                        {
                            userList.length >= 1 
                            && 
                            
                            <div 
                                style={{
                                    overflowY: "scroll",
                                    maxHeight: "300px",
                                    top: "70px",
                                    width: "300px",
                                    background: "#ffffff",
                                    borderRadius: "12px",
                                    padding: "20px",
                                    display: "flex",
                                    position: "absolute",
                                    flexDirection: "column",
                                    gap: "15px",
                                    boxShadow: "0px 2px 10px -5px #00000090"
                                }}
                            >
                                {
                                    userList.map((userrr: any, index: number) => {
                                        return (
                                            <div key={index} style={{cursor: "pointer"}} onClick={() => {setTestUser(userrr.name); setUserList(usersList.filter((usr: any) => usr.name.toLocaleLowerCase().includes(userrr.name))); }}>
                                                {userrr.name}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                        
                    </div>
                    <button
                        className={`enter-button ${
                            usersList.filter((usr: any) => usr.name === testUser).length == 1
                            && 
                            testUser === usersList.filter((usr: any) => usr.name === testUser)[0].name ? "" : "enter-button-disabled"}`}
                        onClick={() => {
                            setPage("test")
                        }}
                    >
                        Начать
                    </button>
                </div>
                
            </main>
        </>
    )
}

export default EnterTestPage;
