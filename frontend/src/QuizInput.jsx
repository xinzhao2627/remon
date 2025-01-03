/* eslint-disable no-unused-vars */
import {useToast,Box, Button, Center, Container, Heading, Text, useColorMode, ButtonGroup, Tooltip, Highlight, Tag, HStack, VStack, Spinner, MenuButton, Menu, MenuList, MenuItem, Checkbox, NumberInput, NumberInputField } from '@chakra-ui/react';
import './App.css'
import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
function QuizInput({quizCount, quizFreq, setQuizCount, setQuizFreq}) {
    return <Box display={'flex'} justifyContent={'center'} className='my-3'>
        <Box>
            <Text className='m-1 ent' fontWeight={'300'}>Count per generate</Text>
            <NumberInput
                className='mx-2 ent'  
                min={1} 
                max={20} 
                size={'xs'}
                value={quizCount}
                onChange={e => setQuizCount(e)}
                 >
                <NumberInputField className='p-1' fontWeight={'300'} textAlign={'center'} borderRadius={'5px'}/>
            </NumberInput>
        </Box>
        <Box>
            <Text className='m-1 ent' fontWeight={'300'}>Frequency of jlpt</Text>
            <NumberInput
                className='mx-2 ent' 
                min={1} 
                max={20} 
                size={'xs'}
                value={quizFreq}
                onChange={e => setQuizFreq(e)}>
                <NumberInputField className='p-1' fontWeight={'300'} textAlign={'center'} borderRadius={'5px'}/>
            </NumberInput>
        </Box>

    </Box>
}

export default QuizInput;