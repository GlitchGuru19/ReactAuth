import { useState } from "react";
import { Box, Button, Input, VStack, FormLabel } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../api";

/**
 * Signup page with TanQuery mutation
 */
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signupMutation = useSignup();

  const handleSignup = () => {
    signupMutation.mutate(
      { name, email, password },
      {
        onSuccess: () => {
          alert("Signup successful!");
          navigate("/login");
        },
        onError: () => alert("Signup failed"),
      }
    );
  };

  return (
    <Box maxW="md" mx="auto" mt={10}>
      <VStack spacing={4}>
        <FormLabel>Name</FormLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
        <FormLabel>Email</FormLabel>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button colorScheme="blue" onClick={handleSignup} isLoading={signupMutation.isLoading}>
          Sign Up
        </Button>
      </VStack>
    </Box>
  );
};

export default Signup;
