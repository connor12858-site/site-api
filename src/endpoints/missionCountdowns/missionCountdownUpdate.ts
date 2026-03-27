import { CmdrUpdateEndpoint } from "../cmdr/base";
import { MissionCountdownModel } from "./base";

export class MissionCountdownUpdate extends CmdrUpdateEndpoint {
	schema = {
		tags: ["Mission Countdowns"],
	};

	_meta = {
		model: MissionCountdownModel,
		fields: MissionCountdownModel.schema.pick({
			localised_name: true,
			destination_system: true,
			expiry: true,
		}),
	};
}