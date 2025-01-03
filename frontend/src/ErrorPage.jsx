/* eslint-disable no-unused-vars */
import React from 'react';
// import NavJp from './NavJp';
import JPMenu from './JPMenu';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Center, Heading, Text, VStack } from '@chakra-ui/react';
import './App.css'

export default function ErrorPage() {
    

    return <>
        <JPMenu />
        <Center height={'640px'}>
            <VStack border={'1px'} className='p-5' width={'40vw'}>
            <Heading fontWeight={500} className='hmt' size={'2xl'} fontStyle={'italic'}>
                404
            </Heading>
            <Heading fontWeight={500} className='hmt' size={'xl'} fontStyle={'italic'}>
                Page not found
            </Heading>
            </VStack>
        </Center>
    </>
}