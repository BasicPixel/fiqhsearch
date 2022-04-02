import {
  Accordion,
  AccordionItem,
  Flex,
  Heading,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import Card from "components/Card";

const LoadingSkeleton = ({ variant = "card" }) => {
  if (variant === "card") {
    return (
      <Skeleton>
        <Flex py={4} gap={4} flexWrap="wrap">
          <Card />
          <Card />
          <Card />
        </Flex>
      </Skeleton>
    );
  }
  return (
    <Skeleton>
      <Accordion>
        <AccordionItem>Lorem, ipsum.</AccordionItem>
        <AccordionItem>Lorem, ipsum.</AccordionItem>
        <AccordionItem>Lorem, ipsum.</AccordionItem>
      </Accordion>
    </Skeleton>
  );
};

export default LoadingSkeleton;
