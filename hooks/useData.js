import { useState, useEffect } from "react";
import { supabaseAnonKey } from "src/client";

const useData = (query) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (query !== "") {
      setLoading(true);

      try {
        const response = await fetch(
          `https://axbeytrzoapsldwtjqvx.supabase.co/rest/v1/${query}`,
          {
            headers: {
              apiKey: supabaseAnonKey,
              Authorization: `Bearer ${supabaseAnonKey}`,
            },
          }
        );
        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (err) {
        setError(err);
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return [data, loading, error, fetchData];
};

export default useData;
