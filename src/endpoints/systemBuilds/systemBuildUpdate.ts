import { CmdrUpdateEndpoint } from "../cmdr/base";
import { SystemBuildModel } from "./base";

export class SystemBuildUpdate extends CmdrUpdateEndpoint {
	schema = {
		tags: ["System Builds"],
	};

	_meta = {
		model: SystemBuildModel,
		fields: SystemBuildModel.schema.pick({
			station_name: true,
			construction_progress: true,
			resources_required: true,
		}),
	};

	async before(
		oldObj: Record<string, unknown>,
		filters: { updatedData: Record<string, unknown> },
	) {
		const updatedFilters = await super.before(oldObj, filters as any);

		if (Array.isArray(updatedFilters.updatedData.resources_required)) {
			updatedFilters.updatedData.resources_required = JSON.stringify(
				updatedFilters.updatedData.resources_required,
			);
		}

		return updatedFilters;
	}
}
