/* =========================================================
   STUDENT MANAGEMENT SYSTEM
   Data is kept in the `students` array and saved to the
   browser's local database (IndexedDB), so it survives
   page refreshes and browser restarts.
========================================================= */


/* =========================================================
   STATE
========================================================= */

let students = [];

let currentStudentId = null;
let editingStudentId = null;
let adminAddingStudent = false;

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";


/* =========================================================
   LOCAL DATABASE (IndexedDB)
========================================================= */

const DB_NAME = "StudentManagementDB";
const DB_STORE = "students";
let db = null;


function openDatabase() {

    return new Promise(function (resolve, reject) {

        if (!window.indexedDB) {
            reject(new Error("IndexedDB is not supported in this browser."));
            return;
        }

        const request = indexedDB.open(DB_NAME, 1);

        request.onupgradeneeded = function (event) {

            const database = event.target.result;

            if (!database.objectStoreNames.contains(DB_STORE)) {
                database.createObjectStore(DB_STORE, { keyPath: "studentId" });
            }

        };

        request.onsuccess = function (event) {
            db = event.target.result;
            resolve(db);
        };

        request.onerror = function () {
            reject(request.error);
        };

    });

}


function loadStudentsFromDB() {

    return new Promise(function (resolve, reject) {

        const tx = db.transaction(DB_STORE, "readonly");
        const request = tx.objectStore(DB_STORE).getAll();

        request.onsuccess = function () {
            resolve(request.result || []);
        };

        request.onerror = function () {
            reject(request.error);
        };

    });

}


/* Writes the whole students array to the database */
function saveStudentsToDB() {

    return new Promise(function (resolve, reject) {

        if (!db) {
            reject(new Error("Database is not available."));
            return;
        }

        const tx = db.transaction(DB_STORE, "readwrite");
        const store = tx.objectStore(DB_STORE);

        store.clear();

        students.forEach(function (student) {
            store.put(student);
        });

        tx.oncomplete = function () {
            resolve();
        };

        tx.onerror = function () {
            reject(tx.error);
        };

        tx.onabort = function () {
            reject(tx.error);
        };

    });

}


function persist() {

    return saveStudentsToDB().catch(function (error) {
        console.error("Could not save to local database:", error);
        alert("Warning: data could not be saved to the local database.");
    });

}


/* Load saved students when the page opens */
openDatabase()
    .then(loadStudentsFromDB)
    .then(function (saved) {
        students = saved;
    })
    .catch(function (error) {
        console.error("Local database unavailable:", error);
    });


/* =========================================================
   COURSE DATA
========================================================= */

const courseData = {

    "Management": ["BBA", "MBA", "MHRM"],

    "Computer Science": ["BCA", "MCA", "IMCA"],

    "Commerce": ["BCom", "MCom"],

    "Multimedia": ["Multimedia", "Animation"],

    "Hotel Management": ["BHM", "MHM"],

    "Psychology": ["BPSY", "MPSY"],

    "Social Work": ["BSW", "MSW"]

};


/* =========================================================
   PAGES
========================================================= */

const pages = {

    role: document.getElementById("rolePage"),
    studentLogin: document.getElementById("studentLoginPage"),
    registration: document.getElementById("studentRegistrationPage"),
    adminLogin: document.getElementById("adminLoginPage"),
    studentDashboard: document.getElementById("studentDashboardPage"),
    adminDashboard: document.getElementById("adminDashboardPage")

};


function showPage(page) {

    Object.values(pages).forEach(function (p) {
        if (p) {
            p.classList.remove("active-page");
        }
    });

    if (page) {
        page.classList.add("active-page");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });

}


