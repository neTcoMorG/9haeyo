import { useEffect, useState } from "react";

import { API_SERVER } from '../application'
import axios from "axios";

const exceptionDispatcher = (errCallback, err) => {
    switch (err) {
        
    }
}

const useGetFetch = async (url, errCallback) => {
    const [data, setData] = useState()

    useEffect(() => {
        axios.get(API_SERVER + url).then(res => setData(res.data))
        .catch(err => exceptionDispatcher(errCallback, err))
    }, [])

    return [data, setData]
}

const usePostFetch = (url, errCallback) => {
    const [data, setData] = useState()

    useEffect(() => {
        axios.get(API_SERVER + url).then(res => setData(res.data))
        .catch(err => exceptionDispatcher(errCallback, err))
    }, [])

    return [data, setData]
}


export {useGetFetch, usePostFetch}