function TestButton({state, onClick = () => {}}: any) {
    return (
        <button
            className="test-button"
            style={{
                backgroundColor: state == "green" ? "#adff2f" : state == "orange" ? "#ff7300" : state == "gray" ? "#9f9f9f" : "#ff3535",
            }}
            onClick={() => {
                onClick()
            }}
        >
            {state == "red" && "Неверно"}
            {state == "orange" && "Частично верно"}
            {state == "green" && "Верно"}
            {state == "gray" && "Выбрать"}
        </button>
    )
}

export default TestButton;