/* =========================================================
   HELPERS
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


function escapeAttribute(value) {

    return String(value)
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'");

}


function showMessage(elementId, message, type) {

    const element = document.getElementById(elementId);

    if (!element) {
        return;
    }

    element.innerHTML =
        '<div class="message ' + type + '-message">' +
        escapeHTML(message) +
        "</div>";

}


function clearMessage(elementId) {

    const element = document.getElementById(elementId);

    if (element) {
        element.innerHTML = "";
    }

}


function findStudent(studentId) {

    return students.find(function (s) {
        return s.studentId === studentId;
    });

}


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


function populateCourseDropdown(selectElement, department, emptyLabel) {

    if (!selectElement) {
        return;
    }

    selectElement.innerHTML = "";

    if (!department) {

        const option = document.createElement("option");
        option.value = "";
        option.textContent = emptyLabel || "Select Department First";
        selectElement.appendChild(option);

        return;

    }

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = emptyLabel || "Select Course";
    selectElement.appendChild(defaultOption);

    (courseData[department] || []).forEach(function (course) {

        const option = document.createElement("option");
        option.value = course;
        option.textContent = course;
        selectElement.appendChild(option);

    });

}


/* =========================================================
   ROLE SELECTION + BACK BUTTONS
========================================================= */

document.getElementById("studentRoleBtn").addEventListener("click", function () {
    clearMessage("studentLoginMessage");
    showPage(pages.studentLogin);
});

document.getElementById("adminRoleBtn").addEventListener("click", function () {
    clearMessage("adminLoginMessage");
    showPage(pages.adminLogin);
});

document.getElementById("studentLoginBack").addEventListener("click", function () {
    clearMessage("studentLoginMessage");
    showPage(pages.role);
});

document.getElementById("adminLoginBack").addEventListener("click", function () {
    clearMessage("adminLoginMessage");
    showPage(pages.role);
});

document.getElementById("registrationBack").addEventListener("click", function () {
    clearMessage("registrationMessage");
    showPage(adminAddingStudent ? pages.adminDashboard : pages.studentLogin);
});


/* =========================================================
   STUDENT SIGN UP BUTTON
========================================================= */

document.getElementById("registerNowButton").addEventListener("click", function () {

    adminAddingStudent = false;

    clearMessage("registrationMessage");

    document.getElementById("studentRegistrationForm").reset();

    populateCourseDropdown(document.getElementById("course"), "");

    showPage(pages.registration);

});


/* =========================================================
   DEPARTMENT -> COURSE (REGISTRATION)
========================================================= */

document.getElementById("department").addEventListener("change", function () {

    populateCourseDropdown(document.getElementById("course"), this.value);

});


/* =========================================================
   STUDENT REGISTRATION
========================================================= */

const studentRegistrationForm = document.getElementById("studentRegistrationForm");

studentRegistrationForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    clearMessage("registrationMessage");

    const studentId = document.getElementById("studentId").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const fullName = document.getElementById("fullName").value.trim();
    const dateOfBirth = document.getElementById("dateOfBirth").value;
    const gender = document.getElementById("gender").value;
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const department = document.getElementById("department").value;
    const course = document.getElementById("course").value;
    const semester = document.getElementById("semester").value;
    const admissionNumber = document.getElementById("admissionNumber").value.trim();
    const admissionYear = document.getElementById("admissionYear").value;


    if (
        !studentId || !username || !password || !confirmPassword ||
        !fullName || !dateOfBirth || !gender || !email || !phone ||
        !address || !department || !course || !semester ||
        !admissionNumber || !admissionYear
    ) {
        showMessage("registrationMessage", "Please fill in all required fields.", "error");
        return;
    }

    if (password.length < 6) {
        showMessage("registrationMessage", "Password must contain at least 6 characters.", "error");
        return;
    }

    if (password !== confirmPassword) {
        showMessage("registrationMessage", "Password and Confirm Password do not match.", "error");
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showMessage("registrationMessage", "Please enter a valid email address.", "error");
        return;
    }

    if (!/^\d{10}$/.test(phone)) {
        showMessage("registrationMessage", "Phone number must contain exactly 10 digits.", "error");
        return;
    }

    const duplicateStudentId = students.some(function (s) {
        return s.studentId.toLowerCase() === studentId.toLowerCase();
    });

    if (duplicateStudentId) {
        showMessage("registrationMessage", "This Student ID is already registered.", "error");
        return;
    }

    const duplicateUsername = students.some(function (s) {
        return s.username.toLowerCase() === username.toLowerCase();
    });

    if (duplicateUsername) {
        showMessage("registrationMessage", "This username is already registered.", "error");
        return;
    }


    /* FILES */

    let photoData = "";
    let certificateData = "";

    const photoFile = document.getElementById("photo").files[0] || null;
    const certificateFile = document.getElementById("plusTwoCertificate").files[0] || null;

    try {

        if (photoFile) {
            photoData = await readFileAsDataURL(photoFile);
        }

        if (certificateFile) {
            certificateData = await readFileAsDataURL(certificateFile);
        }

    } catch (error) {

        showMessage("registrationMessage", "There was a problem reading the uploaded file.", "error");
        return;

    }


    /* SAVE */

    students.push({

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

    });

    await persist();

    studentRegistrationForm.reset();

    populateCourseDropdown(document.getElementById("course"), "");


    if (adminAddingStudent) {

        showMessage(
            "registrationMessage",
            "Student added successfully! Returning to Admin Dashboard...",
            "success"
        );

        setTimeout(function () {
            adminAddingStudent = false;
            renderAdminDashboard();
            showPage(pages.adminDashboard);
        }, 1200);

        return;

    }

    showMessage(
        "registrationMessage",
        "Registration Successful! Redirecting to Student Login...",
        "success"
    );

    setTimeout(function () {
        showPage(pages.studentLogin);
    }, 1200);

});


/* =========================================================
   STUDENT LOGIN
========================================================= */

document.getElementById("studentLoginForm").addEventListener("submit", function (event) {

    event.preventDefault();

    clearMessage("studentLoginMessage");

    const loginValue = document.getElementById("studentLoginUsername").value.trim();
    const password = document.getElementById("studentLoginPassword").value;

    if (!loginValue || !password) {
        showMessage("studentLoginMessage", "Please enter your Student ID/Username and Password.", "error");
        return;
    }

    const student = students.find(function (s) {

        const idMatches = s.studentId.toLowerCase() === loginValue.toLowerCase();
        const usernameMatches = s.username.toLowerCase() === loginValue.toLowerCase();

        return (idMatches || usernameMatches) && s.password === password;

    });

    if (!student) {
        showMessage("studentLoginMessage", "Invalid Student ID/Username or Password.", "error");
        return;
    }

    currentStudentId = student.studentId;

    this.reset();

    displayStudentDashboard(student, "profile");

    closeStudentDropdown();

    showPage(pages.studentDashboard);

});


/* =========================================================
   STUDENT DASHBOARD (DYNAMIC SECTIONS)
========================================================= */

function detailItem(label, value) {

    return `
        <div class="detail-item">
            <span class="detail-label">${escapeHTML(label)}</span>
            <span class="detail-value">${escapeHTML(value || "Not provided")}</span>
        </div>
    `;

}


function getDocumentsHTML(student) {

    let html = "";

    if (student.photo) {

        html += `
            <div class="document-card">
                <div class="document-info">
                    <span class="document-icon">🖼️</span>
                    <div><strong>Student Photograph</strong></div>
                </div>
                <a href="${student.photo}" target="_blank" rel="noopener noreferrer">View</a>
            </div>
        `;

    }

    if (student.plusTwoCertificate) {

        html += `
            <div class="document-card">
                <div class="document-info">
                    <span class="document-icon">📄</span>
                    <div><strong>12th / Plus Two Certificate</strong></div>
                </div>
                <a href="${student.plusTwoCertificate}" target="_blank" rel="noopener noreferrer">View Document</a>
            </div>
        `;

    }

    if (!html) {
        html = '<p style="color:#64748b;">No documents uploaded.</p>';
    }

    return html;

}


