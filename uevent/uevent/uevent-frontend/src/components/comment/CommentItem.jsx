import React from 'react';
import {Avatar, Box, Text, Flex, Spacer, Divider, useColorModeValue} from '@chakra-ui/react';

const CommentItem = ({ comment }) => {
    const { firstName, surname, profileImage, content, createdAt } = comment;

    return (
        <Box
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            bg={useColorModeValue("white", "gray.700")}
            color={useColorModeValue("gray.800", "white")}
        >
            <Flex align="center" mb={2}>
                <Avatar src={profileImage} alt="img" size="sm" mr={2} />
                <Text fontWeight="bold">{firstName} {surname}</Text>
            </Flex>
            <Divider my={2} borderColor={useColorModeValue("gray.300", "gray.700")} />
            <Text>{content}</Text>
            <Text mt={2} color="gray.500" fontSize="sm">
                {new Date(createdAt).toLocaleString()}
            </Text>
        </Box>
    );
};

export default CommentItem;