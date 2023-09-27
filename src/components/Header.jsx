
import { 
    Box, 
    HStack, 
    Text, 
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Avatar,
    Center,
    Button
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { GITHUB_LOGIN_URL } from "../application"

import github from '../resource/github.png'

export default function Header () {
    const [dynamicStyle, setDynamicStyle] = useState({})

    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const navigate = useNavigate()

    const [clicked, setClicked] = useState(1)
    const [isLogin, setIsLogin] = useState(false)

    const style = {
        backgroundColor: 'black',
        transitionDuration: "0.5s",
    }

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 0) { setDynamicStyle(style)} 
            else { setDynamicStyle({ transitionDuration: "0.5s" }) }
        })

        if (localStorage.getItem('9token') != null) {
            setIsLogin(true)
        }
    }, [])

    const navClick = (id, loc, auth) => {
        if (!auth) {
            setClicked(id)
            navigate(loc)
            return
        }
        
        if (!isLogin) {
            onOpen()
            return
        }

        setClicked(id)
        navigate(loc)
    }

    return (
        <>
        <Modal onClose={onClose} isOpen={isOpen} isCentered >
            <ModalOverlay 
                backdropFilter={'auto'}
                backdropSaturate={'80%'}
                backdropBlur={'2px'}
            />
            <ModalContent bgColor={'#101010'}>
                <ModalCloseButton  />
                <ModalBody p={'16px 0 16px 0'}>
                    <Center w={'100%'} h={'100%'} >
                        <Button h={'100%'} bgColor={'#101010'} color={'white'} fontSize={'18px'} p={2} onClick={() => window.location.href = GITHUB_LOGIN_URL}>
                            <HStack alignItems={'center'}>
                                <Avatar src={github} size={'sm'} />
                                <Text>Github로 시작하기</Text>
                            </HStack>
                        </Button>
                    </Center>
                </ModalBody>
            </ModalContent>
        </Modal>
        <Box position={'sticky'} top={'0'} style={dynamicStyle} zIndex={5}>
            <Box w={'1200px'} m={'auto'} p={'0 32px 0 32px'} display={'flex'} justifyContent={'space-between'} alignItems={'center'} h={'65px'}>
                <Box onClick={() => navigate('/')}>
                    <Text fontSize={'2xl'} fontWeight={'bold'} cursor={'pointer'}>구해YO</Text>
                </Box>
                <HStack letterSpacing={'-1px'} fontSize={'15px'} fontWeight={'600'} pl={'90px'}>
                    <Box p={'15px 20px 15px 20px'} cursor={'pointer'} onClick={() => navClick(0, '/private', true)}>
                        <Text className={ clicked === 0 ? 'nav_active' : 'nav_deactive'}>프로필</Text>
                    </Box>
                    <Box p={'15px 20px 15px 20px'} cursor={'pointer'} onClick={() => navClick(1, '/', false)}>
                        <Text className={ clicked === 1 ? 'nav_active' : 'nav_deactive'}>네트워크</Text>
                    </Box>
                    <Box p={'15px 20px 15px 20px'} cursor={'pointer'} onClick={() => navClick(2, '/mission', true)}>
                        <Text className={ clicked === 2 ? 'nav_active' : 'nav_deactive'}>문의하기</Text>
                    </Box>
                </HStack>
                <Box h={'40px'} borderRadius={10}>
                    <HStack w={'100%'} spacing={5}>
                        <Input bgColor={'#202020'} border={'none'} borderRadius={10} letterSpacing={'-1px'} fontSize={'13px'} placeholder={'프로젝트 및 스터디 검색'} />
                        {!isLogin && <Text cursor={'pointer'} fontSize={'15px'} w={'60px'} letterSpacing={'-1px'} onClick={() => window.location.href = GITHUB_LOGIN_URL}>로그인</Text>}
                    </HStack>
                </Box>
            </Box>
        </Box>
        </>
    )
}