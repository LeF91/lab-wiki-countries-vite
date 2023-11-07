import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const API_URL = "https://ih-countries-api.herokuapp.com/countries";

function HomePage() {
  const [countries, setCountries] = useState(null);

  const fetchCountries = async () => {
    try {
      const response = await axios.get(API_URL);
      setCountries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  if (!countries) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="container"
      style={{ maxHeight: "90vh", overflow: "scroll" }}
    >
      <h1 style={{ fontSize: 24 }}>WikiCountries: Your Guide to the World</h1>

      <div className="list-group">
        {countries.map((country) => {
          return (
            <Link
              key={country._id}
              className="list-group-item list-group-item-action"
              to={`/${country.alpha3Code}`}
            >
              <img
                style={{ width: "1rem", marginRight: "0.2rem" }}
                src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
              />

              {country.name.common}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
