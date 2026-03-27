import { Hono } from "hono";
import { fromHono } from "chanfana";
import { PartTransferList } from "./partTransferList";
import { PartTransferCreate } from "./partTransferCreate";
import { PartTransferRead } from "./partTransferRead";
import { PartTransferUpdate } from "./partTransferUpdate";
import { PartTransferDelete } from "./partTransferDelete";

export const partTransfersRouter = fromHono(new Hono());

partTransfersRouter.get("/", PartTransferList);
partTransfersRouter.post("/", PartTransferCreate);
partTransfersRouter.get("/:id", PartTransferRead);
partTransfersRouter.put("/:id", PartTransferUpdate);
partTransfersRouter.delete("/:id", PartTransferDelete);
