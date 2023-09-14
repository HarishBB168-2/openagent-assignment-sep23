import { Box, useColorModeValue } from "@chakra-ui/react";
import SidebarWithHeader from "./components/SideBarWithHeader";
import TickerWidget from "./components/TickerWidget";

const App = () => {
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarWithHeader />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <div>Some more content</div>
        <TickerWidget />
      </Box>
    </Box>
  );
};

export default App;
