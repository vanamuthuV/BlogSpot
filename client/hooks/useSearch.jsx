import { useContext } from "react";
import SearchContext from "../src/context/searchProvider";

const useSearch = () => {
  return useContext(SearchContext);
};

export default useSearch;
