/* eslint-disable no-unused-vars */
import React from 'react';
// import NavJp from './NavJp';
import JPMenu from './JPMenu';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Center, Heading, Text, VStack } from '@chakra-ui/react';
import './App.css'
import { NavLink } from 'react-router-dom';
export default function Home() {
    

    return <>
        <JPMenu />
        <Center height={'640px'}>
            <VStack>
                <Heading fontSize={'50px'} className='hmt'>
                    remonJP / レモンJP
                </Heading>
                <Text className='hmb'>
                    Kanjidict / JMdict dictionary word deconstructor and morphological analyzer
                </Text>
                <NavLink to="/random">
                <Button className='mt-3' colorScheme='blue' size={'md'} height={'45px'} width={'170px'}>Randomize</Button>
                </NavLink>
                
            </VStack>

        </Center>
    </>
}