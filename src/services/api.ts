import axios from "axios";

export type TtableData = {
  num: string;
  name: string;
  description: string;
  price: string;
};

export type TInfoData = {
  id: number;
  company: { catchPhrase: string; name: string };
  address: { suite: string };
};

const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

export { apiClient };

const userservices = class userServices {
  getAllUser() {
    return apiClient.get("/users");
  }
  createAllUser(user: TInfoData) {
    return apiClient.post("/users", user);
  }
  deleteAllUser(id: string) {
    return apiClient.delete("/users/" + id);
  }
  updateAllUser(user: TInfoData) {
    return apiClient.patch("/users/" + user.id.toString(), user);
  }
};

export default new userservices();
