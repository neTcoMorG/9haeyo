import { 
    Avatar, 
    VStack, 
    Text, 
    Box, 
    Button,
    Grid,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from "@chakra-ui/react";
import DetailModal from "./DetailModal";


export default function ReuqestListCard ({data}) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
        <DetailModal isOpen={isOpen} onClose={onClose} data={data} />
        {data && 
            <Grid w={'100%'} placeItems={'center'} gridColumnGap={10} templateColumns={'48px 120px 260px 100px 140px'}>
                <Avatar h={'48px'} w={'48px'} src={data.requester.avatar_url} />
                <VStack spacing={0} alignItems={'start'} w={'100%'}>
                    <Text fontSize={'16px'}>{data.requester.nickname}</Text>
                    <Text fontSize={'13px'} color={'#FFFFFF80'}>{data.requester.field}</Text>
                </VStack>
                <Box wordBreak={'break-all'} style={{
                    overflow:'hidden',
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    textOverflow: 'ellipsis',
                }} display={'flex'} alignItems={'flex-start'} w={'100%'}>
                    <Text fontSize={'16px'}>{data.message}</Text>
                </Box>
                <Text fontSize={'13px'} color={'#FFFFFF80'}>{data.created}</Text>
                <Button
                    onClick={onOpen} 
                    bgColor={'#4d8df5'} color={'white'} w={'68px'} h={'32px'} fontSize={'13px'} p={'8px 12px 8px 12px'}>연락처</Button>
            </Grid> }
        </>
    )
}