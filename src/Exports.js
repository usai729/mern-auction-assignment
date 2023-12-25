export const companies = [
  {
    name: "Gulfstream",
    logo: "https://pbs.twimg.com/profile_images/1037680597185875968/u18VSNtw_400x400.jpg",
  },
  {
    name: "Embraer",
    logo: "https://s3-symbol-logo.tradingview.com/embraer--600.png",
  },
  {
    name: "Airbus",
    logo: "https://e1.pxfuel.com/desktop-wallpaper/834/531/desktop-wallpaper-airbus-flies-into-new-era-with-change-of-its-ceo-airbus-logo.jpg",
  },
];

export const productData = [
  {
    sellername: "Seller",
    image: "https://www.aviall.com/content-images/WL9204=5V_280.JPG",
    title:
      "Boeing Distribution (formerly Aviall) is the world's largest diversified aircraft parts distributor delivering airplane parts and repair services from any of its worldwide locations.",
  },
  {
    sellername: "Seller",
    image: "https://www.aviall.com/content-images/WL9204=5V_280.JPG",
    title:
      "Boeing Distribution (formerly Aviall) is the world's largest diversified aircraft parts distributor delivering airplane parts and repair services from any of its worldwide locations.",
  },
  {
    sellername: "Seller",
    image: "https://www.aviall.com/content-images/WL9204=5V_280.JPG",
    title:
      "Boeing Distribution (formerly Aviall) is the world's largest diversified aircraft parts distributor delivering airplane parts and repair services from any of its worldwide locations.",
  },
];

const API_URL = "http://localhost:3001";

export const ENDPOINTS = {
  LOGIN: API_URL + "/auth/login",
  REGISTER: API_URL + "/auth/signup",
};

export const isAuth = (token) => {
  return token ? true : false;
};
