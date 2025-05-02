import React, { useEffect, useState } from 'react';
import { useAuthStore, useCompaniesStore } from '../../store/index.js';
import CompanyItem from './CompanyItem.jsx';
import { Spinner, Center, Box, Text } from '@chakra-ui/react';

const CompaniesList = () => {
  const { companies, fetchCompanies, fetchUserCompanies } = useCompaniesStore();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCompanies();
        if(user) {``
          await fetchUserCompanies(user.id);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchData();
  }, [fetchCompanies, fetchUserCompanies]);

  return (
    <Center>
      {loading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          mt="40vh"
        />
      ) : (
        <Box w="25%" h="100vh" p={6}  mb="50px" textAlign="center" borderRadius="1rem">
          <Text fontSize="xl" fontWeight="semibold" mb={4}>
            Companies List
          </Text>
          <ul>
            {companies.map((company) => (
              <CompanyItem key={company.id} company={company} />
            ))}
          </ul>
        </Box>
      )}
    </Center>
  );
};

export default CompaniesList;
