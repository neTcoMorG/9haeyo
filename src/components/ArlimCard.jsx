import { Avatar, HStack, VStack, Text } from "@chakra-ui/react";


export default function AlrimCard ({data}) {
    return (
        <>
        {data &&             
            <HStack w={'100%'}>
                <Avatar size={'sm'} src={data.avatar_url} />
                <VStack>
                    <Text>{data.title}</Text>
                    <Text>{data.txt}</Text>
                </VStack>
            </HStack>}
        </>
    )
}