import React from 'react';
import { Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';
import { API_URL } from '../helper';

const OtherProfile = (props) => {
    const params = useParams();
    const [data, setData] = React.useState(null);

    console.log("Get from req.params url browser", params);
    const getDataUser = async () => {
        try {
            let response = await axios.get(`${API_URL}/user?id=${params.id}`); 
            // manggil useparams yang tadi line 14
            setData(response.data[0]);
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        getDataUser();
    }, []);
    return <Text fontSize='2xl'>Other Profile, Hi my name is {data?.username}</Text>
}

export default OtherProfile;