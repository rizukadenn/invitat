/* =========================================================
   ELEGANT PINK WEDDING SCRIPT
========================================================= */


/* =========================================================
   CONFIGURATION
========================================================= */

const CONFIG = {

    /* Google Apps Script Web App */
    GOOGLE_SCRIPT_URL:
        "https://script.google.com/macros/s/AKfycbxS1suysupUJSWoaGPXjSlrJw0h0FGq4XwxNjyrTsF1g4xvZZAajZTqklbpgS2dVJCtBg/exec",

    /* WhatsApp */
    WHATSAPP_NUMBER:
        "6289526612634",

    /* Wedding date */
    WEDDING_DATE:
        "2026-12-28T08:00:00+07:00"

};


/* =========================================================
   DOM
========================================================= */

const loader =
    document.getElementById("loader");

const opening =
    document.getElementById("opening");

const mainContent =
    document.getElementById("mainContent");

const openInvitation =
    document.getElementById("openInvitation");

const weddingMusic =
    document.getElementById("weddingMusic");

const musicButton =
    document.getElementById("musicButton");

const guestNameOpening =
    document.getElementById("guestNameOpening");

const guestName =
    document.getElementById("guestName");

const rsvpForm =
    document.getElementById("rsvpForm");

const rsvpStatus =
    document.getElementById("rsvpStatus");

const submitText =
    document.getElementById("submitText");

const submitLoading =
    document.getElementById("submitLoading");


/* =========================================================
   LOADING
========================================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        loader.classList.add("hide");

    }, 1000);

});


/* =========================================================
   PERSONAL GUEST NAME
========================================================= */

function getGuestName() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const guest =
        params.get("to");

    if (!guest) {

        return "Tamu Undangan";

    }

    return decodeURIComponent(
        guest.replace(/\+/g, " ")
    ).trim() || "Tamu Undangan";

}


const currentGuest =
    getGuestName();


guestNameOpening.textContent =
    currentGuest;

guestName.textContent =
    currentGuest;


/* =========================================================
   OPEN INVITATION
========================================================= */

openInvitation.addEventListener(
    "click",
    async () => {

        opening.classList.add("closed");

        mainContent.classList.remove("hidden");

        document.body.classList.remove("locked");

        setTimeout(() => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }, 300);


        /* Try playing music */
        try {

            await weddingMusic.play();

            musicButton.classList.add(
                "playing"
            );

        } catch (error) {

            console.log(
                "Autoplay membutuhkan interaksi pengguna."
            );

        }

    }
);


/* =========================================================
   MUSIC BUTTON
========================================================= */

musicButton.addEventListener(
    "click",
    async () => {

        if (
            weddingMusic.paused
        ) {

            try {

                await weddingMusic.play();

                musicButton.classList.add(
                    "playing"
                );

            } catch (error) {

                console.log(error);

            }

        } else {

            weddingMusic.pause();

            musicButton.classList.remove(
                "playing"
            );

        }

    }
);


/* =========================================================
   CREATE FLOATING PETALS
========================================================= */

const petalsContainer =
    document.getElementById("petals");


function createPetal() {

    const petal =
        document.createElement("div");

    petal.classList.add("petal");

    const size =
        Math.random() * 8 + 7;

    petal.style.width =
        `${size}px`;

    petal.style.height =
        `${size * 1.5}px`;

    petal.style.left =
        `${Math.random() * 100}%`;

    petal.style.animationDuration =
        `${Math.random() * 8 + 8}s`;

    petal.style.animationDelay =
        `${Math.random() * 5}s`;

    petal.style.setProperty(
        "--drift",
        `${Math.random() * 250 - 125}px`
    );

    petalsContainer.appendChild(
        petal
    );

    setTimeout(() => {

        petal.remove();

    }, 18000);

}


for (
    let i = 0;
    i < 18;
    i++
) {

    createPetal();

}


setInterval(
    createPetal,
    1300
);


/* =========================================================
   COUNTDOWN
========================================================= */

const weddingDate =
    new Date(
        CONFIG.WEDDING_DATE
    ).getTime();


