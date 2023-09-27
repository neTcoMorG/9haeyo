
import {
    Box, 
    Input, 
    VStack
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useFields } from '../../hooks/useCates'
import { Select as MultiSelect } from "chakra-react-select";

export default function MeModifyPage () {
    
    const fields = useFields()
    const [profile, setProfile] = useState()
    const [field, setField] = useState()

    useEffect(() => {
        
    }, [])

    return (
        <>
             <Box p={'24px'} w={'100%'} bgColor={'#202020'} borderRadius={10}>
                <VStack width={'100%'} alignItems={'flex-start'} spacing={5}>
                    <Input variant={'flushed'} placeholder='닉네임' w={'250px'} fontSize={'14px'} borderColor={'#CCCCCC'}/>
                    <Box w={'250px'}>
                        <MultiSelect 
                            variant='flushed'
                            placeholder='분야 선택'
                            value={field}
                            options={fields}
                            onChange={setField}
                        />
                    </Box>
                </VStack>
             </Box>
        </>
    )
}