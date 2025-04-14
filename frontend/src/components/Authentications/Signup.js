
import { 
   FormControl, 
   FormLabel, 
   Input, 
   InputGroup, 
   InputRightElement, 
   VStack, 
   Button 
} from '@chakra-ui/react';
import { set } from 'mongoose';
import axios from 'axios';
import React  , {useState} from "react";
import { useHistory } from "react-router-dom";

import { useToast } from "@chakra-ui/react"

const Signup = () => {
   const [show, setShow] = useState(false);
   const [name, setName] = useState();
   const [email, setEmail] = useState();
   const [confirmpassword, setConfirmpassword] = useState();
   const [password, setPassword] = useState();
   const [pic, setPic] = useState();
   const[loading, setLoading] = useState(false);
   const toast = useToast();
   const handleClick = () => setShow(!show);
   const history = useHistory();

   const postDetalis = (pics) =>{
      setLoading(true);
      if(pics === undefined){
         toast({
            title: "Please select an image",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
         });
         setLoading(false);
         return;
      }
      if(pics.type === "image/jpeg" || pics.type === "image/png"){
         const data = new FormData();
         data.append("file", pics);
         data.append("upload_preset", "Chat-App");
         data.append("cloud_name", "dtuqtrfsf");
         fetch("https://api.cloudinary.com/v1_1/dtuqtrfsf/image/upload", {
            method: "post",
            body: data,
         }).then((res) => res.json())
         .then((data) => {
             console.log( data); // Debugging
            setPic(data.url.toString());
            setLoading(false);
         })
         .catch((err) => {
            console.log(err);
            setLoading(false);
         });

      }
      else{
         toast({
            title: "Please Select an image",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
         });
         setLoading(false);
         return;
      }

   };
   const submitHandler = async() =>{
       setLoading(true);
       if(!name || !email || !password || !confirmpassword){
         toast({
            title: "Please fill all the fields",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
         });
         setLoading(false);
         return;
      }
      if(password !== confirmpassword){
         toast({
            title: "Password do not match",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
         });
         return;
      }
      try {
         const config={
            headers:{
               "Content-type":"application/json",
            },
         }; 
         const {data} = await axios.post("/api/user", {name, email, password, pic}, config);
         toast({
            title: "Registration Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
         });
         localStorage.setItem("userInfo", JSON.stringify(data));
         setLoading(false);
         history.push("/chats");
      }
      catch (error) {
         toast({
            title: "Error Occured",
            description: error.response.data.message,
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
         });
         setLoading(false);
      }
   };

   return (<VStack spacing='5px' color='black'> 
<FormControl id='firstname' isRequired> 
   <FormLabel>Name</FormLabel>
   <Input 
   placeholder='Enter Your Name '
   onChange={(e)=>setName(e.target.value)}
   />
</FormControl>

<FormControl id='email' isRequired> 
   <FormLabel>Email</FormLabel>
   <Input 
   placeholder='Enter Your Email '
   onChange={(e)=>setEmail(e.target.value)}
   />
</FormControl>


<FormControl id='password' isRequired> 
   <FormLabel>password</FormLabel>
   <InputGroup size="md">
   <Input 
   type={show ? "text" :"password"}
   placeholder="Enter Your Password "
   onChange={(e)=>setPassword(e.target.value)}
   />
   <InputRightElement width="4.5rem">
   <Button h="1.75rem" size="sm" onClick={handleClick}>
      {show ? "Hide" : "Show"} 
   </Button>
   </InputRightElement>

   </InputGroup>

</FormControl>

<FormControl id='password' isRequired> 
   <FormLabel> Confirm Password</FormLabel>
   <InputGroup size="md">
   <Input 
   type={show ? "text" :"password"}
   placeholder="Confirm Password"
   onChange={(e)=>setConfirmpassword(e.target.value)}
   />
   <InputRightElement width="4.5rem">
   <Button h="1.75rem" size="sm" onClick={handleClick}>
      {show ? "Hide" : "Show"} 
   </Button>
   </InputRightElement>

   </InputGroup>

</FormControl>

<FormControl id='pic' > 
   <FormLabel>Upload your Picture</FormLabel>
   
   <Input 
   type="file"
   placeholder={1.5}
   accept="image/*"
   onChange={(e)=>postDetalis(e.target.files[0])}
   /> 

</FormControl>


<Button 
colorScheme="blue"
width="100%"
style={{marginTop:15}}
onClick={submitHandler}
isLoading={loading}
>
    Sign Up
   </Button>


    </VStack>
);
};
export default Signup;