import React, {useEffect, useState} from 'react';
import useEventsStore from "../../store/events.js";
import TicketItem from "./TicketItem.jsx";
import { Center, Spinner,  } from '@chakra-ui/react';

const TicketsPage = () => {
    const { tickets,fetchTickets } = useEventsStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await fetchTickets();
            setLoading(false);
        }

        fetchData();
    }, []);

    return (
        <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
            {loading ? (
                <Center height="100vh">
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                    />
                </Center>
            ) : (
                <div className="flex flex-col items-center">
                    <h2 className="text-3xl font-bold mb-4">My Ticket List</h2>
                    {(Array.isArray(tickets) && tickets.length > 0) ? (
                        tickets.map(ticket => (
                            <TicketItem key={ticket.id} ticket={ticket}/>
                        ))
                    ) : (
                        <div className="text-lg text-gray-600">No tickets available.</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TicketsPage;