import { Card, CardBody } from "@chakra-ui/react";
import LoginPage from "./LoginPage";
import useLocalStorage from "../../hooks/useLocalStorage";
import Dashboard from "./Dashboard";
import { ContactsProvider } from "../../contexts/ContactsProvider";
import { ConversationsProvider } from "../../contexts/ConversationsProvider";

const ChatWidget = () => {
  const [id, setId] = useLocalStorage("id");

  const dashboard = (
    <ContactsProvider>
      <ConversationsProvider>
        <Dashboard id={id} />
      </ConversationsProvider>
    </ContactsProvider>
  );

  return (
    <Card height="500px" width="375px">
      <CardBody display="flex" flexDir="column">
        {id ? dashboard : <LoginPage onIdSubmit={setId} />}
      </CardBody>
    </Card>
  );
};

export default ChatWidget;
