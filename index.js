
function createEmployeeRecord(employeeData) {
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}


function createEmployeeRecords(employeeDataArray) {
    return employeeDataArray.map(createEmployeeRecord);
}

  

function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
  
    if (timeIn && timeOut) {
      return (timeOut.hour - timeIn.hour) / 100;
    } else {
      return 0; 
    }
  }
  

function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
}

function createTimeInEvent(employee, dateTimeString) {
    if (!employee.timeInEvents) {
      employee.timeInEvents = [];
    }
  
    const [date, hour] = dateTimeString.split(' ');
    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date
    });
    return employee;
  }
  
  
  const ultronData = [
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150]
  ];
  
  
  const employeeRecords = createEmployeeRecords(ultronData);
  
  const employeeRecord = createEmployeeRecord(["Loki", "Laufeysson-Odinsson", "HR Representative", 35]);
  const updatedEmployee = createTimeInEvent(employeeRecord, "2014-02-28 14:00");
  console.log(updatedEmployee);
  
function createTimeOutEvent(employee, dateTimeString) {
    if (!employee.timeOutEvents) {
        employee.timeOutEvents = [];
    }
    const [date, hour] = dateTimeString.split(' ');
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });
    return employee;
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
}

function findEmployeeByFirstName(collection, firstNameString) {
    return collection.find(employee => employee.firstName === firstNameString);
  }
  

  const foundEmployee = findEmployeeByFirstName(employeeRecords, "Loki");
  console.log(foundEmployee);
  
console.log(allWagesFor(employeeRecords[0])); 
console.log(allWagesFor(employeeRecords[1])); 
console.log(calculatePayroll(employeeRecords)); 



/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

