import { useEffect, useState } from "react"
import ProfileCard from "../../components/ProfileCard"
import { API_SERVER } from "../../application"
import axios from "axios"
import { 
    Avatar, 
    Box, 
    HStack, 
    VStack,
    Text,
    Badge
} from "@chakra-ui/react"

import kakao from '../../resource/kakao.png'
import discord from '../../resource/disord.png'
import { useNavigate } from "react-router-dom"

export default function MePage () {

    const navigate = useNavigate()

    const [profile, setProfile] = useState()

    useEffect(() => {
        axios.get(API_SERVER + '/user', {headers: {Authorization: localStorage.getItem('9token')}})
        .then(res => setProfile(res.data))
    }, [])

    return (
        <>
            <Box p={'24px'} w={'100%'} bgColor={'#202020'} borderRadius={10} position={'relative'}>
                {profile &&
                <>
                <Box position={'absolute'} right={'38px'} cursor={'pointer'} zIndex={5} onClick={() => navigate('/private/modify')}>
                    <Text fontSize={'14px'} letterSpacing={'-1px'} color={'#DDDDDD'}>프로필 수정</Text>
                </Box>
                <Box w={'100%'} pt={'10px'}>
                    <HStack pl={'10px'} spacing={7}>
                        <Box 
                            className="drop_drop_image" 
                            backgroundImage={profile.avatar_url}
                            position={'absolute'}
                            left={'37%'}
                            w={'210px'}
                            h={'210px'}
                            borderRadius={'50%'}
                            transform={'scale(4)'}
                            filter={'blur(20px)'}
                            opacity={'0.1'}
                        />
                        <Avatar w={'180px'} h={'180px'} src={profile.avatar_url} zIndex={5} />
                        <VStack alignItems={'flex-start'} spacing={3} zIndex={5}>
                            <Box>
                                <Text fontSize={'35px'} letterSpacing={'-2px'}>{profile.nickname}</Text>
                                <Text pt={1} fontSize={'20px'} letterSpacing={'-2px'} color={'gray'}>
                                    {profile.repository}    
                                </Text>
                            </Box>
                            <Badge m={0} p={'2px 8px 2px 8px'} fontSize={'13px'} letterSpacing={'-1px'}>
                                {profile.field}
                            </Badge>
                            <HStack spacing={6} pt={5}>
                                <HStack>
                                    <Avatar w={'32px'} h={'32px'} />
                                    {profile.contract.phone ? <Text>휴대폰</Text> : <Text color={'gray'}>없음</Text> }
                                </HStack>
                                <HStack>
                                    <Avatar w={'32px'} h={'32px'} src={kakao} />
                                    {profile.contract.kakao ? <Text>카카오톡</Text> : <Text color={'gray'}>없음</Text> }
                                </HStack>
                                <HStack>
                                    <Avatar w={'32px'} h={'32px'} src={discord} />
                                    {profile.contract.discord ? <Text>디스코드</Text> : <Text color={'gray'}>없음</Text> }
                                </HStack>
                            </HStack>
                        </VStack>
                    </HStack>
                </Box>
                </>
                }
            </Box>
        </>
    )
}