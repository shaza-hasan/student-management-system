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
   CURRENT LOGIN / EDITING STATE
========================================================= */

let currentStudentId = null;
let editingStudentId = null;


/* =========================================================
   ADMIN LOGIN
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
   SHOW PAGE
========================================================= */

function showPage(page) {

    Object.values(pages).forEach(function (currentPage) {

        if (currentPage) {
            currentPage.classList.remove("active-page");
        }

    });


    if (page) {

        page.classList.add("active-page");

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   ROLE SELECTION
========================================================= */

const studentRoleBtn =
    document.getElementById("studentRoleBtn");


if (studentRoleBtn) {

    studentRoleBtn.addEventListener("click", function () {

        clearMessage("studentLoginMessage");

        showPage(pages.studentLogin);

    });

}


const adminRoleBtn =
    document.getElementById("adminRoleBtn");


if (adminRoleBtn) {

    adminRoleBtn.addEventListener("click", function () {

        clearMessage("adminLoginMessage");

        showPage(pages.adminLogin);

    });

}


/* =========================================================
   STUDENT LOGIN BACK
========================================================= */

const studentLoginBack =
    document.getElementById("studentLoginBack");


if (studentLoginBack) {

    studentLoginBack.addEventListener("click", function () {

        clearMessage("studentLoginMessage");

        showPage(pages.role);

    });

}


/* =========================================================
   ADMIN LOGIN BACK
========================================================= */

const adminLoginBack =
    document.getElementById("adminLoginBack");


if (adminLoginBack) {

    adminLoginBack.addEventListener("click", function () {

        clearMessage("adminLoginMessage");

        showPage(pages.role);

    });

}


/* =========================================================
   STUDENT SIGN UP
=========================================================

   The student login page should contain a button
   with the ID:

       registerNowButton

   Clicking it opens the registration page.
========================================================= */

const registerNowButton =
    document.getElementById("registerNowButton");


if (registerNowButton) {

    registerNowButton.addEventListener("click", function () {

        adminAddingStudent = false;

        clearMessage("registrationMessage");

        const registrationForm =
            document.getElementById(
                "studentRegistrationForm"
            );


        if (registrationForm) {

            registrationForm.reset();

        }


        const courseSelect =
            document.getElementById("course");


        if (courseSelect) {

            populateCourseDropdown(
                courseSelect,
                ""
            );

        }


        showPage(pages.registration);

    });

}


/* =========================================================
   SHOW LOGIN FROM REGISTRATION
========================================================= */

const showLoginButton =
    document.getElementById("showLoginButton");


if (showLoginButton) {

    showLoginButton.addEventListener("click", function () {

        clearMessage("studentLoginMessage");

        showPage(pages.studentLogin);

    });

}


/* =========================================================
   REGISTRATION BACK
========================================================= */

const registrationBack =
    document.getElementById("registrationBack");


if (registrationBack) {

    registrationBack.addEventListener("click", function () {

        clearMessage("registrationMessage");

        showPage(
            adminAddingStudent
                ? pages.adminDashboard
                : pages.studentLogin
        );

    });

}


/* =========================================================
   DEPARTMENT → COURSE
========================================================= */

const departmentSelect =
    document.getElementById("department");


if (departmentSelect) {

    departmentSelect.addEventListener(
        "change",
        function () {

            const department = this.value;

            const courseSelect =
                document.getElementById("course");


            if (courseSelect) {

                populateCourseDropdown(
                    courseSelect,
                    department
                );

            }

        }
    );

}


/* =========================================================
   POPULATE COURSE DROPDOWN
========================================================= */

function populateCourseDropdown(
    selectElement,
    department
) {

    if (!selectElement) {
        return;
    }


    selectElement.innerHTML = "";


    if (!department) {

        const option =
            document.createElement("option");

        option.value = "";
        option.textContent =
            "Select Department First";

        selectElement.appendChild(option);

        return;

    }


    const defaultOption =
        document.createElement("option");

    defaultOption.value = "";
    defaultOption.textContent =
        "Select Course";

    selectElement.appendChild(defaultOption);


    const courses =
        courseData[department] || [];


    courses.forEach(function (course) {

        const option =
            document.createElement("option");

        option.value = course;
        option.textContent = course;

        selectElement.appendChild(option);

    });

}


/* =========================================================
   ADMIN ADDING STUDENT FLAG
========================================================= */

let adminAddingStudent = false;


/* =========================================================
   STUDENT REGISTRATION
========================================================= */

const studentRegistrationForm =
    document.getElementById(
        "studentRegistrationForm"
    );


if (studentRegistrationForm) {

    studentRegistrationForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            clearMessage("registrationMessage");


            /* ---------------------------------------------
               GET VALUES
            --------------------------------------------- */

            const studentId =
                document
                    .getElementById("studentId")
                    .value
                    .trim();


            const username =
                document
                    .getElementById("username")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("password")
                    .value;


            const confirmPassword =
                document
                    .getElementById("confirmPassword")
                    .value;


            const fullName =
                document
                    .getElementById("fullName")
                    .value
                    .trim();


            const dateOfBirth =
                document
                    .getElementById("dateOfBirth")
                    .value;


            const gender =
                document
                    .getElementById("gender")
                    .value;


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();


            const address =
                document
                    .getElementById("address")
                    .value
                    .trim();


            const department =
                document
                    .getElementById("department")
                    .value;


            const course =
                document
                    .getElementById("course")
                    .value;


            const semester =
                document
                    .getElementById("semester")
                    .value;


            const admissionNumber =
                document
                    .getElementById("admissionNumber")
                    .value
                    .trim();


            const admissionYear =
                document
                    .getElementById("admissionYear")
                    .value;


            /* ---------------------------------------------
               REQUIRED FIELD VALIDATION
            --------------------------------------------- */

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


            /* ---------------------------------------------
               PASSWORD VALIDATION
            --------------------------------------------- */

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


            /* ---------------------------------------------
               EMAIL VALIDATION
            --------------------------------------------- */

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


            /* ---------------------------------------------
               PHONE VALIDATION
               EXACTLY 10 DIGITS
            --------------------------------------------- */

            const phonePattern =
                /^\d{10}$/;


            if (!phonePattern.test(phone)) {

                showMessage(
                    "registrationMessage",
                    "Phone number must contain exactly 10 digits.",
                    "error"
                );

                return;

            }


            /* ---------------------------------------------
               DUPLICATE STUDENT ID
            --------------------------------------------- */

            const duplicateStudentId =
                students.some(function (student) {

                    return (
                        student.studentId.toLowerCase()
                        === studentId.toLowerCase()
                    );

                });


            if (duplicateStudentId) {

                showMessage(
                    "registrationMessage",
                    "This Student ID is already registered.",
                    "error"
                );

                return;

            }


            /* ---------------------------------------------
               DUPLICATE USERNAME
            --------------------------------------------- */

            const duplicateUsername =
                students.some(function (student) {

                    return (
                        student.username.toLowerCase()
                        === username.toLowerCase()
                    );

                });


            if (duplicateUsername) {

                showMessage(
                    "registrationMessage",
                    "This username is already registered.",
                    "error"
                );

                return;

            }


            /* ---------------------------------------------
               FILE DATA
            --------------------------------------------- */

            let photoData = "";
            let certificateData = "";


            const photoElement =
                document.getElementById("photo");


            const certificateElement =
                document.getElementById(
                    "plusTwoCertificate"
                );


            const photoFile =
                photoElement &&
                photoElement.files
                    ? photoElement.files[0]
                    : null;


            const certificateFile =
                certificateElement &&
                certificateElement.files
                    ? certificateElement.files[0]
                    : null;


            try {

                if (photoFile) {

                    photoData =
                        await readFileAsDataURL(
                            photoFile
                        );

                }


                if (certificateFile) {

                    certificateData =
                        await readFileAsDataURL(
                            certificateFile
                        );

                }

            }

            catch (error) {

                showMessage(
                    "registrationMessage",
                    "There was a problem reading the uploaded file.",
                    "error"
                );

                return;

            }


            /* ---------------------------------------------
               CREATE STUDENT OBJECT
            --------------------------------------------- */

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


            /* ---------------------------------------------
               ADD STUDENT TO ARRAY
            --------------------------------------------- */

            students.push(newStudent);


            /* ---------------------------------------------
               RESET FORM
            --------------------------------------------- */

            studentRegistrationForm.reset();


            populateCourseDropdown(
                document.getElementById("course"),
                ""
            );


            /* ---------------------------------------------
               ADMIN ADD STUDENT
            --------------------------------------------- */

            if (adminAddingStudent) {

                showMessage(
                    "registrationMessage",
                    "Student added successfully! Returning to Admin Dashboard...",
                    "success"
                );


                setTimeout(function () {

                    adminAddingStudent = false;

                    renderAdminDashboard();

                    showPage(
                        pages.adminDashboard
                    );

                }, 1200);


                return;

            }


            /* ---------------------------------------------
               NORMAL STUDENT SIGN UP
            --------------------------------------------- */

            showMessage(
                "registrationMessage",
                "Registration Successful! Redirecting to Student Login...",
                "success"
            );


            setTimeout(function () {

                showPage(
                    pages.studentLogin
                );

            }, 1200);

        }
    );

}


