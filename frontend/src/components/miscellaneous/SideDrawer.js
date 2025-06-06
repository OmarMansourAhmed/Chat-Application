import {Box,Button,Drawer,DrawerBody,DrawerContent,DrawerHeader,DrawerOverlay,Input,Menu,MenuButton,MenuDivider,MenuItem,MenuList,Spinner,Text,useToast} from "@chakra-ui/react";
import React, { useState } from "react";
import { Tooltip } from '@chakra-ui/tooltip';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Avatar } from '@chakra-ui/avatar';
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useHistory } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/hooks";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import { Effect } from 'react-notification-badge';
import NotificationBadge from 'react-notification-badge/lib/components/NotificationBadge';

const SideDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const { user, setSelectedChat, chats, setChats, notification, setNotification } = ChatState();
    const history = useHistory();
    const toast = useToast();

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        history.push("/");
    };

    const handleSearch = async () => {
        if (!search) {
            toast({
                title: "Please enter something in search",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top-left",
            });
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get(`/api/user?search=${search}`, config);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: "Error occurred!",
                description: "Failed to load search results",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    const accessChat = async (userId) => {
        try {
            setLoadingChat(true);
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post(`/api/chat`, { userId }, config);

            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

            setSelectedChat(data);
            setLoadingChat(false);
            onClose();
        } catch (error) {
            toast({
                title: "Error fetching the chat",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    return (
        <>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                bg="#1a202c"
                color="white"
                w="100%"
                p="5px 10px"
                borderBottom="2px solid #2d3748"
            >
                <Tooltip label="Search Users To Chat" hasArrow placement="bottom-end">
                    <Button variant="ghost" onClick={onOpen} color="white" _hover={{ bg: "#2d3748" }}>
                        <i className="fas fa-search"></i>
                        <Text display={{ base: "none", md: "flex" }} px="4">
                            Search User
                        </Text>
                    </Button>
                </Tooltip>

                <Text fontSize="2xl" fontFamily="Work Sans">
                🦇 Bat-Chat
                </Text>

                <div>
                    <Menu>
                        <MenuButton p={1}>
                            <BellIcon fontSize="2xl" m={1} color="turquoise" />
                            <NotificationBadge
                                count={notification.length}
                                effect={Effect.SCALE}
                                style={{ backgroundColor: "#2d3748" }}
                            />
                        </MenuButton>
                        <MenuList bg="#2d3748"  fontSize="1xl" m={1} color="white" fontWeight={600}>
                            {!notification.length && "\"  The night is very dark today 🦇\""}
                            {notification.map((notif) => (
                                <MenuItem
                                    key={notif._id}
                                    onClick={() => {
                                        setSelectedChat(notif.chat);
                                        setNotification(notification.filter((n) => n !== notif));
                                    }}
                                    bg="#2d3748"
                                    color="white"
                                    _hover={{ bg: "#38B2AC" }}
                                >
                                    {notif.chat.isGroupChat
                                        ? `New message in ${notif.chat.chatName}`
                                        : `New message from ${notif.sender.name}`}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>

                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} bg="#2d3748" color="white" _hover={{ bg: "#38B2AC" }}>
                            <Avatar size="sm" cursor="pointer" name={userInfo.name} src={userInfo.pic} />
                        </MenuButton>
                        <MenuList bg="#2d3748" color="white" borderColor="#4A5568">
                            <ProfileModal user={user}>
                                <MenuItem bg="#2d3748" _hover={{ bg: "#38B2AC" }}>My Profile</MenuItem>
                            </ProfileModal>
                            <MenuDivider borderColor="#4A5568" />
                            <MenuItem onClick={logoutHandler} bg="#2d3748" _hover={{ bg: "#E53E3E" }}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>

            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent bg="#1a202c" color="white">
                    <DrawerHeader borderBottomWidth="1px" borderColor="#2d3748">
                        Search Users
                    </DrawerHeader>

                    <DrawerBody>
                        <Box display="flex" pb={2}>
                            <Input
                                placeholder="Search by name or email"
                                mr={2}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                bg="#2d3748"
                                color="white"
                            />
                            <Button onClick={handleSearch} colorScheme="teal">
                                <i className="fas fa-search"></i>
                            </Button>
                        </Box>

                        {loading ? (
                            <ChatLoading />
                        ) : (
                            searchResult?.map((user) => (
                                <UserListItem
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => accessChat(user._id)}
                                />
                            ))
                        )}
                        {loadingChat && <Spinner ml="auto" display="flex" color="teal.500" />}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default SideDrawer;