/* section = "profile" | "documents" | "course" */
function displayStudentDashboard(student, section) {

    section = section || "profile";

    const content = document.getElementById("studentDashboardContent");

    if (!content) {
        return;
    }

    const photoHTML = student.photo
        ? `<img src="${student.photo}" class="profile-photo" alt="Student Photograph">`
        : `<div class="profile-placeholder">👤</div>`;

    let html = "";

    if (section === "profile") {

        html = `
            <div class="profile-header">
                ${photoHTML}
                <div>
                    <h2>${escapeHTML(student.fullName)}</h2>
                    <p class="profile-id">Student ID: ${escapeHTML(student.studentId)}</p>
                </div>
            </div>

            <div class="detail-card">
                <h3>Personal Details</h3>
                <div class="detail-grid">
                    ${detailItem("Full Name", student.fullName)}
                    ${detailItem("Date of Birth", student.dateOfBirth)}
                    ${detailItem("Gender", student.gender)}
                </div>
            </div>

            <div class="detail-card">
                <h3>Contact Details</h3>
                <div class="detail-grid">
                    ${detailItem("Email", student.email)}
                    ${detailItem("Phone", student.phone)}
                    ${detailItem("Address", student.address)}
                </div>
            </div>

            <div class="detail-card">
                <h3>Admission Details</h3>
                <div class="detail-grid">
                    ${detailItem("Student ID", student.studentId)}
                    ${detailItem("Username", student.username)}
                    ${detailItem("Admission Number", student.admissionNumber)}
                    ${detailItem("Admission Year", student.admissionYear)}
                </div>
            </div>
        `;

    } else if (section === "documents") {

        html = `
            <div class="detail-card">
                <h3>My Documents</h3>
                ${getDocumentsHTML(student)}
            </div>
        `;

    } else if (section === "course") {

        html = `
            <div class="detail-card">
                <h3>Academic &amp; Course Details</h3>
                <div class="detail-grid">
                    ${detailItem("Department", student.department)}
                    ${detailItem("Course", student.course)}
                    ${detailItem("Semester", student.semester)}
                    ${detailItem("Admission Year", student.admissionYear)}
                </div>
            </div>
        `;

    }

    content.innerHTML = html;

    document.querySelectorAll("[data-student-section]").forEach(function (item) {
        item.classList.toggle("active", item.dataset.studentSection === section);
    });

}


/* =========================================================
   STUDENT SIDEBAR DROPDOWN
========================================================= */

const studentDropdown = document.getElementById("studentDropdown");
const studentDropdownToggle = document.getElementById("studentDropdownToggle");


function closeStudentDropdown() {

    if (studentDropdown) {
        studentDropdown.classList.remove("open");
        studentDropdownToggle.setAttribute("aria-expanded", "false");
    }

}


if (studentDropdownToggle) {

    studentDropdownToggle.addEventListener("click", function (event) {

        event.stopPropagation();

        const isOpen = studentDropdown.classList.toggle("open");

        studentDropdownToggle.setAttribute("aria-expanded", String(isOpen));

    });

}


document.querySelectorAll("[data-student-section]").forEach(function (item) {

    item.addEventListener("click", function () {

        if (!currentStudentId) {
            return;
        }

        const student = findStudent(currentStudentId);

        if (student) {
            displayStudentDashboard(student, this.dataset.studentSection);
        }

        closeStudentDropdown();

    });

});


document.addEventListener("click", function (event) {

    if (studentDropdown && !studentDropdown.contains(event.target)) {
        closeStudentDropdown();
    }

});


/* =========================================================
   STUDENT LOGOUT
========================================================= */

document.getElementById("studentLogoutButton").addEventListener("click", function () {

    currentStudentId = null;

    closeStudentDropdown();

    showPage(pages.role);

});


