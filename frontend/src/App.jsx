import {
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const { toast } = useToast();

  const handleCheckNews = async () => {
    setIsLoading(true);
    setIsInvalid(false);

    try {
      const response = await fetch("http://localhost:8000/detect/", {
        body: JSON.stringify({
          news: input,
        }),
        method: "POST",
      });
      const jsonResponse = await response.json();

      setIsInvalid(jsonResponse.is_fake);
      setShowOutput(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      gap={10}
      maxW={"1920px"}
      margin={"auto"}
    >
      <Flex flexDirection={"column"} gap={2}>
        <Heading>Welcome to fake news detector</Heading>
        <Text>
          Get started by simply pasting the new content below which you would
          like to check for
        </Text>
      </Flex>
      <Flex minW={"800px"} flexDirection={"column"} gap={2}>
        <Textarea
          rows={20}
          placeholder="Input your content here"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />

        {isLoading ? (
          <Text> Loading...</Text>
        ) : showOutput ? (
          isInvalid ? (
            <Text color={"red"}>The news is invalid ❌</Text>
          ) : (
            <Text color={"green"}>The news is valid ✅</Text>
          )
        ) : null}
      </Flex>
      <ButtonGroup>
        <Button colorScheme="blue" width={"120px"} onClick={handleCheckNews}>
          Validate
        </Button>

        <Button
          colorScheme="teal"
          width={"100px"}
          onClick={() => {
            setInput("");
            setIsInvalid("");
            setIsLoading(false);
            setShowOutput(false);
          }}
        >
          Reset
        </Button>
      </ButtonGroup>
    </Flex>
  );
}

export default App;
