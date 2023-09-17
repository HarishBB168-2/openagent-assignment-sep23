import React, { useRef } from "react";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { v4 as uuidV4 } from "uuid";

type LoginPageProps = {
  onIdSubmit: (_: any) => void;
};

const LoginPage = ({ onIdSubmit }: LoginPageProps) => {
  const idRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted");

    onIdSubmit(idRef.current?.value);
  };

  const createNewId = () => {
    onIdSubmit(uuidV4());
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <FormControl display="flex" flexDirection="column" gap="10px">
          <FormLabel>Enter your id</FormLabel>
          <Input type="text" ref={idRef} required />
          <Button type="submit" colorScheme="whatsapp">
            Login
          </Button>
          <Button
            onClick={createNewId}
            colorScheme="whatsapp"
            variant="outline"
          >
            Create A New Id
          </Button>
        </FormControl>
      </form>
    </Container>
  );
};

export default LoginPage;
