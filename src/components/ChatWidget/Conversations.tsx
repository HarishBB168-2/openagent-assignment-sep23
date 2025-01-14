import { List, ListItem } from "@chakra-ui/react";
import { useConversations } from "../../contexts/ConversationsProvider";

const Conversations = () => {
  const { conversations, selectConversationIndex, setIsConversationOpen } =
    useConversations();

  const handleItemClick = (index: number) => {
    selectConversationIndex(index);
    setIsConversationOpen(true);
  };

  return (
    <List overflow="auto" height="100%">
      {conversations.map((conversation, idx) => (
        <ListItem
          p="3"
          key={idx}
          textAlign="left"
          borderBottom="1px"
          borderColor="gray.200"
          cursor="pointer"
          backgroundColor={conversation.selected ? "whatsapp.500" : "initial"}
          color={conversation.selected ? "white" : "initial"}
          onClick={() => handleItemClick(idx)}
        >
          {conversation.recipients.map((r) =>
            typeof r === "string" ? r : r.name
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default Conversations;
