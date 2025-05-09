import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";

const UserListItem = ({ user, handleFunction }) => {
    return (
        <Box
            onClick={handleFunction}
            cursor="pointer"
            bg="#333"
            _hover={{
                background: "#6a0dad",
                color: "white",
            }}
            w="100%"
            display="flex"
            alignItems="center"
            color="white"
            px={3}
            py={2}
            mb={2}
            borderRadius="lg"
        >
            <Avatar
                mr={2}
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
            />
            <Box>
                <Text fontWeight="bold">{user.name}</Text>
                <Text fontSize="xs" color="gray.300">
                    <b>Email:</b> {user.email}
                </Text>
            </Box>
        </Box>
    );
};

export default UserListItem;
