/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {useToast,Box, Button, Center, Container, Heading, Text, useColorMode, ButtonGroup, Tooltip, Highlight, Tag, HStack, VStack, Spinner, MenuButton, Menu, MenuList, MenuItem, Checkbox, Alert, AlertIcon, AlertTitle, AlertDescription, Input } from '@chakra-ui/react';
import './App.css'
import DrawerKanji from './DrawerKanji';
import { IconButton } from '@chakra-ui/react'
import { HamburgerIcon} from '@chakra-ui/icons'
import JPMenu from './JPMenu';
import { FaCaretLeft ,FaCaretRight} from "react-icons/fa6";
import Config from './Config';
import QuizInput from './QuizInput';
function JMTemplate ({subUrl, btnLabel, type, field})  {
    const { colorMode, toggleColorMode } = useColorMode()


    // SPECIFIC - QUIZ: ON QUIZ INPUT HANDLERS 
    const [quizCount,setQuizCount] = useState(1)
    const [quizFreq, setQuizFreq] = useState(1)

    // GENERAL: ITEMS TRAVERSAL
    const toast = useToast()
    const [itemIndex, setItemIndex] = useState(-1)

    // AVOID DUPLICATES ON UI
    const [structId, setStructId] = useState([])


    // GENERAL: MAIN SCREEN CONTENT INFO AFTER GENERATION
    const [structSentences, setStructSentences] = useState([])
    const [structKanji, setStructKanji] = useState([])
    const [structRomaji, setStructRomaji] = useState([])
    const [enSentences, setEnSentences] = useState([])
    const [jpSentences, setJpSentences] = useState([])

    // GENERAL: LOADING PROCS 
    const [startLoading, setStartLoading] = useState(false)

    // SPECIFIC - CUSTOM: CONFIGURATION HANDLERS
    const [configDict, setConfigDict] = useState({
        'jlpt_levels': {
            'n5':{'isActive':true, 'value':null, 'position':1},
            'n4':{'isActive':true, 'value':null, 'position':2},
            'n3':{'isActive':true, 'value':null, 'position':3},
            'n2':{'isActive':true, 'value':null, 'position':4},
            'n1':{'isActive':true, 'value':null, 'position':5}
        }
    })

    // CONFIG VISUALS
    const [showUnderline, setShowUnderline] = useState(true);
    // const [showFurigana, setShowFurigana] = useState(true);
    const [showRomaji, setShowRomaji] = useState(true);



    // TTTT
    const [userAnswer, setUserAnswer] = useState('')
    const [userSubmitted, setUserSubmitted] = useState(false)


    const formatData = async (d) => {
        const new_ens = []
        const new_jps = []
        const new_structSentence = []
        const new_kjs = []
        const new_rom = []
        const new_ids = []
        for (const sentence of d){
            const id = sentence.jp_id
            if (structId.includes(id)){
                continue
            }
                

            const jp = sentence.jp_sentence
            const en = sentence.en_sentence
            const structs = sentence.structure

            new_ids.push(id)
            new_ens.push(en)
            new_jps.push(jp)
            let rm_sentence = ''
            // join all parts of a single sentence
            const fparts = <ul key={sentence.jp_id} className='sentence' style={{paddingLeft:'0'}}> 
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
            new_rom.push(rm_sentence)
            const fkanji = <Box>
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
            new_kjs.push(fkanji)
            new_structSentence.push(fparts)
        }
        if (new_ids.length){
            setStructRomaji(structRomaji.concat(new_rom))
            setStructSentences(structSentences.concat(new_structSentence))
            setEnSentences(enSentences.concat(new_ens))
            setJpSentences(jpSentences.concat(new_jps))
            setStructKanji(structKanji.concat(new_kjs))
            return true
        } else {
            return false
        }

    }
    const fetchRandom = async(n) => {

        let res = undefined
        let isValid = false
        setStartLoading(true)
        setUserSubmitted(false)
        setUserAnswer('')
        if (type === 'custom'){
            const options = {
                method : 'POST',
                headers : {'Content-Type': 'application/json'},
                body : JSON.stringify(configDict)
            }
            res  = await fetch(`https://remonjp-api.vercel.app/api/${n}`, options)
            isValid=true
        }
        else if (type === 'quiz' && quizFreq >= 1 && quizFreq <= 20 && quizCount >= 1){
            res  = await fetch(`https://remonjp-api.vercel.app/api/${n}/${field}/${quizFreq}/${quizCount}`)
            isValid=true
        }
        else if (type === 'random'){
            res  = await fetch(`https://remonjp-api.vercel.app/api/${n}`)
            isValid=true
        } 

        if (isValid && res && type){
            const d = await res.json()
            if (d &&  !d['error']){
                const flag = await formatData(d)
                if (flag){
                    setItemIndex(itemIndex+1)
                } else {
                    alert('There was a problem on fetching data')
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
    const trav = (q) => {
        if (typeof structSentences[q] !== "undefined"){
            setUserSubmitted(false)
            setUserAnswer('')
            setItemIndex(q)
        } else {
            toast(
                {
                    title: 'No sentence found',
                    status: 'error',
                    isClosable: true,
                    duration: 500,
                }
            )
        }
    } 
    const travButtonPreset = (aria, new_index) => {
        
        const icb = <IconButton 
        onClick={() => trav(new_index)}
        variant='solid' 
        colorScheme='blue' 
        icon={(aria === 'call-prev')? <FaCaretLeft/> : <FaCaretRight/>} 
        aria-label={aria}
        fontSize='xl' 
        className='m-1 p-1'/>
        return icb
    }

    const checkText = (k) => {
        setUserSubmitted(!userSubmitted)

        // CHECK K
    }
    return (
        <div style={{height:'100vh'}}>
            <JPMenu />
            <div style={{flexDirection:'column',display:'flex',alignItems:'center', justifyContent:'center'}} className='mt-5'>
                    <div width={'100%'}>
                        {(typeof structSentences[itemIndex] === "undefined" && !startLoading) 
                        ? <Heading>{`Generate ${field} sentence!`}</Heading>
                        : startLoading                 
                            ? <Spinner />
                            :<>
                                {structSentences[itemIndex]}
                                <>
                                    <Text 
                                        className='py-2 px-3 '
                                        as={'sup'} 
                                        fontStyle={'italic'} 
                                        fontFamily={'courier new'} 
                                        color={'teal.400'}
                                        transition={'all 0.3s ease-in-out'}
                                        border= '1px'
                                        borderRadius= '4px'
                                        cursor={'pointer'}
                                        _hover={{
                                            color:'teal.600',
                                            borderColor:'teal.600'
                                        }}
                                        onClick={() => checkText()}
                                        >

                                            press enter to check
                                    </Text>
                                    <Input 
                                        value={userAnswer} onChange={e => setUserAnswer(e.target.value)} 
                                        variant='flushed' size='lg' 
                                        onKeyDown={e => (e.key==="Enter" && checkText())}
                                        height={'auto'}
                                        className='py-1 px-2 mb-5 ent'
                                        fontSize={'4xl'}
                                        fontWeight={'300'}
                                        letterSpacing={'2px'}
                                        
                                    />
                                    {userSubmitted && <>
                                        <div>
                                            <Text as={'sup'} fontStyle={'italic'} fontFamily={'courier new'} color={'grey'}>Engslish sentence</Text>
                                            <Text fontSize={'4xl'} className='ent' fontWeight={'100'} >{enSentences[itemIndex]}</Text>
                                        </div>
                                        <div>
                                            <Text as={'sup'} fontStyle={'italic'} fontFamily={'courier new'} color={'grey'}>Romaji</Text>
                                            <Text fontSize={'2xl'} className='ent' fontWeight={'100'} >{structRomaji[itemIndex]}</Text>
                                        </div>

                                    </>} 
                                </>
                            </> 
                        }
                </div>
            </div>
            <Box className='mb-2 mt-5' style={{height:'30%'}}>
                {(typeof structSentences[itemIndex] === "undefined" || startLoading) 
                    ? null
                    : (
                        <Box className='mb-3'>
                            {travButtonPreset('call-prev', itemIndex-1)}
                            {travButtonPreset('call-next', itemIndex+1)}
                        </Box>  
                    )
                }

                <Box>
                    <Button colorScheme='blue' variant='outline' onClick={() => fetchRandom(subUrl)} className='m-1'>{btnLabel}</Button>
                    <DrawerKanji kanji_data = {structKanji[itemIndex]} />
                    {type === "custom" && <Config 
                        configDict={configDict} 
                        setConfigDict={setConfigDict} 
                        type={type} 
                    />}
                </Box>
                {(type === 'quiz') && <QuizInput 
                    quizCount={quizCount}
                    quizFreq={quizFreq}
                    setQuizCount={setQuizCount}
                    setQuizFreq={setQuizFreq}
                />}
            </Box>
        </div>
    )

}
 
export default JMTemplate;