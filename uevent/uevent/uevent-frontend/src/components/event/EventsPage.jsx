import React, {useEffect, useMemo, useState} from 'react';
import useEventsStore from "../../store/events.js";
import EventItem from "./EventItem.jsx";
import {Box, Button, Flex, Select} from "@chakra-ui/react";

const EventsPage = () => {
    const { fetchEvents, events, categories } = useEventsStore();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            await fetchEvents();
        };

        fetchData();
    }, [fetchEvents]);

    const filteredEvents = useMemo(() => {
        let filtered = events;

        if (selectedCategory) {
            filtered = filtered.filter((event) => event.categoryName === selectedCategory);
        }

        if (selectedDate) {
            const today = new Date();
            const tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);
            const thisWeek = new Date();
            thisWeek.setDate(today.getDate() + 7);
            const nextWeek = new Date();
            nextWeek.setDate(today.getDate() + 14);

            switch (selectedDate) {
                case 'today':
                    filtered = filtered.filter((event) => {
                        const startTime = new Date(event.start_time);
                        return startTime >= today && startTime < tomorrow;
                    });
                    break;
                case 'tomorrow':
                    filtered = filtered.filter((event) => {
                        const startTime = new Date(event.start_time);
                        return startTime >= tomorrow && startTime < new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000);
                    });
                    break;
                case 'thisWeek':
                    filtered = filtered.filter((event) => {
                        const startTime = new Date(event.start_time);
                        return startTime >= today && startTime < thisWeek;
                    });
                    break;
                case 'nextWeek':
                    filtered = filtered.filter((event) => {
                        const startTime = new Date(event.start_time);
                        return startTime >= thisWeek && startTime < nextWeek;
                    });
                    break;
                default:
                    break;
            }
        }

        return filtered;
    }, [events, selectedCategory, selectedDate]);

    return (
        <div className="container">
            <Flex
                bg="#6fbccc"
                borderRadius="md"
                p={2}
                justifyContent="center"
                mb={4}
            >
                <Box mr={4}>
                    <Select
                        placeholder="Select category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">All categories</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </Select>
                </Box>
                <Box>
                    <Select
                        placeholder="Select date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    >
                        <option value="">All dates</option>
                        <option value="today">Today</option>
                        <option value="tomorrow">Tomorrow</option>
                        <option value="thisWeek">This week</option>
                        <option value="nextWeek">Next week</option>
                    </Select>
                </Box>
            </Flex>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-3">
                {filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => (
                        <div key={event.id} className="p-4">
                            <EventItem event={event}/>
                        </div>
                    ))
                ) : (
                    <div className="col-span-3 text-center py-10">
                        <p className="text-lg font-semibold">No matching events found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventsPage;