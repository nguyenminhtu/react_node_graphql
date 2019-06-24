import axios from "axios";

const searchPlace = (keyword: string) => {
  return axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${keyword}&inputtype=textquery&fields=formatted_address,name,geometry&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}
  `);
};

export { searchPlace };