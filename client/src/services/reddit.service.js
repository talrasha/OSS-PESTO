import http from "../http-common";

class RedditDataService {
  getAll(params) {
    return http.get("/reddit", { params });
  }
  get(id) {
    // console.log(id)
    return http.get(`/reddit/${id}`);
  }

  // findByFullName(full_name) {
  //   return http.get(`/reddit?full_name=${full_name}`);
  // }

  // other CRUD methods
}

export default new RedditDataService();
