import { Avatar, Box, Card, CardHeader, Container, Flex, Text, Heading, Button, Divider, IconButton, VStack, Stack } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../helper';
import Sidebar from '../Components/Sidebar';
import Feeds from '../Components/Feeds';
import Tweets from '../Components/Tweets';
import { SearchBar } from '../Components/SearchBar';
import {
    FiSettings
} from 'react-icons/fi';


function LandingPage() {
    // Menampung data user yang diambil
    const [userList, setUserList] = React.useState([]); //default yg user listnya itu array
    const getAllUser = async () => {
        try {
            let response = await axios.get(API_URL + '/user');
            console.log(response.data);
            setUserList(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    // buat manggil yanng var getAllUser pake useEffect
    React.useEffect(() => {
        getAllUser();
    }, [])

    const printUser = () => {
        return userList.map((val, idx) => {
            return <Card mb='2' cursor='pointer' display='flex' key={val.id} shadow='none'>
                <Link to={`/other/${val.id}`}>
                    {/* ini pas nge klik dia arahin ke nama other profile cth:  http://localhost:3000/other/3 */}
                    <CardHeader>
                        <Flex justifyContent={'space-between'}>
                            <Avatar size="sm" src="avatar-1.jpg" marginTop='3' marginRight='1' />
                            <Box marginRight='10'>
                                <Heading as="h3" size="sm" marginTop="1vh" >{val.username}</Heading>
                                <Text color="gray">@{val.username}</Text>
                            </Box>
                            <Button type='button' colorScheme='twitter' marginTop="1vh"
                                borderRadius="30px"
                                variant='outline'
                            >Follow</Button>
                        </Flex>
                    </CardHeader>
                    <Divider display="flex" orientation='horizontal' borderColor="gray.200" marginTop="1vh" />
                    {/* daftar nama" yang kebawah */}
                </Link>
            </Card>
        });
    }

    return <Container
        maxW={{ base: 'xl', sm: '2xl', md: '4xl', lg: '6xl' }}
    >
        <Flex >
            {/* Left Side Bar / User Menu */}
            <Box>
                <Flex display={{ base: 'none', sm: 'flex', md: 'flex', lg: 'flex', xl: 'flex' }}>
                    < Sidebar />
                </Flex>
            </Box>
            {/* Middle content / Tweets */}
            <Box flex='2' borderLeft='1px' borderRight='1px' borderColor='gray.200'>
                <Stack textAlign='center' border='0px' mt='9' >
                    < Feeds />
                </Stack>
                <VStack border='0px'  overflow='auto' h='100vh' sx={{'::-webkit-scrollbar': {display: 'none'}}}>
                    < Tweets />
                    < Tweets />
                    < Tweets />
                    < Tweets />
                    < Tweets />
                    < Tweets />
                </VStack>
            </Box>
            {/* Right content / Who to Follow */}
            <Box flex='1' textAlign='center' display={{ base: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' }}>
                <Flex mt='4' ml='8' >
                    <SearchBar />
                </Flex>
                <Box display='flex' my='3' borderBottom='1px' borderColor='gray.200'>
                    <Text textAlign='left' fontWeight="bold" mt='2' ml='8'>
                        Who to follow
                    </Text>
                    <IconButton
                        icon={<FiSettings size="20" />}
                        aria-label="Write comment"
                        variant="ghost"
                        as={Link}
                        to="compose/quack"
                        ml='28'
                        color='gray.500'
                    />
                </Box>
                <Box id='list-user' display={{ base: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' }}>
                    {printUser()}
                </Box>
            </Box>
        </Flex>
    </Container>
}

export default LandingPage;