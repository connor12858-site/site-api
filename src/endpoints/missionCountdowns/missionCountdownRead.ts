import { CmdrReadEndpoint } from "../cmdr/base";
import { MissionCountdownModel } from "./base";

export class MissionCountdownRead extends CmdrReadEndpoint {
	schema = {
		tags: ["Mission Countdowns"],
	};

	_meta = {
		model: MissionCountdownModel,
	};
}