/* =====================================================
   LUXURY WEDDING INVITATION
   JAVASCRIPT
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const loader =
    document.getElementById("loader");

const opening =
    document.getElementById("opening");

const main =
    document.getElementById("main");

const envelope =
    document.getElementById("envelope");

const openBtn =
    document.getElementById("openBtn");

const music =
    document.getElementById("music");

const musicBtn =
    document.getElementById("musicBtn");

const toast =
    document.getElementById("toast");

const topBtn =
    document.getElementById("topBtn");

const shareBtn =
    document.getElementById("shareBtn");


/* =====================================================
   INITIAL
===================================================== */

document.body.classList.add("locked");


/* =====================================================
   LOADING
===================================================== */

window.addEventListener(
    "load",
    function () {

        setTimeout(
            function () {

                loader.classList.add("hide");

            },
            1500
        );

    }
);


/* =====================================================
   OPEN INVITATION
===================================================== */

let opened = false;

function openInvitation() {

    if (opened) {
        return;
    }

    opened = true;

    envelope.classList.add("open");

    openBtn.innerHTML =
        "<span>OPENING...</span><i>✦</i>";

    createConfetti();

    setTimeout(
        function () {

            opening.classList.add("closed");

            main.classList.add("visible");

            document.body.classList.remove(
                "locked"
            );

            openBtn.innerHTML =
                "<span>INVITATION OPENED</span><i>✓</i>";

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            startMusic();

        },
        1300
    );

}


envelope.addEventListener(
    "click",
    openInvitation
);

openBtn.addEventListener(
    "click",
    openInvitation
);


/* =====================================================
   MUSIC
===================================================== */

function startMusic() {

    if (!music.querySelector("source")) {
        return;
    }

    music
        .play()
        .then(
            function () {

                musicBtn.classList.add(
                    "playing"
                );

            }
        )
        .catch(
            function () {

                console.log(
                    "Autoplay blocked."
                );

            }
        );

}


musicBtn.addEventListener(
    "click",
    function () {

        if (music.paused) {

            music
                .play()
                .then(
                    function () {

                        musicBtn.classList.add(
                            "playing"
                        );

                    }
                )
                .catch(
                    function () {

                        showToast(
                            "Tambahkan file musik terlebih dahulu."
                        );

                    }
                );

        } else {

            music.pause();

            musicBtn.classList.remove(
                "playing"
            );

        }

    }
);


/* =====================================================
   COUNTDOWN
===================================================== */

/*
==========================================================
EDIT DI SINI

Format:

YYYY-MM-DDTHH:MM:SS

Contoh:

2026-12-20T08:00:00

==========================================================
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

        setCountdown(
            0,
            0,
            0,
            0
        );

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


    setCountdown(
        days,
        hours,
        minutes,
        seconds
    );

}


function setCountdown(
    days,
    hours,
    minutes,
    seconds
) {

    document.getElementById(
        "days"
    ).textContent =
        String(days).padStart(
            2,
            "0"
        );


    document.getElementById(
        "hours"
    ).textContent =
        String(hours).padStart(
            2,
            "0"
        );


    document.getElementById(
        "minutes"
    ).textContent =
        String(minutes).padStart(
            2,
            "0"
        );


    document.getElementById(
        "seconds"
    ).textContent =
        String(seconds).padStart(
            2,
            "0"
        );

}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


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


/* =====================================================
   GALLERY LIGHTBOX
===================================================== */

const galleryImages =
    document.querySelectorAll(
        ".gallery-image img"
    );

const lightbox =
    document.getElementById(
        "lightbox"
    );

const lightboxImage =
    document.getElementById(
        "lightboxImage"
    );

const closeLightbox =
    document.getElementById(
        "closeLightbox"
    );


galleryImages.forEach(
    function (image) {

        image.parentElement.addEventListener(
            "click",
            function () {

                lightboxImage.src =
                    image.src;

                lightbox.classList.add(
                    "active"
                );

                document.body.classList.add(
                    "locked"
                );

            }
        );

    }
);


function closeGallery() {

    lightbox.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "locked"
    );

}


