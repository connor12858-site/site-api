import { z } from "zod";

export const shipTransfer = z.object({
	cmdr_name: z.string(),
	id: z.number().int(),
	timestamp: z.string().datetime(),
	ship_type: z.string(),
	ship_type_localised: z.string(),
	transfer_time: z.number().int().nonnegative(),
});

export const ShipTransferModel = {
	tableName: "ship_transfers",
	primaryKeys: ["cmdr_name", "id"],
	schema: shipTransfer,
	serializer: (obj: object) => {
		const typedObj = obj as Record<string, string | number>;

		return {
			...typedObj,
			transfer_time: Number(typedObj.transfer_time),
		};
	},
	serializerObject: shipTransfer,
};