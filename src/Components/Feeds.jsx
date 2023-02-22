import React, { useState } from 'react';
import {
  Avatar,
  Flex,
  Button,
  IconButton,
  Spacer,
  Textarea,
  Text,
  Tooltip,
  useToast,
  Alert,
  AlertIcon

} from '@chakra-ui/react';
import { IoImageOutline } from 'react-icons/io5';
import { VscSmiley, VscCalendar } from 'react-icons/vsc';
import axios from 'axios';
import { API_URL } from '../helper';
import { useSelector } from 'react-redux';

function Feeds(props) {
  const [textArea, setTextArea] = useState('');
  const [lengthTextArea, setLengthTextArea] = useState(0);
  const dataStatus = useSelector((state) => state.auth.status);
  const dataImgProfile = useSelector((state) => state.auth.imgprofile);
  const toast = useToast();


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
          props.getalltweets();
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



  return (
    <Flex align="start" p='4' borderBottom='1px' borderColor='gray.200'>
      <Avatar src={`${API_URL}${dataImgProfile}`} bgColor='gray.400'/>
      <Flex ml="2" direction="column" flexGrow={1}>
        <Textarea
          placeholder="What's happening?"
          size="lg"
          boxSizing="border-box"
          width="1/2"
          resize="none"
          overflow="hidden"
          rows='4'
          maxLength={150}
          value={textArea}
          onChange={(e) => {
            setTextArea(e.target.value);
            setLengthTextArea(e.target.value.length);
          }}
        />
        <Text textAlign="right">{lengthTextArea}/150</Text>
        <Flex my="2">
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
          <Button alignSelf="flex-end" colorScheme="facebook"
            borderRadius="30px"
            disabled
            onClick={btnTweet}>
            Tweet
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
export default Feeds;