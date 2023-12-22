import SingleItem from "./SingleItem";
import { useFetchTasks } from "./reactQueryCustomHooks";

const Items = () => {
  const { isPending, data, error, isError } = useFetchTasks();

  if (isPending) {
    return <p style={{ marginTop: "1rem" }}>Loading...</p>;
  }

  if (isError) {
    return (
      <p style={{ marginTop: "1rem" }}>
        {error.response?.data || error.message}
      </p>
    );
  }

  return (
    <div className='items'>
      {data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
