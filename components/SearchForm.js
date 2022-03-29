import {
  SimpleGrid,
  GridItem,
  Button,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import SearchBar from "./SearchBar";

import { FiSearch, FiBookOpen } from "react-icons/fi";
import Link from "next/link";

const SearchForm = ({ madhhab }) => {
  return (
    <form action={`/search`}>
      <SimpleGrid gap={2} columns={2} width="full">
        <GridItem colSpan={2}>
          <SearchBar />
        </GridItem>
        <Button rightIcon={<FiSearch />} colorScheme="teal" type="submit">
          البحث
        </Button>
        <Link href={`/browse/${madhhab}`} passHref>
          <Button colorScheme="blue" rightIcon={<FiBookOpen />}>
            تصفح جميع المسائل
          </Button>
        </Link>
      </SimpleGrid>

      <input type="hidden" name="madhhab" value={madhhab} />
    </form>
  );
};

export default SearchForm;