function updateCountdown() {

    const now =
        new Date().getTime();

    const difference =
        weddingDate - now;


    if (difference <= 0) {

        document.getElementById(
            "days"
        ).textContent = "00";

        document.getElementById(
            "hours"
        ).textContent = "00";

        document.getElementById(
            "minutes"
        ).textContent = "00";

        document.getElementById(
            "seconds"
        ).textContent = "00";

        return;

    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (
                difference %
                (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
        );

    const minutes =
        Math.floor(
            (
                difference %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );

    const seconds =
        Math.floor(
            (
                difference %
                (1000 * 60)
            ) /
            1000
        );


    document.getElementById(
        "days"
    ).textContent =
        String(days).padStart(2, "0");


    document.getElementById(
        "hours"
    ).textContent =
        String(hours).padStart(2, "0");


    document.getElementById(
        "minutes"
    ).textContent =
        String(minutes).padStart(2, "0");


    document.getElementById(
        "seconds"
    ).textContent =
        String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);


/* =========================================================
   RSVP
========================================================= */

rsvpForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "name"
            ).value.trim();

        const attendance =
            document.getElementById(
                "attendance"
            ).value;

        const guests =
            document.getElementById(
                "guests"
            ).value;

        const message =
            document.getElementById(
                "message"
            ).value.trim();


        if (!name) {

            showStatus(
                "Silakan masukkan nama.",
                "error"
            );

            return;

        }


        if (!attendance) {

            showStatus(
                "Silakan pilih konfirmasi kehadiran.",
                "error"
            );

            return;

        }


        if (!guests) {

            showStatus(
                "Silakan pilih jumlah tamu.",
                "error"
            );

            return;

        }


        setSubmitLoading(true);


        const formData =
            new URLSearchParams();


        formData.append(
            "nama",
            name
        );

        formData.append(
            "kehadiran",
            attendance
        );

        formData.append(
            "jumlah_tamu",
            guests
        );

        formData.append(
            "ucapan",
            message
        );

        formData.append(
            "tamu_undangan",
            currentGuest
        );

        formData.append(
            "timestamp",
            new Date().toLocaleString(
                "id-ID"
            )
        );


        try {

            /*
             * no-cors digunakan karena Google Apps Script
             * tidak selalu mengizinkan pembacaan response
             * dari domain GitHub Pages.
             */

            await fetch(
                CONFIG.GOOGLE_SCRIPT_URL,
                {
                    method: "POST",

                    mode: "no-cors",

                    headers: {
                        "Content-Type":
                            "application/x-www-form-urlencoded;charset=UTF-8"
                    },

                    body:
                        formData.toString()
                }
            );


            showStatus(
                "RSVP berhasil dikirim. Terima kasih! 💗",
                "success"
            );


            /*
             * Setelah data dikirim ke Google Sheets,
             * buka WhatsApp.
             */

            setTimeout(() => {

                sendWhatsApp(
                    name,
                    attendance,
                    guests,
                    message
                );

            }, 700);


            rsvpForm.reset();


        } catch (error) {

            console.error(error);

            showStatus(
                "Terjadi masalah saat mengirim RSVP. Silakan coba lagi.",
                "error"
            );

        } finally {

            setSubmitLoading(false);

        }

    }
);


/* =========================================================
   WHATSAPP
========================================================= */

function sendWhatsApp(
    name,
    attendance,
    guests,
    message
) {

    let text =

`Halo, saya ingin memberikan konfirmasi untuk undangan pernikahan.

Nama: ${name}

Nama pada undangan: ${currentGuest}

Kehadiran: ${attendance}

Jumlah tamu: ${guests}

Ucapan:
${message || "-"}

Terima kasih. 💗`;


    const whatsappURL =
        "https://wa.me/" +
        CONFIG.WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(text);


    window.open(
        whatsappURL,
        "_blank"
    );

}


/* =========================================================
   RSVP STATUS
========================================================= */

function showStatus(
    message,
    type
) {

    rsvpStatus.textContent =
        message;

    if (type === "success") {

        rsvpStatus.style.color =
            "#7b9b7b";

    } else {

        rsvpStatus.style.color =
            "#b55f6f";

    }

}


/* =========================================================
   SUBMIT LOADING
========================================================= */

function setSubmitLoading(
    loading
) {

    const button =
        rsvpForm.querySelector(
            ".submit-button"
        );


    if (loading) {

        button.disabled = true;

        submitText.classList.add(
            "hidden"
        );

        submitLoading.classList.remove(
            "hidden"
        );

    } else {

        button.disabled = false;

        submitText.classList.remove(
            "hidden"
        );

        submitLoading.classList.add(
            "hidden"
        );

    }

}


/* =========================================================
   COPY ACCOUNT NUMBER
========================================================= */

function copyAccount() {

    const accountNumber =
        "1234567890";


    navigator.clipboard
        .writeText(accountNumber)
        .then(() => {

            alert(
                "Nomor rekening berhasil disalin 💗"
            );

        })
        .catch(() => {

            alert(
                "Nomor rekening: " +
                accountNumber
            );

        });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".event-card, .person-card, .count-box, .gift-card"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                    }

                }
            );

        },
        {
            threshold: .15
        }
    );


revealElements.forEach(
    element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(25px)";

        element.style.transition =
            "opacity .8s ease, transform .8s ease";

        observer.observe(
            element
        );

    }
);
