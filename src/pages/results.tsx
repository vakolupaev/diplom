import Header from "../components/header.component";
import { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../providers";
import users from "../users.json";
import { AxisOptions, Chart } from "react-charts";

function ResultsPage() {
    const {user, setUser} = useContext(UserContext);
    const [userList, setUserList] = useState<any>(users);
    

    function InputHandler(e: any) {
        const inp = e.target.value.toLowerCase();
        setUser(e.target.value);
        setUserList(users.filter((usr) => usr.name === e.target.value).length == 1 ? [] : users.filter((usr) => usr.name.toLocaleLowerCase().includes(inp)));
    }

    useEffect(() => {
        setUserList(users.filter((usr) => usr.name === user).length == 1 ? [] : users.filter((usr) => usr.name.toLocaleLowerCase().includes(user.toLowerCase())));
    }, [])


    type Rates = {
        date: number,
        rate: number,
    }
    
    type Series = {
        label: string,
        color: string,
        data: Rates[]
    }
    
    const data: Series[] = [
    {
        label: user,
        color: "#ffffff",
        data: [
        {
            date: 1,
            rate: 1,
        },
        {
            date: 2,
            rate: 2,
        },
        {
            date: 3,
            rate: 3,
        }
        ]
    }
    ]

   const primaryAxis = useMemo(
     (): AxisOptions<Rates> => ({
       getValue: datum => datum.date,
     }),
     []
   )
 
   const secondaryAxes = useMemo(
     (): AxisOptions<Rates>[] => [
       {
            getValue: datum => datum.rate,
            stacked: true,
       },
     ],
     []
   )

    return (
        <>
            <Header/>
            <main
                style={{width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "space-between", padding: "20px", boxSizing: "border-box"}}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "20px"
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "20px"
                            }}
                        >
                            Дата начала:
                            <input style={{padding: "20px", boxSizing:"border-box", height: "60px", border: "none", borderRadius: "12px", boxShadow: "0px 2px 10px -5px #00000090"}} type="date" />
                            Дата конца:
                            <input style={{padding: "20px", boxSizing:"border-box", height: "60px", border: "none", borderRadius: "12px", boxShadow: "0px 2px 10px -5px #00000090"}} type="date" />
                        </div>

                        <div
                            style={{position: "relative", display: "flex", flexDirection: "column", gap: "20px"}}
                        >
                            Воспитанник:
                            <input
                                autoFocus
                                type="text"
                                value={user}
                                style={{
                                    width: "300px",
                                    padding: "20px",
                                    borderRadius: "12px",
                                    outline: "none",
                                    height: "60px",
                                    boxSizing:"border-box",
                                    border: "none",
                                    boxShadow: "0px 2px 10px -5px #00000090"
                                }}
                                onChange={InputHandler}
                            />
                            {
                                userList.length >= 1 && <div 
                                style={{
                                    zIndex: 10,
                                    overflowY: "scroll",
                                    maxHeight: "300px",
                                    top: "110px",
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
                                            <div key={index} style={{cursor: "pointer"}} onClick={() => {setUser(userrr.name); setUserList(users.filter((usr) => usr.name.toLocaleLowerCase().includes(userrr.name))); }}>
                                                {userrr.name}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            }
                            Динамика уровня мышления:
                            <button
                                style={{
                                    background: "#adff2f",
                                    padding: "20px",
                                    borderRadius: "12px",
                                    boxShadow: "0px 2px 10px -5px #00000090",
                                    height: "60px",
                                    boxSizing:"border-box",
                                }}
                            >
                                Создать
                            </button>
                        </div>
                    </div>
                </div>
                <div style={{position: "relative", width: "70%", height: "60%", marginBottom: "100px", zIndex: 1}}>
                        <Chart
                            options={{
                                data,
                                primaryAxis,
                                secondaryAxes,
                                defaultColors: ["#90e010"]
                            }}
                        />
                    </div>
            </main>
        </>
    )
}

export default ResultsPage;
