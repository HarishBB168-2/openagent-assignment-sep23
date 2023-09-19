import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts, Contact } from "./ContactsProvider";
import { useSocket } from "./SocketProvider";

type Message = {
  sender: string;
  text: string;
};

type FormattedMessage = {
  sender: string;
  senderName: string;
  text: string;
  fromMe: boolean;
};

type Conversation = {
  recipients: string[] | Contact[];
  messages: Message[];
  selected?: boolean;
};

type FormattedConversation = {
  recipients: string[] | Contact[];
  messages: FormattedMessage[];
  selected?: boolean;
};

type ContextProps = {
  conversations: FormattedConversation[];
  selectedConversation?: FormattedConversation;
  sendMessage?: (recipients: string[], text: string) => void;
  selectConversationIndex: (index: number) => void;
  createConversation: (recipients: string[]) => void;
  isConversationOpen: boolean;
  setIsConversationOpen: Dispatch<SetStateAction<boolean>>;
};

type ConversationsProviderProps = {
  id: string;
  children: React.ReactNode;
};

const ConversationsContext = React.createContext<ContextProps>({
  conversations: [],
  selectConversationIndex: () => null,
  createConversation: () => null,
  isConversationOpen: false,
  setIsConversationOpen: () => null,
});

export const useConversations = () => {
  return useContext(ConversationsContext);
};

export const ConversationsProvider = ({
  id,
  children,
}: ConversationsProviderProps) => {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const [isConversationOpen, setIsConversationOpen] = useState(false);
  const { contacts } = useContacts();
  const socket = useSocket();

  useEffect(() => {
    setIsConversationOpen(true);
  }, [selectedConversationIndex]);

  const createConversation = (recipients: string[]) => {
    setConversations((prevConversations: Conversation[]) => {
      return [...prevConversations, { recipients, messages: [] }];
    });
  };

  const addMessageToConversation = useCallback(
    ({
      recipients,
      text,
      sender,
    }: {
      recipients: any[];
      text: string;
      sender: string;
    }) => {
      setConversations((prevConversations: Conversation[]) => {
        let madeChange = false;
        const newMessage = { sender, text };

        const newConversations = prevConversations.map((conversation) => {
          if (arrayEquality(conversation.recipients, recipients)) {
            madeChange = true;
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }
          return conversation;
        });

        if (madeChange) {
          return newConversations;
        } else {
          return [...prevConversations, { recipients, messages: [newMessage] }];
        }
      });
    },
    [setConversations]
  );

  useEffect(() => {
    if (!socket) return;

    socket.on("receive-message", addMessageToConversation);

    return () => {
      socket.off("receive-message");
    };
  }, [socket, addMessageToConversation]);

  const sendMessage = (recipients: any[], text: string) => {
    socket?.emit("send-message", { recipients, text });
    addMessageToConversation({ recipients, text, sender: id });
  };

  const formattedConversations: FormattedConversation[] = conversations.map(
    (conversation: Conversation, index: number) => {
      const recipients = conversation.recipients.map((recipient) => {
        const contact = contacts.find((contact) => {
          return contact.id === recipient;
        });
        const name = (contact && contact.name) || recipient;
        return { id: recipient, name };
      });

      const messages = conversation.messages.map((message) => {
        const contact = contacts.find((contact) => {
          return contact.id === message.sender;
        });
        const name = (contact && contact.name) || message.sender;
        const fromMe = id === message.sender;
        return { ...message, senderName: name, fromMe };
      });

      const selected = index === selectedConversationIndex;
      return { ...conversation, messages, recipients, selected };
    }
  );

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage,
    selectConversationIndex: setSelectedConversationIndex,
    createConversation,
    isConversationOpen,
    setIsConversationOpen,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
};

function arrayEquality(a: any[], b: any[]) {
  if (a.length !== b.length) return false;
  a.sort();
  b.sort();

  return a.every((element, index) => {
    return element === b[index];
  });
}
