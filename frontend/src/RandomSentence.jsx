/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import React, { useState,  } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {useColorMode} from '@chakra-ui/react';
import './App.css'
import JMTemplate from './JPTemplate';
function RandomSentence() {
    return <>
        <JMTemplate subUrl='random' btnLabel='Randomize' type='random' field='random'/>
    </>
}

export default RandomSentence;