/* =========================================================
   ADMIN LOGIN / LOGOUT
========================================================= */

document.getElementById("adminLoginForm").addEventListener("submit", function (event) {

    event.preventDefault();

    clearMessage("adminLoginMessage");

    const username = document.getElementById("adminUsername").value.trim();
    const password = document.getElementById("adminPassword").value;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {

        this.reset();

        renderAdminDashboard();

        showPage(pages.adminDashboard);

    } else {

        showMessage("adminLoginMessage", "Invalid Admin Username or Password.", "error");

    }

});


document.getElementById("adminLogoutButton").addEventListener("click", function () {
    showPage(pages.role);
});


/* =========================================================
   ADMIN DASHBOARD
========================================================= */

function renderAdminDashboard() {

    updateStatistics();
    renderStudentTable();

}


function updateStatistics() {

    document.getElementById("totalStudents").textContent = students.length;

    document.getElementById("totalDepartments").textContent =
        new Set(students.map(function (s) { return s.department; })).size;

    document.getElementById("totalCourses").textContent =
        new Set(students.map(function (s) { return s.course; })).size;

}


function renderStudentTable() {

    const tbody = document.getElementById("studentTableBody");

    if (!tbody) {
        return;
    }

    const search = document.getElementById("studentSearch").value.trim().toLowerCase();
    const department = document.getElementById("departmentFilter").value;
    const course = document.getElementById("courseFilter").value;

    const filtered = students.filter(function (s) {

        const text = (
            s.studentId + " " + s.fullName + " " + s.email + " " +
            s.course + " " + s.department
        ).toLowerCase();

        return (
            text.includes(search) &&
            (!department || s.department === department) &&
            (!course || s.course === course)
        );

    });

    tbody.innerHTML = "";

    if (filtered.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="9" class="no-students">
                    ${students.length === 0
                        ? "No students registered yet."
                        : "No students match your search/filter."}
                </td>
            </tr>
        `;

        return;

    }

    filtered.forEach(function (s) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${escapeHTML(s.studentId)}</td>
            <td>${escapeHTML(s.fullName)}</td>
            <td>${escapeHTML(s.email)}</td>
            <td>${escapeHTML(s.phone)}</td>
            <td>${escapeHTML(s.department)}</td>
            <td>${escapeHTML(s.course)}</td>
            <td>${escapeHTML(s.semester)}</td>
            <td>${escapeHTML(s.admissionYear)}</td>
            <td>
                <div class="action-buttons">
                    <button class="small-button view-button"
                        onclick="viewStudent('${escapeAttribute(s.studentId)}')">View</button>
                    <button class="small-button edit-button"
                        onclick="editStudent('${escapeAttribute(s.studentId)}')">Edit</button>
                    <button class="small-button delete-button"
                        onclick="deleteStudent('${escapeAttribute(s.studentId)}')">Delete</button>
                </div>
            </td>
        `;

        tbody.appendChild(row);

    });

}


/* SEARCH + FILTERS */

document.getElementById("studentSearch").addEventListener("input", renderStudentTable);

document.getElementById("departmentFilter").addEventListener("change", function () {

    const courseFilter = document.getElementById("courseFilter");

    populateCourseDropdown(courseFilter, this.value, "All Courses");

    courseFilter.value = "";

    renderStudentTable();

});

document.getElementById("courseFilter").addEventListener("change", renderStudentTable);


/* =========================================================
   VIEW STUDENT (ADMIN)
========================================================= */

