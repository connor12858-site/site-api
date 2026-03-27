import { CmdrDeleteEndpoint } from "../cmdr/base";
import { SystemBuildModel } from "./base";

export class SystemBuildDelete extends CmdrDeleteEndpoint {
	schema = {
		tags: ["System Builds"],
	};

	_meta = {
		model: SystemBuildModel,
	};
}
