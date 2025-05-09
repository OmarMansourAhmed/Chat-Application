import { Box } from "@chakra-ui/layout";
import "./styles.css";
import { ChatState } from "../Context/ChatProvider";
import SingleChat from "./SingleChat";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
    const { selectedChat } = ChatState();

    return (
        <Box
            display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
            alignItems="center"
            flexDir="column"
            p={3}
            bg="#1a202c" // Dark background
            color="white" // Text color
            w={{ base: "100%", md: "68%" }}
            borderRadius="lg"
            border="1px solid"
            borderColor="#2d3748" // Dark border
        >
            <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </Box>
    );
};

export default Chatbox;
