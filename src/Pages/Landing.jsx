import { Avatar, Box, Card, CardHeader, Container, Flex, Text } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../helper';

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
            return <Card mb='2' cursor='pointer' display='flex' key={val.id}>
                <Link to={`/other/${val.id}`}>  
                {/* ini pas nge klik dia arahin ke nama other profile cth:  http://localhost:3000/other/3 */}
                    <CardHeader>{val.username}</CardHeader>
                    {/* daftar nama" yang kebawah */}
                </Link>
            </Card>
        });
    }

    return <Container maxW="6xl">
        <Flex>
            <Box flex='1'>
                <Text textAlign='center' border='1px'>User Menu</Text>
            </Box>
            <Box flex='2'>
                <Text textAlign='center' border='1px'>Tweet</Text>
            </Box>
            <Box flex='1' textAlign='center'>
                <Text my='3' colorSc>Who to follow</Text>
                <Box id='list-user'>
                    {printUser()}
                </Box>
            </Box>
        </Flex>
    </Container>
}

export default LandingPage;