import { CmdrCreateEndpoint } from "../cmdr/base";
import { SystemBuildModel } from "./base";

export class SystemBuildCreate extends CmdrCreateEndpoint {
	schema = {
		tags: ["System Builds"],
	};

	_meta = {
		model: SystemBuildModel,
		fields: SystemBuildModel.schema.pick({
			cmdr_name: true,
			station_name: true,
			construction_progress: true,
			resources_required: true,
		}),
	};

	async before(data: Record<string, unknown>) {
		const normalized = await super.before(data);

		if (Array.isArray(normalized.resources_required)) {
			normalized.resources_required = JSON.stringify(
				normalized.resources_required,
			);
		}

		return normalized;
	}
}
