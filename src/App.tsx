import { Box, useColorModeValue } from "@chakra-ui/react";
import SidebarWithHeader from "./components/SideBarWithHeader";
import TickerWidget from "./components/TickerWidget";

const data = {
  stockTicker: "AAPL",
  companyName: "Apple Inc Some long name",
  price: 127.55,
  currency: "₹",
  change: 0.55,
  percentChange: 0.01,
  imageUrl:
    "data:image/x-icon;base64,AAABAAEAEBAAAAEACABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAABfX18AaGhoAPv7+wBxcXEApaWlAOvr6wBhYWEAycnJAGpqagD9/f0Ac3NzAGNjYwBsbGwA////ANTU1AB1dXUAqampAGVlZQDNzc0Abm5uAHd3dwBVVVUAXl5eAGdnZwCbm5sAcHBwAK2trQC2trYAYGBgAGlpaQD8/PwAcnJyAEdHRwCEhIQAYmJiAGtrawD+/v4AdHR0ALGxsQCGhoYAurq6AO7u7gBkZGQAw8PDAG1tbQBUVFQAXV1dAMXFxQBmZmYAmpqaANfX1wCsrKwAioqKAOnp6QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQ0NDQ0NDQ0NDQ0NDQ0NJA0NDQ0NDQkNDQ0NDQ0NDQ0NDQ0NDRInLzIxIQIkDQ0NDQ0NDQ4AHCIuBgYAHg0NDQ0NDQIVKiIqIiIiHDQkDQ0kDQ0rIgsRMDAXETAWJA0NDQ0NDxcBAR0IHQgdDQ0NCQ0JDRQwLCMjLBMsMw0NDQ0NCQ0KHQMKLBkfLBANDQ0NDQ0NBAAKJQoPJR8fDQ0NDQ0NDQkgLjAwFzAMCBoNDQ0NDQ0NJAcoDRsYGjUNJA0NDQ0NDQ0NDQ0tCg0kDQ0NDQ0NDQ0NDQ0NKREmDQ0NDQ0NDQ0NDQ0NDQ0NBQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
};

const App = () => {
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarWithHeader />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <div>Some more content</div>
        <TickerWidget {...data} />
      </Box>
    </Box>
  );
};

export default App;
