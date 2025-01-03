/* eslint-disable no-unused-vars */
import {
  useColorMode,
  Button,
  Text,
  Heading,
  Accordion,
  AccordionPanel,
  AccordionItem,
  AccordionButton,
  Box,
  Center,
} from '@chakra-ui/react';
import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import { MdDashboardCustomize } from "react-icons/md";
import { HiMiniHome } from 'react-icons/hi2';
import { FaBrain } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {CSSTransition} from 'react-transition-group';


function JPMenu() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <>
      <Navbar collapseOnSelect expand="md" className="mx-4 nvz pt-4">

        <Navbar.Brand className='brand' style={{padding:'0'}}>
        <NavLink to="/home">
          <Heading size={'lg'} color={colorMode === 'light' ? 'black' : 'white'} marginBottom={0} className='brand-h'>
            レモンJP
          </Heading>     
        </NavLink>   
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{backgroundColor:"#FED7E2"}}/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto " >
            <NavLink to="/random">
              <label className='nvp p-2' >
                Random
              </label>
            </NavLink>
            <NavLink to="/custom">
              <label className='nvp p-2' >
                Custom
              </label>
            </NavLink>
            <Accordion allowMultiple>
                <AccordionItem border={'0'}>
                  <AccordionButton className='nvp'>
                  <label style={{width:'100%'}}>
                  Quiz
                  </label>
                  </AccordionButton>
                  <Box className='a-panel' bg='blue.600' borderRadius={'5px'} color={'white'}>
                  {[5,4,3,2,1].map((x, i) => {
                    const data  = `n${x}`
                    return (
                      <NavLink to='/quiz' key={`nav-N${x}`} state={{data}}>
                        <AccordionPanel className='nvp' >
                          JLPT N{x}
                        </AccordionPanel>
                      </NavLink>
                    )
                  })}
                  </Box>    
                </AccordionItem>
              </Accordion>
            <NavLink to="/custominput">
              <label className='nvp p-2'>
                Custom Input
              </label>
            </NavLink>
          </Nav>
          <Nav>
            <Nav.Link href="#deets"></Nav.Link>
            <Button onClick={toggleColorMode} bg={'transparent'} border={''}>
              {colorMode === 'light' ? 'Dark' : 'Light'} mode
            </Button>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
    </>
  );
}

export default JPMenu;
