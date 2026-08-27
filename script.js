/* =====================================================
   WEDDING WEBSITE
   RIZUKA & DENN
===================================================== */


/* =====================================================
   CONFIGURATION
===================================================== */

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxS1suysupUJSWoaGPXjSlrJw0h0FGq4XwxNjyrTsF1g4xvZZAajZTqklbpgS2dVJCtBg/exec";


const WHATSAPP_NUMBER =
    "6289526612634";


/* =====================================================
   ELEMENTS
===================================================== */

const openingScreen =
    document.getElementById("openingScreen");

const mainContent =
    document.getElementById("mainContent");

const openInvitation =
    document.getElementById("openInvitation");

const music =
    document.getElementById("weddingMusic");

const musicButton =
    document.getElementById("musicButton");

const rsvpForm =
    document.getElementById("rsvpForm");

const rsvpSuccess =
    document.getElementById("rsvpSuccess");

const submitRsvp =
    document.getElementById("submitRsvp");

const whatsappButton =
    document.getElementById("whatsappButton");

const toast =
    document.getElementById("toast");


/* =====================================================
   RSVP DATA
===================================================== */

let lastRsvpData = {

    nama: "",

    kehadiran: "",

    jumlahTamu: "",

    ucapan: ""

};


/* =====================================================
   OPEN INVITATION
===================================================== */

openInvitation.addEventListener(
    "click",
    function () {

        openingScreen.classList.add("hide");

        mainContent.classList.remove("hidden");

        document.body.classList.remove("locked");

        /*
         * Musik mencoba diputar setelah user
         * melakukan klik.
         */

        music
            .play()
            .then(function () {

                musicButton.classList.add("playing");

            })
            .catch(function () {

                console.log(
                    "Musik membutuhkan interaksi tambahan."
                );

            });

        /*
         * Scroll ke atas.
         */

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

    }
);


/* =====================================================
   MUSIC BUTTON
===================================================== */

musicButton.addEventListener(
    "click",
    function () {

        if (music.paused) {

            music
                .play()
                .then(function () {

                    musicButton.classList.add(
                        "playing"
                    );

                })
                .catch(function (error) {

                    console.log(error);

                });

        } else {

            music.pause();

            musicButton.classList.remove(
                "playing"
            );

        }

    }
);


/* =====================================================
   MUSIC STATE
===================================================== */

music.addEventListener(
    "play",
    function () {

        musicButton.classList.add(
            "playing"
        );

    }
);


music.addEventListener(
    "pause",
    function () {

        musicButton.classList.remove(
            "playing"
        );

    }
);


/* =====================================================
   COUNTDOWN
===================================================== */

const weddingDate =
    new Date(
        "December 12, 2026 08:00:00"
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
            (distance %
                (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (distance %
                (1000 * 60 * 60)) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (distance %
                (1000 * 60)) /
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


/* =====================================================
   RSVP SUBMIT
===================================================== */

rsvpForm.addEventListener(
    "submit",
    function (event) {

        /*
         * Jangan reload halaman.
         */

        event.preventDefault();


        /*
         * Validasi form.
         */

        if (!rsvpForm.checkValidity()) {

            rsvpForm.reportValidity();

            return;

        }


        /*
         * Ambil data.
         */

        const nama =
            document.getElementById("nama")
                .value
                .trim();


        const kehadiran =
            document.getElementById("kehadiran")
                .value;


        const jumlahTamu =
            document.getElementById("jumlahTamu")
                .value;


        const ucapan =
            document.getElementById("ucapan")
                .value
                .trim();


        /*
         * Simpan untuk WhatsApp.
         */

        lastRsvpData = {

            nama:
                nama,

            kehadiran:
                kehadiran,

            jumlahTamu:
                jumlahTamu,

            ucapan:
                ucapan

        };


        /*
         * Ubah tombol menjadi loading.
         */

        submitRsvp.disabled = true;

        submitRsvp.innerHTML =
            "<span>♡</span> Mengirim RSVP...";


        /*
         * Pastikan action form menggunakan
         * Google Apps Script URL.
         */

        rsvpForm.action =
            GOOGLE_SCRIPT_URL;


        /*
         * Submit form asli ke iframe.
         *
         * Ini membuat browser mengirim POST
         * langsung ke Google Apps Script
         * tanpa masalah CORS.
         */

        const hiddenSubmit =
            document.createElement("button");

        hiddenSubmit.type = "submit";

        hiddenSubmit.style.display =
            "none";

        rsvpForm.appendChild(
            hiddenSubmit
        );


        hiddenSubmit.click();


        /*
         * Beri sedikit waktu kepada browser
         * untuk mengirim request.
         */

        setTimeout(
            function () {

                rsvpForm.style.display =
                    "none";

                rsvpSuccess.classList.add(
                    "show"
                );


                submitRsvp.disabled =
                    false;


                submitRsvp.innerHTML =
                    "<span>♡</span> Kirim RSVP";


                showToast(
                    "RSVP berhasil dikirim ♡"
                );


                hiddenSubmit.remove();

            },
            1200
        );

    }
);


/* =====================================================
   WHATSAPP
===================================================== */

whatsappButton.addEventListener(
    "click",
    function () {

        const nama =
            lastRsvpData.nama ||
            "-";


        const kehadiran =
            lastRsvpData.kehadiran ||
            "-";


        const jumlahTamu =
            lastRsvpData.jumlahTamu ||
            "-";


        const ucapan =
            lastRsvpData.ucapan ||
            "-";


        const message =

`💍 WEDDING RSVP

Halo, saya ingin mengonfirmasi kehadiran untuk acara pernikahan Rizuka & Denn.

Nama:
${nama}

Kehadiran:
${kehadiran}

Jumlah Tamu:
${jumlahTamu} orang

Ucapan & Doa:
${ucapan}

Terima kasih 🤍`;


        const whatsappURL =
            "https://wa.me/" +
            WHATSAPP_NUMBER +
            "?text=" +
            encodeURIComponent(message);


        window.open(
            whatsappURL,
            "_blank"
        );

    }
);


/* =====================================================
   TOAST
===================================================== */

function showToast(message) {

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );


    setTimeout(
        function () {

            toast.classList.remove(
                "show"
            );

        },
        3000
    );

}


/* =====================================================
   GUEST NAME FROM URL
===================================================== */

function getGuestName() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const guest =
        params.get("to");


    if (guest) {

        const decodedGuest =
            decodeURIComponent(
                guest.replace(
                    /\+/g,
                    " "
                )
            );


        document.getElementById(
            "guestName"
        ).textContent =
            decodedGuest;

    }

}


getGuestName();


/* =====================================================
   SCROLL REVEAL
===================================================== */

const observer =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(
                function (entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


document
    .querySelectorAll(
        ".section-heading, .person-card, .event-card, .story-item, .rsvp-card"
    )
    .forEach(
        function (element) {

            observer.observe(
                element
            );

        }
    );


/* =====================================================
   PREVENT BODY SCROLL AT OPENING
===================================================== */

document.body.classList.add(
    "locked"
);


/* =====================================================
   PAGE READY
===================================================== */

console.log(
    "Wedding Invitation loaded successfully."
);

console.log(
    "Google Sheets RSVP endpoint:",
    GOOGLE_SCRIPT_URL
);
