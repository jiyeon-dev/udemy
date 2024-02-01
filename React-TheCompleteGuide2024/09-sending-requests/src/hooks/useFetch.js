import { useState } from "react";
import { useEffect } from "react";

export function useFetch(fetchFn, initialValue) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);
  const [fetchedData, setFetchedData] = useState(initialValue); // 모든 상황에서 서버로부터 배열로 갖고오는 건 아니기 때문에 undefined로 함.

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);

      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message });
      }

      setIsFetching(false);
    };

    fetchData();
  }, [fetchFn]);

  return {
    isFetching,
    error,
    fetchedData,
    setFetchedData,
  };
}
