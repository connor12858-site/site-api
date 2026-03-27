import { Hono } from "hono";
import { fromHono } from "chanfana";
import { MissionCountdownList } from "./missionCountdownList";
import { MissionCountdownCreate } from "./missionCountdownCreate";
import { MissionCountdownRead } from "./missionCountdownRead";
import { MissionCountdownUpdate } from "./missionCountdownUpdate";
import { MissionCountdownDelete } from "./missionCountdownDelete";

export const missionCountdownsRouter = fromHono(new Hono());

missionCountdownsRouter.get("/", MissionCountdownList);
missionCountdownsRouter.post("/", MissionCountdownCreate);
missionCountdownsRouter.get("/:id", MissionCountdownRead);
missionCountdownsRouter.put("/:id", MissionCountdownUpdate);
missionCountdownsRouter.delete("/:id", MissionCountdownDelete);
