import React from 'react';
import { Box, Flex, Container, Card, Image, Textarea, Text, IconButton, Button, Spacer, Avatar, LinkBox, Tooltip } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../helper';
import Sidebar from '../Components/Sidebar';
import Tweets from '../Components/Tweets';
import Loading from '../Components/Loading';
import { MdOutlineVerified } from 'react-icons/md';


const OtherProfile = (props) => {
    const params = useParams()
    const [tweetUser, setTweetUser] = React.useState([]);
    const [dataUser, setDataUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const getUserTweet = async () => {
        try {
            let get = await axios.post(`${API_URL}/tweet/getusertweet`, {
                username: params.username
            });
            console.log("tweetUser", get.data)
            setTweetUser(get.data);
            setTimeout(() => {
                setLoading(false)
            }, 2000)
        } catch (error) {
            console.log(error)
        }
    }

    const getUserData = async () => {
        try {
            let get = await axios.post(`${API_URL}/user/getdatauser`, {
                username: params.username
            });
            console.log("data user", get)
            setDataUser(get.data)
        } catch (error) {

        }
    }
    console.log("data user", dataUser)

    const printUserTweet = () => {
        return tweetUser.map((val, idx) => {
            return <Tweets tweetId={val.id} tweet={val.tweet} username={val.user.username} date={val.createdAt}
                likes={val.likes} countlike={val.countLike} get={getUserTweet} imgprofile={val.user.imgprofile}/>
        })
    }

    React.useEffect(() => {
        getUserTweet();
        getUserData();
    }, [])


    return (
        <Flex as={Container} maxW='6xl'>
            {/* BOX 1 */}
            <Box >
                <Flex display={{ base: 'none', sm: 'flex', md: 'flex', lg: 'flex', xl: 'flex' }}>
                    < Sidebar />
                </Flex>
            </Box>

            {/* BOX 2 */}
            {
                loading ?
                    <Box w='full'>
                        <Loading />
                    </Box>

                    :
                    <Box flex='2'>

                        <Box>
                            <Image w='full' maxH='300px' src={`${API_URL}${dataUser.imgbanner}`} alt='Dan Abramov' />
                        </Box>

                        <Box px='8' pb='8' shadow='xl' roundedBottom='3xl'>
                            <Avatar
                                size='xl'
                                name='avatar'
                                src={`${API_URL}${dataUser.imgprofile}`}
                                mt='-16' mb='3'
                                bgColor='gray.400'
                            />{' '}

{/* https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1 */}
                            <Flex w='full' justify='space-between' m>
                                <Box>
                                    <Flex alignItems='center' gap='1'>
                                        <Text color={'white'} fontSize={{ base: 'lg', md: 'xl' }} fontWeight='bold'>@{dataUser?.username}</Text>
                                        <Text color='white' fontSize='xl'>{dataUser.statusId == 2 ? <MdOutlineVerified /> : <></>}</Text>
                                    </Flex>
                                    <Text color={'white'} fontSize={{ base: 'sm', md: 'md' }}>{dataUser?.email}</Text>
                                    <Flex gap='3' my='5'>
                                        <Text color={'white'} fontSize={{ base: 'lg', md: 'xl' }}>100 Follower</Text>
                                        <Text color={'white'} fontSize={{ base: 'lg', md: 'xl' }}>200 Following</Text>
                                    </Flex>
                                </Box>
                                <Tooltip label='on going'>
                                    <div>
                                        <Button colorScheme='twitter' rounded='full'
                                            size={{ base: 'sm', md: 'md' }}
                                        >Follow</Button>
                                    </div>
                                </Tooltip>
                            </Flex>
                        </Box>

                        <Box shadow='md' mt='3'>
                            {printUserTweet()}
                        </Box>



                    </Box>
            }
        </Flex>
    )
}

export default OtherProfile;