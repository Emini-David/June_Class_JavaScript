let students = [];

function addStudent() {

    let studentName = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let gender = document.getElementById("gender").value;

    let student = {
        name: studentName,
        phone: phone,
        gender: gender
    };

    students.push(student);

    showStudents();

    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("gender").value = "";
}

function showStudents() {

    let output = "";

    students.map(function (student, index, array) {

        output += `
        <tr>
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.phone}</td>
            <td>${student.gender}</td>
            <td>
                <button onclick="deleteStudent(${index})">
                    Delete
                </button>
            </td>
        </tr>
        `;

    });

    document.getElementById("display").innerHTML = output;

    // students.forEach(function (student) {
    //     console.log(student);
    // });

}

function deleteStudent(index) {

    students.splice(index, 1);

    showStudents();

}let students = [];

function addStudent() {

    let studentName = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let gender = document.getElementById("gender").value;

    let student = {
        name: studentName,
        phone: phone,
        gender: gender
    };

    students.push(student);

    showStudents();

    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("gender").value = "";
}

function showStudents() {

    let output = "";

    students.map(function (student, index, array) {

        output += `
        <tr>
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.phone}</td>
            <td>${student.gender}</td>
            <td>
                <button onclick="deleteStudent(${index})">
                    Delete
                </button>
            </td>
        </tr>
        `;

    });

    document.getElementById("display").innerHTML = output;

    // students.forEach(function (student) {
    //     console.log(student);
    // });

}

function deleteStudent(index) {

    students.splice(index, 1);

    showStudents();

}