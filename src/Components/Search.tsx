// import React, { useContext, useEffect } from "react";
// import { Input } from "antd";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { SelectKeyContext } from "../Layout/LayoutAdmin";
// library.add(faSearch);

// const { Search } = Input;

// interface IProps {
//   onSearchProducts?: (value: string) => void;
// }

// const ComponentSearch = (props: IProps) => {
//   console.log(props);
//   const selectedKey = useContext(SelectKeyContext);
//   console.log(selectedKey);
//   const handleSearchValues = (value: string) => {
//     // selectedKey === "2" && handleSearchValues(value)
//     // selectedKey === "3" && handleSearchValues(value)
//   };
//   return (
//     <>
//       <Input.Search
//         placeholder="Search"
//         enterButton={<FontAwesomeIcon icon={faSearch} />}
//         size="large"
//       />
//     </>
//   );
// };

// export default ComponentSearch;
