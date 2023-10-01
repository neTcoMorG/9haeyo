
import { 
    Avatar, Box, Center, Container, HStack, Heading, VStack, Text, Badge, Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    useToast,
    Textarea
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { API_SERVER } from "../../application"
import axios from "axios"
import { GITHUB_LOGIN_URL } from "../../application"
import github from '../../resource/github.png'

export default function PublicProfilePage () {

    const toast = useToast()
        
    const reqModal = useDisclosure()
    const loginModal   = useDisclosure()
    const [req, setReq] = useState({nickname: '', message: ''})

    const { nickname } = useParams()
    const [data, setData] = useState()
    const [isReaction , setReaction] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        axios.get(API_SERVER + '/hub/user/' + nickname).then(res => { setData(res.data) })
        .catch(err => {
            alert('사용자의 프로필이 닫혀있어요')
            navigate(-1)
        })
        axios.get(API_SERVER + '/hub/reaction/status?nickname=' + nickname, {
            headers: {Authorization: localStorage.getItem('9token')}
        })
        .then(res => setReaction(res.data))
        .catch(() => {
            loginModal.onOpen()
        })
        setReq({
            ...req,
            nickname,
        })
    }, [nickname])

    const changeRequestMessage = (e) => {
        setReq({
            nickname: nickname,
            message: e.target.value
        })
    }

    const requestPacket = () => {
        axios.post(API_SERVER + '/req', JSON.stringify(req), {headers: {
            Authorization: localStorage.getItem('9token'),
            'Content-Type': 'application/json'
        }})
        .then(() => {
            reqModal.onClose()
            toast({
                title: '성공적으로 보냈어요!',
                status: 'info'
            })
        })
    }

    const sendRequest = () => {
        const token = localStorage.getItem('9token')
        if (token == null) {
            loginModal.onOpen()
            return
        }
        setReq({nickname: '', message: ''})
        reqModal.onOpen()
    }

    const reaction = (type) => {
        axios.post(API_SERVER + '/hub/reaction/' + nickname, {type}, {headers: {
            Authorization: localStorage.getItem('9token'),
            'Content-Type': 'application/json'
        }})
        .then(res => {
            setData({
                ...data,
                reactions: res.data  
            })
            setReaction(true)
        })
    }

    const cancel = () => {
        axios.post(API_SERVER + '/hub/reaction/delete', {nickname}, {headers: {
            Authorization: localStorage.getItem('9token'),
            'Content-Type': 'application/json'
        }})
        .then(res => {
            setData({
                ...data,
                reactions: res.data  
            })
            setReaction(false)
        })
    }

    return (
        <Box>
            {data &&
            <>
            <Modal onClose={reqModal.onClose} isOpen={reqModal.isOpen} isCentered >
                <ModalOverlay 
                    backdropFilter={'auto'}
                    backdropSaturate={'80%'}
                    backdropBlur={'5px'}
                />
                <ModalContent bgColor={'#101010'}>
                    <ModalCloseButton  />
                    <ModalBody p={'32px'}>
                        <Center w={'100%'}>
                            <>
                                <VStack spacing={4} w={'100%'}>
                                    <Avatar h={'120px'} w={'120px'} src={data.user.avatar_url} />
                                    <HStack letterSpacing={'-1px'} fontSize={'18px'} spacing={2}>
                                        <Text fontWeight={'bold'}>{nickname}</Text>
                                        <Text>님 같이해요</Text>
                                    </HStack>
                                    <Textarea borderColor={'#303030'} h={'280px'} placeholder="무엇을 함께 하고 싶으신가요?" value={req.message} onChange={changeRequestMessage} />
                                    <Button bgColor={'#4d8df5'} color={'white'} w={'100%'} onClick={requestPacket}>보내기</Button>
                                </VStack>
                            </>
                        </Center>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Modal onClose={() => navigate(-1)} isOpen={loginModal.isOpen} isCentered >
                <ModalOverlay 
                    backdropFilter={'auto'}
                    backdropSaturate={'80%'}
                    backdropBlur={'4px'}
                />
                <ModalContent bgColor={'#101010'}>
                    <ModalCloseButton  />
                    <ModalBody p={'16px 0 16px 0'}>
                        <Center w={'100%'} h={'100%'} p={'0 60px 0 60px'} >
                            <Button h={'100%'} bgColor={'#101010'} w={'100%'} color={'white'} fontSize={'18px'} p={2} onClick={() => window.location.href = GITHUB_LOGIN_URL}>
                                <HStack alignItems={'center'}>
                                    <Avatar src={github} size={'sm'} />
                                    <Text>Github로 시작하기</Text>
                                </HStack>
                            </Button>
                        </Center>
                    </ModalBody>
                </ModalContent>
            </Modal>
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
                        <Button w={'100%'} fontSize={'14px'} bgColor={'#202020'} color={'white'} onClick={sendRequest}>같이해요</Button>
                        <Box w={'100%'} bgColor={'#202020'} borderRadius={10} p={'24px 24px 24px 24px'}>
                            <Box borderBottom={'1px solid #606060'} pb={2} w={'100%'}>
                                <Text fontSize={'17px'} fontWeight={'bold'}>반응({data.reactions.length})</Text>
                            </Box>
                            <HStack spacing={2} wrap={'wrap'} pt={2} w={'100%'}>
                                    {isReaction == true ?
                                        <Button w={'100%'} onClick={cancel} h={'30px'} colorScheme={'green'} fontSize={'12px'}>반응 삭제하기</Button> 
                                    :<>
                                        <Button onClick={() => reaction(true)}  h={'30px'} w={'auto'} colorScheme={'blue'} fontSize={'12px'}>대단해요</Button>
                                        <Button onClick={() => reaction(false)} h={'30px'} w={'auto'} colorScheme={'red'} fontSize={'12px'}>별로에요</Button>
                                    </> }
                            </HStack>
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