
import { 
    Avatar, 
    Box, 
    HStack, 
    VStack,
    Text,
    Badge,
    Divider
} from "@chakra-ui/react"

import kakao from '../../resource/kakao.png'
import discord from '../../resource/disord.png'
import { useNavigate } from "react-router-dom"

export default function MePage ({profile, setter}) {

    const navigate = useNavigate()

    return (
        <>
            <Box p={'24px 24px 34px 24px'} w={'100%'} bgColor={'#202020'} borderRadius={10} position={'relative'}>
                {profile &&
                <>
                <Box position={'absolute'} right={'38px'} cursor={'pointer'} zIndex={5} onClick={() => navigate('/private/modify')}>
                    <Text fontSize={'14px'} letterSpacing={'-1px'} color={'#4d8df5'}>프로필 수정</Text>
                </Box>
                <Box w={'100%'} pt={'10px'}>
                    <HStack pl={'10px'} spacing={7} alignItems={'flex-start'}>
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
                        <VStack spacing={3}>
                            <Avatar w={'180px'} h={'180px'} src={profile.avatar_url} zIndex={5} />
                            {/* <Text borderRadius={10} border={'1px solid white'} p={'3px 18px 3px 18px'} fontSize={'15px'}>{profile.type}</Text> */}
                        </VStack>
                        <VStack alignItems={'flex-start'} spacing={3} zIndex={5}>
                            <Box>
                                <Text fontSize={'35px'} letterSpacing={'-2px'}>{profile.nickname}</Text>
                                <Text fontSize={'20px'} letterSpacing={'-2px'} color={'gray'}>
                                    {profile.repository}    
                                </Text>
                            </Box>
                            <Badge m={0} p={'2px 8px 2px 8px'} fontSize={'13px'} letterSpacing={'-1px'}>
                                {profile.field}
                            </Badge>
                            <HStack spacing={6} pt={2}>
                                <HStack>
                                    <Avatar w={'30px'} h={'30px'} />
                                    {profile.contract.phone ? <Text>{profile.contract.phone}</Text> : <Text color={'gray'}>없음</Text> }
                                </HStack>
                                <HStack>
                                    <Avatar w={'30px'} h={'30px'} src={kakao} />
                                    {profile.contract.kakao ? <Text>{profile.contract.kakao}</Text> : <Text color={'gray'}>없음</Text> }
                                </HStack>
                                <HStack>
                                    <Avatar w={'30px'} h={'30px'} src={discord} />
                                    {profile.contract.discord ? <Text>{profile.contract.discord}</Text> : <Text color={'gray'}>없음</Text> }
                                </HStack>
                            </HStack>
                            <Text pt={10}>{profile.about}</Text>
                            <VStack pt={10} alignItems={'flex-start'} w={'100%'} spacing={3}>
                                <Text fontSize={'22px'} fontWeight={'bold'}>기술</Text>
                                <Divider bgColor={'#DDDDDD'}/>
                                <HStack wrap={'wrap'}>
                                    {profile.skills.map(s => <Badge m={0} fontSize={'13px'} bgColor={'#292929'} color={'white'} p={'2px 10px 2px 10px'}>{s}</Badge>)}
                                </HStack> 
                            </VStack>
                        </VStack>
                    </HStack>
                </Box>
                </>
                }
            </Box>
        </>
    )
}