/* =========================================================
   FILE → DATA URL
========================================================= */

function readFileAsDataURL(file) {

    return new Promise(function (resolve, reject) {

        const reader =
            new FileReader();


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

const studentLoginForm =
    document.getElementById(
        "studentLoginForm"
    );


if (studentLoginForm) {

    studentLoginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            clearMessage(
                "studentLoginMessage"
            );


            const loginElement =
                document.getElementById(
                    "studentLoginUsername"
                );


            const passwordElement =
                document.getElementById(
                    "studentLoginPassword"
                );


            const loginValue =
                loginElement
                    ? loginElement.value.trim()
                    : "";


            const password =
                passwordElement
                    ? passwordElement.value
                    : "";


            if (!loginValue || !password) {

                showMessage(
                    "studentLoginMessage",
                    "Please enter your Student ID/Username and Password.",
                    "error"
                );

                return;

            }


            /* ---------------------------------------------
               FIND STUDENT
            --------------------------------------------- */

            const student =
                students.find(function (student) {

                    const idMatches =
                        student.studentId
                            .toLowerCase()
                        ===
                        loginValue.toLowerCase();


                    const usernameMatches =
                        student.username
                            .toLowerCase()
                        ===
                        loginValue.toLowerCase();


                    return (
                        (idMatches || usernameMatches)
                        &&
                        student.password === password
                    );

                });


            /* ---------------------------------------------
               INVALID LOGIN
            --------------------------------------------- */

            if (!student) {

                showMessage(
                    "studentLoginMessage",
                    "Invalid Student ID/Username or Password.",
                    "error"
                );

                return;

            }


            /* ---------------------------------------------
               SUCCESSFUL LOGIN
            --------------------------------------------- */

            currentStudentId =
                student.studentId;


            studentLoginForm.reset();


            displayStudentDashboard(
                student
            );


            showPage(
                pages.studentDashboard
            );

        }
    );

}


/* =========================================================
   STUDENT DASHBOARD
========================================================= */

function displayStudentDashboard(student) {

    const content =
        document.getElementById(
            "studentDashboardContent"
        );


    if (!content) {
        return;
    }


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

                <h2>
                    ${escapeHTML(student.fullName)}
                </h2>

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
                ${escapeHTML(
                    value || "Not provided"
                )}
            </span>

        </div>

    `;

}


/* =========================================================
   DOCUMENTS HTML
========================================================= */

function getDocumentsHTML(student) {

    let html = "";


    /* ---------------------------------------------
       STUDENT PHOTO
    --------------------------------------------- */

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
                    rel="noopener noreferrer"
                >
                    View
                </a>

            </div>

        `;

    }


    /* ---------------------------------------------
       PLUS TWO CERTIFICATE
    --------------------------------------------- */

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
                    rel="noopener noreferrer"
                >
                    View Document
                </a>

            </div>

        `;

    }


    /* ---------------------------------------------
       NO DOCUMENTS
    --------------------------------------------- */

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
    .querySelectorAll(
        "[data-student-section]"
    )
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                if (!currentStudentId) {
                    return;
                }


                const student =
                    students.find(
                        function (student) {

                            return (
                                student.studentId
                                ===
                                currentStudentId
                            );

                        }
                    );


                if (student) {

                    displayStudentDashboard(
                        student
                    );

                }


                document
                    .querySelectorAll(
                        "[data-student-section]"
                    )
                    .forEach(
                        function (btn) {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );


                this.classList.add(
                    "active"
                );

            }
        );

    });


/* =========================================================
   STUDENT LOGOUT
========================================================= */

const studentLogoutButton =
    document.getElementById(
        "studentLogoutButton"
    );


if (studentLogoutButton) {

    studentLogoutButton.addEventListener(
        "click",
        function () {

            currentStudentId = null;

            showPage(pages.role);

        }
    );

}


/* =========================================================
   ADMIN LOGIN
========================================================= */

const adminLoginForm =
    document.getElementById(
        "adminLoginForm"
    );


if (adminLoginForm) {

    adminLoginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            clearMessage(
                "adminLoginMessage"
            );


            const username =
                document
                    .getElementById(
                        "adminUsername"
                    )
                    .value
                    .trim();


            const password =
                document
                    .getElementById(
                        "adminPassword"
                    )
                    .value;


            if (
                username === ADMIN_USERNAME
                &&
                password === ADMIN_PASSWORD
            ) {

                adminLoginForm.reset();


                renderAdminDashboard();


                showPage(
                    pages.adminDashboard
                );

            }

            else {

                showMessage(
                    "adminLoginMessage",
                    "Invalid Admin Username or Password.",
                    "error"
                );

            }

        }
    );

}


/* =========================================================
   ADMIN LOGOUT
========================================================= */

const adminLogoutButton =
    document.getElementById(
        "adminLogoutButton"
    );


if (adminLogoutButton) {

    adminLogoutButton.addEventListener(
        "click",
        function () {

            showPage(pages.role);

        }
    );

}


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

    const totalStudents =
        document.getElementById(
            "totalStudents"
        );


    const totalDepartments =
        document.getElementById(
            "totalDepartments"
        );


    const totalCourses =
        document.getElementById(
            "totalCourses"
        );


    if (totalStudents) {

        totalStudents.textContent =
            students.length;

    }


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


    if (totalDepartments) {

        totalDepartments.textContent =
            departments.size;

    }


    if (totalCourses) {

        totalCourses.textContent =
            courses.size;

    }

}


/* =========================================================
   RENDER STUDENT TABLE
========================================================= */

function renderStudentTable() {

    const tbody =
        document.getElementById(
            "studentTableBody"
        );


    if (!tbody) {
        return;
    }


    const searchElement =
        document.getElementById(
            "studentSearch"
        );


    const departmentElement =
        document.getElementById(
            "departmentFilter"
        );


    const courseElement =
        document.getElementById(
            "courseFilter"
        );


    const search =
        searchElement
            ? searchElement.value
                .trim()
                .toLowerCase()
            : "";


    const department =
        departmentElement
            ? departmentElement.value
            : "";


    const course =
        courseElement
            ? courseElement.value
            : "";


    const filteredStudents =
        students.filter(
            function (student) {

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
                    searchableText.includes(
                        search
                    );


                const matchesDepartment =
                    !department ||
                    student.department
                    ===
                    department;


                const matchesCourse =
                    !course ||
                    student.course
                    ===
                    course;


                return (
                    matchesSearch &&
                    matchesDepartment &&
                    matchesCourse
                );

            }
        );


    tbody.innerHTML = "";


    /* ---------------------------------------------
       NO RESULTS
    --------------------------------------------- */

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


    /* ---------------------------------------------
       STUDENT ROWS
    --------------------------------------------- */

    filteredStudents.forEach(
        function (student) {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    ${escapeHTML(
                        student.studentId
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        student.fullName
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        student.email
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        student.phone
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        student.department
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        student.course
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        student.semester
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        student.admissionYear
                    )}
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

        }
    );

}


/* =========================================================
   SEARCH
========================================================= */

const studentSearch =
    document.getElementById(
        "studentSearch"
    );


if (studentSearch) {

    studentSearch.addEventListener(
        "input",
        function () {

            renderStudentTable();

        }
    );

}


/* =========================================================
   DEPARTMENT FILTER
========================================================= */

const departmentFilter =
    document.getElementById(
        "departmentFilter"
    );


if (departmentFilter) {

    departmentFilter.addEventListener(
        "change",
        function () {

            const department =
                this.value;


            const courseFilter =
                document.getElementById(
                    "courseFilter"
                );


            if (courseFilter) {

                populateCourseDropdown(
                    courseFilter,
                    department
                );


                courseFilter.value = "";

            }


            renderStudentTable();

        }
    );

}


/* =========================================================
   COURSE FILTER
========================================================= */

const courseFilter =
    document.getElementById(
        "courseFilter"
    );


if (courseFilter) {

    courseFilter.addEventListener(
        "change",
        function () {

            renderStudentTable();

        }
    );

}


/* =========================================================
   VIEW STUDENT
========================================================= */

function viewStudent(studentId) {

    const student =
        students.find(
            function (student) {

                return (
                    student.studentId
                    ===
                    studentId
                );

            }
        );


    if (!student) {

        alert(
            "Student not found."
        );

        return;

    }


    const content =
        document.getElementById(
            "studentDetailsContent"
        );


    if (!content) {
        return;
    }


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

        <h2>
            Student Complete Profile
        </h2>


        <div class="student-detail-top">

            ${photoHTML}

            <div>

                <h3>
                    ${escapeHTML(
                        student.fullName
                    )}
                </h3>

                <p>

                    Student ID:

                    <strong>
                        ${escapeHTML(
                            student.studentId
                        )}
                    </strong>

                </p>

            </div>

        </div>


        <div class="detail-card">

            <h3>
                Account Details
            </h3>

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

            <h3>
                Personal Details
            </h3>

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

            <h3>
                Contact Details
            </h3>

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

            <h3>
                Academic Details
            </h3>

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

            <h3>
                Admission Details
            </h3>

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

            <h3>
                Uploaded Documents
            </h3>

            ${getDocumentsHTML(student)}

        </div>

    `;


    const modal =
        document.getElementById(
            "studentDetailsModal"
        );


    if (modal) {

        modal.classList.add(
            "show"
        );

    }

}


