import {
  Box,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { format } from "date-fns";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CgClose } from "react-icons/cg";
import { FiSend } from "react-icons/fi";
import Avatar, { genConfig } from "react-nice-avatar";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setToggleShowChat } from "../../../features/message/messageSlice";
import { messaging } from "../../../utils/webSocket";

interface Props {}

interface FormValue {
  message: string;
}

const RightContent: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const [index, setIndex] = useState(0);
  const { register, handleSubmit, reset } = useForm<FormValue>();

  const { mySocketId } = useAppSelector((state) => state.stream);
  const { isShowedChat } = useAppSelector((state) => state.message);
  const { messages } = useAppSelector((state) => state.message);
  const config = genConfig();

  const onSubmit: SubmitHandler<FormValue> = (data) => {
    messaging(data.message);
    reset();
  };

  return (
    <Flex
      w="20vw"
      flexDirection="column"
      boxShadow="0 4px 16px rgb(209 209 226 / 10%)"
      bg="#1a1d28"
      h="calc(100% - 40px)"
      borderRadius="10px"
      transition="350ms all"
      position="absolute"
      right={isShowedChat ? "20px" : "-100%"}
    >
      <Flex
        p="1rem 2rem"
        justify="space-between"
        alignItems="center"
        bg="primary"
        borderTopLeftRadius="10px"
        borderTopRightRadius="10px"
      >
        <Flex>
          <Text
            fontWeight="semibold"
            p="10px 15px"
            bg={index === 0 ? "#c2d6ef" : "transparent"}
            color={index === 0 ? "#344880" : "gray.200"}
            borderRadius="10px"
            cursor="pointer"
            onClick={() => setIndex(0)}
          >
            Messages
          </Text>
          <Text
            fontWeight="semibold"
            p="10px 15px"
            bg={index === 1 ? "#c2d6ef" : "transparent"}
            color={index === 1 ? "#344880" : "gray.200"}
            borderRadius="10px"
            cursor="pointer"
            onClick={() => setIndex(1)}
          >
            Participants
          </Text>
        </Flex>
        <Icon
          as={CgClose}
          fontSize="1.5rem"
          cursor="pointer"
          color="gray.300"
          onClick={() => dispatch(setToggleShowChat())}
        />
      </Flex>
      <Box p="2rem">
        {messages.map(({ from, socketId, content, timestamp }) => (
          <Flex
            alignItems={socketId === mySocketId ? "flex-end" : "flex-start"}
            mb="15px"
          >
            {socketId !== mySocketId && (
              <Avatar
                style={{ width: "2rem", height: "2rem", marginRight: "1rem" }}
                {...config}
              />
            )}
            <Box marginLeft={socketId === mySocketId ? "auto" : "0"}>
              <Text mb="5px" color="gray.300">
                {socketId !== mySocketId
                  ? `${from}, ${format(new Date(timestamp), "hh:mm")}`
                  : "You, " + format(new Date(timestamp), "hh:mm")}
              </Text>

              <Box p="8px 30px" bg="#e7eff8" borderRadius="10px">
                {content}
              </Box>
            </Box>
          </Flex>
        ))}
      </Box>
      <Box p="2rem" marginTop="auto">
        <Flex as="form" onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <Input
              border="2px solid #75777d"
              placeholder="Write a message"
              mr="5px"
              {...register("message", { required: true })}
              color="#fff"
            />
            <InputRightElement
              children={<FiSend color="rgb(146, 158, 150)" />}
            />
          </InputGroup>
        </Flex>
      </Box>
    </Flex>
  );
};

export default RightContent;
