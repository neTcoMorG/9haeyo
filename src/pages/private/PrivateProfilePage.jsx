import { 
    Container, 
    HStack, 
    VStack,
    Text
} from "@chakra-ui/react";

import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ArlimPage from "./ArlimPage";
import MePage from "./MePage";
import MeModifyPage from "./MeModifyPage";

export default function PrivateProfilePage () {

    const [isClicked, setClicked] = useState('알림')

    const navigate = useNavigate()

    const onClickNav = (name, url) => {
        setClicked(name)
        navigate(url)
    }
    
    useEffect(() => {
        setClicked('알림')
    }, [])

    return (
        <>
            <Container maxW={'1200px'} p={'32px'}>
                <HStack spacing={10} alignItems={'flex-start'}>
                    <VStack w={'180px'} alignItems={'flex-start'} p={'12px 0 12px 32px'} borderRadius={10} spacing={5} zIndex={5}>
                        <HStack borderBottom={'1px solid #202020'} w={'100%'} pb={2} 
                            cursor={'pointer'}
                            onClick={() => onClickNav('알림', '/private')}>
                            <Text fontSize={'16px'} className={isClicked === "알림" ? 'nav_active' : 'nav_deactive'}>알림</Text>
                        </HStack>
                        <HStack borderBottom={'1px solid #202020'} w={'100%'} pb={2} 
                            cursor={'pointer'}
                            onClick={() => onClickNav('프로필', '/private/profile')}>
                            <Text fontSize={'16px'} className={isClicked === "프로필" ? 'nav_active' : 'nav_deactive'}>프로필</Text>
                        </HStack>
                        <HStack borderBottom={'1px solid #202020'} w={'100%'} pb={2}>
                            <Text fontSize={'16px'} className={isClicked === "준비중" ? 'nav_active' : 'nav_deactive'}>준비중</Text>
                        </HStack>
                    </VStack>
                    <Routes>
                        <Route path="/" element={<ArlimPage />} />
                        <Route path="/profile" element={<MePage />} />
                        <Route path="/modify" element={<MeModifyPage />} />
                    </Routes>
                </HStack>
            </Container>
        </>
    )
}