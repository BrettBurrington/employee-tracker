
INSERT INTO department (name)
VALUES
  ('Engineering'),
  ('Sales'),
  ('Marketing'),
  ('HR');


INSERT INTO role (title, salary, department_id)
VALUES
  ('Software Engineer', 80000.00, 1),
  ('Sales Manager', 100000.00, 2),
  ('Marketing Specialist', 60000.00, 3),
  ('HR Administrator', 50000.00, 4);


INSERT INTO employee (first_name, last_name, role_id)
VALUES
  ('John', 'Doe', 1),
  ('Jane', 'Smith', 2),
  ('Michael', 'Johnson', 3),
  ('Mary', 'Williams', 4);


UPDATE employee AS e
JOIN employee AS manager ON manager.first_name = 'John' AND manager.last_name = 'Doe'
SET e.manager_id = manager.id
WHERE e.first_name IN ('Jane', 'Michael');
