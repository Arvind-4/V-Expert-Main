let baseUrl;

if (process.env.NODE_ENV === "production") {
  baseUrl = "https://vexpert.cyclic.app/api";
} else {
  baseUrl = "http://localhost:8000/api";
}

const fileName = "data";
const fileExtension = "csv";

export { baseUrl, fileName, fileExtension };
