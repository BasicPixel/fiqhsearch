import { Box } from "@chakra-ui/react";

const Card = ({ children }) => {
  return (
    <Box
      padding={8}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <h1>{children}</h1>
    </Box>
  );
};

export default Card;
