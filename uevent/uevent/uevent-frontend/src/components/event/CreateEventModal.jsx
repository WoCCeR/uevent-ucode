import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Select,
    Button,
    Box,
    useToast,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import useEventsStore from "../../store/events.js";
import MapContainer from "../maps/MapContainer.jsx";
import CompanyItem from "../company/CompanyItem.jsx";

const CreateEventModal = ({ companyId }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { createEvent, categories } = useEventsStore();
    const toast = useToast();
    const [eventName, setEventName] = useState("");
    const [description, setDescription] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [ticketCount, setTicketCount] = useState(0);
    const [ticketPrice, setTicketPrice] = useState(0);
    const [bannerImage, setBannerImage] = useState(null);
    const [eventImage, setEventImage] = useState(null);
    const [category, setCategory] = useState("");
    const [markerPosition, setMarkerPosition] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createEvent({
                companyId,
                eventName,
                description,
                startTime,
                endTime,
                ticketCount,
                ticketPrice,
                category,
                bannerImage,
                eventImage,
                markerPosition,
            });
            toast({
                title: "Event created successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            onClose();
        } catch (error) {
            toast({
                title: "Error creating event.",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleMarkerPositionChange = (newPosition) => {
        setMarkerPosition(newPosition);
    };

    return (
        <>
            <Button onClick={onOpen} color='blue'>Create Event</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Event</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <ModalBody style={{ position: 'relative', height: '400px', overflow: 'hidden' }}>
                            <div style={{ paddingTop: '20px' }}>
                                <MapContainer onMarkerPositionChange={handleMarkerPositionChange} />
                            </div>
                        </ModalBody>
                        <FormControl mt={4}>
                            <FormLabel>Event Name</FormLabel>
                            <Input
                                type="text"
                                value={eventName}
                                onChange={(e) => setEventName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Category</FormLabel>
                            <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                                {categories.map(category => (
                                    <option value={category.name}>{category.name}</option>
                                ))}
                            </Select>
                        </FormControl>
                        <Box display="flex" justifyContent="space-between" mt={4}>
                            <FormControl w="48%">
                                <FormLabel>Start Time</FormLabel>
                                <Input
                                    type="datetime-local"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                />
                            </FormControl>
                            <FormControl w="48%">
                                <FormLabel>End Time</FormLabel>
                                <Input
                                    type="datetime-local"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                />
                            </FormControl>
                        </Box>
                        <Box display="flex" justifyContent="space-between" mt={4}>
                            <FormControl w="48%">
                                <FormLabel>Ticket Count</FormLabel>
                                <Input
                                    type="number"
                                    value={ticketCount}
                                    onChange={(e) => setTicketCount(e.target.value)}
                                />
                            </FormControl>
                            <FormControl w="48%">
                                <FormLabel>Ticket Price</FormLabel>
                                <Input
                                    type="number"
                                    value={ticketPrice}
                                    onChange={(e) => setTicketPrice(e.target.value)}
                                />
                            </FormControl>
                        </Box>
                        <FormControl mt={4}>
                            <FormLabel>Banner Image</FormLabel>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setBannerImage(e.target.files[0])}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Event Image</FormLabel>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setEventImage(e.target.files[0])}
                            />
                        </FormControl>
                        <Button
                            mt={4}
                            colorScheme="green"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Create Event
                        </Button>
                        <Button
                            mt={4}
                            colorScheme="gray"
                            onClick={onClose}
                            ml={2}
                        >
                            Cancel
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CreateEventModal;