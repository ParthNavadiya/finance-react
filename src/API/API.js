import axios from "axios";
import { BASE_URL } from "../Utils/config";
// import { STATUS_CODE } from "../Helper/Constant";

// Request Methods
const METHOD = {
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete"
};

/*
 * API controller that for handling the request
 */
class API {
    isLoggedIn = false;
    userData = {};
    userToken = null;

    constructor() {
        this.baseURL = BASE_URL;
    }

    get(url, data) {
        return new Promise((resolve, reject) => {
            this.api(METHOD.GET, url, data)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    }

    post(url, data) {
        return new Promise((resolve, reject) => {
            this.api(METHOD.POST, url, data)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    }

    put(url, data) {
        return new Promise((resolve, reject) => {
            this.api(METHOD.PUT, url, data)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    }

    delete(url, data) {
        return new Promise((resolve, reject) => {
            this.api(METHOD.DELETE, url, data)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    }

    // Main function with hold the axios request param
    api(method, url, data) {
        return new Promise((resolve, reject) => {
            let axiosConfig = {};
            axiosConfig.method = method;
            axiosConfig.url = this.baseURL + url;

            axiosConfig.headers = this.setHeaders(data);
            if (data) {
                if (data.params) axiosConfig.params = data.params;

                if (data.data) axiosConfig.data = data.data;
            }
            axios(axiosConfig)
                .then(response => {
                    //   if (
                    //     response &&
                    //     response.status === STATUS_CODE.INTERNAL_SERVER_ERROR
                    //   ) {
                    //     alert("Something went wrong!!");
                    //   } else {
                    resolve(response.data);
                    //   }
                })
                .catch(error => {
                    // alert("Something went wrong!!");
                    console.log("ERROR", error);
                    resolve(error.response.data);
                    //DEFAULT ERROR HANDLING
                });
        });
    }

    // Set the header for request
    setHeaders(data) {
        let headers = {};
        headers["Access-Control-Allow-Origin"] = "*";
        headers["accept-language"] = "en";
        headers["Content-Type"] = "application/json";

        if (data) {
            if (data.isMultipart) {
                headers["Content-Type"] = "multipart/form-data";
            }

            if (data.headers) {
                for (var key in data.headers) {
                    if (data.headers.hasOwnProperty(key)) {
                        headers[key] = data.headers[key];
                    }
                }
            }
        }

        return headers;
    }
}

export default API;
