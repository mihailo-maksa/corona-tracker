import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export async function fetchData(country) {
  let changeableUrl = `${url}/countries/${country}`;

  if (!country) {
    changeableUrl = url;
  }

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate }
    } = await axios.get(changeableUrl);

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (err) {
    console.error(err);

    return err;
  }
}

export async function fetchDailyData() {
  try {
    const { data } = await axios.get(`${url}/daily`);

    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate
    }));

    return modifiedData;
  } catch (err) {
    console.error(err);

    return err;
  }
}

export async function fetchCountries() {
  try {
    const { data } = await axios.get(`${url}/countries`);

    return data.countries;
  } catch (err) {
    console.error(err);

    return err;
  }
}
