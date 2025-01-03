/* eslint-disable no-unused-vars */
import React, { useState,  } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {useColorMode} from '@chakra-ui/react';
import './App.css'
import JMTemplate from './JPTemplate';
import { useLocation } from 'react-router-dom';
function Quiz() {
    const location = useLocation()
    const {data} = location.state || 'n5'
    return <>
        
        <JMTemplate subUrl='quiz' btnLabel='Generate' field={data} type='quiz'/>
    </>
}

export default Quiz;