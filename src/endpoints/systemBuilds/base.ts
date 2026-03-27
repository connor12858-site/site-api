import { z } from "zod";

export const systemBuildResource = z
	.object({
		name_localised: z.string(),
		required_amount: z.number().int().nonnegative(),
		provided_amount: z.number().int().nonnegative(),
	})
	.strict();

export const systemBuild = z.object({
	cmdr_name: z.string(),
	id: z.number().int(),
	station_name: z.string(),
	construction_progress: z.number().int().nonnegative(),
	resources_required: z.array(systemBuildResource),
});

function parseResourcesRequired(value: unknown): Array<
	z.infer<typeof systemBuildResource>
> {
	if (typeof value === "string") {
		return systemBuild.shape.resources_required.parse(JSON.parse(value));
	}

	return systemBuild.shape.resources_required.parse(value);
}

export const SystemBuildModel = {
	tableName: "system_builds",
	primaryKeys: ["cmdr_name", "id"],
	schema: systemBuild,
	serializer: (obj: object) => {
		const typedObj = obj as Record<string, unknown>;

		return {
			...typedObj,
			construction_progress: Number(typedObj.construction_progress),
			resources_required: parseResourcesRequired(typedObj.resources_required),
		};
	},
	serializerObject: systemBuild,
};