closeLightbox.addEventListener(
    "click",
    closeGallery
);


lightbox.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            lightbox
        ) {

            closeGallery();

        }

    }
);


/* =====================================================
   COPY ACCOUNT
===================================================== */

const copyButtons =
    document.querySelectorAll(
        ".copy-account"
    );


copyButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            async function () {

                const account =
                    button.dataset.account;


                try {

                    await navigator
                        .clipboard
                        .writeText(account);

                    showToast(
                        "Nomor rekening berhasil disalin."
                    );

                } catch (error) {

                    const textarea =
                        document.createElement(
                            "textarea"
                        );

                    textarea.value =
                        account;

                    document.body.appendChild(
                        textarea
                    );

                    textarea.select();

                    document.execCommand(
                        "copy"
                    );

                    textarea.remove();

                    showToast(
                        "Nomor rekening berhasil disalin."
                    );

                }

            }
        );

    }
);


/* =====================================================
   RSVP
===================================================== */

const rsvpForm =
    document.getElementById(
        "rsvpForm"
    );

const messagesContainer =
    document.getElementById(
        "messages"
    );


let messages =
    JSON.parse(
        localStorage.getItem(
            "luxuryWeddingMessages"
        )
    ) || [];


function displayMessages() {

    messagesContainer.innerHTML = "";


    messages
        .slice()
        .reverse()
        .forEach(
            function (item) {

                const message =
                    document.createElement(
                        "article"
                    );

                message.className =
                    "message";


                const head =
                    document.createElement(
                        "div"
                    );

                head.className =
                    "message-head";


                const name =
                    document.createElement(
                        "strong"
                    );

                name.className =
                    "message-name";

                name.textContent =
                    item.name;


                const status =
                    document.createElement(
                        "span"
                    );

                status.className =
                    "message-status";

                status.textContent =
                    item.attendance;


                const text =
                    document.createElement(
                        "p"
                    );

                text.className =
                    "message-text";

                text.textContent =
                    item.message;


                head.appendChild(
                    name
                );

                head.appendChild(
                    status
                );


                message.appendChild(
                    head
                );

                message.appendChild(
                    text
                );


                messagesContainer.appendChild(
                    message
                );

            }
        );

}


displayMessages();


rsvpForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document
                .getElementById(
                    "guestName"
                )
                .value
                .trim();


        const attendance =
            document
                .getElementById(
                    "guestAttendance"
                )
                .value;


        const message =
            document
                .getElementById(
                    "guestMessage"
                )
                .value
                .trim();


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

            name:
                name,

            attendance:
                attendance,

            message:
                message,

            created:
                Date.now()

        };


        messages.push(
            newMessage
        );


        localStorage.setItem(
            "luxuryWeddingMessages",
            JSON.stringify(
                messages
            )
        );


        displayMessages();


        rsvpForm.reset();


        showToast(
            "Terima kasih atas ucapan Anda ♡"
        );


        createSmallConfetti();

    }
);


/* =====================================================
   TOAST
===================================================== */

let toastTimer;


