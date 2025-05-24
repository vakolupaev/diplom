import Header from "../components/header.component";
import { useContext, useEffect, useState } from "react";
import { UserContext, UsersListContext } from "../providers";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title
);

function ResultsPage() {
    const {usersList} = useContext(UsersListContext);
    const {user, setUser} = useContext(UserContext);
    const [userList, setUserList] = useState<any>(usersList);

    const [focused, setFocused] = useState(false)
    const onFocus = () => setFocused(true)
    const onBlur = () => {
        setTimeout(() => {
            setFocused(false)
        }, 500);
    }
    

    function InputHandler(e: any) {
        const inp = e.target.value.toLowerCase();
        setUser(e.target.value);
        setUserList(usersList.filter((usr: any) => usr.name === e.target.value).length == 1 ? [] : usersList.filter((usr: any) => usr.name.toLocaleLowerCase().includes(inp)));
    }

    useEffect(() => {
        setUserList(usersList.filter((usr: any) => usr.name === user).length == 1 ? [] : usersList.filter((usr: any) => usr.name.toLocaleLowerCase().includes(user.toLowerCase())));
    }, [])




    const data = {
    labels: ["15.01.2025", "15.02.2025", "15.03.2025", "15.04.2025", "13.05.2025"],
    datasets: [
      {
        label: 'Уровень вербального мышления',
        data: [3, 2, 2, 1, 0],
        fill: false,
        borderColor: '#90e010',
        tension: 0.2,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        reverse: true, // инвертируем ось Y
        ticks: {
          stepSize: 1,
          callback: function (value: any) {
            return `${value} уровень`;
          },
        },
        min: 1,
        max: 5,
      },
      x: {
        title: {
          display: true,
          text: '',
        },
      },
    },
  };


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
                                onFocus={onFocus}
                                onBlur={onBlur}
                                onChange={InputHandler}
                            />
                            {
                                userList.length >= 1 && focused ? 
                                <div 
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
                                    <div style={{cursor: "pointer"}} onClick={() => {setUser("Все дети, за период"); setUserList(usersList.filter((usr: any) => usr.name.toLocaleLowerCase().includes("Все дети, за период"))); }}>
                                        Все дети, за период
                                    </div>
                                    {
                                        userList.map((userrr: any, index: number) => {
                                            return (
                                                <div key={index} style={{cursor: "pointer"}} onClick={() => {setUser(userrr.name); setUserList(usersList.filter((usr: any) => usr.name.toLocaleLowerCase().includes(userrr.name))); }}>
                                                    {userrr.name}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                :
                                null
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
                                Сохранить в Excel
                            </button>
                        </div>
                    </div>
                </div>
                <div style={{position: "relative", width: "70%", height: "60%", marginBottom: "100px", zIndex: 1}}>
                    <Line data={data} options={options} />
                </div>
            </main>
        </>
    )
}

export default ResultsPage;
