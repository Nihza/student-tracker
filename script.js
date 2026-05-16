const studentNameInput = document.getElementById("studentName");
const studentGradeInput = document.getElementById("studentGrade");
const addStudentBtn = document.getElementById("addStudentBtn");
const studentList = document.getElementById("studentList");
const averageGrade = document.getElementById("averageGrade");

let students = JSON.parse(localStorage.getItem("students")) || [];

renderStudents();

addStudentBtn.addEventListener("click", () => {

    const name = studentNameInput.value.trim();
    const grade = Number(studentGradeInput.value);

   
    if (name === "") {
        alert("Student name cannot be empty");
        return;
    }

    if (isNaN(grade) || grade < 0 || grade > 100) {
        alert("Grade must be between 0 and 100");
        return;
    }

    const student = {
        id: Date.now(),
        name,
        grade
    };

    students.push(student);

    saveToLocalStorage();

    renderStudents();

    studentNameInput.value = "";
    studentGradeInput.value = "";
});


function renderStudents() {

    studentList.innerHTML = "";

    const avg = calculateAverage();

    students.forEach(student => {

        const row = document.createElement("tr");

        
        if (student.grade > avg) {
            row.classList.add("above-average");
        }

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.grade}</td>
            <td>
                <button onclick="deleteStudent(${student.id})">
                    Delete
                </button>
            </td>
        `;

        studentList.appendChild(row);
    });

    averageGrade.textContent = `Average Grade: ${avg.toFixed(2)}`;
}


function deleteStudent(id) {

    students = students.filter(student => student.id !== id);

    saveToLocalStorage();

    renderStudents();
}


function calculateAverage() {

    if (students.length === 0) {
        return 0;
    }

    const total = students.reduce((sum, student) => {
        return sum + student.grade;
    }, 0);

    return total / students.length;
}


function saveToLocalStorage() {
    localStorage.setItem("students", JSON.stringify(students));
}