/* =========================================================
   CLOSE STUDENT DETAILS MODAL
========================================================= */

const closeStudentDetails =
    document.getElementById(
        "closeStudentDetails"
    );


if (closeStudentDetails) {

    closeStudentDetails.addEventListener(
        "click",
        function () {

            const modal =
                document.getElementById(
                    "studentDetailsModal"
                );


            if (modal) {

                modal.classList.remove(
                    "show"
                );

            }

        }
    );

}


/* =========================================================
   EDIT STUDENT
========================================================= */

function editStudent(studentId) {

    const student =
        students.find(
            function (student) {

                return (
                    student.studentId
                    ===
                    studentId
                );

            }
        );


    if (!student) {

        alert(
            "Student not found."
        );

        return;

    }


    editingStudentId =
        studentId;


    document
        .getElementById(
            "editOriginalStudentId"
        )
        .value =
        student.studentId;


    document
        .getElementById(
            "editStudentId"
        )
        .value =
        student.studentId;


    document
        .getElementById(
            "editUsername"
        )
        .value =
        student.username;


    document
        .getElementById(
            "editFullName"
        )
        .value =
        student.fullName;


    document
        .getElementById(
            "editDateOfBirth"
        )
        .value =
        student.dateOfBirth;


    document
        .getElementById(
            "editGender"
        )
        .value =
        student.gender;


    document
        .getElementById(
            "editEmail"
        )
        .value =
        student.email;


    document
        .getElementById(
            "editPhone"
        )
        .value =
        student.phone;


    document
        .getElementById(
            "editAddress"
        )
        .value =
        student.address;


    document
        .getElementById(
            "editDepartment"
        )
        .value =
        student.department;


    populateCourseDropdown(
        document.getElementById(
            "editCourse"
        ),
        student.department
    );


    document
        .getElementById(
            "editCourse"
        )
        .value =
        student.course;


    document
        .getElementById(
            "editSemester"
        )
        .value =
        student.semester;


    document
        .getElementById(
            "editAdmissionNumber"
        )
        .value =
        student.admissionNumber;


    document
        .getElementById(
            "editAdmissionYear"
        )
        .value =
        student.admissionYear;


    clearMessage(
        "editStudentMessage"
    );


    const modal =
        document.getElementById(
            "editStudentModal"
        );


    if (modal) {

        modal.classList.add(
            "show"
        );

    }

}


