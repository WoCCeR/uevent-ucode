import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Button, Alert, AlertIcon } from '@chakra-ui/react';
import useCompaniesStore from '../../store/companies';

const CreateCompanyModal = ({ isOpen, onClose }) => {
    const { createCompany } = useCompaniesStore();
    const [companyInfo, setCompanyInfo] = useState({
        name: '',
        description: '',
        location: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompanyInfo({
            ...companyInfo,
            [name]: value
        });
    };

    const handleCloseModal = () => {
        onClose();
        setError('');
        setCompanyInfo({
            name: '',
            description: '',
            location: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!companyInfo.name || !companyInfo.description || !companyInfo.location) {
            setError('Name, description and location fields can\'t be empty!');
            return;
        }

        setError('');
        await createCompany(companyInfo);
        setCompanyInfo({
            name: '',
            description: '',
            location: ''
        });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleCloseModal} size="md">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create Company</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {error && (
                        <Alert status="error" mb={4} rounded="md">
                            <AlertIcon />
                            {error}
                        </Alert>
                    )}
                    <form onSubmit={handleSubmit}>
                        <FormControl mb={4}>
                            <FormLabel>Name:</FormLabel>
                            <Input
                                type="text"
                                name="name"
                                value={companyInfo.name}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Description:</FormLabel>
                            <Input
                                type="text"
                                name="description"
                                value={companyInfo.description}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Location:</FormLabel>
                            <Input
                                type="text"
                                name="location"
                                value={companyInfo.location}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            colorScheme="blue"
                            mr={3}
                        >
                            Create
                        </Button>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CreateCompanyModal;
