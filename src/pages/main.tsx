import { useEffect, useState } from "react";
import Header from "../components/header.component";
import { getPath } from "../features/users";

function MainPage() {
    const [path, setPath] = useState("")

    useEffect(() => {
        getPath().then((path: any) => setPath(path));
    })

    return (
        <>
            <Header/>
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <div
                    style={{
                        borderRadius: "20px",
                        overflow: "hidden",
                        width: 897, 
                        height: 213
                    }}
                >
                    <img src="main.jpg" alt="" style={{width: 897, height: 213}}/>
                </div>
                {path}
            </div>
        </>
    )
}

export default MainPage;
