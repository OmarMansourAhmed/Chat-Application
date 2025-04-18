// import React, { useEffect } from 'react';
// import { Container , Box , Text, Tab, TabList , TabPanel , TabPanels, Tabs } from '@chakra-ui/react';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import Login from '../components/Authentication/Login';
// import Signup from './../components/Authentication/Signup';
// const HomePage = () => {

//   const history = useHistory();
//   useEffect(()=>{
//       const user = JSON.parse(localStorage.getItem("userInfo"));

//       if(user){
//           history.push("/chats")
//       }
//   },[history]);


//   return (
//     <Container maxW='xl' centerContent>
//       <Box display='flex' justifyContent='center' p={3} bg='white' w="100%" m="40px 0 15px 0" borderRadius="lg" borderWidth="1px"> 
//         <Text  alignContent='center' fontSize="4xl" fontFamily="Work sans" color="black"> <span justifyContent="center" >Bat-Chat</span> </Text>
//       </Box>

//       <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px" color="black"> 
//        <Tabs variant="soft-rounded" >
//         <TabList mb='1em'>
//             <Tab width="50%"> Login </Tab>
//             <Tab width="50%"> Sign Up </Tab>
//             </TabList>
//             <TabPanels> 
//                 <TabPanel>
//                     <Login/>
//                     </TabPanel>
//                     <TabPanel> 
//                     <Signup/>
//                     </TabPanel>

//             </TabPanels> 

//        </Tabs>
//       </Box>
//     </Container>
//   );
// };

// export default HomePage;


import React, { useEffect } from 'react';
import {
  Container,
  Box,
  Text,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';

const HomePage = () => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (user) history.push('/chats');
  }, [history]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg="#1a202c"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        borderColor="gray.700"
      >
        <Text
          fontSize="4xl"
          fontFamily="Work sans"
          color="teal.300"
          fontWeight="bold"
        >
          🦇 Bat-Chat
        </Text>
      </Box>

      <Box
        bg="#2d3748"
        w="100%"
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        borderColor="gray.600"
        color="gray.100"
      >
        <Tabs variant="soft-rounded" colorScheme="teal">
          <TabList mb="1em">
            <Tab width="50%" _selected={{ color: 'black', bg: 'teal.300' }}>
              Login
            </Tab>
            <Tab width="50%" _selected={{ color: 'black', bg: 'teal.300' }}>
              Sign Up
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
