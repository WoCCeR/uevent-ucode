import { Img, Text, Box, Image, Circle, Avatar } from "@chakra-ui/react";
import React from "react";

function UserCard({ user }) {

    return (
        <Box display="flex" alignItems="center" p={2}>
            <Circle size="40px" bg="gray.200" mr={4}>
                <Avatar src={user.profileImage} alt="img" w="full" h="full" objectFit="cover" />
            </Circle>
            <Box>
                <Text fontWeight="bold">{user.firstName} {user.surname}</Text>
            </Box>
        </Box>
    );
}

export default UserCard;