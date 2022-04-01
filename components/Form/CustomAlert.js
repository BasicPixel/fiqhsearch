import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Spinner,
} from "@chakra-ui/react";

const CustomAlert = ({ status, title, description = "" }) => {
  return (
    <Alert status={status}>
      {status === "warning" ? <Spinner /> : <AlertIcon />}
      <AlertTitle mr={2}>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default CustomAlert;
