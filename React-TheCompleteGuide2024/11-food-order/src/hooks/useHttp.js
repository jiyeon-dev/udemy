import { useEffect, useState } from "react";

export const useHttp = (url, config, initialValue) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [data, setData] = useState(initialValue);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(url, { ...config });
      const resData = await response.json();
      setData(resData);
    } catch (error) {
      setError(error.message || "ERROR!!");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [url, config]);

  return {
    data,
    isLoading,
    error,
  };
};
