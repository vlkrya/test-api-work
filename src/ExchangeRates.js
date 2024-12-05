import React, { useEffect, useState } from "react";
import "./ExchangeRates.css"; 

const ExchangeRates = () => {
    const [rates, setRates] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRates = async () => {
            const url = "https://www.cbr-xml-daily.ru/daily_json.js";
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setRates(data.Valute);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRates();
    }, []);

    if (loading) {
        return <div className="loading">Загрузка...</div>;
    }

    if (error) {
        return <div className="error">Ошибка: {error}</div>;
    }

    return (
        <div className="exchange-rates-container">
            <h1 className="title">Курсы валют</h1>
            <ul className="rates-list">
                {Object.values(rates).map((valute) => (
                    <li key={valute.CharCode} className="rate-item">
                        <span className="valute-name">{valute.Name} ({valute.CharCode}):</span>
                        <span className="valute-value">{valute.Value.toFixed(2)} руб.</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExchangeRates;


