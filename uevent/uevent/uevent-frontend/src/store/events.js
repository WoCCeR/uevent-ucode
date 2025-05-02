import { create } from 'zustand';
import $api from '../axios';

const useEventsStore = create((set) => ({
    events: [],
    tickets: [],
    categories: [],
    eventUsers: [],

    createEvent: async ({ companyId, eventName, description, startTime, endTime, ticketCount, ticketPrice, category, bannerImage, eventImage, markerPosition }) => {
        try {
            const formData = new FormData();
            formData.append('companyId', companyId);
            formData.append('eventName', eventName);
            formData.append('description', description);
            formData.append('startTime', startTime);
            formData.append('endTime', endTime);
            formData.append('ticketCount', ticketCount);
            formData.append('ticketPrice', ticketPrice);
            console.log('Category:', category);
            formData.append('category', category);

            formData.append('latitude', markerPosition.lat);
            formData.append('longitude', markerPosition.lng);

            if (bannerImage) {
                formData.append('bannerImage', bannerImage);
            }

            if (eventImage) {
                formData.append('eventImage', eventImage);
            }

            const response = await $api.post('/event/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            set((state) => ({
                events: [...state.events, response.data]
            }));
        } catch (error) {
            console.error('Error creating event:', error);
        }
    },

    fetchEvents: async () => {
        try {
            const response = await $api.get('/event/');

            set({ events: response.data });
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    },

    fetchEventUsers: async (eventId) => {
        try {
            const response = await $api.get(`/users/events/${eventId}`);

            set({ eventUsers: response.data });
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    },

    fetchTickets: async () => {
        try {
            const response = await $api.get('/event/tickets');

            set({ tickets: response.data });
        } catch (error) {
            console.error('Error fetching tickets:', error);
        }
    },

    fetchCategories: async () => {
        try {
            const response = await $api.get('/event/categories');

            set({ categories: response.data });
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    },

    buyTicket: async (eventId) => {
        try {
            const response = await $api.post(`/event/ticket/${eventId}`);
            const ticketData = await response.data;

            set((state) => ({
                tickets: [...state.tickets, ticketData]
            }));


        } catch (error) {
            console.error('Error buying ticket:', error);
        }
    },

    deleteEvent: async (eventId) => {
        try {
            const response = await $api.delete(`/event/${eventId}`);

            if (response.status === 200) {
                set((state) => ({
                    events: state.events.filter(event => event.id !== eventId)
                }));
            } else {
                console.error('Error deleting event:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    },

    getEventById: (id) => {
        const event = useEventsStore.getState().events.find((event) => event.id === id);
        return event;
    },

    getEventsByCompanyId: (companyId) => {
        const events = useEventsStore.getState().events.filter((event) => event.company_id == companyId);
        return events;
    },

}));


export default useEventsStore;