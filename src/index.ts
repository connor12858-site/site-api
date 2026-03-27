import { ApiException, fromHono } from "chanfana";
import { Hono } from "hono";
import { ContentfulStatusCode } from "hono/utils/http-status";
import { ShipTransferList } from "./endpoints/shipTransfers/shipTransferList";
import { ShipTransferCreate } from "./endpoints/shipTransfers/shipTransferCreate";
import { ShipTransferRead } from "./endpoints/shipTransfers/shipTransferRead";
import { ShipTransferUpdate } from "./endpoints/shipTransfers/shipTransferUpdate";
import { ShipTransferDelete } from "./endpoints/shipTransfers/shipTransferDelete";
import { MissionCountdownList } from "./endpoints/missionCountdowns/missionCountdownList";
import { MissionCountdownCreate } from "./endpoints/missionCountdowns/missionCountdownCreate";
import { MissionCountdownRead } from "./endpoints/missionCountdowns/missionCountdownRead";
import { MissionCountdownUpdate } from "./endpoints/missionCountdowns/missionCountdownUpdate";
import { MissionCountdownDelete } from "./endpoints/missionCountdowns/missionCountdownDelete";
import { SystemBuildList } from "./endpoints/systemBuilds/systemBuildList";
import { SystemBuildCreate } from "./endpoints/systemBuilds/systemBuildCreate";
import { SystemBuildRead } from "./endpoints/systemBuilds/systemBuildRead";
import { SystemBuildUpdate } from "./endpoints/systemBuilds/systemBuildUpdate";
import { SystemBuildDelete } from "./endpoints/systemBuilds/systemBuildDelete";
import { PartTransferList } from "./endpoints/partTransfers/partTransferList";
import { PartTransferCreate } from "./endpoints/partTransfers/partTransferCreate";
import { PartTransferRead } from "./endpoints/partTransfers/partTransferRead";
import { PartTransferUpdate } from "./endpoints/partTransfers/partTransferUpdate";
import { PartTransferDelete } from "./endpoints/partTransfers/partTransferDelete";

// Start a Hono app
const app = new Hono<{ Bindings: Env }>();

app.onError((err, c) => {
	if (err instanceof ApiException) {
		// If it's a Chanfana ApiException, let Chanfana handle the response
		return c.json(
			{ success: false, errors: err.buildResponse() },
			err.status as ContentfulStatusCode,
		);
	}

	console.error("Global error handler caught:", err); // Log the error if it's not known

	// For other errors, return a generic 500 response
	return c.json(
		{
			success: false,
			errors: [{ code: 7000, message: "Internal Server Error" }],
		},
		500,
	);
});

// Setup OpenAPI registry
const openapi = fromHono(app, {
	docs_url: "/",
	schema: {
		info: {
			title: "Elite Dangerous API",
			version: "1.0.0",
			description:
				"Commander-scoped publishing API for Elite Dangerous data. Supports ship transfers, mission countdowns, system builds, and part transfers.",
		},
	},
});

app.get("/meta", (c) => {
	return c.json({
		name: "Elite Dangerous API",
		docs: "/",
		openapi: "/openapi.json",
		resources: {
			shipTransfers: "/cmdr/:cmdr_name/ship-transfers",
			missionCountdowns: "/cmdr/:cmdr_name/mission-countdowns",
			systemBuilds: "/cmdr/:cmdr_name/system-builds",
			partTransfers: "/cmdr/:cmdr_name/part-transfers",
		},
	});
});

openapi.get("/cmdr/:cmdr_name/ship-transfers", ShipTransferList);
openapi.post("/cmdr/:cmdr_name/ship-transfers", ShipTransferCreate);
openapi.get("/cmdr/:cmdr_name/ship-transfers/:id", ShipTransferRead);
openapi.put("/cmdr/:cmdr_name/ship-transfers/:id", ShipTransferUpdate);
openapi.delete("/cmdr/:cmdr_name/ship-transfers/:id", ShipTransferDelete);

openapi.get("/cmdr/:cmdr_name/mission-countdowns", MissionCountdownList);
openapi.post("/cmdr/:cmdr_name/mission-countdowns", MissionCountdownCreate);
openapi.get("/cmdr/:cmdr_name/mission-countdowns/:id", MissionCountdownRead);
openapi.put("/cmdr/:cmdr_name/mission-countdowns/:id", MissionCountdownUpdate);
openapi.delete("/cmdr/:cmdr_name/mission-countdowns/:id", MissionCountdownDelete);

openapi.get("/cmdr/:cmdr_name/system-builds", SystemBuildList);
openapi.post("/cmdr/:cmdr_name/system-builds", SystemBuildCreate);
openapi.get("/cmdr/:cmdr_name/system-builds/:id", SystemBuildRead);
openapi.put("/cmdr/:cmdr_name/system-builds/:id", SystemBuildUpdate);
openapi.delete("/cmdr/:cmdr_name/system-builds/:id", SystemBuildDelete);

openapi.get("/cmdr/:cmdr_name/part-transfers", PartTransferList);
openapi.post("/cmdr/:cmdr_name/part-transfers", PartTransferCreate);
openapi.get("/cmdr/:cmdr_name/part-transfers/:id", PartTransferRead);
openapi.put("/cmdr/:cmdr_name/part-transfers/:id", PartTransferUpdate);
openapi.delete("/cmdr/:cmdr_name/part-transfers/:id", PartTransferDelete);

// Export the Hono app
export default app;
