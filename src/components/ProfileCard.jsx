import { Box, 
    Button, Grid, HStack, Image, VStack, Text, Badge,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    useDisclosure, } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ProfileCardSkill from "./ProfileCardSkill";

export default function ProfileCard ({user, handler}) {

    const navigate = useNavigate()
    
    return (
        <>
        <Box cursor={'pointer'} w={'100%'} zIndex={5}>
            <Grid gridRowGap={1} templateRows='210px 90px 30px'>
            {user && 
            <>
                <Image 
                    w={'100%'}
                    borderRadius={'10px'}
                    objectFit={'cover'}
                    src={user.avatar_url} 
                    onClick={() => navigate('/public/' + user.nickname)}
                />
                <VStack alignItems={'flex-start'} spacing={2} w={'100%'} pt={2} onClick={() => navigate('/public/' + user.nickname)}>
                    <HStack w={'100%'}>
                        <Text fontSize={'16px'} fontWeight={600} letterSpacing={'-1px'}>{user.field}</Text>
                        {user.user_type === "실무자" ? <Badge colorScheme="red" p={'0 3px 0 3px'} m={0}>{user.user_type}</Badge> : null}
                        {user.user_type === "취준생" ? <Badge colorScheme="green" p={'0 3px 0 3px'} m={0}>{user.user_type}</Badge> : null}
                        {user.user_type === "꿈나무" ? <Badge p={'0 3px 0 3px'} m={0}>{user.user_type}</Badge> : null}
                    </HStack>
                    <Box w={'100%'}>
                        <Text fontSize={'14px'} color={'#BBBBBB'} fontWeight={400} w={'200px'} style={{
                            overflow:'hidden',
                            textOverflow: 'ellipsis',
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                        }}>
                            {user.about}
                        </Text>
                    </Box>
                </VStack>
                <ProfileCardSkill skills={user.skills} />
                <HStack h={'38px'} w={'100%'}>
                    <Button bgColor={'#202020'} color={'white'} w={'100%'} letterSpacing={'-1px'} fontSize={'14px'} onClick={() => handler(user.nickname, user.avatar_url)}>
                        <span class="material-symbols-outlined" style={{backgroundColor: 'inherit', paddingRight: '7px', fontSize: '20px'}}>handshake</span>
                        <Text>같이해요</Text>
                    </Button>
                </HStack>
            </>}
            </Grid>
        </Box>
        </>
    )
}