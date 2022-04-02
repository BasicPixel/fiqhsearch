import { useState, useEffect } from "react";
import { supabaseAnonKey } from "src/client";

const useData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://axbeytrzoapsldwtjqvx.supabase.co/rest/v1/${url}`,
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
    };

    fetchData();
  }, []);

  return [data, loading, error];
};

export default useData;
