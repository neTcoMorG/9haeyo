import { useEffect, useState } from "react";
import { API_SERVER } from '../application'
import axios from "axios";

export function useFields () {
    const [fields, setFields] = useState([])

    useEffect(() => {
        axios.get(API_SERVER + "/cate/fields").then(res => {
            const response = res.data
            const process = response.map(s => { return {label: s.name, value: s.name} })
            setFields(process)
        })
    }, [])

    return fields
}

export function useSkills () {
    const [skills, setSkills] = useState([])

    useEffect(() => {
        axios.get(API_SERVER + "/cate/skills").then(res => {
            const response = res.data
            const process = response.map(s => { return {label: s.name, value: s.name} })
            setSkills(process)
        })
    }, [])

    return skills
}

export function useOpeningTypes () {
    const [types, setTypes] = useState([])

    useEffect(() => {
        axios.get(API_SERVER + '/cate/openingTypes').then(res => {
            const response = res.data
            const process = response.map(r => {return {label: r.type, value: r.type}})
            setTypes(process)
        })
    }, [])

    return types
}

export function useUserTypes () {
    const [types, setTypes] = useState([])

    useEffect(() => {
        axios.get(API_SERVER + '/cate/userTypes').then(res => {
            const response = res.data
            const process = response.map(u => {return {label: u.type, value: u.type}})
            setTypes(process)
        })
    }, [])

    return types
}