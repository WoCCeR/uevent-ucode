import React from 'react';
import { VStack } from '@chakra-ui/react';
import CommentItem from './CommentItem';

const CommentList = ({ comments }) => {
    return (
        <VStack mb="20" spacing={4} align="stretch" maxH="40vh" overflowY="auto">
            {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
            ))}
        </VStack>
    );
};

export default CommentList;