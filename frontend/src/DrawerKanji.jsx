/* eslint-disable react/prop-types */
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerContent,
    useDisclosure,
    Button
} from '@chakra-ui/react'
import 'bootstrap/dist/css/bootstrap.min.css'
function DrawerKanji(props) {
    const {isOpen, onOpen, onClose} = useDisclosure()

    return (  
        <>
            <Button colorScheme='blue' onClick={onOpen} variant={'outline'} className='m-1'>Check kanji</Button>  
            <Drawer placement='right' onClose={onClose} isOpen={isOpen} size={'xs'}>
                <DrawerContent>
                    <DrawerHeader borderBottomWidth='1px'>Kanji Structure</DrawerHeader>
                    <DrawerBody>
                        {props.kanji_data}
                    </DrawerBody>
                    <DrawerFooter>
                        <Button colorScheme='blue' width='100%' onClick={onClose}>
                        Cancel
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
                      
        </>

    )
}

export default DrawerKanji