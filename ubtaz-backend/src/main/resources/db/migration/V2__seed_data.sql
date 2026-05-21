INSERT INTO roles (name) VALUES ('ADMIN'), ('WAREHOUSE_MANAGER'), ('OPERATOR');

INSERT INTO users (username, password_hash, full_name, role_id) VALUES
    ('admin', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'Системийн админ', 1),
    ('manager', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'Агуулахын менежер', 2);

INSERT INTO warehouses (code, name, location) VALUES
    ('WH-01', 'Төв агуулах', 'Улаанбаатар'),
    ('WH-02', 'Бүсийн агуулах', 'Дархан');

INSERT INTO stations (code, name, warehouse_id) VALUES
    ('ST-01', 'Станц 1', 1),
    ('ST-02', 'Станц 2', 1);

INSERT INTO sections (code, name, station_id) VALUES
    ('SEC-01', 'Хэсэг 1', 1),
    ('SEC-02', 'Хэсэг 2', 2);

INSERT INTO materials (code, name, unit, category, min_stock) VALUES
    ('MAT-001', 'Болт M12', 'ш', 'Крепеж', 100),
    ('MAT-002', 'Тослох тос', 'л', 'Тос тосолгоо', 50),
    ('MAT-003', 'Ган утас 6мм', 'м', 'Материал', 200);
