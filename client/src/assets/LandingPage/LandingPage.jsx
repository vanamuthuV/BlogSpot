import react from "react"
import cover from "./../../../public/cover.jpg"


export const CoverPage = () => {
    return (
        <img  style={{objectFit : "contain"}} src={cover} />
    )
}