function viewStudent(studentId) {

    const student = findStudent(studentId);

    if (!student) {
        alert("Student not found.");
        return;
    }

    const photoHTML = student.photo
        ? `<img src="${student.photo}" class="admin-profile-photo" alt="Student Photograph">`
        : `<div class="profile-placeholder">👤</div>`;

    document.getElementById("studentDetailsContent").innerHTML = `

        <h2>Student Complete Profile</h2>

        <div class="student-detail-top">
            ${photoHTML}
            <div>
                <h3>${escapeHTML(student.fullName)}</h3>
                <p>Student ID: <strong>${escapeHTML(student.studentId)}</strong></p>
            </div>
        </div>

        <div class="detail-card">
            <h3>Account Details</h3>
            <div class="detail-grid">
                ${detailItem("Student ID", student.studentId)}
                ${detailItem("Username", student.username)}
            </div>
        </div>

        <div class="detail-card">
            <h3>Personal Details</h3>
            <div class="detail-grid">
                ${detailItem("Full Name", student.fullName)}
                ${detailItem("Date of Birth", student.dateOfBirth)}
                ${detailItem("Gender", student.gender)}
            </div>
        </div>

        <div class="detail-card">
            <h3>Contact Details</h3>
            <div class="detail-grid">
                ${detailItem("Email", student.email)}
                ${detailItem("Phone", student.phone)}
                ${detailItem("Address", student.address)}
            </div>
        </div>

        <div class="detail-card">
            <h3>Academic Details</h3>
            <div class="detail-grid">
                ${detailItem("Department", student.department)}
                ${detailItem("Course", student.course)}
                ${detailItem("Semester", student.semester)}
            </div>
        </div>

        <div class="detail-card">
            <h3>Admission Details</h3>
            <div class="detail-grid">
                ${detailItem("Admission Number", student.admissionNumber)}
                ${detailItem("Admission Year", student.admissionYear)}
            </div>
        </div>

        <div class="detail-card">
            <h3>Uploaded Documents</h3>
            ${getDocumentsHTML(student)}
        </div>

    `;

    document.getElementById("studentDetailsModal").classList.add("show");

}


document.getElementById("closeStudentDetails").addEventListener("click", function () {
    document.getElementById("studentDetailsModal").classList.remove("show");
});


/* =========================================================
   EDIT STUDENT (ADMIN)
========================================================= */

function editStudent(studentId) {

    const student = findStudent(studentId);

    if (!student) {
        alert("Student not found.");
        return;
    }

    editingStudentId = studentId;

    document.getElementById("editOriginalStudentId").value = student.studentId;
    document.getElementById("editStudentId").value = student.studentId;
    document.getElementById("editUsername").value = student.username;
    document.getElementById("editFullName").value = student.fullName;
    document.getElementById("editDateOfBirth").value = student.dateOfBirth;
    document.getElementById("editGender").value = student.gender;
    document.getElementById("editEmail").value = student.email;
    document.getElementById("editPhone").value = student.phone;
    document.getElementById("editAddress").value = student.address;
    document.getElementById("editDepartment").value = student.department;

    populateCourseDropdown(document.getElementById("editCourse"), student.department);

    document.getElementById("editCourse").value = student.course;
    document.getElementById("editSemester").value = student.semester;
    document.getElementById("editAdmissionNumber").value = student.admissionNumber;
    document.getElementById("editAdmissionYear").value = student.admissionYear;

    clearMessage("editStudentMessage");

    document.getElementById("editStudentModal").classList.add("show");

}


document.getElementById("editDepartment").addEventListener("change", function () {

    populateCourseDropdown(document.getElementById("editCourse"), this.value);

});


function closeEditModal() {

    document.getElementById("editStudentModal").classList.remove("show");

    editingStudentId = null;

}


