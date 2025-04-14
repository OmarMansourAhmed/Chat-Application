import React from 'react';
import { Container , Box , Text, Tab, TabList , TabPanel , TabPanels, Tabs } from '@chakra-ui/react';
import Login from "../components/Authentications/Login";
import Signup from "../components/Authentications/Signup";
const HomePage = () => {
  return (
    <Container maxW='xl' centerContent>
      <Box d='flex' justifyContent='center' p={3} bg='white' w="100%" m="40px 0 15px 0" borderRadius="lg" borderWidth="1px"> 
        <Text  alignContent='center' fontSize="4xl" fontFamily="Work sans" color="black"> <span justifyContent="center" >Bat-Chat</span> </Text>
      </Box>

      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px" color="black"> 
       <Tabs variant="soft-rounded" >
        <TabList mb='1em'>
            <Tab width="50%"> Login </Tab>
            <Tab width="50%"> Sign Up </Tab>
            </TabList>
            <TabPanels> 
                <TabPanel>
                    <Login/>
                    </TabPanel>
                    <TabPanel> 
                    <Signup/>
                    </TabPanel>

            </TabPanels> 
                        
       </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
