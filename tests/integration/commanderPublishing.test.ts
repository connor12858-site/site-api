import { SELF } from "cloudflare:test";
import { beforeEach, describe, expect, it, vi } from "vitest";

const baseUrl = "http://local.test";

async function createEntity(
	path: string,
	payload: Record<string, unknown>,
): Promise<number> {
	const response = await SELF.fetch(`${baseUrl}${path}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	expect(response.status).toBe(201);
	const body = await response.json<{ success: boolean; result: { id: number } }>();
	expect(body.success).toBe(true);
	return body.result.id;
}

describe("Commander publishing endpoints", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("Ship transfers", () => {
		it("creates, lists, reads, updates and deletes for the same commander", async () => {
			const cmdrPath = "/cmdr/CMDR_Maverick/ship-transfers";
			const id = await createEntity(cmdrPath, {
				timestamp: "2026-03-27T10:00:00.000Z",
				ship_type: "Python",
				ship_type_localised: "Python",
				transfer_time: 3600,
			});

			const listResponse = await SELF.fetch(
				`${baseUrl}/cmdr/cmdr_maverick/ship-transfers`,
			);
			const listBody = await listResponse.json<{
				success: boolean;
				result: Array<{ id: number; cmdr_name: string }>;
			}>();
			expect(listResponse.status).toBe(200);
			expect(listBody.success).toBe(true);
			expect(listBody.result[0].id).toBe(id);
			expect(listBody.result[0].cmdr_name).toBe("cmdr_maverick");

			const readResponse = await SELF.fetch(
				`${baseUrl}/cmdr/cmdr_maverick/ship-transfers/${id}`,
			);
			expect(readResponse.status).toBe(200);

			const updateResponse = await SELF.fetch(
				`${baseUrl}/cmdr/cmdr_maverick/ship-transfers/${id}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						timestamp: "2026-03-27T11:00:00.000Z",
						ship_type: "Anaconda",
						ship_type_localised: "Anaconda",
						transfer_time: 7200,
					}),
				},
			);
			expect(updateResponse.status).toBe(200);

			const deleteResponse = await SELF.fetch(
				`${baseUrl}/cmdr/cmdr_maverick/ship-transfers/${id}`,
				{ method: "DELETE" },
			);
			expect(deleteResponse.status).toBe(200);
		});

		it("returns 404 when accessing another commander's record", async () => {
			const id = await createEntity("/cmdr/cmdr_alpha/ship-transfers", {
				timestamp: "2026-03-27T10:00:00.000Z",
				ship_type: "Type-9",
				ship_type_localised: "Type-9 Heavy",
				transfer_time: 1800,
			});

			const response = await SELF.fetch(
				`${baseUrl}/cmdr/cmdr_bravo/ship-transfers/${id}`,
			);
			expect(response.status).toBe(404);
		});
	});

	describe("Mission countdowns", () => {
		it("supports create and read for commander-scoped records", async () => {
			const id = await createEntity("/cmdr/cmdr_delta/mission-countdowns", {
				localised_name: "Assassination Mission",
				destination_system: "Sol",
				expiry: "2026-03-30T18:00:00.000Z",
			});

			const response = await SELF.fetch(
				`${baseUrl}/cmdr/cmdr_delta/mission-countdowns/${id}`,
			);
			const body = await response.json<{ success: boolean; result: any }>();
			expect(response.status).toBe(200);
			expect(body.success).toBe(true);
			expect(body.result.localised_name).toBe("Assassination Mission");
		});
	});

	describe("Part transfers", () => {
		it("supports update with full replacement payload", async () => {
			const id = await createEntity("/cmdr/cmdr_parts/part-transfers", {
				timestamp: "2026-03-27T12:00:00.000Z",
				stored_item_localised: "Shield Generator",
				transfer_time: 900,
			});

			const updateResponse = await SELF.fetch(
				`${baseUrl}/cmdr/cmdr_parts/part-transfers/${id}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						timestamp: "2026-03-27T12:05:00.000Z",
						stored_item_localised: "Prismatic Shield Generator",
						transfer_time: 1200,
					}),
				},
			);
			expect(updateResponse.status).toBe(200);
		});
	});

	describe("System builds", () => {
		it("stores and returns resources_required as structured JSON", async () => {
			const id = await createEntity("/cmdr/cmdr_builder/system-builds", {
				station_name: "Jameson Memorial",
				construction_progress: 42,
				resources_required: [
					{
						name_localised: "Titanium",
						required_amount: 500,
						provided_amount: 200,
					},
				],
			});

			const response = await SELF.fetch(
				`${baseUrl}/cmdr/cmdr_builder/system-builds/${id}`,
			);
			const body = await response.json<{
				success: boolean;
				result: { resources_required: Array<{ name_localised: string }> };
			}>();
			expect(response.status).toBe(200);
			expect(body.success).toBe(true);
			expect(body.result.resources_required[0].name_localised).toBe("Titanium");
		});

		it("rejects invalid resource shape", async () => {
			const response = await SELF.fetch(
				`${baseUrl}/cmdr/cmdr_builder/system-builds`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						station_name: "Founders World",
						construction_progress: 5,
						resources_required: [
							{
								name_localised: "Iron",
								required_amount: 100,
								provided_amount: 25,
								extra_field: "not-allowed",
							},
						],
					}),
				},
			);

			expect(response.status).toBe(400);
		});
	});
});
