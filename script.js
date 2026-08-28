/* =========================================================
   STUDENT MANAGEMENT SYSTEM
   NO LOCAL STORAGE
   All student data exists only in this JavaScript array.
========================================================= */


/* =========================================================
   STUDENT ARRAY
========================================================= */

let students = [];


/* =========================================================
   CURRENT LOGIN
========================================================= */

let currentStudentId = null;
let editingStudentId = null;


/* =========================================================
   ADMIN LOGIN
=========================================================

   IMPORTANT:
   These credentials are intentionally kept in JavaScript
   for this frontend-only educational project.

   Change them here if required.
========================================================= */

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";


/* =========================================================
   COURSE DATA
========================================================= */

const courseData = {

    "Management": [
        "BBA",
        "MBA",
        "MHRM"
    ],

    "Computer Science": [
        "BCA",
        "MCA",
        "IMCA"
    ],

    "Commerce": [
        "BCom",
        "MCom"
    ],

    "Multimedia": [
        "Multimedia",
        "Animation"
    ],

    "Hotel Management": [
        "BHM",
        "MHM"
    ],

    "Psychology": [
        "BPSY",
        "MPSY"
    ],

    "Social Work": [
        "BSW",
        "MSW"
    ]

};


/* =========================================================
   PAGE ELEMENTS
========================================================= */

const pages = {

    role: document.getElementById("rolePage"),

    studentLogin:
        document.getElementById("studentLoginPage"),

    registration:
        document.getElementById("studentRegistrationPage"),

    adminLogin:
        document.getElementById("adminLoginPage"),

    studentDashboard:
        document.getElementById("studentDashboardPage"),

    adminDashboard:
        document.getElementById("adminDashboardPage")

};


/* =========================================================
   SHOW PAGE FUNCTION
========================================================= */

