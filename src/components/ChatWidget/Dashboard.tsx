import { Flex } from "@chakra-ui/react";
import { useConversations } from "../../contexts/ConversationsProvider";
import Sidebar from "./Sidebar";
import OpenConversations from "./OpenConversation";
import { useEffect, useState } from "react";

type DashboardProps = {
  id: string;
};

const Dashboard = ({ id }: DashboardProps) => {
  const { selectedConversation, isConversationOpen, setIsConversationOpen } =
    useConversations();

  return (
    <Flex h="100%" flexDir="column" position="relative">
      <Sidebar id={id} />
      {isConversationOpen && selectedConversation && (
        <OpenConversations
          closeConversation={() => setIsConversationOpen(false)}
        />
      )}
    </Flex>
  );
};

export default Dashboard;
