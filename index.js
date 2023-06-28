function createEmployeeRecord(testEmployee) {
    return {

        firstName: testEmployee[0],
        familyName: testEmployee[1],
        title: testEmployee[2],
        payPerHour: testEmployee[3],
        timeInEvents: [],
        timeOutEvents: [],

    }
}

function createEmployeeRecords(testEmployee) {
    return testEmployee.map(function (employeeData) {
        return createEmployeeRecord(employeeData)
    })

}

function createTimeInEvent(employeeRecord, timeIn) {
    const [date, hour] = timeIn.split(' ')
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, timeOut) {
    const [date, hour] = timeOut.split(' ')
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
    let totalHoursWorked = 0;
    for (let i = 0; i < employeeRecord.timeInEvents.length; i++) {
        const timeInEvent = employeeRecord.timeInEvents[i];
        const timeOutEvent = employeeRecord.timeOutEvents[i];
        if (timeInEvent.date === date) {
            const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
            totalHoursWorked += hoursWorked;
        }
    }
    return totalHoursWorked;
}

let allWagesFor = (employeeRecord) => {
    let employeeWages = []
    let datesWorked = employeeRecord.timeInEvents.map((e) => e.date)
    for (let date of datesWorked) {
        employeeWages.push(wagesEarnedOnDate(employeeRecord, date))
    }
    return employeeWages.reduce((total, wage) => total + wage)
}

let calculatePayroll = (AllEmployeeRecords) => {
    return AllEmployeeRecords.reduce((previousAmount, employee) => {
        return previousAmount + allWagesFor(employee)
    }, 0)
}
