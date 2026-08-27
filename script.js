/* ============================================
   WEDDING INVITATION JAVASCRIPT
============================================ */


/* ============================================
   LOADING SCREEN
============================================ */

window.addEventListener("load", function () {

    const loadingScreen =
        document.getElementById("loadingScreen");

    setTimeout(function () {

        loadingScreen.classList.add("hide");

    }, 1200);

});


/* ============================================
   ELEMENTS
============================================ */

const opening =
    document.getElementById("opening");

const mainContent =
    document.getElementById("mainContent");

const envelope =
    document.getElementById("envelope");

const openInvitation =
    document.getElementById("openInvitation");

const musicButton =
    document.getElementById("musicButton");

const backgroundMusic =
    document.getElementById("backgroundMusic");

const toast =
    document.getElementById("toast");


/* ============================================
   INITIAL STATE
============================================ */

document.body.classList.add("locked");


/* ============================================
   OPEN INVITATION
============================================ */

let invitationOpened = false;

function openWeddingInvitation() {

    if (invitationOpened) {
        return;
    }

    invitationOpened = true;

    envelope.classList.add("open");

    openInvitation.innerHTML =
        "Membuka Undangan...";

    createConfetti();

    setTimeout(function () {

        opening.classList.add("closed");

        mainContent.classList.add("visible");

        document.body.classList.remove("locked");

        openInvitation.innerHTML =
            "Undangan Dibuka ♡";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        startMusic();

    }, 1300);

}


envelope.addEventListener(
    "click",
    openWeddingInvitation
);

openInvitation.addEventListener(
    "click",
    openWeddingInvitation
);


/* ============================================
   BACKGROUND MUSIC
============================================ */

function startMusic() {

    if (!backgroundMusic) {
        return;
    }

    if (
        backgroundMusic.querySelector("source") === null &&
        !backgroundMusic.src
    ) {
        return;
    }

    const playPromise =
        backgroundMusic.play();

    if (playPromise !== undefined) {

        playPromise
            .then(function () {

                musicButton.classList.add(
                    "playing"
                );

            })
            .catch(function () {

                // Browser may block autoplay.
                // User can manually press music button.

            });

    }

}


musicButton.addEventListener(
    "click",
    function () {

        if (
            backgroundMusic.paused
        ) {

            backgroundMusic.play()
                .then(function () {

                    musicButton.classList.add(
                        "playing"
                    );

                })
                .catch(function () {

                    showToast(
                        "Tambahkan file musik terlebih dahulu."
                    );

                });

        } else {

            backgroundMusic.pause();

            musicButton.classList.remove(
                "playing"
            );

        }

    }
);


/* ============================================
   COUNTDOWN
============================================ */

/*
    GANTI TANGGAL DI SINI.

    Format:
    Tahun-Bulan-TanggalTJam:Menit:Detik

    Contoh:
    2026-12-20T08:00:00
*/

const weddingDate =
    new Date(
        "2026-12-20T08:00:00"
    ).getTime();


function updateCountdown() {

    const now =
        new Date().getTime();

    const distance =
        weddingDate - now;


    if (distance <= 0) {

        document.getElementById("days")
            .textContent = "00";

        document.getElementById("hours")
            .textContent = "00";

        document.getElementById("minutes")
            .textContent = "00";

        document.getElementById("seconds")
            .textContent = "00";

        return;

    }


    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
        );

    const minutes =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );

    const seconds =
        Math.floor(
            (
                distance %
                (1000 * 60)
            ) /
            1000
        );


    document.getElementById("days")
        .textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours")
        .textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes")
        .textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds")
        .textContent =
        String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);


/* ============================================
   SCROLL REVEAL
============================================ */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(
                function (entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "active"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(
    function (element) {

        revealObserver.observe(
            element
        );

    }
);


/* ============================================
   BACK TO TOP
============================================ */

const backToTop =
    document.getElementById("backToTop");


window.addEventListener(
    "scroll",
    function () {

        if (window.scrollY > 500) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

        }

    }
);


backToTop.addEventListener(
    "click",
    function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* ============================================
   COPY ACCOUNT NUMBER
============================================ */

const copyButtons =
    document.querySelectorAll(
        ".copy-button"
    );


copyButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const number =
                    button.getAttribute(
                        "data-copy"
                    );


                if (
                    navigator.clipboard &&
                    navigator.clipboard.writeText
                ) {

                    navigator.clipboard
                        .writeText(number)
                        .then(function () {

                            showToast(
                                "Nomor rekening berhasil disalin ♡"
                            );

                        });

                } else {

                    const temp =
                        document.createElement(
                            "textarea"
                        );

                    temp.value = number;

                    document.body.appendChild(
                        temp
                    );

                    temp.select();

                    document.execCommand(
                        "copy"
                    );

                    temp.remove();

                    showToast(
                        "Nomor rekening berhasil disalin ♡"
                    );

                }

            }
        );

    }
);


