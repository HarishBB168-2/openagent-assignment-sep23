import { Card, CardBody } from "@chakra-ui/react";
import LoginPage from "./LoginPage";
import useLocalStorage from "../../hooks/useLocalStorage";
import Dashboard from "./Dashboard";
import { ContactsProvider } from "../../contexts/ContactsProvider";
import { ConversationsProvider } from "../../contexts/ConversationsProvider";
import { SocketProvider } from "../../contexts/SocketProvider";

const ChatWidget = () => {
  const [id, setId] = useLocalStorage("id");

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
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
