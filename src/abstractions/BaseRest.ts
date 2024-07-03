import { configService } from "@src/services/ConfigService";
import axios, { AxiosInstance } from "axios";

export class BaseRest {
  protected axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axios.create({
      headers: {
        "x-bot-token": configService.get("TOKEN"),
      },
    });
  }
}
