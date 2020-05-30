var fs = require('fs');
var readLineSync = require('readline-sync');

// Get data
function getData() {
    let getData = JSON.parse(fs.readFileSync('./data.json'), { encoding: 'utf-8' });
    return getData;
}

// Set data
function setData(dataJson) {
    fs.writeFileSync('./data.json', JSON.stringify(dataJson));
}


// push data
function readData(pushData) {
    let jsonData = JSON.parse(fs.readFileSync('./data.json', { encoding: 'utf-8' }));
    jsonData.push(pushData);
    fs.writeFileSync('data.json', JSON.stringify(jsonData));
    console.log('Push thanh cong!!!');
}

// show data
function showData() {
    for (let i = 0; i < getData().length; i++) {
        console.log(`ID${i + 1}: name: ${getData()[i].name}, phone: ${getData()[i].phone}`);
    }
}

// show question    
function showQuestion() {
    let qtion;
    function Question() {
        console.log('Enter number 1-6: \n1. Show contacts \n2. Add contacts \n3. Remove contact \n4. Edit contact \n5. Find contact \n6. Exit ');
        qtion = Number(parseInt(readLineSync.question(': ')));
    }
    Question();
    while(qtion) {
        console.log(qtion);
        if(qtion === 1) {
            showData();
            Question();
        }
        if(qtion === 2) {
            addData();
            Question();
        }
        if(qtion === 3) {
            rmvData();
            Question();
        }
        if(qtion === 4) {
            editData();
            Question();
        }
        if(qtion === 5) {
            findName();
            Question();
        }
        if(qtion === 6) {
            console.log('Exit...');
            break;
        }
    }
}

/* Add data */
function addData() {
    let name = readLineSync.question('Enter name: '),
        phone = readLineSync.question('Enter phone: ');
    let obj = {
        name: name,
        phone: parseInt(phone)
    }
    readData(obj);
}
/* End add data */

/* Edit data*/
function editData() {
    showData();
    console.log('Please enter ID Edit: ');
    let id = Number(readLineSync.question(': '));
    let getData = JSON.parse(fs.readFileSync('./data.json', {encoding: 'utf-8'}));

    let editName = readLineSync.question('Enter edit name: '),
        editPhone = parseInt(readLineSync.question('Enter edit phone: '));
    getData[id-1].name = editName;
    getData[id-1].phone = editPhone;
    fs.writeFileSync('data.json', JSON.stringify(getData));
    console.log('Edit ok...');
}
/* End edit data */ 

/* Remove data */
function rmvData() { 
    showData();
    console.log('Please enter ID remove: ')
    let id = Number(readLineSync.question(': '));
    let getdata = getData();
    getdata.splice(id-1, 1);
    console.log('Remove ok...');
    setData(getdata);
}
/* End remove date */

/* Find data */
function findName() {
    showData();
    console.log('Please enter name or phone find: ');
    let nameOfphone = readLineSync.question(': ');
    let data = getData();
    let lengthData = data.length;
    let lengthNameOfPhone = nameOfphone.length;
    let count = 0;
    let count1 = 0;
    let arrDatas = [];
    let str;
    if (typeof nameOfphone === 'string') {
        // Find follow name
        for (let i = 0; i < lengthData; i++) {
            count = 0;
            count1 = 0;
            for (let x of data[i].name.toUpperCase()) {
                for (let y of nameOfphone.toUpperCase()) {
                    // Check first character
                    if (count1 === count) {
                        count1 += 1;
                        if (x === y) {
                            count += 1;
                            if (count === lengthNameOfPhone) {
                                arrDatas.push(data[i]);
                            }
                        }
                    }
                    else break;
                }
            }
        }
    }
    if(typeof Number(nameOfphone) === 'number') {
        // Find follow phone
        for (let i = 0; i < lengthData; i++) {
            str = String(data[i].phone);
            count = 0;
            count1 = 0;
            for (let x of str) {
                for (let y of nameOfphone) {
                    // Check first character
                    if (count1 === count) {
                        count1 += 1;
                        if (x === y) {
                            count += 1;
                            if (count === nameOfphone.length) {
                                arrDatas.push(data[i]);
                            }
                        }
                    }
                    else break;
                }
            }
        }
    }
    let lengthArrData = arrDatas.length;
    for(let i = 0; i< lengthArrData; i++) {
        console.log(`ID${i+1}: name: ${arrDatas[i].name}, phone: ${arrDatas[i].phone}`)
    }
}
/*End find date */

function main() {
    showQuestion();
}
main();