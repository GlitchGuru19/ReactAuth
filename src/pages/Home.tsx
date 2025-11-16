import { useEffect } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../api";

/**
 * Home page - protected route
 * Displays user name fetched from backend
 */
const Home = () => {
  const navigate = useNavigate();

  // Fetch user using TanQuery
  const { data: user, error } = useQuery(["user"], fetchUser, {
    retry: false,
  });

  // Redirect to login if unauthenticated
  useEffect(() => {
    if (error) navigate("/login");
  }, [error, navigate]);

  return (
    <Box textAlign="center" mt={10}>
      <Heading>
        Welcome, {user?.name ? user.name : "User"}!
      </Heading>
      <Text mt={4}>This is your protected home page.</Text>
    </Box>
  );
};

export default Home;
