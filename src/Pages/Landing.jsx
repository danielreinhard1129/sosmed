import { Avatar, Box, Card, CardHeader, Container, Flex, Text, Heading, Button, Divider, IconButton, VStack, Stack, Tooltip } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../helper';
import Sidebar from '../Components/Sidebar';
import Feeds from '../Components/Feeds';
import Tweets from '../Components/Tweets';
import { useSelector } from 'react-redux';
import Loading from '../Components/Loading';



function LandingPage() {
    const [userList, setUserList] = useState([]); //default yg user listnya itu array
    const dataUsername = useSelector((state) => state.auth.username)
    const [tweetList, setTweetList] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const getAllUser = async () => {
        try {
            let response = await axios.get(`${API_URL}/user/getalluser`);
            console.log("response.data getalluser", response.data);
            setUserList(response.data);
            setTimeout(() => {
                setLoading(false)
            }, 2000)
        } catch (error) {
            console.log(error);
        }
    }

    const getAllTweet = async () => {
        try {
            let res = await axios.get(`${API_URL}/tweet/getalltweets`);
            console.log("get all tweets", res.data)
            setTweetList(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const printAlltweet = () => {
        return tweetList.map((val, idx) => {
            return <Tweets tweetId={val.id} tweet={val.tweet} username={val.user.username} date={val.createdAt}
                likes={val.likes} get={getAllTweet} countlike={val.countLike} imgprofile={val.user.imgprofile} />
        })
    }


    // buat manggil yanng var getAllUser pake useEffect
    React.useEffect(() => {
        getAllUser();
        getAllTweet();
    }, [])

    const printUser = () => {
        let filter = userList.filter((val) => {
            return val.username != dataUsername
        })
        console.log('filterrr', filter)
        return filter.map((val, idx) => {
            return <Box as={Flex} mx='3' my='3' cursor='pointer' key={val.id} shadow='none' justifyContent='space-between'>
                <Link as={Box} to={`/other/${val.username}`} w='full'>
                    <Flex w='full'>
                        <Avatar bgColor='gray.400' size="sm" src={`${API_URL}${val.imgprofile}`} marginTop='3' marginRight='1' />
                        <Box>
                            <Heading color={'white'} as="h3" size="sm" marginTop="1vh" >{val.username}</Heading>
                            <Text color="gray">@{val.username}</Text>
                        </Box>

                    </Flex>
                </Link>
                <Box>
                    <Tooltip label='on going'>
                        <div >
                            <Box>
                                <Button type='button' colorScheme={'twitter'} marginTop="1vh"
                                    borderRadius="30px"
                                    variant='outline'
                                    position={'unset'}
                                >Follow</Button>
                            </Box>
                        </div>
                    </Tooltip>
                </Box>
                {/* <Divider display="block" orientation='horsizontal' borderColor="gray.200" marginTop="1vh" /> */}
            </Box>
        });
    }

    return <Container
        maxW={{ base: 'xl', sm: '2xl', md: '4xl', lg: '6xl' }}
        bgColor={'#15202b'}
    >
        <Flex >
            {/* Left Side Bar / User Menu */}
            <Box>
                <Flex display={{ base: 'none', sm: 'flex', md: 'flex', lg: 'flex', xl: 'flex' }}>
                    < Sidebar />
                </Flex>
            </Box>

            {/* Middle content / Tweets */}
            {
                loading ?
                    <Box w='full'>
                        <Loading />
                    </Box>
                    :
                    <>
                        <Box flex='2' shadow={'2xl'}  maxH={'92.5vh'} minH={'92.5vh'} overflow='auto' sx={{ '::-webkit-scrollbar': { display: 'none' } }}>
                                <Stack textAlign='center' border='0px' mt='9' >
                                    < Feeds getalltweets={getAllTweet} />
                                </Stack>
                                <VStack >
                                    {printAlltweet()}
                                </VStack>
                        </Box>
                            {/* Right content / Who to Follow */}
                        <Box flex='1' h='92.5vh' textAlign='center' display={{ base: 'none', sm: 'none', md: 'none', lg: 'block' }} >
                            <Box display='flex' my='3' borderBottom='1px' borderColor='gray.200'>
                                <Text color={'white'} textAlign='left' fontWeight="bold" mt='2' ml='8' mb="2">
                                    Who to follow
                                </Text>
                            </Box>
                            <Box display={{ base: 'none', sm: 'none', md: 'block' }}>
                                {printUser()}
                            </Box>
                        </Box>
                    </>
            }
        </Flex>
    </Container>
}

export default LandingPage;