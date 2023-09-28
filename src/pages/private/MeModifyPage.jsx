
import {
    Box, 
    FormControl, 
    FormLabel, 
    Input, 
    VStack
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useFields } from '../../hooks/useCates'
import { Select as MultiSelect } from "chakra-react-select";
import '../../resource/multiselect.css'

export default function MeModifyPage ({profile, setter}) {
    
    const fields = useFields()
    const [field, setField] = useState()
    
    return (
        <>
             <Box p={'24px'} w={'100%'} borderRadius={10}>
                <VStack width={'100%'} alignItems={'flex-start'} spacing={6}>
                    <FormControl isRequired>
                        <FormLabel fontSize={'14px'}>닉네임</FormLabel>
                        <Input placeholder='닉네임' w={'300px'} fontSize={'14px'} bgColor={'#202020'} border={'none'} color={'white'}/>
                    </FormControl>
                    <FormControl w={'300px'} isRequired>
                        <FormLabel fontSize={'14px'}>분야</FormLabel>
                        <MultiSelect  
                            classNamePrefix={'rs'}
                            placeholder='분야 선택'
                            value={field}
                            options={fields}
                            onChange={setField}
                        />
                    </FormControl>
                </VStack>
             </Box>
        </>
    )
}