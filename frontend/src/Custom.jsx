/* eslint-disable no-unused-vars */
import React, { useState,  } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import JMTemplate from './JPTemplate';
function Custom() {
    return <>
        <JMTemplate subUrl='custom' btnLabel='Generate' type='custom' field='custom'/>
    </>
}

export default Custom;