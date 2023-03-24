import axios from "axios";
import { useState, useEffect } from "react";

export default function useFetch(url) {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('fetched')
        const fetchData = () => {
            axios
                .get(url)
                .then((response) => {
                    setIsLoaded(true);
                    setData(response.data);
                })
                .catch((error) => {
                    setError(error);
                });
        };
        fetchData();
    }, [url]);

    return { error, isLoaded, data };
};
