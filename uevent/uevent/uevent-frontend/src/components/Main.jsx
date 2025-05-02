import React from 'react';
import { Box, Text, Grid, Button, useMediaQuery } from '@chakra-ui/react';
import useEventsStore from '../store/events';
import EventCarousel from './event/EventCarousel';

function Main() {
    const { events } = useEventsStore();

    return (
        <Box p={4} bgGradient="linear(to-b, pink.50, blue.50)">
            <Text fontSize="3xl" fontWeight="bold" mb={6} textAlign="center" color="pink.600">
                Available events now!
            </Text>
            {events.length > 0 ? (
                <EventCarousel events={events} />
            ) : (
                <Text textAlign="center">No events to display.</Text>
            )}
        </Box>
    );
}

export default Main;
