import { useContext } from "react";
import Header from "../components/header.component";
import { create_excel } from "../features/excel";
import { UsersListContext } from "../providers";

function MainPage() {
    const {usersList} = useContext(UsersListContext);

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
            </div>
        </>
    )
}

export default MainPage;
