-- SQL Schema (Postgres)

-- 2. Design the SQL database schema to store all required task list data.
-- * Schema should define all tables, columns, and constraints
-- * Schema should be written in SQL
-- * Feel free to add any additional commentary as to why certain decisions were made


-- The first table we need is the task_groups table and simply needs a 
-- primary key and a group name. I considered making the name column unique
-- but decided not to as it's possible someone might (even though it
-- may not be the greatest idea to) want to create multiple groups with
-- the same name. That's a decision for the design team to make.

CREATE TABLE task_groups (
    id SERIAL,
    name VARCHAR (40) NOT NULL,
    PRIMARY KEY (id)
);

-- The second table is the tasks table, which has most of the data needed
-- for each task, minus the dependencies which will be handled later.
-- The reason for this is that given a potential one to many relationship,
-- this is best handled in a relational database by having another table
-- that scales vertically rather than having a column that has possibly
-- multiple values. The completedAt column is a timestamp, which we default to null
-- for cases where they have not been completed, which should be every
-- time a new task is added. The group_id references the other table
-- task_groups and we could take the name from there. This is better than
-- having simple group names as having an id number is guaranteed to make these
-- unique as opposed to leaving it to the user to input unique strings.


CREATE TABLE tasks (
    id SERIAL,
    group_id INTEGER NOT NULL,
    task VARCHAR(70) NOT NULL,
		completedAt TIMESTAMP NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (group_id) REFERENCES task_groups (id)
);

-- This is where I'm handling the dependencies. You don't technically need
-- the id column here as a primary key if you're making sure that each combination
-- of task and it's dependency are unique (which we are handling), but I prefer
-- having the tables have each row have an id. What this table does is 
-- handles the many to many relationship where each task can have multiple
-- dependencies, and each dependency can possibly have multiple tasks dependent
-- on them.

CREATE TABLE dependencies (
    id SERIAL,
    task_id INTEGER NOT NULL,
    dependency_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (task_id, dependency_id) REFERENCES tasks (id, id),
    CONSTRAINT task_dependency_id UNIQUE (task_id, dependency_id)
);