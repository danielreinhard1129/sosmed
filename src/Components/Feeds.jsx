import React from 'react';
import {
  Avatar,
  Flex,
  Button,
  IconButton,
  Spacer,
  Textarea,
} from '@chakra-ui/react';
import { IoImageOutline } from 'react-icons/io5';
import { AiOutlineGif } from 'react-icons/ai';
import { RiBarChartHorizontalFill } from 'react-icons/ri';
import { VscSmiley, VscCalendar } from 'react-icons/vsc';
import { TbCalendarTime } from 'react-icons/tb';

function Feeds() {
    return (
      <Flex align="start">
        <Avatar />
        <Flex ml="2" direction="column" flexGrow={1}>
          <Textarea
            placeholder="What's happening?"
            size="lg"
            boxSizing="border-box"
            width="1/2"
            resize="vertical"
            overflow="hidden"
          />
          <Flex my="2">
            <IconButton
              variant="ghost"
              icon={<IoImageOutline size="20" />}
              aria-label="upload image"
              mr="1"
            />
            <IconButton
              variant="ghost"
              icon={<AiOutlineGif size="20" />}
              aria-label="upload image"
              mr="1"
            />
            <IconButton
              variant="ghost"
              icon={<RiBarChartHorizontalFill size="20" />}
              aria-label="upload image"
              mr="1"
            />
            <IconButton
              variant="ghost"
              icon={<VscSmiley size="20" />}
              aria-label="upload image"
              mr="1"
            />
            <IconButton
              variant="ghost"
              icon={<VscCalendar size="20" />}
              aria-label="upload image"
              mr="1"
            />
            <Spacer />
            <Button alignSelf="flex-end" colorScheme="twitter" 
            borderRadius="30px"
            disabled>
              Tweet
            </Button>
          </Flex>
        </Flex>
      </Flex>
    );
}
  export default Feeds;