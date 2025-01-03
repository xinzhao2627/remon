/* eslint-disable no-unused-vars */


import { Spinner,Tooltip,VStack, Text,Button, HStack, Input, Tab, TabList, TabPanel, TabPanels, Tabs, Textarea, useColorMode, Heading, Box } from '@chakra-ui/react';
import JPMenu from './JPMenu';
import DrawerKanji from './DrawerKanji';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function CustomInput() {
    // 
    const [input, setinput] = useState('切政ルラご史際ぴふ事種の') // default input as an example
    const [tabIndex, setTabIndex] = useState(0)
    const [structId, setStructId] = useState([])
    // GENERAL: MAIN SCREEN CONTENT INFO AFTER GENERATION
    const [fpart, setFpart] = useState()
    const [kanji, setKanji] = useState()
    // GENERAL: LOADING PROCS 
    const [startLoading, setStartLoading] = useState(false)


    const formatData = async (d) => {
        let fp;
        let kj;
        for (const sentence of d) {
            const id = sentence.jp_id
            if (structId.includes(id)) continue
            const structs = sentence.structure
            let rm_sentence = ''

            fp=<ul key={sentence.jp_id} className='sentence' style={{paddingLeft:'0'}}> 
            {structs.map((sct,i) => {
                // 1st layer CONTENT
                const word = sct.word
                const hiragana = sct.reading_hiragana
                const hasParts = word !== sct.reading_katakana && word !== hiragana

                // 2nd layer TOOLTIP
                const romaji = sct.romaji
                const pos = sct.pos
                rm_sentence += " "+romaji
                

                const glosses = sct.gloss.split(/,(?![^()]*\))/)
                const renderGloss = <section className='row container'>
                    {glosses.map((g,z) => {
                    return <span key={`sp-m-${z}`} className='col-auto mm mt-1 mb-2'>{g.trim()}</span>
                    })}
                </section>

                return <React.Fragment key={`sFrag ${i}`}>
                    <Tooltip hasArrow label={
                        <VStack>
                            <Text as={'b'} fontSize={'xl'}>{romaji}</Text>
                            <Text as={'i'}  fontSize={'md'}>{pos}</Text>
                            {renderGloss || ''}
                        </VStack>
                    } bg='white' color='black' closeDelay={300} openDelay={300}>
                        {hasParts ?
                            <li className="segment mb-2" key={`li-${word}-${i}`} >
                                <span className="segment-container" key={`span-container-${word}-${i}`}>
                                    <span  className="readings mt-2" key={`readings-${word}-${i}`}
                                        style={{color: '#b0b0b0', fontSize:'initial'}}
                                    >
                                        {hiragana}
                                    </span>
                                    <span
                                        className="word"
                                        style={{
                                        borderBottom:'2px solid #37B7C3',
                                        cursor:'pointer',
                                        }}
                                        key={`word-${word}-${i}`}
                                    >
                                        {word}
                                    </span>
                                </span>
                            </li>
                            : <li className="segment mb-2 comma" key={`li-${word}-${i+i}`} style={{cursor:'pointer'}}>
                                {word === "、" ? ',' : word === "。" ? '.' : word}
                            </li>
                        }
                    </Tooltip>
                </React.Fragment>
            })}
        </ul> 
            setFpart(fp)
            kj = <Box>
            {
                sentence.kanji.map((k, i) => {
                    const element = k.k_element
                    const jlpt = k.new_jlpt
                    const meanings_string = k.meanings
                    return <React.Fragment key={'kFragment ' + i}>
                    <Box key={`li-${k}`} className='p-1'>
                        <div key = {`div-${k}`} className='section p-2'>
                            <Heading key={`sp-ele-${k}`} className='text' style={{display:'block', textAlign:'left'}}>{element}</Heading>
                            <span key={`sp-jlpt-${k}`} className={`jlpt-${jlpt || 'unknown'} jlpt px-2`} style={{display:'block'}}>{(jlpt) ? `N${jlpt}` : 'unknown'}</span>
                            <section className='row container'>
                                {meanings_string.split(/,(?![^()]*\))/).map((m,j) => {
                                    return <span key={`sp-m-${j}`} className='col-auto mm mt-2'>{m.trim()}</span>
                                })}
                            </section>
                        </div>
                    </Box>
                    </React.Fragment>
                })
            }
        </Box>
            setKanji(kj)
        }
        return fp
    }

    const fetchRandom = async() => {
        setFpart('')
        setKanji('')
        let res = undefined
        setStartLoading(true)

        const options = {
            method : 'POST',
            headers : {'Content-Type': 'application/json'},
            body : JSON.stringify({"texts": input})
        }
        res  = await fetch(`https://remonjp-api.vercel.app/api/custominput`, options)
        if (res){
            const d = await res.json()
            console.log('d: ', d)
            if (d &&  !d['error']){
                const flag = await formatData(d)
                // console.log("flag: ", flag)
                if (!flag){
                    alert('There was a problem on fetching data')
                } else {
                    setTabIndex(1)
                }
            } else {
                alert(
                    `Error retrieving data, The data could be empty or invalid, 
                    please try again. If generating on custom or quiz, please try different inputs to solve the problem.`
                )
            }
        } else {
            alert(
                `Invalid link or sentence generation`
            )
        }
        setStartLoading(false)
        
    }


    return<div>
        <JPMenu />
        <Tabs onChange={e=> setTabIndex(e)} defaultIndex={0} index={tabIndex} className='mt-4'>
            <TabList style={{justifyContent:'center'}}>
                <Tab>Input</Tab>
                <Tab>Structured Outcome</Tab>
            </TabList>
            <TabPanels className='py-2'>
                <TabPanel>        
                    <Textarea
                        value={input}
                        onChange={e => setinput(e.target.value)}
                        className='py-1 px-2 mb-5 jent'
                        fontSize={'4xl'}
                        fontWeight={'300'}
                        letterSpacing={'2px'}
                        resize={'vertical'}
                        border={`1px solid`}
                        height={'200px'}
                    />
                    <HStack width={'100%'} justifyContent={'center'}>
                        <Button colorScheme='blue' onClick={fetchRandom} isLoading={startLoading}>
                            Structurize
                        </Button>
                    </HStack>
                </TabPanel>
                <TabPanel>
                    <Box>
                        {(!fpart && !startLoading) ? <Heading>Add an input</Heading> : startLoading ? <Spinner/> : fpart}
                    </Box>
                    {(!startLoading) ? <DrawerKanji kanji_data = {kanji}/> : null}
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div> 
}

export default CustomInput;