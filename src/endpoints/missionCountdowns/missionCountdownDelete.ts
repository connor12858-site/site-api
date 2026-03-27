import { CmdrDeleteEndpoint } from "../cmdr/base";
import { MissionCountdownModel } from "./base";

export class MissionCountdownDelete extends CmdrDeleteEndpoint {
	schema = {
		tags: ["Mission Countdowns"],
	};

	_meta = {
		model: MissionCountdownModel,
	};
}
