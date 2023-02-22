import { Box, Flex, Container, Image, Textarea, Text, IconButton, Button, Spacer, Avatar, Tooltip, useToast, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { IoImageOutline } from 'react-icons/io5';
import { MdOutlineVerified } from 'react-icons/md';
import { AiFillCamera } from 'react-icons/ai';
import { VscCalendar, VscSmiley } from 'react-icons/vsc';
import { useSelector } from 'react-redux';
import Loading from '../Components/Loading';
import Sidebar from '../Components/Sidebar';
import Tweets from '../Components/Tweets';
import { API_URL } from '../helper';
import { useRef } from 'react';


function MyProfile(props) {
    const dataUsername = useSelector((state) => state.auth.username)
    const dataEmail = useSelector((state) => state.auth.email)
    const dataStatus = useSelector((state) => state.auth.status)
    const [tweetUser, setTweetUser] = React.useState([]);
    const [textArea, setTextArea] = useState('');
    const [loading, setLoading] = useState(true);
    const [lengthTextArea, setLengthTextArea] = useState(0);
    const toast = useToast();
    const inputFile = useRef(null)
    const inputFileBanner = useRef(null)
    const [fileProfile, setFileProfile] = useState(null);
    const [fileBanner, setFileBanner] = useState(null);
    const modalProfile = useDisclosure()
    const modalBanner = useDisclosure()
    const dataImgProfile = useSelector((state) => state.auth.imgprofile)
    const dataBanner = useSelector((state) => state.auth.imgbanner)
    console.log("databanner",dataBanner)



    const btnTweet = async () => {
        try {
            if (textArea == '') {
                toast({
                    position: 'top',
                    title: 'Text Area Empty.',
                    status: 'error',
                    duration: 2500,
                    isClosable: true,
                });
            } else {
                if (dataStatus == 'unverified') {
                    toast({
                        title: 'Account Unverified.',
                        description: "Please verified your account first !",
                        status: 'warning',
                        duration: 3000,
                        isClosable: true,
                    })
                } else {
                    let token = localStorage.getItem('sosmed_login');
                    let post = await axios.post(`${API_URL}/tweet/posting`, {
                        tweet: textArea
                    }, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    getUserTweet()
                    console.log("dari feeds post", post);
                    setTextArea('');
                    toast({
                        title: 'Posting Success.',
                        status: 'success',
                        duration: 2500,
                        isClosable: true,
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getUserTweet = async () => {
        try {
            let get = await axios.post(`${API_URL}/tweet/getusertweet`, {
                username: dataUsername
            });
            console.log("get user tweet", get)
            setTweetUser(get.data)
            setTimeout(() => {
                setLoading(false)
            }, 2000)
        } catch (error) {
            console.log(error)
        }
    }

    const printUserTweet = () => {
        return tweetUser.map((val, idx) => {
            return <Tweets tweetId={val.id} tweet={val.tweet} username={val.user.username}
                date={val.createdAt} likes={val.likes} countlike={val.countLike} get={getUserTweet} imgprofile={val.user.imgprofile}/>
        })
    }

    const onChangeFile = (event) => {
        console.log(event.target.files);
        modalProfile.onOpen();
        setFileProfile(event.target.files[0])
    }

    const changePhotoProfile = async () => {
        try {
            let token = localStorage.getItem('sosmed_login');
            let formData = new FormData();
            formData.append('images', fileProfile) // append menambahkan data ke formData
            let update = await axios.patch(`${API_URL}/user/profilepicture`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (update.data.success) {
                setFileProfile(null);
                props.keeplogin();
                toast({
                    position: 'top',
                    title: `Profile Updated`,
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
                modalProfile.onClose();
            }
        } catch (error) {

        }
    }

    const onChangeFileBanner = (event) => {
        console.log(event.target.files);
        modalBanner.onOpen();
        setFileBanner(event.target.files[0])
    }

    const changeBannerProfile = async () => {
        try {
            let token = localStorage.getItem('sosmed_login');
            let formData = new FormData();
            formData.append('images', fileBanner) // append menambahkan data ke formData
            let update = await axios.patch(`${API_URL}/user/banner`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (update.data.success) {
                setFileBanner(null);
                props.keeplogin(); // agar reducers ke isi sama banner yang baru di upload
                toast({
                    position: 'top',
                    title: `Banner Updated`,
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
                modalBanner.onClose();
            }
        } catch (error) {

        }
    }


    React.useEffect(() => {
        getUserTweet();
    }, [dataUsername])


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
                        <Box pos='relative' w='full' zIndex={'-9999'}>
                            <Image w='full' bgColor='gray.100' maxH='300px' src={`${API_URL}${dataBanner}`} alt='Dan Abramov' />
                            <IconButton type='button' pos='absolute' top='0' right='0' bgColor='transparent'
                                onClick={() => inputFileBanner.current.click()}>
                                <AiFillCamera size='18px' color='white'/>
                            </IconButton>
                            <input type='file' id='file' ref={inputFileBanner} style={{ display: 'none' }} onChange={onChangeFileBanner}></input>
                        </Box>
                        {/* Modal for change img banner */}
                        <Modal isOpen={modalBanner.isOpen} onClose={modalBanner.onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Change Profile Banner</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody textAlign='center'>
                                    <Image objectFit='cover' size='4xl' src={fileBanner ? URL.createObjectURL(fileBanner) : ''}></Image>
                                </ModalBody>

                                <ModalFooter>
                                    <Button colorScheme='red' mr={3} onClick={() => {
                                        modalBanner.onClose();
                                        setFileBanner(null)
                                    }} variant='solid'>
                                        Cancel
                                    </Button>
                                    <Button onClick={changeBannerProfile} colorScheme='green' variant='outline'>Save</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>

                        <Box px='8' pb='8' shadow='xl' roundedBottom='3xl'>
                            <Box pos='relative' w='fit-content'>
                                <Avatar
                                    size='xl'
                                    name='Prosper Otemuyiwa'
                                    src={dataImgProfile ? `${API_URL}${dataImgProfile}` : 'https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-businessman-avatar-icon-flat-style-png-image_1917273.jpg'}
                                    mt='-16' mb='3'
                                    bgColor='gray.200'
                                />
                                <IconButton type='button' variant='solid' rounded='full' pos='absolute' right='0'
                                    onClick={() => inputFile.current.click()}>
                                    <AiFillCamera size='22px' />
                                </IconButton>
                                <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} onChange={onChangeFile}></input>
                            </Box>
                            {/* Modal for change img profile */}
                            <Modal isOpen={modalProfile.isOpen} onClose={modalProfile.onClose}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Change Profile Photo</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody textAlign='center'>
                                        <Avatar objectFit='cover' size='2xl' src={fileProfile ? URL.createObjectURL(fileProfile) : ''}></Avatar>
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button colorScheme='red' mr={3} onClick={() => {
                                            modalProfile.onClose();
                                            setFileProfile(null)
                                        }} variant='solid'>
                                            Cancel
                                        </Button>
                                        <Button onClick={changePhotoProfile} colorScheme='green' variant='outline'>Save</Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                            {' '}
                            <Flex w='full' justify='space-between' m>
                                <Box>
                                    <Flex alignItems='center' gap='1'>
                                        <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight='bold'>@{dataUsername}</Text>
                                        <Text color='blue.500' fontSize='xl'>{dataStatus == 'verified' ? <MdOutlineVerified /> : <></>}</Text>
                                    </Flex>
                                    <Text fontSize={{ base: 'sm', md: 'md' }}>{dataEmail}</Text>
                                    <Flex gap='3' my='5'>
                                        <Text fontSize={{ base: 'lg', md: 'xl' }}>100 Follower</Text>
                                        <Text fontSize={{ base: 'lg', md: 'xl' }}>200 Following</Text>
                                    </Flex>
                                </Box>
                                <Tooltip label='on going'>
                                    <div>
                                        <Button colorScheme='facebook' rounded='full'
                                            size={{ base: 'sm', md: 'md' }}
                                        >Follow</Button>
                                    </div>
                                </Tooltip>
                            </Flex>

                            <Flex>
                                <Box w='full'>
                                    <Textarea value={textArea} resize='none' rows='3' placeholder="What's happening?"
                                        size="lg"
                                        maxLength={150}
                                        onChange={(e) => {
                                            setTextArea(e.target.value);
                                            setLengthTextArea(e.target.value.length);
                                        }} />
                                    <Text align='right'>{lengthTextArea}/150</Text>
                                    <Flex gap='3'>
                                        <Tooltip label='on going'>
                                            <div>
                                                <IconButton
                                                    variant="ghost"
                                                    icon={<IoImageOutline size="20" />}
                                                    aria-label="upload image"
                                                    mr="1"
                                                />
                                            </div>
                                        </Tooltip>
                                        <Tooltip label='on going'>
                                            <div>
                                                <IconButton
                                                    variant="ghost"
                                                    icon={<VscSmiley size="20" />}
                                                    aria-label="upload image"
                                                    mr="1"
                                                />
                                            </div>
                                        </Tooltip>
                                        <Tooltip label='on going'>
                                            <div>
                                                <IconButton
                                                    variant="ghost"
                                                    icon={<VscCalendar size="20" />}
                                                    aria-label="upload image"
                                                    mr="1"
                                                />
                                            </div>
                                        </Tooltip>
                                        <Spacer />
                                        <Button alignSelf='flex-end' colorScheme='facebook' rounded='full'
                                            onClick={btnTweet} size={{ base: 'sm', md: 'md' }}
                                        >Send</Button>
                                    </Flex>
                                </Box>
                            </Flex>
                        </Box>

                        <Box>
                            {printUserTweet()}
                        </Box>
                    </Box>
            }
        </Flex>
    );

}

export default MyProfile;