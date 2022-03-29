import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";

const SearchBar = () => {
  const innerRef = useRef();

  useEffect(() => {
    innerRef.current && innerRef.current.focus();
  }, []);

  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

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
          value={query}
          onChange={handleChange}
        />
      </InputGroup>
    </FormControl>
  );
};

export default SearchBar;