function showPage(page) {

    Object.values(pages).forEach(function (currentPage) {
        currentPage.classList.remove("active-page");
    });

    page.classList.add("active-page");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   ROLE SELECTION
========================================================= */

document
    .getElementById("studentRoleBtn")
    .addEventListener("click", function () {

        clearMessage("studentLoginMessage");

        showPage(pages.studentLogin);

    });


document
    .getElementById("adminRoleBtn")
    .addEventListener("click", function () {

        clearMessage("adminLoginMessage");

        showPage(pages.adminLogin);

    });


/* =========================================================
   STUDENT LOGIN BACK
========================================================= */

document
    .getElementById("studentLoginBack")
    .addEventListener("click", function () {

        showPage(pages.role);

    });


/* =========================================================
   ADMIN LOGIN BACK
========================================================= */

document
    .getElementById("adminLoginBack")
    .addEventListener("click", function () {

        showPage(pages.role);

    });


/* =========================================================
   REGISTRATION NAVIGATION
========================================================= */

document
    .getElementById("registerNowButton")
    .addEventListener("click", function () {

        clearMessage("registrationMessage");

        document
            .getElementById("studentRegistrationForm")
            .reset();

        populateCourseDropdown(
            document.getElementById("course"),
            ""
        );

        showPage(pages.registration);

    });


document
    .getElementById("showLoginButton")
    .addEventListener("click", function () {

        showPage(pages.studentLogin);

    });


document
    .getElementById("registrationBack")
    .addEventListener("click", function () {

        showPage(pages.studentLogin);

    });


/* =========================================================
   DEPARTMENT → COURSE
========================================================= */

document
    .getElementById("department")
    .addEventListener("change", function () {

        const department = this.value;

        populateCourseDropdown(
            document.getElementById("course"),
            department
        );

    });


function populateCourseDropdown(selectElement, department) {

    selectElement.innerHTML = "";

    if (!department) {

        const option = document.createElement("option");

        option.value = "";
        option.textContent = "Select Department First";

        selectElement.appendChild(option);

        return;
    }


    const defaultOption =
        document.createElement("option");

    defaultOption.value = "";
    defaultOption.textContent = "Select Course";

    selectElement.appendChild(defaultOption);


    const courses = courseData[department] || [];


    courses.forEach(function (course) {

        const option =
            document.createElement("option");

        option.value = course;
        option.textContent = course;

        selectElement.appendChild(option);

    });

}


/* =========================================================
   REGISTRATION
========================================================= */

document
    .getElementById("studentRegistrationForm")
    .addEventListener("submit", async function (event) {

        event.preventDefault();


        clearMessage("registrationMessage");


        const studentId =
            document.getElementById("studentId")
                .value.trim();

        const username =
            document.getElementById("username")
                .value.trim();

        const password =
            document.getElementById("password")
                .value;

        const confirmPassword =
            document.getElementById("confirmPassword")
                .value;

        const fullName =
            document.getElementById("fullName")
                .value.trim();

        const dateOfBirth =
            document.getElementById("dateOfBirth")
                .value;

        const gender =
            document.getElementById("gender")
                .value;

        const email =
            document.getElementById("email")
                .value.trim();

        const phone =
            document.getElementById("phone")
                .value.trim();

        const address =
            document.getElementById("address")
                .value.trim();

        const department =
            document.getElementById("department")
                .value;

        const course =
            document.getElementById("course")
                .value;

        const semester =
            document.getElementById("semester")
                .value;

        const admissionNumber =
            document.getElementById("admissionNumber")
                .value.trim();

        const admissionYear =
            document.getElementById("admissionYear")
                .value;


        /* -------------------------------------------------
           VALIDATION
        ------------------------------------------------- */

        if (
            !studentId ||
            !username ||
            !password ||
            !confirmPassword ||
            !fullName ||
            !dateOfBirth ||
            !gender ||
            !email ||
            !phone ||
            !address ||
            !department ||
            !course ||
            !semester ||
            !admissionNumber ||
            !admissionYear
        ) {

            showMessage(
                "registrationMessage",
                "Please fill in all required fields.",
                "error"
            );

            return;
        }


        if (password.length < 6) {

            showMessage(
                "registrationMessage",
                "Password must contain at least 6 characters.",
                "error"
            );

            return;
        }


        if (password !== confirmPassword) {

            showMessage(
                "registrationMessage",
                "Password and Confirm Password do not match.",
                "error"
            );

            return;
        }


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            showMessage(
                "registrationMessage",
                "Please enter a valid email address.",
                "error"
            );

            return;
        }


        const phonePattern =
            /^[0-9+\-\s()]{7,20}$/;

        if (!phonePattern.test(phone)) {

            showMessage(
                "registrationMessage",
                "Please enter a valid phone number.",
                "error"
            );

            return;
        }


        /* -------------------------------------------------
           DUPLICATE CHECK
        ------------------------------------------------- */

        const duplicateStudentId =
            students.some(function (student) {

                return student.studentId.toLowerCase()
                    === studentId.toLowerCase();

            });


        if (duplicateStudentId) {

            showMessage(
                "registrationMessage",
                "This Student ID is already registered.",
                "error"
            );

            return;
        }


        const duplicateUsername =
            students.some(function (student) {

                return student.username.toLowerCase()
                    === username.toLowerCase();

            });


        if (duplicateUsername) {

            showMessage(
                "registrationMessage",
                "This username is already registered.",
                "error"
            );

            return;
        }


        /* -------------------------------------------------
           FILE READING
        ------------------------------------------------- */

        let photoData = "";
        let certificateData = "";

        const photoFile =
            document.getElementById("photo")
                .files[0];

        const certificateFile =
            document.getElementById("plusTwoCertificate")
                .files[0];


        if (photoFile) {

            photoData =
                await readFileAsDataURL(photoFile);

        }


        if (certificateFile) {

            certificateData =
                await readFileAsDataURL(certificateFile);

        }


        /* -------------------------------------------------
           STUDENT OBJECT
        ------------------------------------------------- */

        const newStudent = {

            studentId: studentId,

            username: username,

            password: password,

            fullName: fullName,

            dateOfBirth: dateOfBirth,

            gender: gender,

            email: email,

            phone: phone,

            address: address,

            department: department,

            course: course,

            semester: semester,

            admissionNumber: admissionNumber,

            admissionYear: admissionYear,

            photo: photoData,

            plusTwoCertificate: certificateData

        };


        /* -------------------------------------------------
           ADD TO ARRAY
        ------------------------------------------------- */

        students.push(newStudent);


        /* -------------------------------------------------
           SUCCESS
        ------------------------------------------------- */

        showMessage(
            "registrationMessage",
            "Registration Successful! Redirecting to Student Login...",
            "success"
        );


        document
            .getElementById("studentRegistrationForm")
            .reset();


        populateCourseDropdown(
            document.getElementById("course"),
            ""
        );


        setTimeout(function () {

            showPage(pages.studentLogin);

        }, 1500);

    });


