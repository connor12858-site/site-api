import { CmdrReadEndpoint } from "../cmdr/base";
import { PartTransferModel } from "./base";

export class PartTransferRead extends CmdrReadEndpoint {
	schema = {
		tags: ["Part Transfers"],
	};

	_meta = {
		model: PartTransferModel,
	};
}
