const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohort = process.argv[2];

//accepts an SQL query as a string, returns promise
pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE '%${cohort || 'JUL02'}%'
ORDER BY teacher;
`)
  .then(res => { //res is an array of objects
    console.log(res.rows);

  })
  .catch(err => console.error('query error', err.stack));