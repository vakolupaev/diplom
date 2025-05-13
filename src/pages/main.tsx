import Header from "../components/header.component";

function MainPage() {
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
