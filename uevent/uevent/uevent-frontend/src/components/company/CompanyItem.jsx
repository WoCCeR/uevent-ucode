import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Box, Heading, Image, Text, Button, Flex} from '@chakra-ui/react';

const CompanyItem = ({ company }) => {
    const navigate = useNavigate();

    const handleVisitClick = () => {
        navigate(`/company/${company.id}`);
    };

    const truncateDescription = (description, maxLength) => {
        if (description.length > maxLength) {
            return description.substring(0, maxLength) + '...';
        }
        return description;
    };

    return (
        <Box
            bg="cyan.50"
            boxShadow="md"
            rounded="3xl"
            p="4"
            mb="4"
            w="100%"
            maxW="500px"
        >
            <Flex alignItems="center" mb="4">
                <Image
                    src={company.logo}
                    alt={company.name}
                    boxSize="100px"
                    objectFit="cover"
                    rounded="full"
                    mr="4"
                />
                <div>
                    <Text fontSize="lg" fontWeight="bold">
                        {company.name}
                    </Text>
                    <Text color="gray.600">{truncateDescription(company.description, 100)} ...</Text>
                </div>
            </Flex>
            <Flex justify="space-between" mb="4">
                <Text fontSize="14">Location: {company.location}</Text>
            </Flex>
            <Button
                onClick={handleVisitClick}
                bg="pink.100"
                _hover={{ bg: 'pink.500' }}
                color="cyan.900"
                fontWeight="bold"
                py={2}
                px={4}
                rounded="md"
                w="100%"
                _focus={{ boxShadow: 'none' }}
            >
                Visit
            </Button>
        </Box>
    );
};

export default CompanyItem;
