import { Stack } from "@chakra-ui/react";

const Form = ({ children }) => {
  return (
    <Stack spacing={4} pb={6}>
      {children}
    </Stack>
  );
};

export default Form;
