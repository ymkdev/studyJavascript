const fs = require('fs');
const data = fs.readFileSync('../README.md');
console.log(data);
console.log('작업완료');
