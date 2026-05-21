CREATE TABLE roles (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE users (
    id              BIGSERIAL PRIMARY KEY,
    username        VARCHAR(100) NOT NULL UNIQUE,
    password_hash   VARCHAR(255) NOT NULL,
    full_name       VARCHAR(200) NOT NULL,
    role_id         BIGINT NOT NULL REFERENCES roles(id),
    active          BOOLEAN NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE warehouses (
    id          BIGSERIAL PRIMARY KEY,
    code        VARCHAR(20) NOT NULL UNIQUE,
    name        VARCHAR(200) NOT NULL,
    location    VARCHAR(300)
);

CREATE TABLE stations (
    id              BIGSERIAL PRIMARY KEY,
    code            VARCHAR(20) NOT NULL UNIQUE,
    name            VARCHAR(200) NOT NULL,
    warehouse_id    BIGINT NOT NULL REFERENCES warehouses(id)
);

CREATE TABLE sections (
    id              BIGSERIAL PRIMARY KEY,
    code            VARCHAR(20) NOT NULL UNIQUE,
    name            VARCHAR(200) NOT NULL,
    station_id      BIGINT NOT NULL REFERENCES stations(id)
);

CREATE TABLE materials (
    id              BIGSERIAL PRIMARY KEY,
    code            VARCHAR(50) NOT NULL UNIQUE,
    name            VARCHAR(300) NOT NULL,
    unit            VARCHAR(20) NOT NULL,
    category        VARCHAR(100),
    min_stock       NUMERIC(14, 2) DEFAULT 0,
    description     TEXT,
    active          BOOLEAN NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE inventory_transactions (
    id                  BIGSERIAL PRIMARY KEY,
    transaction_type    VARCHAR(20) NOT NULL,
    material_id         BIGINT NOT NULL REFERENCES materials(id),
    warehouse_id        BIGINT NOT NULL REFERENCES warehouses(id),
    quantity            NUMERIC(14, 2) NOT NULL,
    unit_price          NUMERIC(14, 2),
    reference_no        VARCHAR(100),
    notes               TEXT,
    performed_by        BIGINT REFERENCES users(id),
    transaction_date    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE material_receipts (
    id              BIGSERIAL PRIMARY KEY,
    transaction_id  BIGINT NOT NULL UNIQUE REFERENCES inventory_transactions(id),
    supplier        VARCHAR(200),
    invoice_no      VARCHAR(100)
);

CREATE TABLE material_issues (
    id              BIGSERIAL PRIMARY KEY,
    transaction_id  BIGINT NOT NULL UNIQUE REFERENCES inventory_transactions(id),
    section_id      BIGINT REFERENCES sections(id),
    issued_to       VARCHAR(200)
);

CREATE TABLE reports (
    id              BIGSERIAL PRIMARY KEY,
    report_type     VARCHAR(50) NOT NULL,
    title           VARCHAR(300) NOT NULL,
    generated_by    BIGINT REFERENCES users(id),
    parameters      JSONB,
    file_path       VARCHAR(500),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_materials_code ON materials(code);
CREATE INDEX idx_inventory_tx_material ON inventory_transactions(material_id);
CREATE INDEX idx_inventory_tx_date ON inventory_transactions(transaction_date);
