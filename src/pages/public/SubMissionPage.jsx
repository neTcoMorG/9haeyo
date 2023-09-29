
import { Box, Container, HStack, VStack, Text, Button } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import SubMissionCard from "../../components/SubMissionCard"

export default function SubMissionPage () {

    const [subMission, setSubMission] = useState()

    useEffect(() => {
        
    }, [])


    return (
        <>
            <Container maxW={'1200px'} p={'32px'}>
                <Box display={'flex'} justifyContent={'flex-end'} mb={3}>
                    <Button h={'30px'} fontSize={'12px'} bgColor={'#DA5A63'} color={'white'} _hover={{
                        bgColor: 'crimson'
                    }}>로드맵 생성</Button>
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