import React, { useEffect, useState } from 'react';
import { useAuthStore, useCompaniesStore } from "../store/index.js";
import CreateCompanyModal from "./company/CreateCompanyModal.jsx";
import CompanyItem from "./company/CompanyItem.jsx";
import {
    Center,
    Box,
    Input,
    Button,
    Heading,
    Text,
    Checkbox,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Tabs,
    Tab,
    TabList,
    TabPanel,
    TabPanels, Switch, FormLabel
} from '@chakra-ui/react';

function Settings() {
    const { logoutUser, uploadAvatar, updateUser, deleteUser, user, toggleNotifications } = useAuthStore();
    const { fetchUserCompanies, userCompanies } = useCompaniesStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

    useEffect(() => {
        const fetchUserCompany = async () => {
            await fetchUserCompanies(user.id);
        };
        fetchUserCompany();
    }, [fetchUserCompanies]);

    const handleToggleNotifications = async () => {
        const updatedNotifications = !user.notifications;
        await toggleNotifications(updatedNotifications);
    };

    const handleUpdateUser = async () => {
        const updatedUser = {
            firstName: firstName,
            surname: surname,
        };
        await updateUser(updatedUser);
    };

    const handleCreateCompany = async () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleLogout = async () => {
        await logoutUser();
    };

    const handleDeleteAccount = async () => {
        setIsDeleteAlertOpen(true);
    };

    const confirmDeleteAccount = async () => {
        // await deleteUser();
        // Після видалення облікового запису перенаправити користувача на сторінку виходу
        // await logoutUser();
    };

    const handleCloseDeleteAlert = () => {
        setIsDeleteAlertOpen(false);
    };

    const handleAvatarClick = async () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (event) => {
            const file = event.target.files[0];
            if (file) {
                await uploadAvatar(file);
            }
        };
        input.click();
    };

    const getUserAvatar = () => {
        return user.profileImage ? user.profileImage : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
    };

    return (
        <Center minH="100vh">
            <Box
                w="60%"
                h="100vh"

                boxShadow="lg"
                mb='50px'
                p={4}
                borderRadius="1rem"
            >
                <Tabs variant="soft-rounded" colorScheme="green">
                    <TabList display="flex" justifyContent="space-around">
                        <Tab color="black">Personal</Tab>
                        <Tab color="black">Company</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel display="flex" justifyContent="space-around">
                            <Box
                                w='50%'
                                h='60vh'
                                borderRadius='1rem'
                                p={10}
                                backgroundColor='#E2E8F0'
                                textAlign="center"
                                overflowY="auto"
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                            >
                                <Text fontSize={24} mb={4}>What do you want to change?</Text>
                                <Input placeholder='Name' type='text' borderColor='black' mb={4} value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                                <Input placeholder='Surname' type='text' borderColor='black' mb={4} value={surname} onChange={(e) => setSurname(e.target.value)}/>
                                <Input placeholder='Email' type='text' borderColor='black' mb={4} value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <Input placeholder='Password' type='password' borderColor='black' mb={4}/>

                                <Button type='button' w='50%' color='#49AA87' onClick={handleUpdateUser} margin={2}>Save changes</Button>
                                <Button type='button' w='50%' color='red' onClick={handleLogout} margin={2}>Logout</Button>
                                <Button type='button' w='50%' color='red' onClick={handleDeleteAccount} margin={2}>Delete account</Button>

                                <Box display="flex" alignItems="center" mt={4}>
                                    <FormLabel htmlFor="email-notifications" flex="1" mr={4}>
                                        Email Notifications
                                    </FormLabel>
                                    <Switch
                                        id="email-notifications"
                                        isChecked={user.notifications}
                                        onChange={handleToggleNotifications}
                                    />
                                </Box>

                                <AlertDialog
                                    isOpen={isDeleteAlertOpen}
                                    onClose={handleCloseDeleteAlert}
                                >
                                    <AlertDialogOverlay>
                                        <AlertDialogContent>
                                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                                Delete Account
                                            </AlertDialogHeader>
                                            <AlertDialogBody>
                                                Are you sure that you want to delete your account? This action cannot be undone.
                                            </AlertDialogBody>
                                            <AlertDialogFooter>
                                                <Button onClick={handleCloseDeleteAlert}>
                                                    Cancel
                                                </Button>
                                                <Button colorScheme="red" onClick={confirmDeleteAccount} ml={3}>
                                                    Delete
                                                </Button>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialogOverlay>
                                </AlertDialog>
                            </Box>

                            <Box
                                w='40%'
                                h='60vh'
                                borderRadius='1rem'
                                p={10}
                                backgroundColor='#E2E8F0'
                                textAlign="center"
                                overflowY="auto"
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                            >
                                <Heading>Info</Heading>
                                <div
                                    onClick={handleAvatarClick}
                                    style={{
                                        width: '200px',
                                        height: '200px',
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        marginBottom: '16px'
                                    }}
                                >
                                    <img
                                        src={getUserAvatar()}
                                        alt="User Avatar"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </div>

                                <Heading textAlign='center' fontSize={18} mb={4}>{user.firstName} {user.surname}</Heading>
                                <Text>Email: {user.email}</Text>
                            </Box>
                        </TabPanel>
                        <TabPanel display="flex" justifyContent="space-around">
                            <Box
                                w='50%'
                                h='60vh'
                                borderRadius='1rem'
                                p={10}
                                backgroundColor='#E2E8F0'
                                textAlign="center"
                                
                            >

                                <Checkbox borderColor="black">Don`t show me in the member list of event</Checkbox>
                                <Button type='button' color='blue' width='80%' margin={4} onClick={handleCreateCompany}>Create Company</Button>
                                <CreateCompanyModal isOpen={isModalOpen} onClose={handleCloseModal}/>
                            </Box>

                            <Box
                                w='40%'
                                h='60vh'
                                borderRadius='1rem'
                                p={10}
                                backgroundColor='#E2E8F0'
                                textAlign="center"
                                overflowY="auto"
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                            >
                                <Heading mb="15px">My Companies</Heading>
                                <ul>
                                    {userCompanies.map(company => (
                                        <CompanyItem key={company.id} company={company}/>
                                    ))}
                                </ul>
                            </Box>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Center>
    );
}

export default Settings;