/* =========================================================
   FILE → DATA URL
========================================================= */

function readFileAsDataURL(file) {

    return new Promise(function (resolve, reject) {

        const reader = new FileReader();

        reader.onload = function () {

            resolve(reader.result);

        };

        reader.onerror = function () {

            reject(reader.error);

        };

        reader.readAsDataURL(file);

    });

}


/* =========================================================
   STUDENT LOGIN
========================================================= */

document
    .getElementById("studentLoginForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();


        clearMessage("studentLoginMessage");


        const loginValue =
            document.getElementById(
                "studentLoginUsername"
            ).value.trim();


        const password =
            document.getElementById(
                "studentLoginPassword"
            ).value;


        const student =
            students.find(function (student) {

                return (
                    (
                        student.studentId.toLowerCase()
                        === loginValue.toLowerCase()
                    )
                    ||
                    (
                        student.username.toLowerCase()
                        === loginValue.toLowerCase()
                    )
                )
                &&
                student.password === password;

            });


        if (!student) {

            showMessage(
                "studentLoginMessage",
                "Invalid Student ID/Username or Password.",
                "error"
            );

            return;
        }


        /* -----------------------------------------------
           Correct student found
        ------------------------------------------------ */

        currentStudentId =
            student.studentId;


        document
            .getElementById("studentLoginForm")
            .reset();


        displayStudentDashboard(student);


        showPage(pages.studentDashboard);

    });


/* =========================================================
   STUDENT DASHBOARD
========================================================= */

function displayStudentDashboard(student) {

    const content =
        document.getElementById(
            "studentDashboardContent"
        );


    const photoHTML =
        student.photo

            ?

            `<img
                src="${student.photo}"
                class="profile-photo"
                alt="Student Photograph"
            >`

            :

            `<div class="profile-placeholder">
                👤
            </div>`;


    content.innerHTML = `

        <div class="profile-header">

            ${photoHTML}

            <div>

                <h2>${escapeHTML(student.fullName)}</h2>

                <p class="profile-id">
                    Student ID:
                    ${escapeHTML(student.studentId)}
                </p>

            </div>

        </div>


        <div class="detail-card">

            <h3>Personal Details</h3>

            <div class="detail-grid">

                ${detailItem(
                    "Full Name",
                    student.fullName
                )}

                ${detailItem(
                    "Date of Birth",
                    student.dateOfBirth
                )}

                ${detailItem(
                    "Gender",
                    student.gender
                )}

            </div>

        </div>


        <div class="detail-card">

            <h3>Contact Details</h3>

            <div class="detail-grid">

                ${detailItem(
                    "Email",
                    student.email
                )}

                ${detailItem(
                    "Phone",
                    student.phone
                )}

                ${detailItem(
                    "Address",
                    student.address
                )}

            </div>

        </div>


        <div class="detail-card">

            <h3>Academic & Course Details</h3>

            <div class="detail-grid">

                ${detailItem(
                    "Department",
                    student.department
                )}

                ${detailItem(
                    "Course",
                    student.course
                )}

                ${detailItem(
                    "Semester",
                    student.semester
                )}

            </div>

        </div>


        <div class="detail-card">

            <h3>Admission Details</h3>

            <div class="detail-grid">

                ${detailItem(
                    "Student ID",
                    student.studentId
                )}

                ${detailItem(
                    "Username",
                    student.username
                )}

                ${detailItem(
                    "Admission Number",
                    student.admissionNumber
                )}

                ${detailItem(
                    "Admission Year",
                    student.admissionYear
                )}

            </div>

        </div>


        <div class="detail-card">

            <h3>My Documents</h3>

            ${getDocumentsHTML(student)}

        </div>

    `;

}


