import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Box, Image, Text, Button, Tag} from '@chakra-ui/react';

const EventItem = ({ event }) => {
  const navigate = useNavigate();

  const handleVisitClick = () => {
    navigate(`/events/${event.id}`);
  };

  const truncateDescription = (description) => {
    if (description.length > 30) {
      return description.substring(0, 30) + '...';
    }
    return description;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString() + ", " + new Date(date).toLocaleTimeString();
  };

  return (
      <Box
          bg="white"
          boxShadow="lg"
          borderRadius="lg"
          overflow="hidden"
          w={['240px', '300px', '360px']} // збільшено ~20% від [200px, 250px, 300px]
      >
        <Image
            src={event.card_image}
            alt={event.name}
            objectFit="cover"
            w="100%"
            h={['120px', '160px', '200px']} // теж +20%
        />

        <Box p={5}>
          <Text fontSize={['lg', 'xl']} fontWeight="semibold" mb={3}>
            {event.name}
          </Text>

          <Text color="gray.700" mb={3} noOfLines={3} fontSize={['sm', 'md']}>
            {truncateDescription(event.description)}
          </Text>

          <Box display="flex" alignItems="center" mb={3} flexWrap="wrap">
            <Tag colorScheme="green" variant="solid" size="md" mr={2} mb={1}>
              {event.ticket_price}$
            </Tag>
            <Tag colorScheme="blue" variant="solid" size="md" mr={2} mb={1}>
              {event.categoryName}
            </Tag>
          </Box>

          <Box bg="gray.100" p={3} borderRadius="md" mb={2}>
            <Text color="gray.600" fontWeight="bold">Start Time:</Text>
            <Text color="gray.600" fontSize="sm">{formatDate(event.start_time)}</Text>
          </Box>

          <Box bg="gray.100" p={3} borderRadius="md" mb={2}>
            <Text color="gray.600" fontWeight="bold">End Time:</Text>
            <Text color="gray.600" fontSize="sm">{formatDate(event.end_time)}</Text>
          </Box>

          <Button
              onClick={handleVisitClick}
              width="100%"
              colorScheme="blue"
              mt={3}
              px={5}
              py={3}
              fontWeight="semibold"
              fontSize="md"
              rounded="lg"
              shadow="md"
              _hover={{ bg: "blue.600" }}
          >
            Visit
          </Button>
        </Box>
      </Box>

  );
};

export default EventItem;