/* ============================================
   RSVP
============================================ */

const rsvpForm =
    document.getElementById(
        "rsvpForm"
    );

const guestMessages =
    document.getElementById(
        "guestMessages"
    );


let messages =
    JSON.parse(
        localStorage.getItem(
            "weddingMessages"
        )
    ) || [];


/* ============================================
   DISPLAY MESSAGES
============================================ */

function displayMessages() {

    guestMessages.innerHTML = "";


    messages
        .slice()
        .reverse()
        .forEach(
            function (message) {

                const messageElement =
                    document.createElement(
                        "div"
                    );

                messageElement.className =
                    "guest-message";


                const name =
                    document.createElement(
                        "strong"
                    );

                name.textContent =
                    message.name;


                const attendance =
                    document.createElement(
                        "span"
                    );

                attendance.className =
                    "attendance";

                attendance.textContent =
                    message.attendance;


                const text =
                    document.createElement(
                        "p"
                    );

                text.textContent =
                    message.message;


                messageElement.appendChild(
                    name
                );

                messageElement.appendChild(
                    attendance
                );

                messageElement.appendChild(
                    text
                );


                guestMessages.appendChild(
                    messageElement
                );

            }
        );

}


displayMessages();


/* ============================================
   RSVP SUBMIT
============================================ */

rsvpForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "guestName"
            ).value.trim();


        const attendance =
            document.getElementById(
                "guestAttendance"
            ).value;


        const message =
            document.getElementById(
                "guestMessage"
            ).value.trim();


        if (
            !name ||
            !attendance ||
            !message
        ) {

            showToast(
                "Mohon lengkapi semua data."
            );

            return;

        }


        const newMessage = {

            name: name,

            attendance: attendance,

            message: message,

            date:
                new Date().toISOString()

        };


        messages.push(
            newMessage
        );


        localStorage.setItem(
            "weddingMessages",
            JSON.stringify(messages)
        );


        displayMessages();


        rsvpForm.reset();


        showToast(
            "Terima kasih atas ucapan dan doanya 💙"
        );


        createMiniConfetti();

    }
);


/* ============================================
   TOAST
============================================ */

let toastTimer;


function showToast(message) {

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            function () {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* ============================================
   CONFETTI
============================================ */

function createConfetti() {

    const symbols = [
        "✦",
        "♡",
        "✧",
        "❀",
        "✿"
    ];


    for (
        let i = 0;
        i < 80;
        i++
    ) {

        const confetti =
            document.createElement(
                "div"
            );


        confetti.className =
            "confetti";


        confetti.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        confetti.style.left =
            Math.random() * 100 + "vw";


        confetti.style.fontSize =
            (
                Math.random() * 10 +
                8
            ) + "px";


        confetti.style.animationDuration =
            (
                Math.random() * 3 +
                3
            ) + "s";


        confetti.style.animationDelay =
            (
                Math.random() * 1
            ) + "s";


        document.body.appendChild(
            confetti
        );


        setTimeout(
            function () {

                confetti.remove();

            },
            7000
        );

    }

}


/* ============================================
   MINI CONFETTI
============================================ */

function createMiniConfetti() {

    const symbols = [
        "♡",
        "✦",
        "✧"
    ];


    for (
        let i = 0;
        i < 25;
        i++
    ) {

        const item =
            document.createElement(
                "div"
            );


        item.className =
            "confetti";


        item.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        item.style.left =
            (
                30 +
                Math.random() * 40
            ) + "vw";


        item.style.animationDuration =
            (
                Math.random() * 2 +
                2
            ) + "s";


        document.body.appendChild(
            item
        );


        setTimeout(
            function () {

                item.remove();

            },
            4500
        );

    }

}


/* ============================================
   PREVENT EMPTY LINKS
============================================ */

document
    .querySelectorAll('a[href="#"]')
    .forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                }
            );

        }
    );


/* ============================================
   CONSOLE MESSAGE
============================================ */

console.log(
    "♡ Wedding Invitation successfully loaded ♡"
);
