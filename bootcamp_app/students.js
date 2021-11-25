const { Pool } = require('pg');

//pool or client
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohort = process.argv[2];
const limit = process.argv[3] || 5;

//Parameterized queries: stores all values in an array to avoid sql injection
const values = [`%${cohort}%`, limit];

//accepts an SQL query as a string, returns promise
pool.query(`
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;
`, values) //values as second parameter
  .then(res => { //res is an array of objects
    console.log(res.rows);
  })
  .catch(err => console.error('query error', err.stack));