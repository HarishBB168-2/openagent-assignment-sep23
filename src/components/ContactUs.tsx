import { Button, Flex, Heading, Input, Text, Textarea } from "@chakra-ui/react";

const ContactUs = () => {
  return (
    <Flex w="100%" flexDir="column">
      <Flex
        w="75%"
        mt="20"
        mb="20"
        alignSelf="center"
        flexDir="column"
        gap="5"
        p="5"
        rounded="20"
        background="white"
      >
        <Heading>Get In Touch</Heading>
        <Text>How can we help you?</Text>
        <Input placeholder="Enter you name" rounded="0" />
        <Input placeholder="Enter you email address" rounded="0" />
        <Textarea placeholder="Go ahead, we are listening..." rounded="0" />
        <Button colorScheme="blue">Submit</Button>
      </Flex>
    </Flex>
  );
};

export default ContactUs;
