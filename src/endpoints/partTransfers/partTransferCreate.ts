import { CmdrCreateEndpoint } from "../cmdr/base";
import { PartTransferModel } from "./base";

export class PartTransferCreate extends CmdrCreateEndpoint {
	schema = {
		tags: ["Part Transfers"],
	};

	_meta = {
		model: PartTransferModel,
		fields: PartTransferModel.schema.pick({
			cmdr_name: true,
			timestamp: true,
			stored_item_localised: true,
			transfer_time: true,
		}),
	};
}
