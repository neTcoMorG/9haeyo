
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
    useDisclosure,
    useToast,
    Select
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import SubMissionCard from "../../components/SubMissionCard"
import axios from "axios"
import { API_SERVER } from "../../application"

import MDEditor, {commands} from "@uiw/react-md-editor"

export default function SubMissionPage () {

    const createModal = useDisclosure()

    const toast = useToast()

    const [wait, setWait]         = useState()
    const [progress, setProgress] = useState()
    const [done, setDone]         = useState()

    const [category, setCategory] = useState('FR')

    const [title, setTitle]       = useState("")
    const [txt, setTxt]           = useState("")

    useEffect(() => {
        axios.get(API_SERVER + '/mission?status=WAIT').then(res => setWait(res.data.content))
        axios.get(API_SERVER + '/mission?status=PROGRESS').then(res => setProgress(res.data.content))
        axios.get(API_SERVER + '/mission?status=DONE').then(res => setDone(res.data.content))
    }, [])

    const onChangeCategory = (val) => {
        setCategory(val.target.value)
    }

    const onChangeTitle = (e) => {
        setTitle(e.target.value)
    }

    const clearFormData = () => {
        setTitle('')
        setTxt('')
    }

    const createRoadMap = () => {

        if (title.length <= 0 || txt.length <= 0) {
            toast({
                title:'내용을 입력해주세요',
                status: 'warning'
            })
            return
        }

        const packet = {
            title,
            txt,
            category
        }

        console.log(packet);

        axios.post(API_SERVER + '/mission', JSON.stringify(packet), {headers: {
            Authorization: localStorage.getItem('9token'),
            'Content-Type': 'application/json'
        }})
        .then(res => {
            setWait([res.data, ...wait])
            toast({
                title: '당신의 아이디어에 감사합니다',
                status: 'info'
            })
            createModal.onClose()
            clearFormData()
        })
    }

    return (
        <>
            <Modal closeOnOverlayClick={false} isOpen={createModal.isOpen} onClose={createModal.onClose} isCentered p={'16px'}>
                <ModalOverlay 
                    backdropFilter={'auto'}
                    backdropBlur={'4px'}
                />
                <ModalContent bgColor={'#101010'} w={'448px'} h={'580px'} p={'12px'}>
                    <ModalHeader fontSize={'18px'}>New Submission</ModalHeader>
                    <ModalCloseButton  />
                    <ModalBody p={'16px'} w={'100%'} h={'100%'}>
                        <VStack spacing={5}>
                            <FormControl isRequired>
                                <FormLabel fontSize={'13px'} color={'#A3A3A3'}>제목</FormLabel>
                                <Input onChange={onChangeTitle} value={title} placeholder="로드맵 제목" h={'36px'} fontSize={'14px'} borderColor={'#202020'}/>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel fontSize={'13px'} color={'#A3A3A3'}>로드맵 카테고리</FormLabel>
                                <Select borderColor={'#202020'} h={'36px'} fontSize={'13px'} onChange={onChangeCategory}> 
                                    <option value={'FR'}  style={{backgroundColor: '#202020'}} fontSize={'13px'} color={'#A3A3A3'}>기능 추가</option>
                                    <option value={'BUG'} style={{backgroundColor: '#202020'}} fontSize={'13px'} color={'#A3A3A3'}>버그 수정</option>
                                </Select>
                            </FormControl>
                            <FormControl isRequired h={'100%'}>
                                <FormLabel fontSize={'13px'} color={'#A3A3A3'}>당신의 아이디어</FormLabel>
                                <MDEditor 
                                    value={txt}
                                    onChange={setTxt}
                                    w={'100%'}
                                    height={230}
                                    preview="edit"
                                    commands={[
                                        commands.title,
                                        commands.bold
                                    ]}
                                />
                            </FormControl>
                            <Box display={'flex'} justifyContent={'flex-end'} mb={3} w={'100%'}>
                                <Button h={'30px'} fontSize={'12px'} bgColor={'#DA5A63'} color={'white'} _hover={{
                                    bgColor: 'crimson'
                                }} onClick={createRoadMap}>로드맵 등록</Button>
                            </Box>
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
                                {wait && wait.map(w => 
                                    <SubMissionCard mission={{
                                        title: w.title,
                                        date: w.created,
                                        writer: w.writer,
                                        status: w.status,
                                        txt: w.message,
                                        cate: w.category
                                    }}/>)}
                            </VStack>
                        </VStack>
                    </Box>
                    <Box w={'100%'} borderRadius={10} border={'1px solid #303030'} pb={2}>
                        <VStack w={'100%'}>
                            <Box  p={'16px 20px 6px 20px'} borderBottom={'1px solid #303030'} w={'100%'}>
                                <Text fontSize={'13px'} color={'#FACC15'} letterSpacing={'-1px'}>진행중</Text>
                            </Box>
                            <VStack p={'6px 8px 6px 8px'} w={'100%'} spacing={3}>
                                {progress && progress.map(p => 
                                    <SubMissionCard mission={{
                                        title: p.title,
                                        date: p.created,
                                        writer: p.writer,
                                        status: p.status,
                                        txt: p.message,
                                        cate: p.category
                                }}/>)}
                            </VStack>
                        </VStack>
                    </Box>
                    <Box w={'100%'} borderRadius={10} border={'1px solid #303030'} pb={2}>
                        <VStack w={'100%'}>
                            <Box p={'16px 20px 6px 20px'} borderBottom={'1px solid #303030'} w={'100%'}>
                                <Text fontSize={'13px'} color={'#4ADE80'} letterSpacing={'-1px'}>완료</Text>
                            </Box>
                            <VStack p={'6px 8px 6px 8px'} w={'100%'} spacing={3}>
                                {done && done.map(d => 
                                    <SubMissionCard mission={{
                                        title: d.title,
                                        date: d.created,
                                        writer: d.writer,
                                        status: d.status,
                                        txt: d.message,
                                        cate: d.category
                                }}/>)}
                            </VStack>
                        </VStack>
                    </Box>
                </HStack>
            </Container>
        </>
    )
}