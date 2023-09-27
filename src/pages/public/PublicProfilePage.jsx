
import { Avatar, Box, Center, Container, HStack, Heading, VStack, Text, Badge, Button } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { API_SERVER } from "../../application"
import axios from "axios"

export default function PublicProfilePage () {

    const { nickname } = useParams()
    const [data, setData] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        axios.get(API_SERVER + '/hub/user/' + nickname).then(res => {
            setData(res.data)
        })
    }, [nickname])

    return (
        <Box>
            {data &&
            <>
            <Container h={'100%'} maxW={'1200px'} p={'32px'}>
                <HStack spacing={5} alignItems={'flex-start'} w={'100%'}>
                    <Box w={'100%'} bgColor={'#202020'} borderRadius={10} boxShadow={'base'} p={'12px 32px 60px 32px'}>
                        <Center w={'100%'} p={'32px 0 32px 0'}>
                            <VStack spacing={5}>
                                <Box 
                                    className="drop_drop_image" 
                                    backgroundImage={data.user.avatar_url}
                                    position={'absolute'}
                                    left={'middle'}
                                    w={'210px'}
                                    h={'210px'}
                                    borderRadius={'50%'}
                                    transform={'scale(4.8)'}
                                    filter={'blur(20px)'}
                                    opacity={'0.1'}
                                />
                                <Avatar w={'210px'} h={'210px'} src={data.user.avatar_url} />
                                <VStack>
                                    <Heading as={'h1'}>{data.user.nickname}</Heading>
                                    <Text zIndex={1} color={'#AAAAAA'}><a href={data.user.repository}>{data.user.repository}</a></Text>
                                </VStack>
                            </VStack>
                        </Center>
                        <VStack alignItems={'flex-start'} pt={10} zIndex={1}>
                            <Text fontSize={'15px'}>{data.user.about}</Text>
                            <Box pt={10}>
                                <Text fontSize={'25px'} fontWeight={'bold'}>기술스택</Text>
                                <HStack pt={3} spacing={3} wrap={'wrap'}>
                                    {data.user.skills.map(skill => <Badge m={0} p={'5px 12px 5px 12px'} borderRadius={10} fontWeight={700}>{skill}</Badge>)}
                                </HStack>
                            </Box>
                        </VStack>
                    </Box>
                    <VStack w={'400px'} spacing={3}>
                        <Button w={'100%'} fontSize={'14px'} bgColor={'#202020'} color={'white'}>같이해요</Button>
                        <Box w={'100%'} bgColor={'#202020'} borderRadius={10} p={'24px 24px 24px 24px'}>
                            <Box borderBottom={'1px solid #606060'} pb={2} w={'100%'}>
                                <Text fontSize={'17px'} fontWeight={'bold'}>반응({data.reactions.length})</Text>
                            </Box>
                            <VStack w={'100%'} pt={4} spacing={2} zIndex={1}>
                                {data.reactions && data.reactions.map(r =>  
                                <Box 
                                    onClick={() => navigate('/public/' + r.user.nickname)}
                                    borderRadius={10} bgColor={'#303030'} w={'100%'} p={'8px 14px 8px 14px'} zIndex={1} cursor={'pointer'} 
                                    _hover={{
                                        bgColor: '#4d8df5',
                                        transition: '0.4s'
                                    }}>
                                    <HStack w={'100%'} justifyContent={'center'} spacing={3}>
                                        <Avatar h={'45px'} w={'45px'} src={r.user.avatar_url} />
                                        <VStack w={'100%'} alignItems={'flex-start'} justifyContent={'center'} spacing={1}>
                                            <Text letterSpacing={'-1px'}>{r.user.nickname}</Text>
                                            {r.type && <Badge colorScheme="blue">대단해요</Badge>}
                                            {!r.type && <Badge colorScheme="red">별로에요</Badge>}
                                        </VStack>
                                    </HStack>
                                </Box>)}
                            </VStack>
                        </Box>
                    </VStack>
                </HStack>
            </Container>
            </>}
        </Box>
    )
}