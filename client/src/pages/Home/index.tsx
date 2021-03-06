import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoEnterOutline } from 'react-icons/io5';
import { SiGoogleclassroom } from 'react-icons/si';
import { useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Video from '../../images/video.svg';

interface Props {}
interface Inputs {
  roomId: string;
}
const Home: React.FC<Props> = () => {
  const history = useHistory();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    const roomId = localStorage.getItem('roomId');
    if (roomId) {
      history.push(`/guest-waiting/${roomId}`);
    }
  }, []);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    history.push(`/guest-waiting/${data.roomId}`);
  };

  return (
    <Box h="100vh" w="100vw">
      <Grid gridTemplateColumns="repeat(12,1fr)" className="container">
        <Navbar />
        <Box
          gridColumn={{ base: 'span 12', lg: 'span 6' }}
          paddingBottom="4rem"
        >
          <Heading
            color="gray.900"
            fontSize={{ base: '2xl', md: '3xl', lg: '4xl', '2xl': '5xl' }}
          >
            Real time communation powered by WebRTC peer to peer connection.{' '}
          </Heading>
          <Text
            mt="2rem"
            fontSize={{ base: '14px', lg: '1rem', '2xl': '1.2rem' }}
          >
            Real-time meetings by Video Conf. Using your browser, share your
            video, desktop, and presentations with teammates and customers.
            Working remotely with ease.
          </Text>
          <Flex
            flexWrap="nowrap"
            alignItems="center"
            mt="4rem"
            as="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputGroup w="20rem" mr="1rem">
              <InputLeftElement
                pointerEvents="none"
                children={<SiGoogleclassroom color="gray" />}
              />
              <Input
                variant="filled"
                placeholder="Enter room ID"
                {...register('roomId', { required: true })}
              />
            </InputGroup>

            <Button leftIcon={<IoEnterOutline />} type="submit">
              Join room
            </Button>
          </Flex>
          {errors.roomId && (
            <Text mt="5px" color="red.500">
              Please enter room ID
            </Text>
          )}
          <Text
            fontSize={{ lg: '2xl', '2xl': '3xl' }}
            my={{ base: '1rem', xl: '2rem' }}
            fontWeight="semibold"
          >
            OR
          </Text>
          <Button
            bg="primary"
            color="#fff"
            leftIcon={<AiOutlinePlus style={{ color: '#f3f3f3' }} />}
            onClick={() => history.push('/host-waiting')}
          >
            {' '}
            Create room
          </Button>
        </Box>

        <Box
          gridColumn={{ lg: 'span 6' }}
          display={{ base: 'none', lg: 'block' }}
        >
          <Image src={Video} />
        </Box>
      </Grid>
    </Box>
  );
};
export default Home;
