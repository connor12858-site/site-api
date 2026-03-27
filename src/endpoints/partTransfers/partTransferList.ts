import { CmdrListEndpoint } from "../cmdr/base";
import { PartTransferModel } from "./base";

export class PartTransferList extends CmdrListEndpoint {
	schema = {
		tags: ["Part Transfers"],
	};

	_meta = {
		model: PartTransferModel,
	};

	searchFields = ["stored_item_localised", "timestamp"];
	defaultOrderBy = "id DESC";
}
