import { Card, CardBody } from "@chakra-ui/react";
import LoginPage from "./LoginPage";
import useLocalStorage from "../../hooks/useLocalStorage";
import Dashboard from "./Dashboard";

const ChatWidget = () => {
  const [id, setId] = useLocalStorage("id");

  return (
    <Card height="500px" width="375px">
      <CardBody display="flex" flexDir="column">
        {id ? <Dashboard id={id} /> : <LoginPage onIdSubmit={setId} />}
      </CardBody>
    </Card>
  );
};

export default ChatWidget;
