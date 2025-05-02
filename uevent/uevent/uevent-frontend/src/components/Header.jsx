import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import logo from '../assets/logo.png';
import {useAuthStore, useCompaniesStore, useEventsStore} from '../store/index.js';
import {
  Box,
  Flex,
  Input,
  Link as ChakraLink,
  Button,
  Image,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem, ListItem, List,
} from '@chakra-ui/react';


const Header = () => {
  const { isAuthenticated, user } = useAuthStore();
  const { companies } = useCompaniesStore();
  const { events } = useEventsStore();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredResults = [...events, ...companies].filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleItemClick = (item) => {
    if ("ticket_price" in item) {
      navigate(`/events/${item.id}`, { replace: true });
    } else {
      navigate(`/company/${item.id}`, { replace: true });
    }
  };

  return (
      <Box bg="#6fbccc" color="white" py={4} position="sticky" top="0" zIndex="100">
        <Flex alignItems="center" justifyContent="space-between" mx="auto" maxW="50%">
          <Flex alignItems="center" w="80%">
            <Link to="/">
              <Image
                  src={logo}
                  alt="Logo"
                  h={10}
                  mr={4}
              />
            </Link>
            <Input
                type="text"
                placeholder="Search"
                bg="#d5bcd2"
                color="white"
                rounded="md"
                textColor="black"
                border="1px"
                borderColor="black"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
                <Box
                    bg="white"
                    color="black"
                    position="absolute"
                    zIndex="1"
                    mt="15vh"
                    boxShadow="md"
                    maxH="200px"
                    overflowY="auto"
                    w="30%"
                    borderRadius="md"
                >
                  <List spacing={2} p={2}>
                    {filteredResults.map((item) => (
                        <ListItem
                            key={item.id}
                            p={2}
                            cursor="pointer"
                            _hover={{ bg: "gray.100" }}
                            onClick={() => handleItemClick(item)}
                        >
                          <Flex alignItems="center">
                            <Text flex="1" mr={4}>
                              {item.name}
                            </Text>
                            <Text fontSize="sm" color="gray.500">
                              {("ticket_price" in item) ? "Event" : "Company"}
                            </Text>
                          </Flex>
                        </ListItem>
                    ))}
                  </List>
                </Box>
            )}
          </Flex>
          <Flex alignItems="center" ml={4}>
            <Menu>
              <MenuButton
                  as={Button}
                  bg="transparent"
                  color="black"
                  _hover={{ color: 'pink.300' }}
                  _expanded={{ bg: 'cyan.600' }}
                  border="0px" borderColor="black"
                  mr={3}
                  w="50%"
              >
                Menu
              </MenuButton>
              <MenuList>
                <MenuItem as={Link} to="/events" textColor="darkblue">
                  Events
                </MenuItem>
                <MenuItem as={Link} to="/companies" textColor="darkblue">
                  Companies
                </MenuItem>
                {isAuthenticated && (
                    <MenuItem as={Link} to="/tickets" textColor="darkblue">
                      Tickets
                    </MenuItem>
                )}
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton
                  as={Button}
                  bg="transparent"
                  color="black"
                  _hover={{ color: 'pink.300' }}
                  _expanded={{ bg: 'cyan.600' }}
                  border="0px" borderColor="black"
                  w="80%"
              >
                {isAuthenticated ? (
                    <Flex alignItems="center">
                      <Image src={user.profileImage}
                             alt="user"
                             borderRadius="full"
                             boxSize={8}
                             mr={2}/>
                      <Text>{user.firstName}</Text>
                    </Flex>
                ) : (
                    'Login'
                )}
              </MenuButton>
              <MenuList>
                {isAuthenticated ? (
                    <MenuItem as={Link} to="/settings" textColor="black">Settings</MenuItem>

                ) : (
                    <MenuItem as={Link} to="/login" textColor="black">Login</MenuItem>
                )}
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>

  );
};

export default Header;
