import {
	D1CreateEndpoint,
	D1DeleteEndpoint,
	D1ListEndpoint,
	D1ReadEndpoint,
	D1UpdateEndpoint,
} from "chanfana";
import { HandleArgs } from "../../types";

export function normalizeCommanderName(cmdrName: string): string {
	return cmdrName.trim().toLowerCase();
}

function normalizeCommanderInFilters(filters: {
	filters?: Array<{ field: string; value: unknown }>;
}) {
	for (const filter of filters.filters ?? []) {
		if (filter.field === "cmdr_name" && typeof filter.value === "string") {
			filter.value = normalizeCommanderName(filter.value);
		}
	}
}

export class CmdrCreateEndpoint extends D1CreateEndpoint<HandleArgs> {
	async before(data: Record<string, unknown>) {
		if (typeof data.cmdr_name === "string") {
			data.cmdr_name = normalizeCommanderName(data.cmdr_name);
		}

		return data;
	}
}

export class CmdrListEndpoint extends D1ListEndpoint<HandleArgs> {
	async getFilters() {
		const filters = await super.getFilters();
		normalizeCommanderInFilters(filters);
		return filters;
	}
}

export class CmdrReadEndpoint extends D1ReadEndpoint<HandleArgs> {
	async getFilters() {
		const filters = await super.getFilters();
		normalizeCommanderInFilters(filters);
		return filters;
	}
}

export class CmdrUpdateEndpoint extends D1UpdateEndpoint<HandleArgs> {
	async getFilters() {
		const filters = await super.getFilters();
		normalizeCommanderInFilters(filters);
		return filters;
	}
}

export class CmdrDeleteEndpoint extends D1DeleteEndpoint<HandleArgs> {
	async getFilters() {
		const filters = await super.getFilters();
		normalizeCommanderInFilters(filters);
		return filters;
	}
}