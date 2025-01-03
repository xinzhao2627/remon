/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { HamburgerIcon} from '@chakra-ui/icons'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    IconButton, 
    useDisclosure,
    Button,
    Checkbox, 
    CheckboxGroup, 
    Switch,
    FormLabel,
    Box,
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    RangeSliderMark,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Center,
} from '@chakra-ui/react'
function Config({configDict, setConfigDict,type}) {

    const {isOpen, onOpen, onClose} = useDisclosure()
    const inputRefs= useRef({})
    const paddingsArr=['pr-3', 'pr-2 pl-1', 'px-2', 'pr-1 pl-2', 'pl-3']
    const [ranges, setRanges] = useState([1,2,3,4,5])
    const mouseInputFocus = (i) => {
        inputRefs.current[i].focus()
    }
    const changeConfig = (config_name, config_value) => {
        const isJlpt = ['n1', 'n2', 'n3', 'n4', 'n5'].includes(config_name)
        if (isJlpt){
            let new_jlpt_n = configDict['jlpt_levels'][[config_name]]
            new_jlpt_n['value'] = config_value

            setConfigDict({
                ...configDict,
                'jlpt_levels': {
                    ...configDict['jlpt_levels'],
                    [[config_name]]: new_jlpt_n,
                }
            })
        }
    }

    const manageSlider = (v) => {
        const new_ranges = Array.from({length: (v[1] - v[0]) + 1}, (_, i) => v[0] + i)
        setRanges(new_ranges)
        let new_jlpt_levels = {}
        // console.log(ranges)
        for (let j in configDict['jlpt_levels']){
            new_jlpt_levels[j] = configDict['jlpt_levels'][j]
            if (new_ranges.includes(new_jlpt_levels[j]['position'])){
                new_jlpt_levels[j]['isActive'] = true
            } else {
                new_jlpt_levels[j]['isActive'] = false
            }
        }
        setConfigDict({
            ...configDict,
            'jlpt_levels': new_jlpt_levels
        })
        // console.log({'jlpt_levels': new_jlpt_levels})
    }
    return (<>

        <IconButton aria-label='expand-kanji' colorScheme='blue' variant={'outline'} icon={<HamburgerIcon/>} className='m-1'  onClick={onOpen}/> 
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Configurations</ModalHeader>
          <ModalBody pb={6} >
            {/* <Box >
                <FormLabel htmlFor='underlines' mb='0' className='d-inline-block'>
                    Underlines
                </FormLabel>
                <Switch isChecked={showUnderline} id='underlines' onChange={(e) => setShowUnderline(e.target.checked)}/>
            </Box>
            <Box >
                <FormLabel htmlFor='showFurigana' mb='0' className='d-inline-block'>
                    Show furigana
                </FormLabel>
                <Switch isChecked={showFurigana} id='showFurigana' onChange={(e) => {
                    console.log(e, showFurigana)
                    setShowFurigana(e.target.checked)
                }}/>
            </Box>
            <Box>
                <FormLabel htmlFor='romaji' mb='0' className='d-inline-block'>
                    Romaji
                </FormLabel>
                <Switch isChecked={showRomaji} id='romaji' onChange={(e) => setShowRomaji(e.target.checked)}/>
            </Box> */}
            {type === "custom" &&             
                <Box>
                    <Box className='mt-4 p-3' width={'100%'}>
                        <RangeSlider defaultValue={[ranges[0],ranges[ranges.length-1]]} min={1} max={5} step={1} onChangeEnd={manageSlider}>
                            <RangeSliderTrack bg='red.100'>
                                <RangeSliderFilledTrack bg='tomato' />
                            </RangeSliderTrack>
                            {[5,4,3,2,1].map((x,i) => {
                                return <RangeSliderMark key={'rsm-'+x} value={i+1} className={`cl${x} mt-2`}>
                                    N{x}
                                </RangeSliderMark>
                            })}
                            <RangeSliderThumb boxSize={4} index={0} borderColor={'#d4d4d4'}/>
                            <RangeSliderThumb boxSize={4} index={1} borderColor={'#d4d4d4'}/>
                        </RangeSlider>
                    </Box>
                    <Center className='row'>
                        {[5,4,3,2,1].map((x,i) => {
                            return (
                                <NumberInput
                                    focusBorderColor='lime'
                                    variant='flushed'
                                    key={`n${x}-${i}`} 
                                    min={0} max={20} allowMouseWheel 
                                    value={configDict['jlpt_levels'][`n${x}`]['value'] || ''} 
                                    className={`col-sm ${paddingsArr[i]}`} 
                                    size={'s'} 
                                    onMouseEnter={() => mouseInputFocus(i)} 
                                    onChange={(e) => changeConfig(`n${x}`, e)}
                                    isDisabled={!configDict['jlpt_levels'][`n${x}`]['isActive']}>
                                    
                                    <NumberInputField  
                                        className='p-1' 
                                        ref={(e) => (inputRefs.current[i] = e)}/>
                                </NumberInput>
                            )
                        })}

                    </Center>
                </Box>
            }


          </ModalBody>
          <ModalFooter>
            <Button colorScheme='pink' mr={1} onClick={onClose}>
              Ok
            </Button>
          </ModalFooter>
        </ModalContent>
        </Modal>

    </>);
}

export default Config;