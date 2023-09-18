import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import React, { ReactEventHandler, useRef } from "react";
import { useContacts } from "../../contexts/ContactsProvider";

type NewContactModalProps = {
  onClose: () => void;
};

const NewContactModal = ({ onClose }: NewContactModalProps) => {
  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const { createContact } = useContacts();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (idRef.current?.value && nameRef.current?.value) {
      createContact(idRef.current.value, nameRef.current.value);
      onClose();
    }
  };

  return (
    <ModalContent>
      <ModalHeader>Create Contact</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <Flex gap="10px" flexDir="column">
            <FormControl>
              <FormLabel>Id</FormLabel>
              <Input type="text" ref={idRef} required />
              <FormLabel>Name</FormLabel>
              <Input type="text" ref={nameRef} required />
            </FormControl>
            <Button w="fit-content" type="submit" colorScheme="whatsapp">
              Create
            </Button>
          </Flex>
        </form>
      </ModalBody>
    </ModalContent>
  );
};

export default NewContactModal;
