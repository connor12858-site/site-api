import { Hono } from "hono";
import { fromHono } from "chanfana";
import { ShipTransferList } from "./shipTransferList";
import { ShipTransferCreate } from "./shipTransferCreate";
import { ShipTransferRead } from "./shipTransferRead";
import { ShipTransferUpdate } from "./shipTransferUpdate";
import { ShipTransferDelete } from "./shipTransferDelete";

export const shipTransfersRouter = fromHono(new Hono());

shipTransfersRouter.get("/", ShipTransferList);
shipTransfersRouter.post("/", ShipTransferCreate);
shipTransfersRouter.get("/:id", ShipTransferRead);
shipTransfersRouter.put("/:id", ShipTransferUpdate);
shipTransfersRouter.delete("/:id", ShipTransferDelete);