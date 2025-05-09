import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    FormControl,
    Input,
    useToast,
    Box,
    Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import UserListItem from "../UserAvatar/UserListItem";

const GroupChatModal = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const { user, chats, setChats } = ChatState();

    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
            toast({
                title: "User already added",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top-left",
            });
            return;
        }
        setSelectedUsers([...selectedUsers, userToAdd]);
    };

    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) return;

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get(`/api/user?search=${search}`, config);
            setSearchResult(data);
            setLoading(false);
        } catch (error) {
            toast({
                title: "Search failed",
                description: "Failed to load search results",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    const handleDelete = (delUser) => {
        setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
    };

    const handleSubmit = async () => {
        if (!groupChatName || !selectedUsers.length) {
            toast({
                title: "All fields required",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top-left",
            });
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.post(
                `/api/chat/group`,
                {
                    name: groupChatName,
                    users: JSON.stringify(selectedUsers.map((u) => u._id)),
                },
                config
            );
            setChats([data, ...chats]);
            onClose();
            toast({
                title: "Group chat created!",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
        } catch (error) {
            toast({
                title: "Chat creation failed",
                description: error.response.data,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
        }
    };

    return (
        <>
            <span onClick={onOpen}>{children}</span>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent bg="#1a202c" color="white">
                    <ModalHeader
                        fontSize="2xl"
                        fontFamily="Work Sans"
                        display="flex"
                        justifyContent="center"
                    >
                        🦇 Create Group Chat
                    </ModalHeader>
                    <ModalCloseButton color="white" />
                    <ModalBody display="flex" flexDirection="column" alignItems="center">
                        <FormControl mb={3}>
                            <Input
                                placeholder="Chat Name"
                                onChange={(e) => setGroupChatName(e.target.value)}
                                bg="#2d3748"
                                color="white"
                                _placeholder={{ color: "gray.400" }}
                                _focus={{ bg: "#4A5568", borderColor: "#38B2AC" }}
                            />
                        </FormControl>
                        <FormControl>
                            <Input
                                placeholder="Add Users e.g., Bruce, Selina"
                                onChange={(e) => handleSearch(e.target.value)}
                                bg="#2d3748"
                                color="white"
                                _placeholder={{ color: "gray.400" }}
                                _focus={{ bg: "#4A5568", borderColor: "#38B2AC" }}
                            />
                        </FormControl>

                        <Box w="100%" display="flex" flexWrap="wrap" mt={2}>
                            {selectedUsers.map((u) => (
                                <UserBadgeItem
                                    key={u._id}
                                    user={u}
                                    handleFunction={() => handleDelete(u)}
                                />
                            ))}
                        </Box>

                        <Box w="100%" mt={2}>
                            {loading ? (
                                <Text color="gray.400" textAlign="center">
                                    Loading...
                                </Text>
                            ) : (
                                searchResult?.slice(0, 4).map((u) => (
                                    <UserListItem
                                        key={u._id}
                                        user={u}
                                        handleFunction={() => handleGroup(u)}
                                    />
                                ))
                            )}
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            onClick={handleSubmit}
                            bg="#38B2AC"
                            color="white"
                            _hover={{ bg: "#319795" }}
                        >
                            Create Chat
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default GroupChatModal;