/* =========================================================
   DETAIL ITEM
========================================================= */

function detailItem(label, value) {

    return `

        <div class="detail-item">

            <span class="detail-label">
                ${escapeHTML(label)}
            </span>

            <span class="detail-value">
                ${escapeHTML(value || "Not provided")}
            </span>

        </div>

    `;

}


/* =========================================================
   DOCUMENTS HTML
========================================================= */

function getDocumentsHTML(student) {

    let html = "";


    if (student.photo) {

        html += `

            <div class="document-card">

                <div class="document-info">

                    <span class="document-icon">
                        🖼️
                    </span>

                    <div>
                        <strong>
                            Student Photograph
                        </strong>
                    </div>

                </div>

                <a
                    href="${student.photo}"
                    target="_blank"
                >
                    View
                </a>

            </div>

        `;

    }


    if (student.plusTwoCertificate) {

        html += `

            <div class="document-card">

                <div class="document-info">

                    <span class="document-icon">
                        📄
                    </span>

                    <div>
                        <strong>
                            12th / Plus Two Certificate
                        </strong>
                    </div>

                </div>

                <a
                    href="${student.plusTwoCertificate}"
                    target="_blank"
                >
                    View Document
                </a>

            </div>

        `;

    }


    if (!html) {

        html = `

            <p style="color:#64748b;">
                No documents uploaded.
            </p>

        `;

    }


    return html;

}


/* =========================================================
   STUDENT SIDEBAR
========================================================= */

document
    .querySelectorAll("[data-student-section]")
    .forEach(function (button) {

        button.addEventListener("click", function () {

            if (!currentStudentId) {
                return;
            }


            const student =
                students.find(function (student) {

                    return student.studentId
                        === currentStudentId;

                });


            if (student) {

                displayStudentDashboard(student);

            }


            document
                .querySelectorAll(
                    "[data-student-section]"
                )
                .forEach(function (btn) {

                    btn.classList.remove("active");

                });


            this.classList.add("active");

        });

    });


/* =========================================================
   STUDENT LOGOUT
========================================================= */

document
    .getElementById("studentLogoutButton")
    .addEventListener("click", function () {

        currentStudentId = null;

        showPage(pages.role);

    });


/* =========================================================
   ADMIN LOGIN
========================================================= */

document
    .getElementById("adminLoginForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();


        clearMessage("adminLoginMessage");


        const username =
            document.getElementById(
                "adminUsername"
            ).value.trim();


        const password =
            document.getElementById(
                "adminPassword"
            ).value;


        if (
            username === ADMIN_USERNAME &&
            password === ADMIN_PASSWORD
        ) {

            document
                .getElementById("adminLoginForm")
                .reset();


            renderAdminDashboard();


            showPage(pages.adminDashboard);

        }

        else {

            showMessage(
                "adminLoginMessage",
                "Invalid Admin Username or Password.",
                "error"
            );

        }

    });


/* =========================================================
   ADMIN LOGOUT
========================================================= */

document
    .getElementById("adminLogoutButton")
    .addEventListener("click", function () {

        showPage(pages.role);

    });


/* =========================================================
   ADMIN DASHBOARD
========================================================= */

function renderAdminDashboard() {

    updateStatistics();

    renderStudentTable();

}


/* =========================================================
   STATISTICS
========================================================= */

function updateStatistics() {

    document
        .getElementById("totalStudents")
        .textContent = students.length;


    const departments =
        new Set(
            students.map(function (student) {
                return student.department;
            })
        );


    const courses =
        new Set(
            students.map(function (student) {
                return student.course;
            })
        );


    document
        .getElementById("totalDepartments")
        .textContent = departments.size;


    document
        .getElementById("totalCourses")
        .textContent = courses.size;

}


