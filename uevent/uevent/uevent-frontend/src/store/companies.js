import { create } from 'zustand';
import $api from '../axios';

const useCompaniesStore = create((set) => ({
    company: null,
    companies: [],
    userCompanies: [],
    error: null,

    createCompany: async (companyData) => {
        try {
            const response = await $api.post('/company/', companyData);

            set((state) => ({
                companies: [...state.companies, response.data],
                userCompanies: [...state.userCompanies, response.data],
            }));
        } catch (error) {
            console.error('Error creating company:', error);
        }
    },

    deleteCompany: async (companyId) => {
        try {
            const response = await $api.delete(`/company/${companyId}`);

            set((state) => ({
                companies: state.companies.filter(company => company.id !== companyId),
                userCompanies: state.userCompanies.filter(company => company.id !== companyId)
            }));
        } catch (error) {
            console.error('Error deleting company:', error);
        }
    },

    fetchCompanies: async () => {
        try {
            const response = await $api.get('/company/');
            set({ companies: response.data });
        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    },

    fetchUserCompanies: async (userid) => {
        try {
            const response = await $api.get(`/company/user/${userid}`);
            set({ userCompanies: response.data });
        } catch (error) {
            console.error('Error fetching user companies:', error);
        }
    },

    updateCompany: async (updatedFields, companyId) => {
        try {
            const response = await $api.patch(`/company/update/${companyId}`,  updatedFields);
            const { name, description, location } = response.data;
            set((state) => ({
              ...state,
              company: {
                ...state.company,
                name: name,
                description: description,
                location: location
              },
            }));
    
          } catch (error) {
            console.error('Error uploading company:', error);
          }
    },

    uploadLogo: async (file, companyId) => {
        try {
            const formData = new FormData();
            formData.append('photo', file);
            const response = await $api.patch(`/company/image/${companyId}`, formData);

            const updatedCompany = response.data;

            set((state) => {

                const updatedCompanies = state.companies.map((company) =>
                    company.id === parseInt(companyId) ? updatedCompany : company
                );

                const updatedUserCompanies = state.userCompanies.map((company) =>
                    company.id === parseInt(companyId) ? updatedCompany : company
                );

                return {
                    ...state,
                    companies: updatedCompanies,
                    userCompanies: updatedUserCompanies,
                };
            });
        } catch (error) {
            console.error('Error uploading logo:', error);
        }
    },

    getCompanyById: (id) => {
        const company = useCompaniesStore.getState().companies.find((company) => company.id === id);
        return company;
    },

}));


export default useCompaniesStore;