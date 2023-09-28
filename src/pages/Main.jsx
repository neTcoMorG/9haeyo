
import { 
    Container, 
    Box, 
    Center, 
    Text, 
    VStack, 
    HStack, 
    Button, 
    Switch, 
    Grid,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Avatar,
    Tooltip,
    Textarea,
    useToast,
} from "@chakra-ui/react"
import ProfileCard from "../components/ProfileCard"
import { useEffect, useState } from "react"
import axios from "axios"
import { API_SERVER, GITHUB_LOGIN_URL } from "../application"
import { useFields } from "../hooks/useCates"
import github from '../resource/github.png'
import { useNavigate } from "react-router-dom"

export default function Main () {

    const navigate = useNavigate()

    const toast = useToast()
    const loginModal   = useDisclosure()
    const reqModal = useDisclosure()

    const [previews, setPreviews] = useState()
    const [toggle, setToggle] = useState(false)
    const [search, setSearch] = useState('전체')

    const [req, setReq] = useState({nickname: '', message: ''})
    const [reqUser, setReqUser] = useState()

    const fields = useFields()
    
    const onSearch = (type) => {
        if (type === '전체') {
            setSearch('전체')
            return
        }
        setSearch(type)
    }

    const changeRequestMessage = (e) => {
        setReq({
            nickname: reqUser.nickname,
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

    const sendRequest = (nickname, avatar_url) => {
        const token = localStorage.getItem('9token')
        if (token == null) {
            loginModal.onOpen()
            return
        }
        setReq({nickname: '', message: ''})
        setReqUser({
            nickname,
            avatar_url,
        })
        reqModal.onOpen()
    }

    const networkSwitchToggle = () => {
        const token = localStorage.getItem('9token')
        if (token == null) {
            loginModal.onOpen()
            return
        }
        axios.get(API_SERVER + '/hub/toggle', {headers: {Authorization: localStorage.getItem('9token')}})
        .then(res => {
            setPreviews(res.data.previews)
            setToggle(res.data.status)
        })
        .catch(err => {
            const {code} = err.response.data
            if (code === "MalformedException") {
                toast({
                    status: 'warning',
                    title: '먼저 프로필 정보를 입력해주세요'
                })
                navigate('/private/modify')
            }
        })
    }

    useEffect(() => {
        setSearch('전체')
        axios.get(API_SERVER + '/hub/users').then(res => {setPreviews(res.data.content);})
        axios.get(API_SERVER + '/hub/status', {headers: {Authorization: localStorage.getItem('9token')}})
        .then(res => setToggle(res.data))
    }, [])

    return (
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
                        {reqUser && <>
                            <VStack spacing={4} w={'100%'}>
                                <Avatar h={'120px'} w={'120px'}  src={reqUser.avatar_url} />
                                <HStack letterSpacing={'-1px'} fontSize={'18px'} spacing={2}>
                                    <Text fontWeight={'bold'}>{reqUser.nickname}</Text>
                                    <Text>님 같이해요</Text>
                                </HStack>
                                <Textarea borderColor={'#303030'} h={'280px'} placeholder="무엇을 함께 하고 싶으신가요?" value={req.message} onChange={changeRequestMessage} />
                                <Button bgColor={'#4d8df5'} color={'white'} w={'100%'} onClick={requestPacket}>보내기</Button>
                            </VStack>
                        </>}
                    </Center>
                </ModalBody>
            </ModalContent>
        </Modal>
        <Modal onClose={loginModal.onClose} isOpen={loginModal.isOpen} isCentered >
            <ModalOverlay 
                backdropFilter={'auto'}
                backdropSaturate={'80%'}
                backdropBlur={'2px'}
            />
            <ModalContent bgColor={'#101010'}>
                <ModalCloseButton  />
                <ModalBody p={'16px 0 16px 0'}>
                    <Center w={'100%'} h={'100%'} p={'0 60px 0 60px'} >
                        <Button h={'100%'} w={'100%'} bgColor={'#101010'} color={'white'} fontSize={'18px'} p={2} onClick={() => window.location.href = GITHUB_LOGIN_URL}>
                            <HStack alignItems={'center'}>
                                <Avatar src={github} size={'sm'} />
                                <Text>Github로 시작하기</Text>
                            </HStack>
                        </Button>
                    </Center>
                </ModalBody>
            </ModalContent>
        </Modal>
        <Box paddingBottom={'80px'}>
            <Box className="banner-effect-wrapper">
                <Box className="banner-effect" />
            </Box>
            <Center h={'300px'}>
                <VStack spacing={5}>
                    <Text fontSize={'32px'} fontWeight={'bold'} letterSpacing={'-1px'} color={'white'}>이런 개발자들이 함께하길 원해요</Text>
                    <HStack>
                        <Tooltip label='네트워크에 프로필을 공개하지 않으면 다른 사람이 확인할 수 없어요'>
                            <HStack bgColor={'#101010'} p={'15px 20px 15px 20px'} zIndex={2} position={'relative'} borderRadius={10} w={'193px'} h={'50px'} justifyContent={'center'} spacing={3}>
                                <Text bgColor={'#101010'} fontSize={'14px'} letterSpacing={'-1px'} fontWeight={500}>네트워크에 공개</Text>
                                <Switch size={'sm'} onChange={networkSwitchToggle} isChecked={toggle} />
                            </HStack>
                        </Tooltip>
                        <Button 
                            fontWeight={500}
                            letterSpacing={'-1px'}
                            fontSize={'14px'}
                            zIndex={2} 
                            position={'relative'}
                            p={'15px 20px 15px 20px'}
                            bgColor={'#101010'}
                            borderRadius={10}
                            h={'50px'}
                            color={'white'}>
                                내 프로필</Button>
                    </HStack>
                </VStack>
            </Center>
            <Container maxW={'1200px'} p={'0 32px 0 32px'}>
                <HStack spacing={10} alignItems={'flex-start'}> 
                    <Box w={'250px'} position={'sticky'} top={'15%'}> 
                        <Box borderBottom={'1px solid #202020'}>
                            <Text fontSize={'15px'} fontWeight={'bold'} pb={2} letterSpacing={'-1px'}>분야 선택</Text>
                        </Box>
                        <HStack wrap={'wrap'} h={'100%'} pt={3}>
                            <Box onClick={() => onSearch('전체')} cursor={'pointer'} p={'6px 12px 6px 12px'} borderRadius={10} sx={{
                                'backgroundColor': search === '전체' ? '#4d8df5' : '#202020',
                            }}>
                                <Text fontSize={'15px'} onClick={onSearch} fontWeight={'500'} sx={{
                                    'color': search === '전체' ? '#FFFFFF' : '#AAAAAA',
                                }}>전체</Text>
                            </Box>
                            {fields && fields.map(f => 
                            <Box onClick={() => onSearch(f.label)} cursor={'pointer'} p={'6px 12px 6px 12px'} borderRadius={10} sx={{
                                'backgroundColor': search === f.label ? '#4d8df5' : '#202020',
                            }}>
                                <Text id={f.label} fontSize={'15px'} onClick={onSearch} fontWeight={'500'} sx={{
                                    'color': search === f.label ? '#FFFFFF' : '#AAAAAA',
                                }}>{f.label.split(" ")[0]}</Text>
                            </Box>)}
                        </HStack>
                    </Box>
                    <Grid w={'100%'} templateColumns='repeat(4, 1fr)' gridRowGap={'42px'} gridColumnGap={4}>
                        {previews && previews.map(pr =>
                            <ProfileCard handler={sendRequest} user={pr} />)}
                    </Grid>
                </HStack>
            </Container>
        </Box>
        </>
    )
}