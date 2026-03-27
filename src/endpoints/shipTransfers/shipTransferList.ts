import { CmdrListEndpoint } from "../cmdr/base";
import { ShipTransferModel } from "./base";

export class ShipTransferList extends CmdrListEndpoint {
	schema = {
		tags: ["Ship Transfers"],
	};

	_meta = {
		model: ShipTransferModel,
	};

	searchFields = ["ship_type", "ship_type_localised", "timestamp"];
	defaultOrderBy = "id DESC";
}