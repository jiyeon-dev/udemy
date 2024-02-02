import { useEffect, useState, useCallback } from "react";

export const useHttp = (url, config, initialValue) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [data, setData] = useState(initialValue);

  const sendRequest = useCallback(
    async (data) => {
      setIsLoading(true);
      setError(undefined);

      try {
        const response = await fetch(url, { ...config, body: data });
        const resData = await response.json();
        setData(resData);
      } catch (error) {
        setError(error.message || "ERROR!!");
      }

      setIsLoading(false);
    },
    [url, config]
  );

  const clearData = () => {
    setData(initialValue);
  };

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
};
