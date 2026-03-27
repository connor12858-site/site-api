import { CmdrDeleteEndpoint } from "../cmdr/base";
import { ShipTransferModel } from "./base";

export class ShipTransferDelete extends CmdrDeleteEndpoint {
	schema = {
		tags: ["Ship Transfers"],
	};

	_meta = {
		model: ShipTransferModel,
	};
}