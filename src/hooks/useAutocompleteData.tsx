import { useEffect, useState } from 'react';

export interface AutocompleteData {
    data: Array<string> | null;
    loading: boolean;
    error: unknown | null;
    fetchData: Function;
};

interface WordScore {
    word: string,
    score: number,
};

// This API always returns maximum of 10 elements
// So we don't have to think of pagination / limitations
const apiUrl = "https://api.datamuse.com/sug?s=";

function useAutocompleteData(word: string): AutocompleteData {
  const [data, setData] = useState<Array<string> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown | null>(null);

  const fetchData = async (word: string) => {

    try {
        // COMMENTED FOR A PURPOSE, IF API DOES NOT WORK
        // THIS IS MOCK DATA

        // const response: Promise<string[]> = new Promise((resolve) => {
        //     // Simulate fetching data asynchronously
        //     setTimeout(() => {
        //     const data: string[] = ["before" + word + "deletion", "ante" + word + "test", "super" + word + "deel"];
        //     resolve(data);
        //     }, 1000);
        // });

        // const fetchedData = await response;
        // setData(fetchedData);

        const response = await fetch(apiUrl + word);
  
        if (!response.ok) {
            setLoading(false);
            setError('Failed to fetch autocomplete data');
            throw new Error('Failed to fetch autocomplete data');
        }

        const fetchedData : WordScore[] = await response.json();
        setData(fetchedData?.map((result: WordScore) => result.word));

      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetching only if word contains more than 1 letter
    // Does not make any sense for less
    if (word.length > 1) {
        fetchData(word);
    }
  }, [word]); 

  return { data, loading, error, fetchData };
}

export default useAutocompleteData;
