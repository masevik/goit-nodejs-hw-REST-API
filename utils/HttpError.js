// const errors = {
//   400: "Bad Request",
//   409: "Conflict",
// };

const HttpError = (status, message) => {
  const error = new Error(message);
  // error.status = status;
  return error;
};

module.exports = HttpError;
