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
    <LinkBox>
      <HStack align="start" my="5">
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
          <LinkOverlay as={Link} to="/username/status/quackid">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit
            corrupti suscipit doloribus et amet voluptates.
          </LinkOverlay>
          <Flex mt="2">
            <IconButton
              icon={<AiOutlineMessage size="20" />}
              aria-label="Write comment"
              variant="ghost"
              as={Link}
              to="compose/quack"
            />
            <Text
              mr="16" mt="2"
            >1</Text>
            <IconButton
              icon={<AiOutlineRetweet size="20" />}
              aria-label="Write comment"
              variant="ghost"
              as={Link}
              to="compose/quack"
            />
            <Text
              mr="16" mt="2"
            >1</Text>
            {/* <Spacer /> */}
            <IconButton
              // icon={<AiFillHeart size="20" />}
              icon={<AiOutlineHeart size="20" />}
              aria-label="Like"
              variant="ghost"
            />
            <Text
              mr="16" mt="2"
            >1</Text>
            {/* <Spacer /> */}
            <IconButton
              icon={<AiOutlineShareAlt size="20" />}
              aria-label="Share"
              variant="ghost"
            />
            <Text
              mr="16" mt="2"
            >1</Text>
          </Flex>
        </Box>
      </HStack>
    </LinkBox>
  );
};

export default Tweets;
