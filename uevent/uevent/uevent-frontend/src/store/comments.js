import { create } from 'zustand';
import $api from '../axios';

const useCommentsStore = create((set) => ({
    comments: [],

    createComment: async (content, eventId) => {
        try {
            const response = await $api.post(`/event/comment/${eventId}`, {content});

            set((state) => ({
                comments: [...state.comments, response.data]
            }));
        } catch (error) {
            console.error('Error registering user:', error);
        }
    },

    fetchEventComments: async (eventId) => {
        try {
            const response = await $api.get(`/event/comment/${eventId}`);

            set({ comments: response.data });
        } catch (error) {
            console.error('Error registering user:', error);
        }
    },


}));


export default useCommentsStore;