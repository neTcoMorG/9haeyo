import { useEffect } from "react"
import { API_SERVER } from "../application"
import axios from "axios"
import { useNavigate, useSearchParams } from "react-router-dom"

export default function Callback () {
    const navigate = useNavigate();
    const [p, sp] = useSearchParams()

    useEffect(() => {
        const code = p.get('code')
        axios.get(API_SERVER + "/sign/github?code=" + code).then(res => {
            localStorage.setItem("9token", res.data.token)
            navigate('/')
            window.location.reload()
        })
        .catch(err => console.log(err))
    }, [])

    return (<></>)
}