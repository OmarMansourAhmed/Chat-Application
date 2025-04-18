// import { ViewIcon } from "@chakra-ui/icons";
// import {
//     Modal,
//     ModalOverlay,
//     ModalContent,
//     ModalHeader,
//     ModalFooter,
//     ModalBody,
//     ModalCloseButton,
//     Button,
//     useDisclosure,
//     IconButton,
//     Text,
//     Image,
// } from "@chakra-ui/react";

// const ProfileModal = ({ user, children }) => {
//     const { isOpen, onOpen, onClose } = useDisclosure();
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     return (
//         <>
//             {children ? (
//                 <span onClick={onOpen}>{children}</span>
//             ) : (
//                 <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
//             )}
//             <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
//                 <ModalOverlay />
//                 <ModalContent h="410px">
//                     <ModalHeader
//                         fontSize="40px"
//                         fontFamily="Work sans"
//                         display="flex"
//                         justifyContent="center"
//                     >
//                         {userInfo.name}
//                     </ModalHeader>
//                     <ModalCloseButton />
//                     <ModalBody
//                         display="flex"
//                         flexDir="column"
//                         alignItems="center"
//                         justifyContent="space-between"
//                     >
//                         <Image
//                             borderRadius="full"
//                             boxSize="150px"
//                             src={userInfo.pic}
//                             alt={userInfo.name}
//                         />
//                         <Text
//                             fontSize={{ base: "28px", md: "30px" }}
//                             fontFamily="Work sans"
//                         >
//                             Email: {userInfo.email}
//                         </Text>
//                     </ModalBody>
//                     <ModalFooter>
//                         <Button onClick={onClose}>Close</Button>
//                     </ModalFooter>
//                 </ModalContent>
//             </Modal>
//         </>
//     );
// };

// export default ProfileModal;


import { ViewIcon } from "@chakra-ui/icons";
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
    IconButton,
    Text,
    Image,
} from "@chakra-ui/react";

const ProfileModal = ({ user, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    return (
        <>
            {children ? (
                <span onClick={onOpen}>{children}</span>
            ) : (
                <IconButton
                    display={{ base: "flex" }}
                    icon={<ViewIcon />}
                    onClick={onOpen}
                    color="white"
                    bg="#2d3748"
                    _hover={{ bg: "#4A5568" }}
                />
            )}
            <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent h="410px" bg="#1a202c" color="white">
                    <ModalHeader
                        fontSize="40px"
                        fontFamily="Work sans"
                        display="flex"
                        justifyContent="center"
                    >
                        {userInfo.name}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        display="flex"
                        flexDir="column"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Image
                            borderRadius="full"
                            boxSize="150px"
                            src={userInfo.pic}
                            alt={userInfo.name}
                            shadow="lg"
                        />
                        <Text
                            fontSize={{ base: "28px", md: "30px" }}
                            fontFamily="Work sans"
                            mt={4}
                        >
                            Email: {userInfo.email}
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose} colorScheme="teal">
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ProfileModal;
