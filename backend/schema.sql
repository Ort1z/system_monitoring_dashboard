CREATE TABLE system (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    type TEXT NOT NULL
);

CREATE TABLE metric (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    value REAL NOT NULL,
    unit TEXT NOT NULL,
    timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    system_id INTEGER,
    FOREIGN KEY (system_id) REFERENCES system(id)
);

CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL
);

CREATE TABLE alert (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    threshold REAL NOT NULL,
    condition TEXT NOT NULL,
    severity TEXT NOT NULL,
    status TEXT NOT NULL,
    system_id INTEGER,
    metric_id INTEGER,
    FOREIGN KEY (system_id) REFERENCES system(id),
    FOREIGN KEY (metric_id) REFERENCES metric(id)
);

CREATE TABLE report (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    type TEXT NOT NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    status TEXT NOT NULL,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

