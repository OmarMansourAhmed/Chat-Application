
import { React, useEffect, useState } from 'react';
import { ChatState } from '../Context/ChatProvider';
import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react';
import axios from "axios";
import ChatLoading from './ChatLoading';
import { AddIcon } from '@chakra-ui/icons';
import { getSender } from '../config/ChatLogics';
import GroupChatModal from './miscellaneous/GroupChatModel';

const MyChats = ({ fetchAgain }) => {
    const [loggedUser, setLoggedUser] = useState();
    const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
    const toast = useToast();

    const fetchChats = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get("/api/chat", config);
            setChats(data);
        } catch (error) {
            toast({
                title: "Error Occurred!",
                description: "Failed to load chats.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChats();
        // eslint-disable-next-line
    }, [fetchAgain]);

    return (
        <Box
            display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
            flexDirection="column"
            alignItems="center"
            padding={3}
            bg="#1a202c" // Dark mode base
            width={{ base: "100%", md: "31%" }}
            borderRadius="lg"
            borderWidth="1px"
            borderColor="#2d3748"
        >
            <Box
                paddingBottom={3}
                px={3}
                fontSize={{ base: "28px", md: "30px" }}
                fontFamily="Work Sans"
                display="flex"
                w="100%"
                justifyContent="space-between"
                alignItems="center"
                color="white"
            >
                My Chats
                <GroupChatModal>
                    <Button
                        display="flex"
                        fontSize={{ base: "17px", md: "10px", lg: "17px" }}
                        rightIcon={<AddIcon />}
                        bg="#2d3748"
                        color="white"
                        _hover={{ bg: "#38B2AC" }}
                    >
                        New Group Chat
                    </Button>
                </GroupChatModal>
            </Box>

            <Box
                display="flex"
                flexDirection="column"
                padding={3}
                bg="#2d3748" // Darker gray
                w="100%"
                h="100%"
                borderRadius="lg"
                overflowY="hidden"
            >
                {chats ? (
                    <Stack overflowY="scroll">
                        {chats.map((chat) => (
                            <Box
                                onClick={() => setSelectedChat(chat)}
                                cursor="pointer"
                                bg={selectedChat === chat ? "#38B2AC" : "#4A5568"}
                                color={selectedChat === chat ? "white" : "#E2E8F0"}
                                px={3}
                                py={2}
                                borderRadius="lg"
                                key={chat._id}
                                _hover={{ bg: "#38B2AC", color: "white" }}
                            >
                                <Text fontWeight="bold">
                                    {!chat.isGroupChat
                                        ? getSender(loggedUser, chat.users)
                                        : chat.chatName}
                                </Text>
                                {chat.latestMessage && (
                                    <Text fontSize="xs" color={selectedChat === chat ? "#CBD5E0" : "#A0AEC0"}>
                                        <b>{chat.latestMessage.sender.name}: </b>
                                        {chat.latestMessage.content.length > 50
                                            ? chat.latestMessage.content.substring(0, 51) + "..."
                                            : chat.latestMessage.content}
                                    </Text>
                                )}
                            </Box>
                        ))}
                    </Stack>
                ) : (
                    <ChatLoading />
                )}
            </Box>
        </Box>
    );
};

export default MyChats;