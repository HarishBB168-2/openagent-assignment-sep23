import React, { useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts, Contact } from "./ContactsProvider";

type Conversation = {
  recipients: string[] | Contact[];
  messages: string[];
  selected?: boolean;
};

type ContextProps = {
  conversations: Conversation[];
  selectedConversation?: Conversation;
  selectConversationIndex: (index: number) => void;
  createConversation: (recipients: string[]) => void;
};

type ConversationsProviderProps = {
  children: React.ReactNode;
};

const ConversationsContext = React.createContext<ContextProps>({
  conversations: [],
  selectConversationIndex: () => null,
  createConversation: () => null,
});

export const useConversations = () => {
  return useContext(ConversationsContext);
};

export const ConversationsProvider = ({
  children,
}: ConversationsProviderProps) => {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const { contacts } = useContacts();

  const createConversation = (recipients: string[]) => {
    setConversations((prevConversations: Conversation[]) => {
      return [...prevConversations, { recipients, messages: [] }];
    });
  };

  const formattedConversations = conversations.map(
    (conversation: Conversation, index: number) => {
      const recipients = conversation.recipients.map((recipient) => {
        const contact = contacts.find((contact) => {
          return contact.id === recipient;
        });
        const name = (contact && contact.name) || recipient;
        return { id: recipient, name };
      });

      const selected = index === selectedConversationIndex;
      return { ...conversation, recipients, selected };
    }
  );

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    selectConversationIndex: setSelectedConversationIndex,
    createConversation,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
};
