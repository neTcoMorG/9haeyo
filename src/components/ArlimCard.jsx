import { Avatar, HStack, VStack, Text, Box, CloseButton } from "@chakra-ui/react";
import axios from "axios";
import { API_SERVER } from "../application";

export default function AlrimCard ({data, arr, setter}) {

    const onDeleteHanlder = () => {
        const packet = {
            id: data.id
        }
        axios.post(API_SERVER + '/user/arlim', JSON.stringify(packet), {headers: {
            Authorization: localStorage.getItem('9token'),
            'Content-Type': 'application/json'
        }})
        .then(() => {
            const newArr = arr.filter(ar => ar.id !== data.id)
            setter(newArr)
        })
    }

    return (
        <>
        {data &&  
            <Box w={'100%'} position={'relative'}>     
                <CloseButton position={'absolute'} right={'20px'} top={'10px'} size={'sm'} onClick={onDeleteHanlder} zIndex={5} />      
                <HStack w={'100%'} justifyContent={'flex-start'} bgColor={'#202020'} borderRadius={10} p={'12px 24px 12px 24px'} spacing={5} position={'relative'}>
                    <CloseButton position={'absolute'} size={'sm'} onClick={onDeleteHanlder} /> 
                    {!data.read && <Box position={'absolute'}  top={3} left={3}  w={'8px'} h={'8px'} bgColor={'crimson'} borderRadius={'50%'}/>}
                    <Avatar size={'md'} src={data.avatar_url} />
                    <VStack alignItems={'flex-start'} spacing={1} pr={10}>
                        <Text fontWeight={'bold'} fontSize={'16px'}>{data.title}</Text>
                        <Text 
                            style={{
                                overflow:'hidden',
                                display: "-webkit-box",
                                WebkitLineClamp: 1,
                                WebkitBoxOrient: 'vertical',
                                textOverflow: 'ellipsis',
                            }}
                            letterSpacing={'-1px'} fontSize={'14px'} color={'#DDDDDD'}>{data.txt}</Text>
                    </VStack>
                </HStack>
            </Box>}
        </>
    )
}