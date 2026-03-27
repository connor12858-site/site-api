import { CmdrListEndpoint } from "../cmdr/base";
import { MissionCountdownModel } from "./base";

export class MissionCountdownList extends CmdrListEndpoint {
	schema = {
		tags: ["Mission Countdowns"],
	};

	_meta = {
		model: MissionCountdownModel,
	};

	searchFields = ["localised_name", "destination_system", "expiry"];
	defaultOrderBy = "id DESC";
}