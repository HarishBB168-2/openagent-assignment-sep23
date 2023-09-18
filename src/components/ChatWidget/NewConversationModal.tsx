import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useContacts } from "../../contexts/ContactsProvider";
import { useConversations } from "../../contexts/ConversationsProvider";

type NewConversationModalProps = {
  onClose: () => void;
};

const NewConversationModal = ({ onClose }: NewConversationModalProps) => {
  const { contacts } = useContacts();
  const { createConversation } = useConversations();

  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createConversation(selectedContactIds);
    onClose();
  };

  const handleCheckboxChange = (contactId: string) => {
    setSelectedContactIds((prevSelectedContactIds) => {
      if (prevSelectedContactIds.includes(contactId))
        return prevSelectedContactIds.filter((prevId) => contactId !== prevId);
      else {
        return [...prevSelectedContactIds, contactId];
      }
    });
  };

  return (
    <ModalContent>
      <ModalHeader>Create Conversation</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <Flex gap="10px" flexDir="column">
            {contacts.map((contact) => (
              <FormControl key={contact.id}>
                <Checkbox
                  colorScheme="green"
                  isChecked={selectedContactIds.includes(contact.id)}
                  onChange={() => handleCheckboxChange(contact.id)}
                >
                  {contact.name}
                </Checkbox>
              </FormControl>
            ))}

            <Button w="fit-content" type="submit" colorScheme="whatsapp">
              Create
            </Button>
          </Flex>
        </form>
      </ModalBody>
    </ModalContent>
  );
};

export default NewConversationModal;
