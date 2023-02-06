import React from 'react';

import { FormControl, FormLabel, Input } from '@chakra-ui/react';

const FormInputLabel = (props) => {

    return <FormControl my='6'>
        <FormLabel>{props.name}</FormLabel>
        <Input {...props} />
    </FormControl>
}

export default FormInputLabel;