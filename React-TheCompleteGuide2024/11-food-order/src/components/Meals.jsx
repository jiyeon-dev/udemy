import MealItem from "./MealItem";
import Error from "./Error";
import { useHttp } from "../hooks/useHttp";

const httpConfig = {}; // 렌더링 될때마다 바뀌기 때문에 밖에 정의. useMemo 보다 성능 향상.

export default function Meals() {
  const {
    data: mealList,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", httpConfig, []);

  if (isLoading) {
    return <p className='center'>Fetching meals...</p>;
  }

  if (error) {
    return <Error title='Failed to fetch meals' message={error} />;
  }

  return (
    <ul id='meals'>
      {mealList.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
