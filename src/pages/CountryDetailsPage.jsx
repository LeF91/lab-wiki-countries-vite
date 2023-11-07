import { React } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
const API_URL = "https://ih-countries-api.herokuapp.com/countries/";

function CountryDetailsPage() {
  const [country, setCountry] = useState(null);
  const [borders, setBorders] = useState([]);
  const { countryId } = useParams();

  const fetchCountry = async () => {
    try {
      const response = await axios.get(API_URL + countryId);

      let tempBorders = [];
      for (const border of response.data.borders) {
        let promise = await axios.get(API_URL + border);
        tempBorders.push(promise);
      }

      Promise.all(tempBorders).then((borderContries) => {
        let finalBorders = [];
        for (const bordercountry of borderContries) {
          finalBorders.push([
            bordercountry.data.alpha3Code,
            bordercountry.data.name.common,
            bordercountry.data._id,
          ]);
        }
        setBorders(finalBorders);
        setCountry(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCountry();
  }, [countryId]);

  if (!country) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {/* Bootstrap container wrapper div */}
      <div className="container">
        <p style={{ fontSize: 24, fontWeight: "bold" }}> Country Details </p>
        <img
          style={{ width: "6rem", marginRight: "0.2rem" }}
          src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
        />
        <h1>{country.name.common}</h1>
        <table className="table">
          <thead />
          <tbody>
            <tr>
              <td style={{ width: "30%" }}>Capital</td>
              <td>{country.capital[0]}</td>
            </tr>
            <tr>
              <td>Area</td>
              <td>
                {country.area} km
                <sup>2</sup>
              </td>
            </tr>
            <tr>
              <td>Borders</td>
              <td>
                <ul>
                  {borders.map((border) => {
                    return (
                      <li
                        style={{ listStyle: "none" }}
                        key={crypto.randomUUID()}
                      >
                        <Link to={`/${border[0]}`}>{border[1]}</Link>
                      </li>
                    );
                  })}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
export default CountryDetailsPage;
