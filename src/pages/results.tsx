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
import { create_excel } from "../features/excel";

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
    const d = new Date();
    const [dateStart, setDateStart] = useState("1980-01-01");
    const [dateEnd, setDateEnd] = useState(`${d.getFullYear()}-${(d.getMonth() + 1).toString().length < 2 ? `0${d.getMonth() + 1}` : d.getMonth() + 1}-${d.getDate().toString().length < 2 ? `0${d.getDate()}` : d.getDate()}`);
    const {usersList} = useContext(UsersListContext);
    const {user, setUser} = useContext(UserContext);
    const [userList, setUserList] = useState<any>(usersList);
    const [data, setData] = useState({
        labels: [],
        datasets: [
        {
            label: 'Уровень вербального мышления',
            data: [],
            fill: false,
            borderColor: '#90e010',
            tension: 0.2,
        },
        ],
    });

    useEffect(() => {
        let usr = usersList.find((el: any) => el.name == user);

        if (!!usr) {
            const c = {
                labels: usr.results.filter((item: any) => {

                        let date: string = item.date
                        let dateSplit: string[] = date.split(".");
                        let dateNormalize = `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`
                        return dateNormalize >= dateStart && dateNormalize <= dateEnd


                    }).map((el: any) => el.date),
                datasets: [{
                    ...data.datasets[0],

                    data: usr.results.filter((item: any) => {

                        let date: string = item.date
                        let dateSplit: string[] = date.split(".");
                        let dateNormalize = `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`
                        return dateNormalize >= dateStart && dateNormalize <= dateEnd


                    }).map((el: any) => {
                        let r = el.results.map((elem: any) => {
                            return elem.res;
                        })
                        const sum = r.reduce((partialSum: any, a: any) => partialSum + a, 0)

                        if (sum <= -11) {
                            return 5
                        }
                        if (sum <= -1 && sum >= -10) {
                            return 4
                        }
                        if (sum <= 13 && sum >= 0) {
                            return 3
                        }
                        if (sum <= 23 && sum >= 14) {
                            return 2
                        }
                        if (sum >= 24) {
                            return 1
                        }
                    })
            }]}

            setData(c);
        } else {
            setData({
        labels: [],
        datasets: [
        {
            label: 'Уровень вербального мышления',
            data: [],
            fill: false,
            borderColor: '#90e010',
            tension: 0.2,
        },
        ],
    })
        }
    
    }, [user, dateEnd, dateStart])

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

    function SaveHandler() {
        if (user === "Все дети, за период") {
            let d = usersList.map((userL: any) => {
                return {
                    ...userL,
                    results: userL.results.filter((item: any) => {

                        let date: string = item.date
                        let dateSplit: string[] = date.split(".");
                        let dateNormalize = `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`
                        return dateNormalize >= dateStart && dateNormalize <= dateEnd


                    })
                }
            }).filter((el: any) => el.results.length > 0);
            create_excel(JSON.stringify(d))
        } else {
            let usr = usersList.find((el: any) => el.name == user);
            if (!!usr) {
                let ud = {
                        ...usr,
                        results: usr.results.filter((item: any) => {

                        let date: string = item.date
                        let dateSplit: string[] = date.split(".");
                        let dateNormalize = `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`
                        return dateNormalize >= dateStart && dateNormalize <= dateEnd


                    })};
                create_excel(JSON.stringify([ud]))
            }
        }
    }
    

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
                            <input value={dateStart} onInput={(e: any) => setDateStart(e.target.value)} style={{padding: "20px", boxSizing:"border-box", height: "60px", border: "none", borderRadius: "12px", boxShadow: "0px 2px 10px -5px #00000090"}} type="date" />
                            Дата конца:
                            <input value={dateEnd} onInput={(e: any) => setDateEnd(e.target.value)} style={{padding: "20px", boxSizing:"border-box", height: "60px", border: "none", borderRadius: "12px", boxShadow: "0px 2px 10px -5px #00000090"}} type="date" />
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
                                onClick={SaveHandler}
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
