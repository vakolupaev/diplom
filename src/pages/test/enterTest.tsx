import { useContext, useEffect, useState } from "react";
import Header from "../../components/header.component";
import users from "../../users.json";
import { PageContext, UserContext } from "../../providers";

function EnterTestPage() {
    const {setPage} = useContext(PageContext);
    const {user, setUser} = useContext(UserContext);
    const [userList, setUserList] = useState(users);
    

    function InputHandler(e: any) {
        const inp = e.target.value.toLowerCase();
        setUser(e.target.value);
        setUserList(users.filter((usr) => usr.name === e.target.value).length == 1 ? [] : users.filter((usr) => usr.name.toLocaleLowerCase().includes(inp)));
    }

    useEffect(() => {
        setUserList(users.filter((usr) => usr.name === user).length == 1 ? [] : users.filter((usr) => usr.name.toLocaleLowerCase().includes(user.toLowerCase())));
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
                            value={user}
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
                            userList.length >= 1 && <div 
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
                                userList.map((userrr, index) => {
                                    return (
                                        <div key={index} style={{cursor: "pointer"}} onClick={() => {setUser(userrr.name); setUserList(users.filter((usr) => usr.name.toLocaleLowerCase().includes(userrr.name))); }}>
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
                            users.filter((usr) => usr.name === user).length == 1
                            && 
                            user === users.filter((usr) => usr.name === user)[0].name ? "" : "enter-button-disabled"}`}
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
