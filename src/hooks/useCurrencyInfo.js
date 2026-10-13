import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [prevCurrency, setPrevCurrency] = useState(currency);
    if (prevCurrency !== currency) {
        // Reset for the new currency during render (avoids set-state-in-effect).
        setPrevCurrency(currency);
        setData({});
        setLoading(true);
        setError(null);
    }

    useEffect(() => {
        const controller = new AbortController();
        fetch(
            `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`,
            { signal: controller.signal },
        )
            .then((res) => {
                if (!res.ok) throw new Error(`Rates request failed: ${res.status}`);
                return res.json();
            })
            .then((res) => {
                setData(res[currency] ?? {});
                setLoading(false);
            })
            .catch((err) => {
                if (err.name !== "AbortError") {
                    setError(err.message);
                    setLoading(false);
                }
            });
        return () => controller.abort();
    }, [currency]);

    return { data, loading, error };
}

export default useCurrencyInfo;
