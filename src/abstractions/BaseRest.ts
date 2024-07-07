import { configService } from "@src/services/ConfigService";
import { FalsonAPIRoutes } from "@src/types";
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
  protected async baseQuery<T>(
    url: FalsonAPIRoutes,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS",
    body: any = {}
  ): Promise<T | null> {
    try {
      const data = await this.axiosInstance.request({
        method: method,
        url: String(url),
        data: body,
      });
      if (!data.data) {
        return null;
      }
      return data.data;
    } catch (err) {
      return null;
    }
  }
}
