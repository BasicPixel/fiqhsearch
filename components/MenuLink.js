import { MenuItem } from "@chakra-ui/react";
import Link from "next/link";

const MenuLink = ({ href, children, target }) => (
  <Link
    rounded={"md"}
    _hover={{
      textDecoration: "none",
    }}
    href={href}
    passHref
  >
    <a target={target}>
      <MenuItem>{children}</MenuItem>
    </a>
  </Link>
);

export default MenuLink;
