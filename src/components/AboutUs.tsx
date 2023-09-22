import { Flex, Heading, Text } from "@chakra-ui/react";

const AboutUs = () => {
  return (
    <Flex flexDir="column" m="3" gap="3">
      <Heading as="h1" id="about-our-real-time-dashboard">
        About Our Real-Time Dashboard
      </Heading>
      <Text>
        Welcome to our real-time dashboard project! We&#39;re excited to share
        our vision and introduce the dedicated team behind this initiative.
      </Text>
      <Heading as="h2" size="lg" id="our-mission">
        Our Mission
      </Heading>
      <Text>
        Our mission is to empower users with real-time data insights in an
        accessible and user-friendly manner. We believe in making complex
        information simple and enabling users to make informed decisions
        effortlessly.
      </Text>
      <Heading as="h2" size="lg" id="meet-the-team">
        Meet the Team
      </Heading>
      <Heading as="h3" size="md" id="jane-smith-full-stack-developer">
        Harish Singh - Full Stack Developer
      </Heading>
      <Text>
        <img
          src="https://drive.google.com/uc?export=download&id=1__itfpxMzly4aJsdtW9ACI7YT2Br3CQl"
          alt="Harish Singh"
          width="100px"
          height="100px"
        />
        Harish brings his expertise in full-stack development to the team. With
        skills in React JS, Python, Django, SQL, Node.js, Express, MongoDB
      </Text>

      <Heading as="h2" size="lg" id="our-technology-stack">
        Our Technology Stack
      </Heading>
      <Text>
        Our dashboard is built using modern technologies like React, Redux for
        state management, and WebSockets for real-time updates. We&#39;re
        committed to using open-source tools and contributing back to the
        community.
      </Text>

      <Heading as="h2" size="lg" id="benefits-for-users">
        Benefits for Users
      </Heading>
      <ul>
        <li>
          <strong>Real-Time Data:</strong> Get up-to-the-minute insights into
          weather, stock prices, news, and more.
        </li>
        <li>
          <strong>Customization:</strong> Personalize your dashboard with the
          widgets that matter to you.
        </li>
        <li>
          <strong>User-Friendly:</strong> Our user-friendly design ensures that
          you can use the dashboard without a steep learning curve.
        </li>
      </ul>
      <Heading as="h2" size="lg" id="contact-us">
        Contact Us
      </Heading>
      <Text>
        Have questions, suggestions, or just want to say hello? Feel free to
        reach out to us at contact page.
      </Text>
      <Heading as="h2" size="lg" id="future-plans">
        Future Plans
      </Heading>
      <Text>
        We have an exciting roadmap ahead! Expect more widgets, improved
        performance, and enhanced customization options in future updates.
      </Text>
    </Flex>
  );
};

export default AboutUs;
