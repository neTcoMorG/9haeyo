
import { 
    Avatar, 
    VStack, 
    Text, 
    Box, 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    HStack,
    Center,
} from "@chakra-ui/react";

import MDEditor from '@uiw/react-md-editor';

export default function MissionDetail ({onClose, isOpen, data}) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent minW={'72rem'} h={'93%'} bgColor={'#292929'}>
                <ModalHeader />
                <ModalCloseButton />
                <ModalBody p={'15px 32px 32px 32px'}>
                    <Center w={'100%'}>
                        <HStack w={'100%'} alignItems={'flex-start'} p={'0 32px 0 32px'} spacing={10}>
                            <VStack w={'745px'} alignItems={'flex-start'} pr={'30px'}>
                                <Box borderBottom={'1px solid #393939'} w={'100%'} pb={3}>
                                    <Text fontSize={'18px'} fontWeight={'bold'}>{data.title}</Text>
                                </Box>
                                <Box pt={5} w={'100%'}>
                                    <MDEditor.Markdown
                                        style={{
                                            backgroundColor: '#292929',
                                            fontSize: '15px',
                                            fontWeight: 'lighter'
                                        }}
                                        source={data.txt}
                                    />
                                </Box>
                            </VStack>
                            <VStack w={'258px'} h={'100%'} alignItems={'flex-start'} spacing={5} pt={8}>
                                <HStack justifyContent={'flex-start'} spacing={'40px'}>
                                    <Text fontWeight={'bold'} w={'45px'} fontSize={'14px'} color={'#727272'}>작성자</Text>
                                    <HStack spacing={3}>
                                        <Avatar m={0} size={'sm'} src={data.writer.avatar_url} />
                                        <Text color={'#737373'} fontSize={'14px'}>{data.writer.nickname}</Text>
                                    </HStack>    
                                </HStack>
                                <HStack justifyContent={'flex-start'} spacing={'40px'}>
                                    <Text fontWeight={'bold'} w={'45px'} fontSize={'14px'} color={'#727272'}>상태</Text>
                                    <HStack spacing={3}>
                                        {data.status === "WAIT"     ? <Text fontSize={'14px'} color={'#D8B4FE'}>대기중</Text> : null}
                                        {data.status === "PROGRESS" ? <Text fontSize={'14px'} color={'#FACC15'}>진행중</Text> : null}
                                        {data.status === "DONE"     ? <Text fontSize={'14px'} color={'#4ADE80'}>완료</Text> : null}
                                    </HStack>    
                                </HStack>
                                <HStack justifyContent={'flex-start'} spacing={'40px'}>
                                    <Text fontWeight={'bold'} w={'45px'} fontSize={'14px'} color={'#727272'}>작성일</Text>
                                    <HStack spacing={3}>
                                        <Text color={'#737373'} fontSize={'14px'}>{data.date}</Text>
                                    </HStack>    
                                </HStack>
                            </VStack>
                        </HStack>
                    </Center>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}