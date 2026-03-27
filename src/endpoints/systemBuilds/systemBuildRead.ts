import { CmdrReadEndpoint } from "../cmdr/base";
import { SystemBuildModel } from "./base";

export class SystemBuildRead extends CmdrReadEndpoint {
	schema = {
		tags: ["System Builds"],
	};

	_meta = {
		model: SystemBuildModel,
	};
}
