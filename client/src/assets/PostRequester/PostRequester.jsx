import React, { useEffect, useState } from "react";
import axios from "../../../api/axios"

export const PostRequester = () => {

    const [data, setData] = useState([1,2,3]);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        async () => {
            const response = axios.get()
        }
    }, [])

    return (
        <>
            {data.map(post => {
                return (
                    <div>
                        <img onScroll={''} alt="Hello" />
                        <h1>By</h1>
                    </div>
                )
            })}
        </>
    )
}