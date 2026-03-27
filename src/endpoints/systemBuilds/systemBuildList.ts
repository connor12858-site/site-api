import { CmdrListEndpoint } from "../cmdr/base";
import { SystemBuildModel } from "./base";

export class SystemBuildList extends CmdrListEndpoint {
	schema = {
		tags: ["System Builds"],
	};

	_meta = {
		model: SystemBuildModel,
	};

	searchFields = ["station_name"];
	defaultOrderBy = "id DESC";
}
