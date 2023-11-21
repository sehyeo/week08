import axios from "axios";
import { useState } from "react";
import "./index.css";

function App() {
  // https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=b14138803568bb587130e8c7a1191602

  const [location, setLocation] = useState("");
  const [result, setResult] = useState({});

  const API_KEY = "b14138803568bb587130e8c7a1191602";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;
  const searchWeather = async (e) => {
    if (e.key == "Enter") {
      try {
        const data = await axios({
          method: "get",
          url: url,
        });
        setResult(data);
        console.log(data);
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <div className="App">
      <input
        className="InputCity"
        type="text"
        placeholder="도시를 입력하세요"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyDown={searchWeather}
      />
      {Object.keys(result).length != 0 && (
        <div className="Result">
          <div className="city">{result.data.name}</div>
          <div className="temperature">
            {Math.round((result.data.main.temp - 273.15) * 10) / 10}°C
          </div>
          <div className="sky">{result.data.weather[0].main}</div>
        </div>
      )}
    </div>
  );
}

export default App;
