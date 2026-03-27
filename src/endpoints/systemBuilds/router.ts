import { Hono } from "hono";
import { fromHono } from "chanfana";
import { SystemBuildList } from "./systemBuildList";
import { SystemBuildCreate } from "./systemBuildCreate";
import { SystemBuildRead } from "./systemBuildRead";
import { SystemBuildUpdate } from "./systemBuildUpdate";
import { SystemBuildDelete } from "./systemBuildDelete";

export const systemBuildsRouter = fromHono(new Hono());

systemBuildsRouter.get("/", SystemBuildList);
systemBuildsRouter.post("/", SystemBuildCreate);
systemBuildsRouter.get("/:id", SystemBuildRead);
systemBuildsRouter.put("/:id", SystemBuildUpdate);
systemBuildsRouter.delete("/:id", SystemBuildDelete);
