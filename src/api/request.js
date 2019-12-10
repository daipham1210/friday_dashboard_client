const baseUrl = process.env.REACT_APP_BASE_URL
const request = require("request")

export const getData = () => {
  return new Promise((resolve, reject) => {
    request.get(baseUrl, (err, resp, body) => {
      if (err) reject(err);
      const response = JSON.parse(body)
      resolve(response)
    })
  })
}