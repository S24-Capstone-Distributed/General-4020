\c tradeserver
CREATE TABLE events (
    poolId VARCHAR(32),
    eventID bigint,
    machineId bigint,
    eventKey VARCHAR(32),
    eventValue real,
    timestamp timestamp,
    PRIMARY KEY (poolId,eventID,eventKey)
);

-- COPY events
--     FROM '/data/fakeevents.csv' 
--     DELIMITER ',' 
--     CSV HEADER;