import React from 'react';
import {Box, Flex, Image, Text, Button, Tag} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useEventsStore from '../../store/events';

const TicketItem = ({ ticket }) => {
    const { getEventById } = useEventsStore();
    const event = getEventById(ticket.event_id);
    const navigate = useNavigate();

    const handleVisitClick = () => {
        navigate(`/events/${ticket.event_id}`);
    };

    return (
        <Box bg="pink.100" boxShadow="md" rounded="3xl" p={6} mb={4} w="100%" maxW="500px">
            <Flex alignItems="center" mb={4}>
                <Image
                    src={event.card_image}
                    alt={event.name}
                    boxSize="100px"
                    objectFit="cover"
                    rounded="full"
                    mr={4}
                    boxShadow="md"
                />
                <div>
                    <Text fontSize="lg" fontWeight="bold">
                        {event.name}
                    </Text>
                    <Text color="gray.600"> Begins: {new Date(event.start_time).toLocaleString()}</Text>
                </div>
            </Flex>
            <Flex justify="space-between" mb={4}>
                <Text fontSize="14">Bought at: {new Date(ticket.createdAt).toLocaleString()}</Text>
                <Tag> {ticket.status} </Tag>
            </Flex>
            <Button
                onClick={handleVisitClick}
                bg="cyan.300"
                _hover={{ bg: 'cyan.700' }}
                color="cyan.050"
                fontWeight="bold"
                py={2}
                px={4}
                rounded="md"
                w="100%"
                _focus={{ boxShadow: 'none' }}
            >
                View
            </Button>
        </Box>
    );
};

export default TicketItem;