/* =========================================================
   EDIT DEPARTMENT → COURSE
========================================================= */

const editDepartment =
    document.getElementById(
        "editDepartment"
    );


if (editDepartment) {

    editDepartment.addEventListener(
        "change",
        function () {

            populateCourseDropdown(
                document.getElementById(
                    "editCourse"
                ),
                this.value
            );

        }
    );

}


/* =========================================================
   SAVE EDITED STUDENT
========================================================= */

const editStudentForm =
    document.getElementById(
        "editStudentForm"
    );


if (editStudentForm) {

    editStudentForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            clearMessage(
                "editStudentMessage"
            );


            const newStudentId =
                document
                    .getElementById(
                        "editStudentId"
                    )
                    .value
                    .trim();


            const username =
                document
                    .getElementById(
                        "editUsername"
                    )
                    .value
                    .trim();


            const fullName =
                document
                    .getElementById(
                        "editFullName"
                    )
                    .value
                    .trim();


            const dateOfBirth =
                document
                    .getElementById(
                        "editDateOfBirth"
                    )
                    .value;


            const gender =
                document
                    .getElementById(
                        "editGender"
                    )
                    .value;


            const email =
                document
                    .getElementById(
                        "editEmail"
                    )
                    .value
                    .trim();


            const phone =
                document
                    .getElementById(
                        "editPhone"
                    )
                    .value
                    .trim();


            const address =
                document
                    .getElementById(
                        "editAddress"
                    )
                    .value
                    .trim();


            const department =
                document
                    .getElementById(
                        "editDepartment"
                    )
                    .value;


            const course =
                document
                    .getElementById(
                        "editCourse"
                    )
                    .value;


            const semester =
                document
                    .getElementById(
                        "editSemester"
                    )
                    .value;


            const admissionNumber =
                document
                    .getElementById(
                        "editAdmissionNumber"
                    )
                    .value
                    .trim();


            const admissionYear =
                document
                    .getElementById(
                        "editAdmissionYear"
                    )
                    .value;


            /* ---------------------------------------------
               REQUIRED FIELDS
            --------------------------------------------- */

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


            /* ---------------------------------------------
               EMAIL VALIDATION
            --------------------------------------------- */

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


            /* ---------------------------------------------
               PHONE VALIDATION
               EXACTLY 10 DIGITS
            --------------------------------------------- */

            const phonePattern =
                /^\d{10}$/;


            if (!phonePattern.test(phone)) {

                showMessage(
                    "editStudentMessage",
                    "Phone number must contain exactly 10 digits.",
                    "error"
                );

                return;

            }


            /* ---------------------------------------------
               DUPLICATE STUDENT ID
            --------------------------------------------- */

            const duplicateId =
                students.some(
                    function (student) {

                        return (

                            student.studentId
                                .toLowerCase()
                            ===
                            newStudentId
                                .toLowerCase()

                            &&

                            student.studentId
                            !==
                            editingStudentId

                        );

                    }
                );


            if (duplicateId) {

                showMessage(
                    "editStudentMessage",
                    "Another student already uses this Student ID.",
                    "error"
                );

                return;

            }


            /* ---------------------------------------------
               DUPLICATE USERNAME
            --------------------------------------------- */

            const duplicateUsername =
                students.some(
                    function (student) {

                        return (

                            student.username
                                .toLowerCase()
                            ===
                            username
                                .toLowerCase()

                            &&

                            student.studentId
                            !==
                            editingStudentId

                        );

                    }
                );


            if (duplicateUsername) {

                showMessage(
                    "editStudentMessage",
                    "Another student already uses this username.",
                    "error"
                );

                return;

            }


            /* ---------------------------------------------
               FIND ORIGINAL STUDENT
            --------------------------------------------- */

            const index =
                students.findIndex(
                    function (student) {

                        return (
                            student.studentId
                            ===
                            editingStudentId
                        );

                    }
                );


            if (index === -1) {

                showMessage(
                    "editStudentMessage",
                    "Student record could not be found.",
                    "error"
                );

                return;

            }


            /* ---------------------------------------------
               PRESERVE PASSWORD + FILES
            --------------------------------------------- */

            const oldStudent =
                students[index];


            students[index] = {

                studentId:
                    newStudentId,

                username:
                    username,

                password:
                    oldStudent.password,

                fullName:
                    fullName,

                dateOfBirth:
                    dateOfBirth,

                gender:
                    gender,

                email:
                    email,

                phone:
                    phone,

                address:
                    address,

                department:
                    department,

                course:
                    course,

                semester:
                    semester,

                admissionNumber:
                    admissionNumber,

                admissionYear:
                    admissionYear,

                photo:
                    oldStudent.photo,

                plusTwoCertificate:
                    oldStudent.plusTwoCertificate

            };


            editingStudentId =
                null;


            const modal =
                document.getElementById(
                    "editStudentModal"
                );


            if (modal) {

                modal.classList.remove(
                    "show"
                );

            }


            renderAdminDashboard();


            alert(
                "Student details updated successfully."
            );

        }
    );

}


