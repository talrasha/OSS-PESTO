import http from "../http-common";

class IssueDataService {
  getAll(params) {
    return http.get("/issues", { params });
  }
  get(id) {
    // console.log(id)
    return http.get(`/issues/${id}`);
  }

  // findByFullName(full_name) {
  //   return http.get(`/issues?full_name=${full_name}`);
  // }

  // other CRUD methods
}

export default new IssueDataService();
