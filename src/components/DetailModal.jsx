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
    Badge,
} from "@chakra-ui/react";

import kakao    from '../resource/kakao.png'
import discord  from '../resource/disord.png'

export default function DetailModal ({onClose, isOpen, data}) {

    console.log(data)

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent minW={'72rem'} h={'93%'} bgColor={'#292929'}>
                <ModalHeader />
                <ModalCloseButton />
                <ModalBody p={'15px 32px 32px 32px'}>
                    <HStack w={'100%'} alignItems={'flex-start'}>
                        <VStack w={'75%'} alignItems={'flex-start'}>
                            <Box pb={'8px'} w={'100%'} borderBottom={'1px solid #393939'}>
                                <Text fontWeight={'bold'} fontSize={'24px'}>받은 메세지</Text>
                            </Box>
                            <Text pt={2} color={'#EEEEEE'} fontSize={'16px'}>{data.message}</Text>
                        </VStack>
                        <VStack w={'25%'} spacing={4} p={'0 62px 0 62px'}>
                            <Avatar m={0} w={'128px'} h={'128px'} src={data.requester.avatar_url} />
                            <VStack w={'100%'}>
                                <Text fontSize={'24px'}>{data.requester.nickname}</Text>
                                <HStack>
                                    <Badge m={0} p={'2px 5px 2px 5px'}>{data.requester.type}</Badge>
                                    <Badge colorScheme="twitter" p={'2px 5px 2px 5px'} m={0}>{data.requester.field}</Badge>
                                </HStack>
                                <VStack spacing={5} w={'100%'} pt={7}>
                                    <HStack alignContent={'flex-start'} w={'100%'} spacing={3}>
                                        <Avatar h={'32px'} w={'32px'} m={0} />
                                        {data.requester.contract.phone !== null ? 
                                            <Text>{data.requester.contract.phone}</Text> 
                                            :<Text color={'gray'}>없음</Text>}
                                    </HStack>
                                    <HStack alignContent={'flex-start'} w={'100%'} spacing={3}>
                                        <Avatar src={kakao} h={'32px'} w={'32px'} m={0} />
                                        {data.requester.contract.kakao !== null ? 
                                            <Text>{data.requester.contract.kakao}</Text> 
                                            :<Text color={'gray'}>없음</Text>}
                                    </HStack>
                                    <HStack alignContent={'flex-start'} w={'100%'} spacing={3}>
                                        <Avatar src={discord} h={'32px'} w={'32px'} m={0} />
                                        {data.requester.contract.discord !== null ? 
                                            <Text>{data.requester.contract.discord}</Text> 
                                            :<Text color={'gray'}>없음</Text>}
                                    </HStack>
                                </VStack>
                            </VStack>
                        </VStack>
                    </HStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}