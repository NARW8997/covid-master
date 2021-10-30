import axios from "axios";

const url = "https://covid19.mathdro.id/api";
const daliyApi = "https://covid19.mathdro.id/api/daily";
const contriesApi = "https://covid19.mathdro.id/api/countries";

export const fetchData = async (country) => {
  let changeableUrl = url;
  if (country) {
    changeableUrl = url + "/countries/" + country;
    console.log("changeableUrl : " + changeableUrl);
  }
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl);

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {}
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(daliyApi);
    // console.log("data" + data);

    const modifiedData = data.map((daliyData) => ({
      confirmed: daliyData.confirmed.total,
      deaths: daliyData.deaths.total,
      date: daliyData.reportDate,
    }));
    return modifiedData;
  } catch (error) {
    console.error(error);
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(contriesApi);

    return countries.map((country) => country.name);
  } catch (error) {}
};
