import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { GetCosts } from "../../store/farmerSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const optionsWeather = {
  scales: {
    y: {
      title: {
        display: true,
        text: "Temperature (deg Celsius)",
      },
    },
    x: {
      title: {
        display: true,
        text: "Date",
      },
    },
  },
};

const optionsPrecipitation = {
  scales: {
    y: {
      title: {
        display: true,
        text: "Precipitation (Percentage %)",
      },
    },
    x: {
      title: {
        display: true,
        text: "Date",
      },
    },
  },
};

const CropData = {
  labels: [],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const cropOptions = {
  plugins: {
    legend: false,
  },
};

const Stats = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [temps, setTemps] = useState([]);
  const [rains, setRains] = useState([]);

  const dispatch = useDispatch();

  const costs_data = useSelector((store) => store.farmer);
  const user_data = useSelector((store) => store.auth);

  useEffect(() => {
    const userid = user_data.user_id;
    // console.log(userid);
    dispatch(GetCosts(userid));
    console.log(costs_data);
    // console.log(costs_data.totalCropSelled);
  }, [dispatch, costs_data]);

  const getLabels = (data) => {
    const labelreq = data.daily.map((day) => {
      let date = new Date(day.dt * 1000);
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    });
    setLabels(labelreq);
  };

  const getTempratures = (data) => {
    const temp_values = data.daily.map(
      (day) => (day.temp.max + day.temp.min) / 2
    );
    setTemps(temp_values);
  };

  const getRain = (data) => {
    const rain_values = data.daily.map((day) => day.rain || 0);
    setRains(rain_values);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, handleError);
    } else {
      console.log("Geolocation not supported");
    }

    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLocation({ latitude, longitude });
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    }

    function handleError(error) {
      console.error(`Error occurred: ${error.message}`);
    }
  }, []);

  useEffect(() => {
    const { latitude, longitude } = location;
    if (latitude !== null && longitude !== null) {
      console.log("Latitude is:", latitude);
      console.log("Longitude is:", longitude);
      const fetchData = async () => {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=8a528f36d6bbe9779e7512a072af7646`
        );
        const result = await res.json();
        setData(result);
        getLabels(result);
        getTempratures(result);
        getRain(result);
      };
      fetchData();
    }
  }, [location]);

  const weatherData = {
    labels: labels,
    datasets: [
      {
        label: "Temperature",
        data: temps,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const rainData = {
    labels: labels,
    datasets: [
      {
        label: "Precipitation",
        data: rains,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="w-full max-h-screen overflow-scroll">
      <div className="w-[95%] p-[2.5%]">
        <h1>Your Statistics</h1>
      </div>
      <div className="flex flex-wrap justify-center w-[95%] p-[2.5%]">
        <div className="w-[45%] p-[2.5%]">
          <Line data={weatherData} options={optionsWeather} />
        </div>
        <div className="w-[45%] p-[2.5%]">
          <Line data={rainData} options={optionsPrecipitation} />
        </div>
      </div>
      <div className="w-[95%] p-[2.5%]">
        <h2>{user_data.isFarmer ? "Sales" : "Expense"}</h2>
        <h3>Total Crops {user_data.isFarmer ? "sold" : "bought"}:</h3>
        <div className="flex flex-wrap justify-center">
          <div className="w-[45%] p-[2.5%] flex justify-center">
            <div className="w-[45%] p-[2.5%]">
              <Pie data={CropData} options={cropOptions} />
            </div>
          </div>
          <div className="w-[45%] p-[2.5%] flex justify-center">
            <div className="m-[5%] p-[5%] bg-gray-200 w-[40%]">
              <h3>Total Mass {user_data.isFarmer ? "Sold" : "Bought"}</h3>
              <h1>Kg</h1>
              <h1>8000</h1>
            </div>
            <div className="m-[5%] p-[5%] bg-gray-200 w-[40%]">
              <h3>Total Money {user_data.isFarmer ? "Earned" : "Spent"}</h3>
              <h1>₹</h1>
              <h1>30 Lakhs</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[95%] p-[2.5%]">
        <h2>Payments</h2>
        <div className="payments"></div>
      </div>
    </div>
  );
  
};

export default Stats;
