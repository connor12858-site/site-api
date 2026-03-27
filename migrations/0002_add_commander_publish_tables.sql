CREATE TABLE IF NOT EXISTS ship_transfers (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    cmdr_name TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    ship_type TEXT NOT NULL,
    ship_type_localised TEXT NOT NULL,
    transfer_time INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_ship_transfers_cmdr_name ON ship_transfers (cmdr_name);

CREATE TABLE IF NOT EXISTS mission_countdowns (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    cmdr_name TEXT NOT NULL,
    localised_name TEXT NOT NULL,
    destination_system TEXT NOT NULL,
    expiry TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_mission_countdowns_cmdr_name ON mission_countdowns (cmdr_name);

CREATE TABLE IF NOT EXISTS system_builds (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    cmdr_name TEXT NOT NULL,
    station_name TEXT NOT NULL,
    construction_progress INTEGER NOT NULL,
    resources_required TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_system_builds_cmdr_name ON system_builds (cmdr_name);

CREATE TABLE IF NOT EXISTS part_transfers (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    cmdr_name TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    stored_item_localised TEXT NOT NULL,
    transfer_time INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_part_transfers_cmdr_name ON part_transfers (cmdr_name);
