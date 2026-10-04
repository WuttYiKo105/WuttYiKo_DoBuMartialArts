/* =========================================
   DOBU MARTIAL ARTS
   CUSTOM WEBSITE JAVASCRIPT
========================================= */


/* =========================================
   PAGE READY
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("DoBu Martial Arts website loaded successfully.");



    /* =========================================
       CREATE ACCOUNT FORM
    ========================================= */

    const registerForm =
        document.getElementById("registerForm");


    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document.getElementById("registerName");

                const email =
                    document.getElementById("registerEmail");

                const password =
                    document.getElementById("registerPassword");

                const confirmPassword =
                    document.getElementById(
                        "registerConfirmPassword"
                    );


                const passwordError =
                    document.getElementById("passwordError");


                if (!name  !email  !password) {

                    return;

                }


                /* Password confirmation */

                if (
                    confirmPassword &&
                    password.value !== confirmPassword.value
                ) {

                    if (passwordError) {

                        passwordError.textContent =
                            "Passwords do not match.";

                    }

                    return;

                }


                if (passwordError) {

                    passwordError.textContent = "";

                }


                /* Save basic member information */

                const member = {

                    name: name.value.trim(),

                    email: email.value.trim(),

                    membership:
                        localStorage.getItem(
                            "selectedMembership"
                        ) || "Not selected"

                };


                localStorage.setItem(
                    "dobuMember",
                    JSON.stringify(member)
                );


                localStorage.setItem(
                    "dobuLoggedIn",
                    "true"
                );


                alert(
                    "Account created successfully. Welcome to DoBu Martial Arts!"
                );


                registerForm.reset();


                /* Go to account page */

                window.location.href =
                    "account.html";

            }

        );

    }



    /* =========================================
       LOGIN FORM
    ========================================= */

    const loginForm =
        document.getElementById("loginForm");


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const email =
                    document.getElementById("loginEmail");

                const password =
                    document.getElementById("loginPassword");


                const loginMessage =
                    document.getElementById(
                        "loginMessage"
                    );


                if (!email || !password) {

                    return;

                }


                const savedMember =
                    localStorage.getItem("dobuMember");


                if (!savedMember) {

                    if (loginMessage) {

                        loginMessage.textContent =
                            "No account found. Please create an account first.";

                    }

                    return;

                }


                const member =
                    JSON.parse(savedMember);
                    if (
                    email.value.trim().toLowerCase() ===
                    member.email.toLowerCase()
                ) {

                    localStorage.setItem(
                        "dobuLoggedIn",
                        "true"
                    );


                    if (loginMessage) {

                        loginMessage.textContent =
                            "Login successful.";

                    }


                    setTimeout(function () {

                        window.location.href =
                            "account.html";

                    }, 700);


                } else {

                    if (loginMessage) {

                        loginMessage.textContent =
                            "Email address does not match the registered account.";

                    }

                }

            }

        );

    }



    /* =========================================
       ACCOUNT DASHBOARD
    ========================================= */

    const memberName =
        document.getElementById("memberName");


    const memberEmail =
        document.getElementById("memberEmail");


    const memberMembership =
        document.getElementById(
            "memberMembership"
        );


    const savedMember =
        localStorage.getItem("dobuMember");


    if (savedMember) {

        const member =
            JSON.parse(savedMember);


        if (memberName) {

            memberName.textContent =
                member.name;

        }


        if (memberEmail) {

            memberEmail.textContent =
                member.email;

        }


        if (memberMembership) {

            memberMembership.textContent =
                member.membership;

        }

    }



    /* =========================================
       LOGOUT
    ========================================= */

    const logoutButton =
        document.getElementById("logoutButton");


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            function () {

                localStorage.removeItem(
                    "dobuLoggedIn"
                );


                alert(
                    "You have been logged out."
                );


                window.location.href =
                    "home.html";

            }

        );

    }



    /* =========================================
       MEMBERSHIP SELECTION
    ========================================= */

    const membershipButtons =
        document.querySelectorAll(
            "[data-membership]"
        );


    membershipButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const membership =
                    button.getAttribute(
                        "data-membership"
                    );


                if (membership) {

                    localStorage.setItem(
                        "selectedMembership",
                        membership
                    );

                }

            }

        );

    });



    /* =========================================
       MEMBERSHIP BUTTONS
    ========================================= */

    const membershipLinks =
        document.querySelectorAll(
            ".membership-button"
        );


    membershipLinks.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const membership =
                    button.getAttribute(
                        "data-membership"
                    );


                if (membership) {

                    localStorage.setItem(
                        "selectedMembership",
                        membership
                    );

                }

            }

        );

    });



    /* =========================================
       FORUM POST FORM
    ========================================= */

    const forumForm =
        document.getElementById("forumForm");


    if (forumForm) {
        forumForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const title =
                    document.getElementById(
                        "forumTitle"
                    );


                const content =
                    document.getElementById(
                        "forumContent"
                    );


                const forumMessage =
                    document.getElementById(
                        "forumMessage"
                    );


                if (
                    !title ||
                    !content
                ) {

                    return;

                }


                if (
                    title.value.trim() === "" ||
                    content.value.trim() === ""
                ) {

                    if (forumMessage) {

                        forumMessage.textContent =
                            "Please complete all forum fields.";

                    }

                    return;

                }


                const post = {

                    title:
                        title.value.trim(),

                    content:
                        content.value.trim(),

                    date:
                        new Date().toLocaleDateString()

                };


                const posts =
                    JSON.parse(
                        localStorage.getItem(
                            "dobuForumPosts"
                        )
                    ) || [];


                posts.push(post);


                localStorage.setItem(
                    "dobuForumPosts",
                    JSON.stringify(posts)
                );


                if (forumMessage) {

                    forumMessage.textContent =
                        "Your post has been added successfully.";

                }


                forumForm.reset();


                displayForumPosts();

            }

        );

    }



    /* =========================================
       DISPLAY FORUM POSTS
    ========================================= */

    function displayForumPosts() {

        const forumList =
            document.getElementById(
                "forumPosts"
            );


        if (!forumList) {

            return;

        }


        const posts =
            JSON.parse(
                localStorage.getItem(
                    "dobuForumPosts"
                )
            ) || [];


        if (posts.length === 0) {

            return;

        }


        posts.forEach(function (post) {

            const postElement =
                document.createElement("div");


            postElement.className =
                "forum-post";


            postElement.innerHTML = 

                <div class="forum-post-header">

                    <h4>
                        ${escapeHTML(post.title)}
                    </h4>

                    <span class="forum-tag">
                        Member Post
                    </span>

                </div>

                <p>
                    ${escapeHTML(post.content)}
                </p>

                <small class="text-muted">
                    Posted on ${escapeHTML(post.date)}
                </small>

            ;


            forumList.appendChild(
                postElement
            );

        });

    }


    displayForumPosts();



    /* =========================================
       CONTACT FORM
    ========================================= */

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const contactName =
                    document.getElementById(
                        "contactName"
                    );
                    const contactEmail =
                    document.getElementById(
                        "contactEmail"
                    );


                const contactMessage =
                    document.getElementById(
                        "contactMessage"
                    );


                const contactStatus =
                    document.getElementById(
                        "contactStatus"
                    );


                if (
                    !contactName ||
                    !contactEmail ||
                    !contactMessage
                ) {

                    return;

                }


                if (
                    contactName.value.trim() === "" ||
                    contactEmail.value.trim() === "" ||
                    contactMessage.value.trim() === ""
                ) {

                    if (contactStatus) {

                        contactStatus.textContent =
                            "Please complete all fields.";

                    }

                    return;

                }


                if (contactStatus) {

                    contactStatus.textContent =
                        "Thank you. Your message has been sent successfully.";

                }


                contactForm.reset();

            }

        );

    }



    /* =========================================
       EMAIL VALIDATION
    ========================================= */

    const emailInputs =
        document.querySelectorAll(
            'input[type="email"]'
        );


    emailInputs.forEach(function (input) {

        input.addEventListener(
            "blur",
            function () {

                if (
                    input.value !== "" &&
                    !isValidEmail(input.value)
                ) {

                    input.classList.add(
                        "is-invalid"
                    );

                } else {

                    input.classList.remove(
                        "is-invalid"
                    );

                }

            }

        );

    });



    /* =========================================
       PASSWORD SHOW / HIDE
    ========================================= */

    const passwordToggles =
        document.querySelectorAll(
            "[data-password-toggle]"
        );


    passwordToggles.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const targetId =
                    button.getAttribute(
                        "data-password-toggle"
                    );


                const passwordField =
                    document.getElementById(
                        targetId
                    );


                if (!passwordField) {

                    return;

                }


                if (
                    passwordField.type ===
                    "password"
                ) {

                    passwordField.type =
                        "text";


                    button.textContent =
                        "Hide";

                } else {

                    passwordField.type =
                        "password";


                    button.textContent =
                        "Show";

                }

            }

        );

    });



    /* =========================================
       TIMETABLE ROW HIGHLIGHT
    ========================================= */

    const timetableRows =
        document.querySelectorAll(
            ".timetable-table tbody tr"
        );


    timetableRows.forEach(function (row) {

        row.addEventListener(
            "click",
            function () {

                timetableRows.forEach(
                    function (item) {

                        item.classList.remove(
                            "selected-row"
                        );

                    }
                );


                row.classList.add(
                    "selected-row"
                );

            }

        );

    });
    /* =========================================
       BACK TO TOP
    ========================================= */

    const backToTop =
        document.getElementById(
            "backToTop"
        );


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            function () {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }

        );

    }



    /* =========================================
       CURRENT YEAR
    ========================================= */

    const currentYear =
        document.querySelectorAll(
            ".current-year"
        );


    currentYear.forEach(function (element) {

        element.textContent =
            new Date().getFullYear();

    });

});



/* =========================================
   EMAIL VALIDATION FUNCTION
========================================= */

function isValidEmail(email) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    return pattern.test(email);

}



/* =========================================
   HTML ESCAPE FUNCTION
   Helps prevent unsafe HTML in forum posts
========================================= */

function escapeHTML(value) {

    const div =
        document.createElement("div");


    div.textContent =
        value;


    return div.innerHTML;

}



/* =========================================
   SELECT MEMBERSHIP
========================================= */

function selectMembership(membershipName) {

    localStorage.setItem(
        "selectedMembership",
        membershipName
    );


    alert(
        membershipName +
        " membership selected."
    );


    window.location.href =
        "account.html";

}



/* =========================================
   CLEAR MEMBERSHIP
========================================= */

function clearSelectedMembership() {

    localStorage.removeItem(
        "selectedMembership"
    );

}



/* =========================================
   CHECK LOGIN STATUS
========================================= */

function isLoggedIn() {

    return (
        localStorage.getItem(
            "dobuLoggedIn"
        ) === "true"
    );

}