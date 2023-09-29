
import { Text, Box, VStack } from "@chakra-ui/react"
import ReuqestListCard from "../../components/RequestListCard"
import { useEffect, useState } from "react"
import axios from "axios"

import { API_SERVER } from '../../application'

export default function RequestTogether () {

    const [requests, setRequests] = useState()

    useEffect(() => {
        axios.get(API_SERVER + '/req', {headers: { Authorization: localStorage.getItem('9token')}})
        .then(res => setRequests(res.data))
    }, [])

    return (
        <>
            <Box p={'24px 24px 34px 24px'} w={'100%'}>
                <Box borderBottom={'1px solid #202020'} pb={2}>
                    <Text fontWeight={'bold'} fontSize={'24px'}>받은 제안</Text>
                </Box>
                <VStack p={'16px 20px 8px 20px'} spacing={5}>
                    {requests && requests.content.map(r => <ReuqestListCard data={r} />)}
                </VStack>
            </Box>
        </>
    )
}