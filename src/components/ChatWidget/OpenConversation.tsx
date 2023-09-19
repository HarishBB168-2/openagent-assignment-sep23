import {
  Box,
  Button,
  CloseButton,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useConversations } from "../../contexts/ConversationsProvider";

type OpenConversationProps = {
  closeConversation: () => void;
};

const OpenConversations = ({ closeConversation }: OpenConversationProps) => {
  const [text, setText] = useState("");
  const setRef = useCallback((node: HTMLDivElement) => {
    if (node) node.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, []);
  const { sendMessage, selectedConversation } = useConversations();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedConversation && sendMessage) {
      sendMessage(
        selectedConversation.recipients.map((r) =>
          typeof r === "string" ? r : r.id
        ),
        text
      );
      setText("");
    }
  };

  return (
    <Flex
      position="absolute"
      w="100%"
      h="100%"
      backgroundColor="white"
      flexDir="column"
    >
      <Flex justifyContent="space-between" alignItems="center">
        Conversations
        <CloseButton onClick={closeConversation} />
      </Flex>
      <Flex
        w="100%"
        h="0"
        flexGrow="1"
        flexDir="column"
        justifyContent="space-between"
      >
        <Flex overflow="auto" flexDir="column" alignItems="start" px="3">
          {selectedConversation?.messages.map((message, index: number) => {
            const lastMessage =
              selectedConversation.messages.length - 1 === index;
            return (
              <Flex
                key={index}
                my="1"
                flexDir="column"
                alignSelf={message.fromMe ? "end" : "initial"}
                ref={lastMessage ? setRef : null}
              >
                <Box
                  rounded="md"
                  px="2"
                  py="1"
                  color={message.fromMe ? "white" : "initial"}
                  bg={message.fromMe ? "whatsapp.500" : "initial"}
                  border={message.fromMe ? "initial" : "1px solid lightgray"}
                  w="fit-content"
                >
                  {message.text}
                </Box>
                <Box textAlign={message.fromMe ? "right" : "initial"}>
                  {message.fromMe ? "You" : message.senderName}
                </Box>
              </Flex>
            );
          })}
        </Flex>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <InputGroup>
              <Input
                type="text"
                required
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <InputRightElement w="4.5rem">
                <Button type="submit" size="sm" colorScheme="whatsapp">
                  Send
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </form>
      </Flex>
    </Flex>
  );
};

export default OpenConversations;
