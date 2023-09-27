import { 
    Text,
    Box,
    Center
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_SERVER } from "../../application";
import AlrimCard from "../../components/ArlimCard";

export default function ArlimPage () {

    const [arlims, setArlims] = useState([])

    useEffect(() => {
        axios.get(API_SERVER + '/user/arlim', {headers: {Authorization: localStorage.getItem('9token')}})
        .then(res => {
            setArlims(res.data.content)
        })
    }, [])

    if (arlims.length === 0) {
        return (
            <Center w={'100%'} pt={'10%'}>
                <Text fontSize={'24px'} letterSpacing={'-1px'} color={'gray'}>아무런 알림이 없어요</Text>
            </Center>
        )
    }

    return (
        <>
            <Box p={'24px'} w={'100%'}>
                {arlims && arlims.map(a =>
                    <AlrimCard data={a} />)}
            </Box>
        </>
    )
}