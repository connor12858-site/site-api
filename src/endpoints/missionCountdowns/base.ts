import { z } from "zod";

export const missionCountdown = z.object({
	cmdr_name: z.string(),
	id: z.number().int(),
	localised_name: z.string(),
	destination_system: z.string(),
	expiry: z.string().datetime(),
});

export const MissionCountdownModel = {
	tableName: "mission_countdowns",
	primaryKeys: ["cmdr_name", "id"],
	schema: missionCountdown,
	serializer: (obj: object) => {
		return obj;
	},
	serializerObject: missionCountdown,
};