import "./styles.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Box, Stack, Typography } from "@mui/material";
import {
  TiWeatherCloudy,
  TiWeatherWindy,
  TiWeatherShower,
  TiWeatherSunny
} from "react-icons/ti";

export default function App() {
  const [search, setSearch] = useState("keral");

  const [city, setCity] = useState("");
  console.log(city, "city");

  useEffect(() => {
    const fetchApi = async () => {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${
          search ? search : "keral"
        }&appid=656405bdd4bff141305985016c0689c9`
      );

      const responsePromise = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${response.data[0].lat}&lon=${response.data[0].lon}&appid=656405bdd4bff141305985016c0689c9&units=metric`
      );
      setCity(responsePromise.data.main);
    };
    fetchApi();
  }, [search]);
  return (
    <>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "95vh"
        }}
      >
        <Card
          sx={{
            width: "400px",
            height: "450px",
            background: "linear-gradient(to bottom, skyblue, #e6f2ff)",

            borderRadius: "20px",
            padding: "10px"
          }}
        >
          <TiWeatherCloudy size={94} color="#808080" />
          <TiWeatherWindy size={94} color="#964B00" />
          <TiWeatherShower size={94} color=" #87CEEB" />
          <TiWeatherSunny size={94} color="#FFA500" />

          <Stack
            sx={{ textAlign: "center", margin: "20px 100px" }}
            direction="row"
          >
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="...search "
              style={{
                border: "none",
                float: "right",
                padding: "10px",
                borderRadius: "25PX",
                appearance: "none",
                outline: "none",
                marginRight: "80px"
              }}
            />
          </Stack>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4">
              <i class="fa-solid fa-street-view"></i> <span>{search}</span>
            </Typography>
            <br />
            <Typography variant="h5">Celsius:{city.temp} &#8451;</Typography>
            <br />
            <Typography variant="h6">
              Min-Celsius:{city.temp_min}&#8451;
            </Typography>
            <br />
            <Typography variant="h6">
              Max-Celsius{city.temp_max}&#8451;
            </Typography>
            <br />
            <Typography variant="h6">
              Humidity:{city.humidity}&#8451;
            </Typography>
          </Box>
        </Card>
      </Stack>
    </>
  );
}
