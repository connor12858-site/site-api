import { CmdrDeleteEndpoint } from "../cmdr/base";
import { PartTransferModel } from "./base";

export class PartTransferDelete extends CmdrDeleteEndpoint {
	schema = {
		tags: ["Part Transfers"],
	};

	_meta = {
		model: PartTransferModel,
	};
}
