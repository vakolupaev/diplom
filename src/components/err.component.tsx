import { useContext } from "react"
import { ErrContext } from "../providers"

export default function ErrComponent() {
    const {err} = useContext(ErrContext);

    return (
        <>
            <div
                style={{
                    position: "absolute",
                    top: "20px",
                    left: "20px",
                    zIndex: 10000
                }}
            >
                {err}
            </div>
        </>
    )
}