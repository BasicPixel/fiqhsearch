import { useRef, useEffect } from "react";

import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  const innerRef = useRef();

  useEffect(() => {
    innerRef.current && innerRef.current.focus();
  }, []);

  return (
    <FormControl>
      <InputGroup size={"lg"} width={"full"}>
        <InputLeftElement>
          <FiSearch />
        </InputLeftElement>
        <Input
          name="q"
          ref={innerRef}
          placeholder="اختر كلمات مفتاحية، ولا تكثر..."
          variant={"filled"}
          isRequired
        />
      </InputGroup>
    </FormControl>
  );
};

export default SearchBar;
