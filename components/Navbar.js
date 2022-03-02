import {
  Box,
  Flex,
  Link,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  MenuDivider,
  useColorMode,
  Text,
  MenuOptionGroup,
  MenuItemOption,
  MenuGroup,
} from "@chakra-ui/react";
import useLocalStorage from "../hooks/useLocalStorage";
import { FiGithub, FiMoon, FiSun, FiMenu, FiTwitter } from "react-icons/fi";
import { FaTelegramPlane } from "react-icons/fa";

const MenuLink = ({ href, children, target }) => (
  <Link
    rounded={"md"}
    _hover={{
      textDecoration: "none",
    }}
    href={href}
    target={target}
  >
    <MenuItem>{children}</MenuItem>
  </Link>
);

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [madhhab, setMadhhab] = useLocalStorage("maddhab", "");

  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        position="sticky"
        zIndex="sticky"
        top={0}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Menu>
            <MenuButton as={IconButton} icon={<FiMenu />} />
            <MenuList>
              <MenuOptionGroup
                type="radio"
                title="المذهب الفقهي"
                value={madhhab}
                onChange={(option) => {
                  setMadhhab(option);
                }}
              >
                <MenuItemOption value="hanbali">الحنبلي</MenuItemOption>
                <MenuItemOption value="shafi'i">الشافعي</MenuItemOption>
                <MenuItemOption value="maliki">المالكي</MenuItemOption>
                <MenuItemOption value="hanafi">الحنفي</MenuItemOption>
              </MenuOptionGroup>
              <MenuDivider />
              <MenuGroup title="روابط خارجية">
                <MenuLink
                  href={"https://github.com/BasicPixel/fiqhsearch"}
                  target={"_blank"}
                >
                  <FiGithub /> <Text ps={2}>المشروع على GitHub</Text>
                </MenuLink>
                <MenuLink href={"https://t.me/fiqhsearch"} target={"_blank"}>
                  <FaTelegramPlane />{" "}
                  <Text ps={2}>صفحة المشروع على تلجرام</Text>
                </MenuLink>
                <MenuLink href={"https://t.me/fiqhsearch"} target={"_blank"}>
                  <FiTwitter /> <Text ps={2}>حساب المشروع على تويتر</Text>
                </MenuLink>
              </MenuGroup>
            </MenuList>
          </Menu>
          <Link
            href={"/"}
            _hover={{
              textDecoration: "underline",
              textUnderlineOffset: 4,
            }}
            _focus={{
              outline: "none",
              textDecoration: "underline",
              textUnderlineOffset: 4,
            }}
            fontSize={"xl"}
          >
            الباحث الفقهي 🔎
          </Link>
          <Flex alignItems={"center"}>
            <IconButton
              aria-label="Toggle dark mode"
              icon={colorMode === "dark" ? <FiSun /> : <FiMoon />}
              onClick={toggleColorMode}
            />
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
