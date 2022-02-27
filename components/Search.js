import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <InputGroup size={"lg"}>
      <InputLeftElement>
        <FiSearch />
      </InputLeftElement>
      <Input
        placeholder="اختر كلمات مفتاحية، ولا تكثر..."
        variant={"filled"}
        value={query}
        autoFocus
        onChange={handleChange}
      />
    </InputGroup>
  );
};

export default Search;