/* =========================================================
   RENDER STUDENT TABLE
========================================================= */

function renderStudentTable() {

    const tbody =
        document.getElementById(
            "studentTableBody"
        );


    const search =
        document.getElementById(
            "studentSearch"
        ).value.trim().toLowerCase();


    const department =
        document.getElementById(
            "departmentFilter"
        ).value;


    const course =
        document.getElementById(
            "courseFilter"
        ).value;


    const filteredStudents =
        students.filter(function (student) {

            const searchableText = (

                student.studentId +
                " " +
                student.fullName +
                " " +
                student.email +
                " " +
                student.course +
                " " +
                student.department

            ).toLowerCase();


            const matchesSearch =
                searchableText.includes(search);


            const matchesDepartment =
                !department ||
                student.department === department;


            const matchesCourse =
                !course ||
                student.course === course;


            return (
                matchesSearch &&
                matchesDepartment &&
                matchesCourse
            );

        });


    tbody.innerHTML = "";


    if (filteredStudents.length === 0) {

        tbody.innerHTML = `

            <tr>

                <td
                    colspan="9"
                    class="no-students"
                >

                    ${
                        students.length === 0

                            ?

                            "No students registered yet."

                            :

                            "No students match your search/filter."

                    }

                </td>

            </tr>

        `;

        return;

    }


    filteredStudents.forEach(function (student) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${escapeHTML(student.studentId)}
            </td>

            <td>
                ${escapeHTML(student.fullName)}
            </td>

            <td>
                ${escapeHTML(student.email)}
            </td>

            <td>
                ${escapeHTML(student.phone)}
            </td>

            <td>
                ${escapeHTML(student.department)}
            </td>

            <td>
                ${escapeHTML(student.course)}
            </td>

            <td>
                ${escapeHTML(student.semester)}
            </td>

            <td>
                ${escapeHTML(student.admissionYear)}
            </td>

            <td>

                <div class="action-buttons">

                    <button
                        class="small-button view-button"
                        onclick="viewStudent('${escapeAttribute(student.studentId)}')"
                    >
                        View
                    </button>

                    <button
                        class="small-button edit-button"
                        onclick="editStudent('${escapeAttribute(student.studentId)}')"
                    >
                        Edit
                    </button>

                    <button
                        class="small-button delete-button"
                        onclick="deleteStudent('${escapeAttribute(student.studentId)}')"
                    >
                        Delete
                    </button>

                </div>

            </td>

        `;


        tbody.appendChild(row);

    });

}


/* =========================================================
   SEARCH
========================================================= */

document
    .getElementById("studentSearch")
    .addEventListener("input", function () {

        renderStudentTable();

    });


/* =========================================================
   DEPARTMENT FILTER
========================================================= */

document
    .getElementById("departmentFilter")
    .addEventListener("change", function () {

        const department = this.value;


        populateCourseDropdown(
            document.getElementById("courseFilter"),
            department
        );


        const courseFilter =
            document.getElementById("courseFilter");


        courseFilter.value = "";


        renderStudentTable();

    });


/* =========================================================
   COURSE FILTER
========================================================= */

document
    .getElementById("courseFilter")
    .addEventListener("change", function () {

        renderStudentTable();

    });


/* =========================================================
   VIEW STUDENT
========================================================= */

function viewStudent(studentId) {

    const student =
        students.find(function (student) {

            return student.studentId === studentId;

        });


    if (!student) {

        alert("Student not found.");

        return;

    }


    const content =
        document.getElementById(
            "studentDetailsContent"
        );


    const photoHTML =
        student.photo

            ?

            `<img
                src="${student.photo}"
                class="admin-profile-photo"
                alt="Student Photograph"
            >`

            :

            `<div class="profile-placeholder">
                👤
            </div>`;


    content.innerHTML = `

        <h2>Student Complete Profile</h2>


        <div class="student-detail-top">

            ${photoHTML}

            <div>

                <h3>
                    ${escapeHTML(student.fullName)}
                </h3>

                <p>
                    Student ID:
                    <strong>
                        ${escapeHTML(student.studentId)}
                    </strong>
                </p>

            </div>

        </div>


        <div class="detail-card">

            <h3>Account Details</h3>

            <div class="detail-grid">

                ${detailItem(
                    "Student ID",
                    student.studentId
                )}

                ${detailItem(
                    "Username",
                    student.username
                )}

            </div>

        </div>


        <div class="detail-card">

            <h3>Personal Details</h3>

            <div class="detail-grid">

                ${detailItem(
                    "Full Name",
                    student.fullName
                )}

                ${detailItem(
                    "Date of Birth",
                    student.dateOfBirth
                )}

                ${detailItem(
                    "Gender",
                    student.gender
                )}

            </div>

        </div>


        <div class="detail-card">

            <h3>Contact Details</h3>

            <div class="detail-grid">

                ${detailItem(
                    "Email",
                    student.email
                )}

                ${detailItem(
                    "Phone",
                    student.phone
                )}

                ${detailItem(
                    "Address",
                    student.address
                )}

            </div>

        </div>


        <div class="detail-card">

            <h3>Academic Details</h3>

            <div class="detail-grid">

                ${detailItem(
                    "Department",
                    student.department
                )}

                ${detailItem(
                    "Course",
                    student.course
                )}

                ${detailItem(
                    "Semester",
                    student.semester
                )}

            </div>

        </div>


        <div class="detail-card">

            <h3>Admission Details</h3>

            <div class="detail-grid">

                ${detailItem(
                    "Admission Number",
                    student.admissionNumber
                )}

                ${detailItem(
                    "Admission Year",
                    student.admissionYear
                )}

            </div>

        </div>


        <div class="detail-card">

            <h3>Uploaded Documents</h3>

            ${getDocumentsHTML(student)}

        </div>

    `;


    document
        .getElementById("studentDetailsModal")
        .classList.add("show");

}


/* =========================================================
   CLOSE VIEW MODAL
========================================================= */

document
    .getElementById("closeStudentDetails")
    .addEventListener("click", function () {

        document
            .getElementById("studentDetailsModal")
            .classList.remove("show");

    });


/* =========================================================
   EDIT STUDENT
========================================================= */

function editStudent(studentId) {

    const student =
        students.find(function (student) {

            return student.studentId === studentId;

        });


    if (!student) {

        alert("Student not found.");

        return;

    }


    editingStudentId = studentId;


    document
        .getElementById("editOriginalStudentId")
        .value = student.studentId;


    document
        .getElementById("editStudentId")
        .value = student.studentId;


    document
        .getElementById("editUsername")
        .value = student.username;


    document
        .getElementById("editFullName")
        .value = student.fullName;


    document
        .getElementById("editDateOfBirth")
        .value = student.dateOfBirth;


    document
        .getElementById("editGender")
        .value = student.gender;


    document
        .getElementById("editEmail")
        .value = student.email;


    document
        .getElementById("editPhone")
        .value = student.phone;


    document
        .getElementById("editAddress")
        .value = student.address;


    document
        .getElementById("editDepartment")
        .value = student.department;


    populateCourseDropdown(
        document.getElementById("editCourse"),
        student.department
    );


    document
        .getElementById("editCourse")
        .value = student.course;


    document
        .getElementById("editSemester")
        .value = student.semester;


    document
        .getElementById("editAdmissionNumber")
        .value = student.admissionNumber;


    document
        .getElementById("editAdmissionYear")
        .value = student.admissionYear;


    clearMessage("editStudentMessage");


    document
        .getElementById("editStudentModal")
        .classList.add("show");

}


/* =========================================================
   EDIT DEPARTMENT → COURSE
========================================================= */

document
    .getElementById("editDepartment")
    .addEventListener("change", function () {

        populateCourseDropdown(
            document.getElementById("editCourse"),
            this.value
        );

    });


/* =========================================================
   SAVE EDITED STUDENT
========================================================= */

document
    .getElementById("editStudentForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();


        const newStudentId =
            document
                .getElementById("editStudentId")
                .value.trim();


        const username =
            document
                .getElementById("editUsername")
                .value.trim();


        const fullName =
            document
                .getElementById("editFullName")
                .value.trim();


        const dateOfBirth =
            document
                .getElementById("editDateOfBirth")
                .value;


        const gender =
            document
                .getElementById("editGender")
                .value;


        const email =
            document
                .getElementById("editEmail")
                .value.trim();


        const phone =
            document
                .getElementById("editPhone")
                .value.trim();


        const address =
            document
                .getElementById("editAddress")
                .value.trim();


        const department =
            document
                .getElementById("editDepartment")
                .value;


        const course =
            document
                .getElementById("editCourse")
                .value;


        const semester =
            document
                .getElementById("editSemester")
                .value;


        const admissionNumber =
            document
                .getElementById("editAdmissionNumber")
                .value.trim();


        const admissionYear =
            document
                .getElementById("editAdmissionYear")
                .value;


        if (
            !newStudentId ||
            !username ||
            !fullName ||
            !dateOfBirth ||
            !gender ||
            !email ||
            !phone ||
            !address ||
            !department ||
            !course ||
            !semester ||
            !admissionNumber ||
            !admissionYear
        ) {

            showMessage(
                "editStudentMessage",
                "Please fill in all required fields.",
                "error"
            );

            return;

        }


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            showMessage(
                "editStudentMessage",
                "Please enter a valid email address.",
                "error"
            );

            return;

        }


        const duplicateId =
            students.some(function (student) {

                return (
                    student.studentId.toLowerCase()
                    === newStudentId.toLowerCase()
                    &&
                    student.studentId
                    !== editingStudentId
                );

            });


        if (duplicateId) {

            showMessage(
                "editStudentMessage",
                "Another student already uses this Student ID.",
                "error"
            );

            return;

        }


        const duplicateUsername =
            students.some(function (student) {

                return (
                    student.username.toLowerCase()
                    === username.toLowerCase()
                    &&
                    student.studentId
                    !== editingStudentId
                );

            });


        if (duplicateUsername) {

            showMessage(
                "editStudentMessage",
                "Another student already uses this username.",
                "error"
            );

            return;

        }


        const index =
            students.findIndex(function (student) {

                return student.studentId
                    === editingStudentId;

            });


        if (index === -1) {

            showMessage(
                "editStudentMessage",
                "Student record could not be found.",
                "error"
            );

            return;

        }


        /* -------------------------------------------------
           PRESERVE PASSWORD AND FILES
        ------------------------------------------------- */

        const oldStudent =
            students[index];


        students[index] = {

            studentId: newStudentId,

            username: username,

            password: oldStudent.password,

            fullName: fullName,

            dateOfBirth: dateOfBirth,

            gender: gender,

            email: email,

            phone: phone,

            address: address,

            department: department,

            course: course,

            semester: semester,

            admissionNumber: admissionNumber,

            admissionYear: admissionYear,

            photo: oldStudent.photo,

            plusTwoCertificate:
                oldStudent.plusTwoCertificate

        };


        editingStudentId = null;


        document
            .getElementById("editStudentModal")
            .classList.remove("show");


        renderAdminDashboard();


        alert("Student details updated successfully.");

    });


/* =========================================================
   CANCEL EDIT
========================================================= */

document
    .getElementById("cancelEditButton")
    .addEventListener("click", function () {

        document
            .getElementById("editStudentModal")
            .classList.remove("show");

        editingStudentId = null;

    });


/* =========================================================
   CLOSE EDIT MODAL
========================================================= */

document
    .getElementById("closeEditStudent")
    .addEventListener("click", function () {

        document
            .getElementById("editStudentModal")
            .classList.remove("show");

        editingStudentId = null;

    });


/* =========================================================
   DELETE STUDENT
========================================================= */

function deleteStudent(studentId) {

    const student =
        students.find(function (student) {

            return student.studentId === studentId;

        });


    if (!student) {

        alert("Student not found.");

        return;

    }


    const confirmation =
        confirm(
            "Are you sure you want to delete this student?"
        );


    if (!confirmation) {

        return;

    }


    const index =
        students.findIndex(function (student) {

            return student.studentId === studentId;

        });


    if (index !== -1) {

        students.splice(index, 1);

    }


    renderAdminDashboard();


    alert("Student record deleted successfully.");

}


/* =========================================================
   ADMIN ADD STUDENT
========================================================= */

document
    .getElementById("adminAddStudentButton")
    .addEventListener("click", function () {

        openAdminAddStudent();

    });


document
    .getElementById("adminAddStudentNav")
    .addEventListener("click", function () {

        openAdminAddStudent();

    });


function openAdminAddStudent() {

    /*
        Admin Add Student uses the same registration form.

        This allows the admin to add a new student without
        creating another HTML page.
    */

    clearMessage("registrationMessage");

    document
        .getElementById("studentRegistrationForm")
        .reset();


    populateCourseDropdown(
        document.getElementById("course"),
        ""
    );


    showPage(pages.registration);

}


/* =========================================================
   AFTER ADMIN ADD THROUGH REGISTRATION
========================================================= */

const originalRegistrationSubmit =
    document.getElementById(
        "studentRegistrationForm"
    );


/*
    The registration form always creates a student.
    After registration it normally goes to Student Login.

    If an admin opened the registration form, we can
    determine whether admin mode is active.
*/

let adminAddingStudent = false;


/*
    Replace the admin add button behavior to enable admin mode.
*/

function openAdminAddStudent() {

    adminAddingStudent = true;

    clearMessage("registrationMessage");

    document
        .getElementById("studentRegistrationForm")
        .reset();

    populateCourseDropdown(
        document.getElementById("course"),
        ""
    );

    showPage(pages.registration);

}


/*
    Modify the Register Now button behavior so normal
    student registration remains normal.
*/

document
    .getElementById("registerNowButton")
    .addEventListener("click", function () {

        adminAddingStudent = false;

    });


/*
    When registration succeeds, decide where to go.
*/

const registrationForm =
    document.getElementById(
        "studentRegistrationForm"
    );


/*
    Listen to successful registration indirectly by
    watching page navigation is not ideal, so the
    original submit handler already handles registration.

    The admin add flow is therefore handled by the
    following event helper.
*/


/* =========================================================
   ADMIN STUDENT NAVIGATION
========================================================= */

document
    .getElementById("adminStudentsNav")
    .addEventListener("click", function () {

        showPage(pages.adminDashboard);

        renderAdminDashboard();

    });


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   ESCAPE ATTRIBUTE
========================================================= */

function escapeAttribute(value) {

    return String(value)
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'");

}


/* =========================================================
   MESSAGE
========================================================= */

function showMessage(elementId, message, type) {

    const element =
        document.getElementById(elementId);


    if (!element) {
        return;
    }


    element.innerHTML = `

        <div class="message ${type}-message">

            ${escapeHTML(message)}

        </div>

    `;

}


/* =========================================================
   CLEAR MESSAGE
========================================================= */

function clearMessage(elementId) {

    const element =
        document.getElementById(elementId);


    if (element) {

        element.innerHTML = "";

    }

}


/* =========================================================
   CLOSE MODALS WHEN CLICKING OUTSIDE
========================================================= */

window.addEventListener("click", function (event) {

    const detailsModal =
        document.getElementById(
            "studentDetailsModal"
        );


    const editModal =
        document.getElementById(
            "editStudentModal"
        );


    if (event.target === detailsModal) {

        detailsModal.classList.remove("show");

    }


    if (event.target === editModal) {

        editModal.classList.remove("show");

    }

});


/* =========================================================
   INITIAL STATE
========================================================= */

showPage(pages.role);


/*
    IMPORTANT:
    There are NO predefined students.

    The array starts empty:

        students = []

    New students are added only when the registration
    form is successfully submitted.
*/