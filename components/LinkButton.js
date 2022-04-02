import Link from "next/link";

import { Button } from "@chakra-ui/react";

const LinkButton = ({ children, href, icon, colorScheme }) => {
  return (
    <Link href={href} passHref>
      <Button colorScheme={colorScheme} rightIcon={icon}>
        {children}
      </Button>
    </Link>
  );
};

export default LinkButton;
