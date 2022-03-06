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
import {
  FiGithub,
  FiMoon,
  FiSun,
  FiMenu,
  FiTwitter,
  FiSettings,
} from "react-icons/fi";
import { FaTelegramPlane } from "react-icons/fa";

import MenuLink from "./MenuLink";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import app from "../src/client";
import { MADHHABS } from "../src/constants";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [madhhab, setMadhhab] = useLocalStorage("madhhab", null);
  const [user] = useAuthState(getAuth(app));

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
              <MenuItem>{madhhab}</MenuItem>

              <MenuDivider />

              <MenuOptionGroup
                type="radio"
                title="المذهب الفقهي"
                // defaultValue={madhhab}
                value={madhhab ? madhhab : ""}
                onChange={(option) => {
                  setMadhhab(option);
                }}
              >
                {Object.entries(MADHHABS).map((madhhab) => (
                  <MenuItemOption value={madhhab[0]} key={madhhab[0]}>
                    {madhhab[1]}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
              <MenuDivider />
              <MenuGroup title="روابط خارجية">
                <MenuLink
                  href={"https://github.com/fiqhsearch"}
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
              {user && (
                <>
                  <MenuDivider />
                  <MenuLink href={"/admin"} onClick={toggleColorMode}>
                    <FiSettings /> <Text ps={2}>واجهة المسؤولين</Text>
                  </MenuLink>
                </>
              )}
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
