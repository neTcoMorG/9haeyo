
import { 
    Box, 
    Container, 
    HStack, 
    VStack, 
    Text, 
    Button, 
    Modal, 
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    useDisclosure
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import SubMissionCard from "../../components/SubMissionCard"
import axios from "axios"
import { API_SERVER } from "../../application"

export default function SubMissionPage () {

    const createModal = useDisclosure()

    const [wait, setWait]         = useState()
    const [progress, setProgress] = useState()
    const [done, setDone]         = useState()

    useEffect(() => {
        axios.get(API_SERVER + '/mission?status=WAIT').then(res => setWait(res.data.content))
        axios.get(API_SERVER + '/mission?status=PROGRESS').then(res => setProgress(res.data.content))
        axios.get(API_SERVER + '/mission?status=DONE').then(res => setDone(res.data.content))
    }, [])


    return (
        <>
            <Modal isOpen={createModal.isOpen} onClose={createModal.onClose} isCentered p={'16px'}>
                <ModalOverlay 
                    backdropFilter={'auto'}
                    backdropBlur={'4px'}
                />
                <ModalContent bgColor={'#101010'} w={'448px'} h={'528px'} p={'12px'}>
                    <ModalHeader fontSize={'18px'}>로드맵 생성</ModalHeader>
                    <ModalCloseButton  />
                    <ModalBody p={'16px'}>
                        <VStack>
                            <FormControl>
                                <FormLabel fontSize={'13px'} color={'#A3A3A3'}>제목</FormLabel>
                                <Input placeholder="로드맵 제목" h={'38px'} />
                            </FormControl>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Container maxW={'1200px'} p={'32px'}>
                <Box display={'flex'} justifyContent={'flex-end'} mb={3}>
                    <Button h={'30px'} fontSize={'12px'} bgColor={'#DA5A63'} color={'white'} _hover={{
                        bgColor: 'crimson'
                    }} onClick={createModal.onOpen}>로드맵 생성</Button>
                </Box>
                <HStack w={'100%'} spacing={4} alignItems={'flex-start'}>
                    <Box w={'100%'} borderRadius={10} border={'1px solid #303030'} pb={2}>
                        <VStack w={'100%'} alignItems={'flex-start'}>
                            <Box p={'16px 20px 6px 20px'} borderBottom={'1px solid #303030'} w={'100%'}>
                                <Text fontSize={'13px'} color={'#D8B4FE'} letterSpacing={'-1px'}>대기중</Text>
                            </Box>
                            <VStack p={'6px 8px 6px 8px'} w={'100%'} spacing={3}>

                            </VStack>
                        </VStack>
                    </Box>
                    <Box w={'100%'} borderRadius={10} border={'1px solid #303030'} pb={2}>
                        <VStack w={'100%'}>
                            <Box  p={'16px 20px 6px 20px'} borderBottom={'1px solid #303030'} w={'100%'}>
                                <Text fontSize={'13px'} color={'#FACC15'} letterSpacing={'-1px'}>진행중</Text>
                            </Box>
                            <VStack p={'6px 8px 6px 8px'} w={'100%'} spacing={3}>
                                <SubMissionCard 
                                    mission={{
                                        title: '사용자 문의사항 기능',
                                        date: '2023. 09. 27',
                                        type: '추가 기능'
                                    }}
                                />
                            </VStack>
                        </VStack>
                    </Box>
                    <Box w={'100%'} borderRadius={10} border={'1px solid #303030'} pb={2}>
                        <VStack w={'100%'}>
                            <Box p={'16px 20px 6px 20px'} borderBottom={'1px solid #303030'} w={'100%'}>
                                <Text fontSize={'13px'} color={'#4ADE80'} letterSpacing={'-1px'}>완료</Text>
                            </Box>
                            <VStack p={'6px 8px 6px 8px'} w={'100%'} spacing={3}>
                                
                            </VStack>
                        </VStack>
                    </Box>
                </HStack>
            </Container>
        </>
    )
}