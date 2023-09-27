import { Box, VStack, Text, Badge } from "@chakra-ui/react";


export default function SubMissionCard ({mission}) {
    return (
        <>
            <VStack 
                cursor={'pointer'}
                w={'100%'}
                justifyContent={'center'}
                alignItems={'flex-start'} 
                h={'95px'} 
                bgColor={'#262626'} spacing={1} p={'10px'} borderRadius={10}>
                <Text fontSize={'13px'}>{mission.title}</Text>
                <Text fontSize={'12px'} color={'#737373'}>{mission.date}</Text>
                <Badge 
                    p={'2px 10px 2px 10px'}
                    mt={1} 
                    borderRadius={10} 
                    bgColor={'#262626'} 
                    color={'#919191'}
                    fontSize={'6px'}
                    textAlign={'center'}
                    border={'1px solid #3b3b3b'}>{mission.type}</Badge>
            </VStack>
        </>
    )
}