document.getElementById("editStudentForm").addEventListener("submit", function (event) {

    event.preventDefault();

    clearMessage("editStudentMessage");

    const newStudentId = document.getElementById("editStudentId").value.trim();
    const username = document.getElementById("editUsername").value.trim();
    const fullName = document.getElementById("editFullName").value.trim();
    const dateOfBirth = document.getElementById("editDateOfBirth").value;
    const gender = document.getElementById("editGender").value;
    const email = document.getElementById("editEmail").value.trim();
    const phone = document.getElementById("editPhone").value.trim();
    const address = document.getElementById("editAddress").value.trim();
    const department = document.getElementById("editDepartment").value;
    const course = document.getElementById("editCourse").value;
    const semester = document.getElementById("editSemester").value;
    const admissionNumber = document.getElementById("editAdmissionNumber").value.trim();
    const admissionYear = document.getElementById("editAdmissionYear").value;

    if (
        !newStudentId || !username || !fullName || !dateOfBirth || !gender ||
        !email || !phone || !address || !department || !course ||
        !semester || !admissionNumber || !admissionYear
    ) {
        showMessage("editStudentMessage", "Please fill in all required fields.", "error");
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showMessage("editStudentMessage", "Please enter a valid email address.", "error");
        return;
    }

    if (!/^\d{10}$/.test(phone)) {
        showMessage("editStudentMessage", "Phone number must contain exactly 10 digits.", "error");
        return;
    }

    const duplicateId = students.some(function (s) {
        return s.studentId.toLowerCase() === newStudentId.toLowerCase() &&
               s.studentId !== editingStudentId;
    });

    if (duplicateId) {
        showMessage("editStudentMessage", "Another student already uses this Student ID.", "error");
        return;
    }

    const duplicateUsername = students.some(function (s) {
        return s.username.toLowerCase() === username.toLowerCase() &&
               s.studentId !== editingStudentId;
    });

    if (duplicateUsername) {
        showMessage("editStudentMessage", "Another student already uses this username.", "error");
        return;
    }

    const index = students.findIndex(function (s) {
        return s.studentId === editingStudentId;
    });

    if (index === -1) {
        showMessage("editStudentMessage", "Student record could not be found.", "error");
        return;
    }

    const old = students[index];

    students[index] = {

        studentId: newStudentId,
        username: username,
        password: old.password,
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
        photo: old.photo,
        plusTwoCertificate: old.plusTwoCertificate

    };

    persist();

    closeEditModal();

    renderAdminDashboard();

    alert("Student details updated successfully.");

});


document.getElementById("cancelEditButton").addEventListener("click", closeEditModal);
document.getElementById("closeEditStudent").addEventListener("click", closeEditModal);


/* =========================================================
   DELETE STUDENT (ADMIN)
========================================================= */

function deleteStudent(studentId) {

    const student = findStudent(studentId);

    if (!student) {
        alert("Student not found.");
        return;
    }

    if (!confirm("Are you sure you want to delete this student?")) {
        return;
    }

    const index = students.findIndex(function (s) {
        return s.studentId === studentId;
    });

    if (index !== -1) {
        students.splice(index, 1);
    }

    persist();

    renderAdminDashboard();

    alert("Student record deleted successfully.");

}


/* =========================================================
   ADMIN ADD STUDENT
========================================================= */

function openAdminAddStudent() {

    adminAddingStudent = true;

    clearMessage("registrationMessage");

    document.getElementById("studentRegistrationForm").reset();

    populateCourseDropdown(document.getElementById("course"), "");

    showPage(pages.registration);

}

document.getElementById("adminAddStudentButton").addEventListener("click", openAdminAddStudent);
document.getElementById("adminAddStudentNav").addEventListener("click", openAdminAddStudent);

document.getElementById("adminStudentsNav").addEventListener("click", function () {

    adminAddingStudent = false;

    showPage(pages.adminDashboard);

    renderAdminDashboard();

});


/* =========================================================
   CLOSE MODALS WHEN CLICKING OUTSIDE
========================================================= */

window.addEventListener("click", function (event) {

    const detailsModal = document.getElementById("studentDetailsModal");
    const editModal = document.getElementById("editStudentModal");

    if (event.target === detailsModal) {
        detailsModal.classList.remove("show");
    }

    if (event.target === editModal) {
        closeEditModal();
    }

});


/* =========================================================
   INITIAL STATE
========================================================= */

showPage(pages.role);
