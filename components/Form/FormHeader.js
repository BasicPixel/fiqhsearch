import { Divider, Heading, Text } from "@chakra-ui/react";

import useLocalStorage from "hooks/useLocalStorage";
import { MADHHABS } from "src/constants";

const FormHeader = ({ title, description }) => {
  const [madhhab] = useLocalStorage("madhhab", "hanbali");

  return (
    <>
      <Heading>{title}</Heading>
      <Text>{description}</Text>
      <Text>
        المذهب الحالي: <b>{MADHHABS[madhhab]}</b>
      </Text>
      <Divider />
    </>
  );
};

export default FormHeader;
