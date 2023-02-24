import React from 'react';
import {
  Avatar,
  Box,
  Text,
  HStack,
  Flex,
  IconButton,
  LinkBox,
  Tooltip,
} from '@chakra-ui/react';
import {
  AiOutlineMessage,
  AiOutlineHeart,
  AiOutlineShareAlt,
  AiFillHeart
} from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../helper';
import { useState } from 'react';
import { useSelector } from 'react-redux';


//Tweets -> Quack 

function Tweets(props) {
  const today = new Date().toISOString().split('T')[0]
  const dataUsername = useSelector((state) => state.auth.username);
  const navigate = useNavigate();
  const tgl = () => {
    if (today == props.date.split('T')[0]) {
      return <Text fontWeight="normal" color={'white'}>
        today
      </Text>
    } else {
      let tgl = new Date(today) - new Date(props.date.split('T')[0])
      let day = Math.floor(tgl / 86400000)
      console.log(tgl)
      if (day == 1) {
        return <Text fontWeight="normal" color={'white'}>
          yesterday
        </Text>
      } else {
        return <Text fontWeight="normal" color={'white'}>
          {day} days ago
        </Text>
      }
    }
  }

  let filterLike = props.likes.filter((val) => {
    return val.user.username == dataUsername && val.isLiked
  });
  console.log(filterLike)

  const btnLike = async () => {
    try {
      let token = localStorage.getItem('sosmed_login');
      let post = await axios.post(`${API_URL}/tweet/like`, {
        tweetId: props.tweetId
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      props.get();
      console.log("postttt btnlike", post)
    } catch (error) {
      console.log(error);
    }
  }

  let link = ''
  if(props.username == dataUsername){
    link = '/myprofile'
  } else {
    link = `/other/${props.username}`
  }


  return (
    <LinkBox shadow={'xl'} w='full'>
      <HStack align="start" my="2" p='4'>
        <Avatar bgColor='gray.400' cursor='pointer' src={`${API_URL}${props.imgprofile}`} onClick={() => navigate(`${link}`)}/>
        {/* <Avatar as={Link} to="/username" name="username" src="" /> */}
        <Box paddingLeft='6'>
          <HStack cursor='pointer' onClick={() => navigate(`${link}`)}>
            <Text color={'white'} fontWeight="bold">{props.username}</Text>
            {tgl()}
          </HStack>
          <Flex w='full' >
            <Text color={'white'}>
              {props.tweet}
            </Text>
          </Flex>
          <Flex mt="2" w='full' justify='space-between' pr='8'>
            <Tooltip label="on going">
              <div>
                <Flex align='center'>
                  <IconButton
                    icon={<AiOutlineMessage size="20" />}
                    aria-label="Write comment"
                    variant="ghost"
                    as={Link}
                    color={'white'}
                  />
                  <Text color={'white'}>1</Text>
                </Flex>
              </div>
            </Tooltip>

            <Flex align='center'>
              <IconButton
                icon={filterLike.length > 0 ? <AiFillHeart size="20" /> : <AiOutlineHeart size="20" />}
                aria-label="Like"
                variant="ghost"
                onClick={btnLike}
                type='button'
                color={'white'}

              />
              <Text color={'white'}>{props.countlike}</Text>
            </Flex>

            <Tooltip label="on going">
              <div>
                <Flex align='center'>
                  <IconButton
                    icon={<AiOutlineShareAlt size="20" />}
                    aria-label="Share"
                    variant="ghost"
                    color={'white'}
                  />
                  <Text color={'white'}>1</Text>
                </Flex>
              </div>
            </Tooltip>
          </Flex>
        </Box>
      </HStack>
    </LinkBox>
  );
};

export default Tweets;
