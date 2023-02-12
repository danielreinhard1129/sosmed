import React from 'react';
import {
  Avatar,
  Box,
  Text,
  HStack,
  Flex,
  IconButton,
  Spacer,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import {
  AiOutlineMessage,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineShareAlt,
  AiOutlineRetweet
} from 'react-icons/ai';
import { Link } from 'react-router-dom';

//Tweets -> Quack 

function Tweets() {
  return (
    <LinkBox  borderBottom='1px' borderColor='gray.200'>
      <HStack align="start" my="5" p='2' >
        <Avatar src="avatar-1.jpg" />
        {/* <Avatar as={Link} to="/username" name="username" src="" /> */}
        <Box>
          <HStack as={Link} to="/username">
            <Text fontWeight="bold">Username </Text>
            <Text fontWeight="normal" color="gray.500">
              @username1
            </Text>
            <Text fontWeight="normal" color="gray.500">
              · 20min
            </Text>
          </HStack>
          <Flex w='full'>
            <Text as={Link} to="/username/status/quackid" >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A quo incidunt nemo culpa commodi nulla. Dicta, dolorem? Optio nesciunt minus eaque aspernatur! Voluptas, ut voluptatem qui accusantium dolores vero cupiditate!
              corrupti suscipit doloribus et amet voluptates.
            </Text>
          </Flex>
          <Flex mt="2" w='full' justify='space-between' pr='8'>
            <Flex align='center'>
              <IconButton
                icon={<AiOutlineMessage size="20" />}
                aria-label="Write comment"
                variant="ghost"
                as={Link}
                to="compose/quack"
              />
              <Text
              // mr="16" mt="2"
              >1</Text>
            </Flex>
            <Flex align='center'>
              <IconButton
                icon={<AiOutlineRetweet size="20" />}
                aria-label="Write comment"
                variant="ghost"
                as={Link}
                to="compose/quack"
              />
              <Text
              // mr="16" mt="2"
              >1</Text>
            </Flex>
            {/* <Spacer /> */}
            <Flex align='center'>
              <IconButton
                // icon={<AiFillHeart size="20" />}
                icon={<AiOutlineHeart size="20" />}
                aria-label="Like"
                variant="ghost"
              />
              <Text
              // mr="16" mt="2"
              >1</Text>
            </Flex>
            {/* <Spacer /> */}
            <Flex align='center'>
              <IconButton
                icon={<AiOutlineShareAlt size="20" />}
                aria-label="Share"
                variant="ghost"
              />
              <Text
              // mr="16" mt="2"
              >1</Text>
            </Flex>
            </Flex>
        </Box>
      </HStack>
    </LinkBox>
  );
};

export default Tweets;
