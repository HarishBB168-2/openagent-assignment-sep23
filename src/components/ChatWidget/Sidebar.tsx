import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import Conversations from "./Conversations";
import Contacts from "./Contacts";

type SidebarProps = {
  id: string;
};

const CONVERSATIONS_TAB_INDEX = 0;
const CONTACTS_TAB_INDEX = 1;

const Sidebar = ({ id }: SidebarProps) => {
  const [activeTabIndex, setActiveTabIndex] = useState(CONVERSATIONS_TAB_INDEX);

  return (
    <Tabs
      isFitted
      height="100%"
      index={activeTabIndex}
      onChange={setActiveTabIndex}
      align="center"
      variant="enclosed"
      pos="relative"
    >
      <TabList>
        <Tab>Conversations</Tab>
        <Tab>Contacts</Tab>
      </TabList>
      <TabPanels borderRight="1px solid lightgray" overflow="auto">
        <TabPanel>
          <Conversations />
        </TabPanel>
        <TabPanel>
          <Contacts />
        </TabPanel>
      </TabPanels>
      <Flex
        p="2"
        pos="absolute"
        whiteSpace="nowrap"
        flexWrap="wrap"
        bottom="0"
        border="1px solid lightgray"
        fontSize="0.8em"
        w="100%"
      >
        Your Id:&nbsp;&nbsp;
        <Text color="gray">{id}</Text>
      </Flex>
    </Tabs>
  );
};

export default Sidebar;
