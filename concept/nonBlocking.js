const fs = require('fs');
const promise = fs.readFile('../README.md', (err, data) => {
    if (err) throw err;
    console.log('data 읽기 완료');
});
console.log('promise: ', promise);
console.log('작업완료');

//promise: undefined 작업완료 data 읽기 완료 