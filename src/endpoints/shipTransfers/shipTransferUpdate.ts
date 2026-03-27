import { CmdrUpdateEndpoint } from "../cmdr/base";
import { ShipTransferModel } from "./base";

export class ShipTransferUpdate extends CmdrUpdateEndpoint {
	schema = {
		tags: ["Ship Transfers"],
	};

	_meta = {
		model: ShipTransferModel,
		fields: ShipTransferModel.schema.pick({
			timestamp: true,
			ship_type: true,
			ship_type_localised: true,
			transfer_time: true,
		}),
	};
}