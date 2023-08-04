
INSERT INTO department (name)
VALUES
  ('Engineering'),
  ('Sales'),
  ('Marketing'),
  ('HR');


INSERT INTO role (title, salary, department_id)
VALUES
  ('Software Engineer', 82500.00, 1),
  ('Sales Manager', 103000.00, 2),
  ('Marketing Specialist', 60000.00, 3),
  ('HR Administrator', 51450.00, 4);


INSERT INTO employee (first_name, last_name, role_id)
VALUES
  ('Mike', 'Uune', 1),
  ('Alex', 'Koster', 2),
  ('Michael', 'Reftin', 3),
  ('Andre', 'Willison', 4);


UPDATE employee AS e
JOIN employee AS manager ON manager.first_name = 'Mike' AND manager.last_name = 'Uune'
SET e.manager_id = manager.id
WHERE e.first_name IN ('Mike', 'Alex', 'Michael', 'Andre');
