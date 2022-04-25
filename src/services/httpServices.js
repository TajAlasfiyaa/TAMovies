// import axios from "axios";
// import logger from "./logServices";

// axios.interceptors.response.use(null, (error) => {
//   const expectedError =
//     error.response &&
//     error.response.status >= 400 &&
//     error.response.status < 500;

//   if (!expectedError) {
//     logger.log(error);
//     alert("An unexpected error occurred.");
//   }

//   return Promise.reject(error);
// });
// export default {
//   get: axios.get,
//   post: axios.post,
//   put: axios.put,
//   delete: axios.delete,
// };
