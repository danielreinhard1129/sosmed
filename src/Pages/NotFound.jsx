import React from 'react';
import { Box, Heading, Text, Button, Flex } from '@chakra-ui/react';
import Loading from '../Components/Loading';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function NotFound(props) {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(true);
    const dataUsername = useSelector((state) => state.auth.username)
    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2700); //millisecond
    }, [])

    let link = '';
    if (dataUsername) {
        link = '/landing'
    } else {
        link = '/';
    }

    if (loading) {
        return <Text><Loading /></Text>
    } else {
        return (
            <Flex
                bgColor={'#15202b'}
                minH={'100vh'}
                align={'center'}
                justify={'center'}
            >
                <Box textAlign="center" py={10} px={6} shadow={'dark-lg'}>
                    <Heading
                        display="inline-block"
                        as="h2"
                        size="4xl"
                        // bgGradient="linear(to-r, teal.400, teal.600)"
                        bg='twitter.500'
                        backgroundClip="text">
                        404
                    </Heading>
                    <Text color={'white'} fontSize='4xl' fontWeight="bold" mt={3} mb={2}>
                        Page Not Found
                    </Text>
                    <Text color={'white'} mb={6}>
                        The page you're looking for does not seem to exist
                    </Text>

                    <Button
                        colorScheme="twitter"
                        // bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
                        color="white"
                        variant="solid"
                        rounded={'full'}
                        onClick={() => navigate(`${link}`)}
                    >
                        Go to Home
                    </Button>
                </Box>
            </Flex>
        );
    }
}