/* =========================================================
   CANCEL EDIT
========================================================= */

const cancelEditButton =
    document.getElementById(
        "cancelEditButton"
    );


if (cancelEditButton) {

    cancelEditButton.addEventListener(
        "click",
        function () {

            const modal =
                document.getElementById(
                    "editStudentModal"
                );


            if (modal) {

                modal.classList.remove(
                    "show"
                );

            }


            editingStudentId =
                null;

        }
    );

}


/* =========================================================
   CLOSE EDIT MODAL
========================================================= */

const closeEditStudent =
    document.getElementById(
        "closeEditStudent"
    );


if (closeEditStudent) {

    closeEditStudent.addEventListener(
        "click",
        function () {

            const modal =
                document.getElementById(
                    "editStudentModal"
                );


            if (modal) {

                modal.classList.remove(
                    "show"
                );

            }


            editingStudentId =
                null;

        }
    );

}


/* =========================================================
   DELETE STUDENT
========================================================= */

function deleteStudent(studentId) {

    const student =
        students.find(
            function (student) {

                return (
                    student.studentId
                    ===
                    studentId
                );

            }
        );


    if (!student) {

        alert(
            "Student not found."
        );

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
        students.findIndex(
            function (student) {

                return (
                    student.studentId
                    ===
                    studentId
                );

            }
        );


    if (index !== -1) {

        students.splice(
            index,
            1
        );

    }


    renderAdminDashboard();


    alert(
        "Student record deleted successfully."
    );

}


/* =========================================================
   ADMIN ADD STUDENT
========================================================= */

const adminAddStudentButton =
    document.getElementById(
        "adminAddStudentButton"
    );


if (adminAddStudentButton) {

    adminAddStudentButton.addEventListener(
        "click",
        function () {

            openAdminAddStudent();

        }
    );

}


const adminAddStudentNav =
    document.getElementById(
        "adminAddStudentNav"
    );


if (adminAddStudentNav) {

    adminAddStudentNav.addEventListener(
        "click",
        function () {

            openAdminAddStudent();

        }
    );

}


/* =========================================================
   OPEN ADMIN ADD STUDENT
========================================================= */

function openAdminAddStudent() {

    adminAddingStudent =
        true;


    clearMessage(
        "registrationMessage"
    );


    const form =
        document.getElementById(
            "studentRegistrationForm"
        );


    if (form) {

        form.reset();

    }


    populateCourseDropdown(
        document.getElementById(
            "course"
        ),
        ""
    );


    showPage(
        pages.registration
    );

}


/* =========================================================
   ADMIN STUDENTS NAVIGATION
========================================================= */

const adminStudentsNav =
    document.getElementById(
        "adminStudentsNav"
    );


if (adminStudentsNav) {

    adminStudentsNav.addEventListener(
        "click",
        function () {

            adminAddingStudent =
                false;


            showPage(
                pages.adminDashboard
            );


            renderAdminDashboard();

        }
    );

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   ESCAPE ATTRIBUTE
========================================================= */

function escapeAttribute(value) {

    return String(value)

        .replace(
            /\\/g,
            "\\\\"
        )

        .replace(
            /'/g,
            "\\'"
        );

}


/* =========================================================
   MESSAGE
========================================================= */

function showMessage(
    elementId,
    message,
    type
) {

    const element =
        document.getElementById(
            elementId
        );


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
        document.getElementById(
            elementId
        );


    if (element) {

        element.innerHTML = "";

    }

}


/* =========================================================
   CLOSE MODALS WHEN CLICKING OUTSIDE
========================================================= */

window.addEventListener(
    "click",
    function (event) {

        const detailsModal =
            document.getElementById(
                "studentDetailsModal"
            );


        const editModal =
            document.getElementById(
                "editStudentModal"
            );


        if (
            detailsModal &&
            event.target === detailsModal
        ) {

            detailsModal.classList.remove(
                "show"
            );

        }


        if (
            editModal &&
            event.target === editModal
        ) {

            editModal.classList.remove(
                "show"
            );

            editingStudentId =
                null;

        }

    }
);


/* =========================================================
   INITIAL STATE
========================================================= */

/*
    IMPORTANT:

    There is NO localStorage.

    There are NO predefined students.

    Every time the page is refreshed,
    the array starts empty.
*/

showPage(
    pages.role
);