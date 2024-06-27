import { configService } from "@src/services/ConfigService";
import axios from "axios";

const rest = axios.create({
  headers: {
    "x-bot-token": configService.get(`TOKEN`),
  },
});

export default rest;
