import { CmdrUpdateEndpoint } from "../cmdr/base";
import { PartTransferModel } from "./base";

export class PartTransferUpdate extends CmdrUpdateEndpoint {
	schema = {
		tags: ["Part Transfers"],
	};

	_meta = {
		model: PartTransferModel,
		fields: PartTransferModel.schema.pick({
			timestamp: true,
			stored_item_localised: true,
			transfer_time: true,
		}),
	};
}
