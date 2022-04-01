import Link from "next/link";

import {
  SimpleGrid,
  GridItem,
  Button,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { FiSearch, FiBookOpen } from "react-icons/fi";

import SearchBar from "components/SearchBar";
import useLocalStorage from "hooks/useLocalStorage";

const SearchForm = () => {
  const [madhhab] = useLocalStorage("madhhab", "hanbali");

  return (
    <form action={`/search`}>
      <SimpleGrid gap={2} columns={2} width="full">
        <GridItem colSpan={2}>
          <SearchBar />
        </GridItem>
        <Button rightIcon={<FiSearch />} colorScheme="teal" type="submit">
          البحث
        </Button>
        <Link href={`/browse/${madhhab ? madhhab : ""}`} passHref>
          <Button colorScheme="blue" rightIcon={<FiBookOpen />}>
            تصفح جميع المسائل
          </Button>
        </Link>
      </SimpleGrid>

      <input type="hidden" name="madhhab" value={madhhab} />

      <RadioGroup name="searchIn" defaultValue={"question"} mt={2}>
        <Stack direction="row" spacing={4}>
          <Radio value="question">الأسئلة</Radio>
          <Radio value="answer">الأجوبة</Radio>
          <Radio value="proof">الأدلة</Radio>
        </Stack>
      </RadioGroup>
    </form>
  );
};

export default SearchForm;
