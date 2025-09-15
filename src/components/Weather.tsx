import { useState, useEffect } from "react";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const CITY = "Stockholm"; // Change to your city

export default function Weather() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}`
        );
        if (!res.ok) throw new Error("Failed to fetch weather");
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return <p className="text-gray-300">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return null;

  return (
    <div className="bg-gray-800 p-4 rounded-2xl shadow">
      <p className="text-gray-300 text-lg font-medium">{data.name}</p>
      <div className="flex items-center gap-4 mt-2">
        <img
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].description}
        />
        <div>
          <p className="text-2xl">{Math.round(data.main.temp)}°C</p>
          <p className="capitalize text-gray-300">{data.weather[0].description}</p>
          <p className="text-gray-400">Humidity: {data.main.humidity}%</p>
        </div>
      </div>
    </div>
  );
}
