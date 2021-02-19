import http from "../http-common";

class ProjectDataService {
  getAll(params) {
    return http.get("/projects", { params });
  }
  get(id) {
    // console.log(id)
    return http.get(`/projects/${id}`);
  }

  // findByFullName(full_name) {
  //   return http.get(`/projects?full_name=${full_name}`);
  // }

  // other CRUD methods
}

export default new ProjectDataService();
