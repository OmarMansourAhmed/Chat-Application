import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/layout";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
    return (
        <Badge
            px={2}
            py={1}
            borderRadius="lg"
            m={1}
            mb={2}
            variant="solid"
            fontSize={12}
            colorScheme="purple"
            cursor="pointer"
            onClick={handleFunction}
        >
            {user.name}
            {admin === user._id && <span> (Admin)</span>}
            <CloseIcon pl={1} />
        </Badge>
    );
};

export default UserBadgeItem;

// import { CloseIcon } from "@chakra-ui/icons";
// import { Badge } from "@chakra-ui/layout";

// const UserBadgeItem = ({ user, handleFunction, admin }) => {
//     return (
//         <Badge
//             px={2}
//             py={1}
//             borderRadius="lg"
//             m={1}
//             mb={2}
//             bg="#6a0dad"
//             color="white"
//             fontSize={12}
//             cursor="pointer"
//             onClick={handleFunction}
//             _hover={{ bg: "#8e2de2" }}
//         >
//             {user.name}
//             {admin === user._id && <span> (Admin)</span>}
//             <CloseIcon pl={1} w={2} h={2} />
//         </Badge>
//     );
// };

// export default UserBadgeItem;
