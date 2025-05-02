import React from 'react';
import { Box, Flex, Text, Link } from '@chakra-ui/react';

const Footer = () => {
    return (
        <Box as="footer" bg="green.500" py={6} color="white" >
            <Flex justifyContent="space-between" alignItems="center" maxW="1200px" mx="auto">
                <Text fontSize="sm" fontWeight="bold">
                    © 2025. All rights reserved.
                </Text>
                <Flex>
                    <Link href="#" color="white" mr={4}>
                        Privacy Policy
                    </Link>
                    <Link href="#" color="white">
                        Terms of Service
                    </Link>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Footer;