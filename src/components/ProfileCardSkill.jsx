
import { Box, HStack, Badge, Text } from "@chakra-ui/react";

export default function ProfileCardSkill ({skills}) {

    if (skills.length > 4) {
        return (
            <Box>
                <HStack wrap={'wrap'} spacing={1}>
                    {skills && Array.from({length: 3}, (_, idx) => 
                    <Badge m={0} p={'3px 7px 3px 7px'} fontWeight={600} borderRadius={5} fontSize={'10px'} bgColor={'#303030'} color={'#DDDDDD'}>
                        {skills[idx]}
                    </Badge>)}
                    <Text color={'#4d8df5'} m={0} fontWeight={700} fontSize={'10px'}>
                        +{skills.length - 4}
                    </Text>
                </HStack>
            </Box>
        )
    }

    return (
        <Box>
            <HStack wrap={'wrap'} spacing={1}>
                {skills && skills.map(skill => 
                    <Badge m={0} p={'3px 7px 3px 7px'} bgColor={'#303030'} fontWeight={600} borderRadius={5} fontSize={'10px'} color={'#DDDDDD'}>
                        {skill}
                    </Badge>)}
            </HStack>
        </Box>   
    )
}