function showToast(text) {

    toast.querySelector(
        "p"
    ).textContent =
        text;


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


/* =====================================================
   SHARE
===================================================== */

shareBtn.addEventListener(
    "click",
    async function () {

        const shareData = {

            title:
                "The Wedding of Arman & Aisyah",

            text:
                "Kami mengundang Anda untuk hadir di hari bahagia kami.",

            url:
                window.location.href

        };


        if (
            navigator.share
        ) {

            try {

                await navigator.share(
                    shareData
                );

            } catch (error) {

                console.log(
                    "Share cancelled."
                );

            }

        } else {

            try {

                await navigator
                    .clipboard
                    .writeText(
                        window.location.href
                    );

                showToast(
                    "Link undangan berhasil disalin."
                );

            } catch (error) {

                showToast(
                    "Silakan salin link dari browser."
                );

            }

        }

    }
);


/* =====================================================
   BACK TO TOP
===================================================== */

window.addEventListener(
    "scroll",
    function () {

        if (
            window.scrollY > 600
        ) {

            topBtn.classList.add(
                "show"
            );

        } else {

            topBtn.classList.remove(
                "show"
            );

        }

    }
);


topBtn.addEventListener(
    "click",
    function () {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


/* =====================================================
   CONFETTI
===================================================== */

function createConfetti() {

    const symbols = [
        "✦",
        "✧",
        "◆",
        "♡",
        "❀"
    ];


    for (
        let i = 0;
        i < 100;
        i++
    ) {

        const element =
            document.createElement(
                "div"
            );


        element.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        element.style.position =
            "fixed";

        element.style.left =
            Math.random() *
            100 +
            "vw";

        element.style.top =
            "-30px";

        element.style.zIndex =
            "15000";

        element.style.pointerEvents =
            "none";

        element.style.fontSize =
            Math.random() *
            12 +
            7 +
            "px";

        element.style.color =
            Math.random() > 0.5
                ? "#c9a96a"
                : "#ffffff";

        element.style.animation =
            "luxuryConfetti " +
            (
                Math.random() * 3 +
                3
            ) +
            "s linear forwards";


        document.body.appendChild(
            element
        );


        setTimeout(
            function () {

                element.remove();

            },
            7000
        );

    }

}


/* =====================================================
   SMALL CONFETTI
===================================================== */

function createSmallConfetti() {

    const symbols = [
        "✦",
        "♡",
        "✧"
    ];


    for (
        let i = 0;
        i < 25;
        i++
    ) {

        const element =
            document.createElement(
                "div"
            );


        element.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        element.style.position =
            "fixed";

        element.style.left =
            (
                20 +
                Math.random() * 60
            ) +
            "vw";

        element.style.top =
            "50%";

        element.style.zIndex =
            "15000";

        element.style.pointerEvents =
            "none";

        element.style.color =
            "#c9a96a";

        element.style.animation =
            "luxuryConfetti " +
            (
                Math.random() * 2 +
                2
            ) +
            "s linear forwards";


        document.body.appendChild(
            element
        );


        setTimeout(
            function () {

                element.remove();

            },
            5000
        );

    }

}


/* =====================================================
   CONFETTI CSS
===================================================== */

const confettiStyle =
    document.createElement(
        "style"
    );


confettiStyle.innerHTML = `

@keyframes luxuryConfetti {

    0% {
        transform:
            translateY(0)
            rotate(0deg);

        opacity: 1;
    }

    100% {
        transform:
            translateY(110vh)
            translateX(
                ${Math.random() * 300 - 150}px
            )
            rotate(720deg);

        opacity: 0;
    }

}

`;


document.head.appendChild(
    confettiStyle
);


/* =====================================================
   GOLD PARTICLES
===================================================== */

const canvas =
    document.getElementById(
        "particles"
    );

const ctx =
    canvas.getContext("2d");


let particles = [];


function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


function createParticles() {

    particles = [];


    const amount =
        window.innerWidth < 600
            ? 25
            : 45;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        particles.push({

            x:
                Math.random() *
                canvas.width,

            y:
                Math.random() *
                canvas.height,

            radius:
                Math.random() *
                1.5 +
                0.5,

            speed:
                Math.random() *
                0.25 +
                0.05,

            opacity:
                Math.random() *
                0.5 +
                0.1

        });

    }

}


createParticles();


function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach(
        function (particle) {

            particle.y -=
                particle.speed;


            if (
                particle.y < 0
            ) {

                particle.y =
                    canvas.height;

                particle.x =
                    Math.random() *
                    canvas.width;

            }


            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.radius,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                `rgba(
                    201,
                    169,
                    106,
                    ${particle.opacity}
                )`;


            ctx.fill();

        }
    );


    requestAnimationFrame(
        animateParticles
    );

}


animateParticles();


/* =====================================================
   KEYBOARD ESCAPE
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            if (
                lightbox.classList.contains(
                    "active"
                )
            ) {

                closeGallery();

            }

        }

    }
);


/* =====================================================
   CONSOLE
===================================================== */

console.log(
    "%c♡ Luxury Wedding Invitation ♡",
    "color:#c9a96a;font-size:18px;"
);
