import { CmdrCreateEndpoint } from "../cmdr/base";
import { MissionCountdownModel } from "./base";

export class MissionCountdownCreate extends CmdrCreateEndpoint {
	schema = {
		tags: ["Mission Countdowns"],
	};

	_meta = {
		model: MissionCountdownModel,
		fields: MissionCountdownModel.schema.pick({
			cmdr_name: true,
			localised_name: true,
			destination_system: true,
			expiry: true,
		}),
	};
}