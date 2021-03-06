import { Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
// import flash from "../images/flash.svg";
import flash from '../images/flash-2.svg';

const Logo = () => {
  const history = useHistory();

  return (
    <Flex
      alignItems="center"
      cursor="pointer"
      onClick={() => history.push('/')}
    >
      <Image src={flash} boxSize="3rem" />
      <Text fontWeight="semibold" fontSize="1.5rem">
        TalkNow
      </Text>
    </Flex>
  );
};

export default Logo;
