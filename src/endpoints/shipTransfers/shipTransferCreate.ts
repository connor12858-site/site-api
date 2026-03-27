import { CmdrCreateEndpoint } from "../cmdr/base";
import { ShipTransferModel } from "./base";

export class ShipTransferCreate extends CmdrCreateEndpoint {
	schema = {
		tags: ["Ship Transfers"],
	};

	_meta = {
		model: ShipTransferModel,
		fields: ShipTransferModel.schema.pick({
			cmdr_name: true,
			timestamp: true,
			ship_type: true,
			ship_type_localised: true,
			transfer_time: true,
		}),
	};
}