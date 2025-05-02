import React from 'react';
import { Box, Flex, Button } from '@chakra-ui/react';
import EventItem from './EventItem';

const EventCarousel = ({ events }) => {
    const [currentEventIndex, setCurrentEventIndex] = React.useState(0);

    const handleNext = () => {
        setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length);
    };

    const handlePrev = () => {
        setCurrentEventIndex((prevIndex) =>
            prevIndex === 0 ? events.length - 1 : prevIndex - 1
        );
    };

    const index1 = currentEventIndex % events.length;
    const index2 = (currentEventIndex + 1) % events.length;
    const index3 = (currentEventIndex + 2) % events.length;
    const index4 = (currentEventIndex + 3) % events.length;
    const index5 = (currentEventIndex + 4) % events.length;

    return (
        <Box align="center">
            <Box align="center" w="100%" h="81vh">
                <Flex justify="space-around" align="center" margin={5}>


                    <EventItem event={events[index1]} mb={2} />
                    <EventItem event={events[index2]} mb={2} />
                    <EventItem event={events[index3]} mb={2} />
                    <EventItem event={events[index4]} mb={2} />
                    <EventItem event={events[index5]} mb={2} />


                </Flex>
                <Box align="center" w="30%" margin={10}>
                    <Button onClick={handlePrev}>Previous</Button>
                    <Button onClick={handleNext}>Next</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default EventCarousel;
