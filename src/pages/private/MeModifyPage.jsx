
import {
    Avatar,
    Box, 
    FormControl, 
    FormLabel, 
    HStack, 
    Input, 
    VStack,
    Alert,
    AlertIcon,
    AlertTitle,
    Textarea,
    Button,
    useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useFields, useSkills, useUserTypes } from '../../hooks/useCates'
import { Select as MultiSelect } from "chakra-react-select";
import '../../resource/multiselect.css'

import kakao from '../../resource/kakao.png'
import discord from '../../resource/disord.png'
import { API_SERVER } from '../../application';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function MeModifyPage ({profile, setter}) {

    const navigate = useNavigate()
    const toast = useToast()

    const fields = useFields()
    const skills = useSkills()
    const types  = useUserTypes()

    const [about, setAbout]         = useState(profile.about)
    const [nickname, setNickname]   = useState(profile.nickname)
    const [field, setField]         = useState({label: profile.field, value: profile.field})
    const [type, setType]           = useState({label: profile.type, value: profile.type})
    const [selectSkills, setSelectSkills]   = useState(profile.skills.map(s => { return {label: s, value: s}}))
    const [contract, setContract]           = useState({...profile.contract})

    const sendPacket = () => {
        const packet = {
            about,
            nickname,
            field: field.label,
            type: type.label,
            skills: selectSkills.map(s => s.label),
            contract,
            repository: profile.repository }

        if (validation()) {
            axios.post(API_SERVER + '/user', JSON.stringify(packet), {headers: {
                Authorization: localStorage.getItem('9token'),
                'Content-Type': 'application/json'
            }})
            .then(() => {
                setter({
                    ...profile,
                    ...packet
                })
                toast({
                    status: 'success',
                    title: '프로필 정보가 변경되었어요'})
                navigate('/private/profile')
            })
        }
    }

    const validation = () => {
        if (nickname === "" || nickname === null || field === null || field === "" ||  type === null || type === "" 
            || selectSkills === null || selectSkills.length <= 0) {
            toast({
                status: 'error',
                title: '필수항목을 입력해주세요'
            })
            return false
        } 
        if ((contract.phone   === null || contract.phone   === "") && 
            (contract.kakao   === null || contract.kakao   === "") &&
            (contract.discord === null || contract.discord === "")) {
            toast({
                status: 'error',
                title: '하나 이상의 연락처를 등록해주세요'
            })
            return false
        }
        return true
    }

    const onChangeContract = (e) => {
        const {name, value} = e.target
        setContract({
            ...contract,
            [name]: value
        })
    }

    const onChangeAbout = (e) => [
        setAbout(e.target.value)
    ]

    const onChangeNickname = (e) => {
        setNickname(e.target.value)
    }

    return (
        <>
             <Box p={'24px'} w={'100%'} borderRadius={10}>
                <VStack width={'100%'} alignItems={'flex-start'} spacing={6}>
                    <FormControl isRequired>
                        <FormLabel fontSize={'14px'}>닉네임</FormLabel>
                        <Input
                            onChange={onChangeNickname}
                            value={nickname}
                            _placeholder={{ color: 'gray' }} 
                            placeholder='닉네임' w={'300px'} fontSize={'13px'} bgColor={'#202020'} border={'none'} color={'white'}/>
                    </FormControl>
                    <FormControl w={'300px'} isRequired>
                        <FormLabel fontSize={'14px'}>역량</FormLabel>
                        <MultiSelect 
                            classNamePrefix={'react-select'} 
                            placeholder={'역량 선택'}
                            value={type}
                            options={types}
                            onChange={setType}
                        />
                    </FormControl>
                    <FormControl w={'300px'} isRequired>
                        <FormLabel fontSize={'14px'}>분야</FormLabel>
                        <MultiSelect 
                            classNamePrefix={'react-select'} 
                            placeholder={'분야 선택'}
                            value={field}
                            options={fields}
                            onChange={setField}
                        />
                    </FormControl>
                    <FormControl w={'300px'} isRequired>
                        <FormLabel fontSize={'14px'}>기술</FormLabel>
                        <MultiSelect 
                            isMulti
                            classNamePrefix={'react-select'} 
                            placeholder={'기술 선택'}
                            value={selectSkills}
                            options={skills}
                            onChange={setSelectSkills}
                            closeMenuOnSelect={false}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel fontSize={'14px'}>연락처</FormLabel>
                        <Alert variant='left-accent' bgColor={'#191919'} mb={5}  fontSize={'14px'} w={'500px'}>
                            <AlertIcon />
                            <Box>
                                <AlertTitle>하나 이상의 정확한 연락처를 입력해주세요!</AlertTitle>
                                잘못된 정보의 연락처를 작성하시면 다른 사용자와 매칭이 될 수 없어요..
                            </Box>
                        </Alert>
                        <HStack spacing={5}>
                            <HStack>
                                <Avatar size={'sm'} />
                                <Input
                                    name='phone'
                                    _placeholder={{ color: 'gray' }} 
                                    placeholder='휴대폰' fontSize={'13px'} border={'none'} bgColor={'#202020'} w={'170px'} color={'white'} value={contract.phone} 
                                    onChange={onChangeContract}
                                />
                            </HStack>
                            <HStack>
                                <Avatar size={'sm'}  src={kakao} />
                                <Input
                                    name='kakao'
                                    onChange={onChangeContract}
                                    _placeholder={{ color: 'gray' }} 
                                    placeholder='카카오톡' fontSize={'13px'} border={'none'} bgColor={'#202020'}  w={'170px'} color={'white'} value={contract.kakao}/>
                            </HStack>
                            <HStack>
                                <Avatar size={'sm'} src={discord} />
                                <Input
                                    name='discord'
                                    onChange={onChangeContract}
                                    _placeholder={{ color: 'gray' }} 
                                    placeholder='디스코드' fontSize={'13px'} border={'none'} bgColor={'#202020'}  w={'170px'} color={'white'} value={contract.discord}/>
                            </HStack>
                        </HStack>
                    </FormControl>
                    <FormControl w={'600px'}>
                        <FormLabel fontSize={'14px'}>간단한 소개</FormLabel>
                        <Textarea
                            onChange={onChangeAbout}
                            value={about}
                            h={'240px'} border={'1px solid #303030'} placeholder='저는 이런사람이에요!' _placeholder={{ color: 'gray' }} />
                    </FormControl>
                    <Button onClick={sendPacket} w={'100%'} bgColor={'#202020'} color={'white'} fontSize={'14px'} mt={5}>저장</Button>
                </VStack>
             </Box>
        </>
    )
}