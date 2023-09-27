
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
} from "@chakra-ui/react"
import ProfileCard from "../components/ProfileCard"
import { useEffect, useState } from "react"
import axios from "axios"
import { API_SERVER, GITHUB_LOGIN_URL } from "../application"
import { useFields } from "../hooks/useCates"
import github from '../resource/github.png'

export default function Main () {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [previews, setPreviews] = useState()
    const [toggle, setToggle] = useState(false)

    const fields = useFields()
    
    const onSearch = () => {}

    const networkSwitchToggle = () => {
        const token = localStorage.getItem('9token')
        if (token == null) {
            onOpen()
            return
        }
        setToggle(!toggle)
    }

    useEffect(() => {
        axios.get(API_SERVER + '/hub/users').then(res => {setPreviews(res.data.content);})
    }, [])

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
        <Box paddingBottom={'80px'}>
            <Box className="banner-effect-wrapper">
                <Box className="banner-effect" />
            </Box>
            <Center h={'300px'}>
                <VStack spacing={5}>
                    <Text fontSize={'32px'} fontWeight={'bold'} letterSpacing={'-1px'} color={'white'}>이런 개발자들이 함께하길 원해요</Text>
                    <HStack>
                        <HStack bgColor={'#101010'} p={'15px 20px 15px 20px'} zIndex={2} position={'relative'} borderRadius={10} w={'193px'} h={'50px'} justifyContent={'center'} spacing={3}>
                            <Text bgColor={'#101010'} fontSize={'14px'} letterSpacing={'-1px'} fontWeight={500}>네트워크에 공개</Text>
                            {/* {toggle && <Switch size={'sm'} onChange={networkSwitchToggle} isRequired={toggle} />} */}
                            <Switch size={'sm'} onChange={networkSwitchToggle} isChecked={toggle} />
                        </HStack>
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
                    <Box w={'250px'} position={'sticky'} top={'9%'}> 
                        <Box borderBottom={'1px solid #202020'}>
                            <Text fontSize={'15px'} fontWeight={'bold'} pb={2} letterSpacing={'-1px'}>분야 선택</Text>
                        </Box>
                        <HStack wrap={'wrap'} h={'100%'} pt={3}>
                            <Box onClick={onSearch} cursor={'pointer'} p={'6px 12px 6px 12px'} bgColor={'#202020'} borderRadius={10}>
                                <Text fontSize={'15px'} onClick={onSearch} color={'#AAAAAA'} bgColor={'#202020'} fontWeight={'500'}>전체</Text>
                            </Box>
                            {fields && fields.map(f => 
                            <Box cursor={'pointer'} p={'6px 12px 6px 12px'} bgColor={'#202020'} borderRadius={10}>
                                <Text id={f.label} fontSize={'15px'} color={'#AAAAAA'} bgColor={'#202020'} onClick={onSearch} fontWeight={'500'}>{f.label.split(" ")[0]}</Text>
                            </Box>)}
                        </HStack>
                    </Box>
                    <Grid w={'100%'} templateColumns='repeat(4, 1fr)' gridRowGap={'42px'} gridColumnGap={4}>
                        {previews && previews.map(pr =>
                            <ProfileCard user={pr} />)}
                    </Grid>
                </HStack>
            </Container>
        </Box>
        </>
    )
}