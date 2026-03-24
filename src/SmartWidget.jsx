import { useState } from "react";
function SmartWidget() {
const [quote, setQuote] = useState("Click button to generate motivational quote");
const [city, setCity] = useState("");
const [weather, setWeather] = useState("");
// Fetch Quote
const getQuote = async () => {
const res = await fetch("https://api.quotable.io/random");
const data = await res.json();
setQuote(data.content);
};
// Fetch Weather
const getWeather = async () => {
if(city === "") return;
const res = await fetch(`https://wttr.in/${city}?format=j1`);
const data = await res.json();
const temp = data.current_condition[0].temp_C;
const desc = data.current_condition[0].weatherDesc[0].value;
setWeather(`Temperature: ${temp}°C , Condition: ${desc}`);
};
return (
<div style={{textAlign:"center",marginTop:"60px"}}>
<h1>Smart Info Widget</h1>
<h2>Motivational Quote</h2>
<p style={{fontSize:"18px",margin:"20px"}}>{quote}</p>
<button onClick={getQuote}>Generate Quote</button>
<hr style={{margin:"40px"}}/>
<h2>Weather Checker</h2>
<input
type="text"
placeholder="Enter City Name"
value={city}
onChange={(e)=>setCity(e.target.value)}
style={{padding:"10px",marginRight:"10px"}}
/>
<button onClick={getWeather}>Check Weather</button>
<p style={{marginTop:"20px",fontSize:"18px"}}>{weather}</p>
</div>
);
}
export default SmartWidget;