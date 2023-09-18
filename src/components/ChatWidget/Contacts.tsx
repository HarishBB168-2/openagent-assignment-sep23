import { List, ListItem } from "@chakra-ui/react";
import { useContacts } from "../../contexts/ContactsProvider";

const Contacts = () => {
  const { contacts } = useContacts();

  return (
    <List spacing={3}>
      {contacts.map((contact) => (
        <ListItem
          key={contact.id}
          textAlign="left"
          borderBottom="1px"
          borderColor="gray.200"
        >
          {contact.name}
        </ListItem>
      ))}
    </List>
  );
};

export default Contacts;
