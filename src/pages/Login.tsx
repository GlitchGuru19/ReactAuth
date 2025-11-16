import { useState } from "react";
import { Box, Button, Input, VStack, FormLabel } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../api";

/**
 * Login page with TanQuery mutation
 */
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginMutation = useLogin();

  const handleLogin = () => {
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          alert("Login successful!");
          navigate("/");
        },
        onError: () => alert("Login failed"),
      }
    );
  };

  return (
    <Box maxW="md" mx="auto" mt={10}>
      <VStack spacing={4}>
        <FormLabel>Email</FormLabel>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button colorScheme="blue" onClick={handleLogin} isLoading={loginMutation.isLoading}>
          Login
        </Button>
      </VStack>
    </Box>
  );
};

export default Login;
