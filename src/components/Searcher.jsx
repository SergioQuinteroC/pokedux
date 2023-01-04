import { Input } from "antd";
import { useDispatch } from "react-redux";
import { setFilter } from "../slices/dataSlice";

const Searcher = () => {
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <Input.Search
      onChange={handleOnChange}
      placeholder="Buscar ..."
      style={{ marginBottom: 20 }}
    />
  );
};

export default Searcher;
