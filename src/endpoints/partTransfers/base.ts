import { z } from "zod";

export const partTransfer = z.object({
	cmdr_name: z.string(),
	id: z.number().int(),
	timestamp: z.string().datetime(),
	stored_item_localised: z.string(),
	transfer_time: z.number().int().nonnegative(),
});

export const PartTransferModel = {
	tableName: "part_transfers",
	primaryKeys: ["cmdr_name", "id"],
	schema: partTransfer,
	serializer: (obj: object) => {
		const typedObj = obj as Record<string, string | number>;

		return {
			...typedObj,
			transfer_time: Number(typedObj.transfer_time),
		};
	},
	serializerObject: partTransfer,
};
