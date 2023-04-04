import React from "react";
import { Input } from "antd";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faSearch);

const { Search } = Input;

const ComponentSearch: React.FC = () => {
  const handleChange = (value: any) => {
    console.log(value);
  };
  return (
    <>
      <Input.Search
        placeholder="Search"
        enterButton={<FontAwesomeIcon icon={faSearch} />}
        size="large"
        onSearch={handleChange}
      />
    </>
  );
};

export default ComponentSearch;
