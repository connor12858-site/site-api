import { CmdrReadEndpoint } from "../cmdr/base";
import { ShipTransferModel } from "./base";

export class ShipTransferRead extends CmdrReadEndpoint {
	schema = {
		tags: ["Ship Transfers"],
	};

	_meta = {
		model: ShipTransferModel,
	};
}