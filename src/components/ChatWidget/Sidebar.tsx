import {
  Button,
  Flex,
  Modal,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import Conversations from "./Conversations";
import Contacts from "./Contacts";
import NewContactModal from "./NewContactModal";
import NewConversationModal from "./NewConversationModal";

type SidebarProps = {
  id: string;
};

const CONVERSATIONS_TAB_INDEX = 0;
const CONTACTS_TAB_INDEX = 1;

const Sidebar = ({ id }: SidebarProps) => {
  const [activeTabIndex, setActiveTabIndex] = useState(CONVERSATIONS_TAB_INDEX);
  const conversationsOpen = activeTabIndex === CONVERSATIONS_TAB_INDEX;

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      w="100%"
      h="100%"
      maxH="100%"
      flexDir="column"
      justifyContent="space-between"
    >
      <Tabs
        h="0"
        isFitted
        index={activeTabIndex}
        onChange={setActiveTabIndex}
        align="center"
        variant="enclosed"
        flexGrow="1"
      >
        <TabList>
          <Tab>Conversations</Tab>
          <Tab>Contacts</Tab>
        </TabList>
        <TabPanels h="90%" borderRight="1px solid lightgray" overflow="auto">
          <TabPanel>
            <Conversations />
          </TabPanel>
          <TabPanel>
            <Contacts />
          </TabPanel>
        </TabPanels>

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          {conversationsOpen ? (
            <NewConversationModal onClose={onClose} />
          ) : (
            <NewContactModal onClose={onClose} />
          )}
        </Modal>
      </Tabs>
      <Flex border="1px solid lightgray" w="100%" flexDir="column">
        <Flex p="2" whiteSpace="nowrap" flexWrap="wrap" fontSize="0.8em">
          Your Id:&nbsp;&nbsp;
          <Text color="gray">{id}</Text>
        </Flex>
        <Button onClick={onOpen} colorScheme="whatsapp" borderRadius="0">
          New {conversationsOpen ? "Conversation" : "Contact"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
