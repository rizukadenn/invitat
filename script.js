/* =========================================================
   PREMIUM WEDDING INVITATION
   PERSONAL GUEST + RSVP GOOGLE SHEETS + WHATSAPP
========================================================= */


/* =========================================================
   CONFIGURATION
========================================================= */

const CONFIG = {

    /*
     * Google Apps Script Web App
     */
    GOOGLE_SCRIPT_URL:
        "https://script.google.com/macros/s/AKfycbxS1suysupUJSWoaGPXjSlrJw0h0FGq4XwxNjyrTsF1g4xvZZAajZTqklbpgS2dVJCtBg/exec",

    /*
     * Nomor WhatsApp tujuan.
     * Format internasional tanpa + dan tanpa 0 depan.
     *
     * 089526612634
     * menjadi:
     * 6289526612634
     */
    WHATSAPP_NUMBER:
        "6289526612634",

    /*
     * Tanggal pernikahan
     *
     * Tahun-Bulan-Tanggal
     */
    WEDDING_DATE:
        "2026-12-12T08:00:00+07:00"

};


/* =========================================================
   DOM
========================================================= */

const openingScreen =
    document.getElementById("openingScreen");

const openInvitation =
    document.getElementById("openInvitation");

const mainContent =
    document.getElementById("mainContent");

const weddingMusic =
    document.getElementById("weddingMusic");

const musicButton =
    document.getElementById("musicButton");

const musicIcon =
    document.getElementById("musicIcon");

const floatingElements =
    document.getElementById("floatingElements");

const guestNameOpening =
    document.getElementById("guestNameOpening");

const guestNameMain =
    document.getElementById("guestNameMain");

const guestInput =
    document.getElementById("guestInput");

const rsvpForm =
    document.getElementById("rsvpForm");

const rsvpButton =
    document.getElementById("rsvpButton");

const rsvpStatus =
    document.getElementById("rsvpStatus");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");


/* =========================================================
   PERSONAL GUEST NAME
========================================================= */

function getGuestName() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    let name =
        params.get("to");

    if (!name) {

        name =
            "Tamu Undangan";

    }

    /*
     * Decode URL.
     */
    try {

        name =
            decodeURIComponent(name);

    } catch (error) {

        console.log(
            "Nama tamu tidak perlu decode."
        );

    }

    /*
     * Bersihkan spasi.
     */
    name =
        name.trim();

    /*
     * Batasi panjang nama
     * agar tidak merusak layout.
     */
    if (name.length > 80) {

        name =
            name.substring(0, 80);

    }

    return name ||
        "Tamu Undangan";
}


/* =========================================================
   SET GUEST NAME
========================================================= */

const guestName =
    getGuestName();

guestNameOpening.textContent =
    guestName;

guestNameMain.textContent =
    guestName;

guestInput.value =
    guestName;


/* =========================================================
   OPEN INVITATION
========================================================= */

openInvitation.addEventListener(
    "click",
    async function () {

        openingScreen.classList.add(
            "closed"
        );

        document.body.classList.remove(
            "locked"
        );

        /*
         * Coba mulai musik.
         * Browser mengizinkan karena
         * dipicu oleh klik user.
         */
        try {

            await weddingMusic.play();

            musicButton.classList.add(
                "playing"
            );

            musicIcon.textContent =
                "♫";

        } catch (error) {

            console.log(
                "Autoplay musik diblokir browser."
            );

        }

        /*
         * Scroll ke awal halaman.
         */
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =========================================================
   MUSIC BUTTON
========================================================= */

musicButton.addEventListener(
    "click",
    async function () {

        if (
            weddingMusic.paused
        ) {

            try {

                await weddingMusic.play();

                musicButton.classList.add(
                    "playing"
                );

                musicIcon.textContent =
                    "♫";

            } catch (error) {

                console.log(error);

            }

        } else {

            weddingMusic.pause();

            musicButton.classList.remove(
                "playing"
            );

            musicIcon.textContent =
                "🔇";
        }

    }
);


/* =========================================================
   FLOATING HEARTS
========================================================= */

function createFloatingElement() {

    if (!floatingElements) {
        return;
    }

    const element =
        document.createElement("div");

    element.className =
        "floating";

    const symbols = [
        "♡",
        "✦",
        "✧",
        "·",
        "❀"
    ];

    element.textContent =
        symbols[
            Math.floor(
                Math.random() *
                symbols.length
            )
        ];

    const size =
        Math.random() * 18 + 10;

    const left =
        Math.random() * 100;

    const duration =
        Math.random() * 8 + 8;

    const delay =
        Math.random() * 2;

    element.style.left =
        left + "%";

    element.style.fontSize =
        size + "px";

    element.style.animationDuration =
        duration + "s";

    element.style.animationDelay =
        delay + "s";

    floatingElements.appendChild(
        element
    );

    setTimeout(
        () => {

            element.remove();

        },
        (duration + delay) * 1000
    );

}


/*
 * Buat beberapa elemen pertama.
 */

for (
    let i = 0;
    i < 10;
    i++
) {

    setTimeout(
        createFloatingElement,
        i * 500
    );

}


/*
 * Teruskan animasi.
 */

setInterval(
    createFloatingElement,
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
            (difference %
                (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

    const minutes =
        Math.floor(
            (difference %
                (1000 * 60 * 60)) /
            (1000 * 60)
        );

    const seconds =
        Math.floor(
            (difference %
                (1000 * 60)) /
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
   RSVP GOOGLE SHEETS
========================================================= */

rsvpForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        /*
         * Ambil data.
         */

        const nama =
            document.getElementById(
                "guestInput"
            ).value.trim();

        const kehadiran =
            document.getElementById(
                "attendance"
            ).value;

        const jumlah =
            document.getElementById(
                "guestCount"
            ).value;

        const pesan =
            document.getElementById(
                "message"
            ).value.trim();


        /*
         * Validasi.
         */

        if (!nama) {

            showToast(
                "Nama belum diisi."
            );

            return;

        }

        if (!kehadiran) {

            showToast(
                "Silakan pilih kehadiran."
            );

            return;

        }

        if (!jumlah) {

            showToast(
                "Silakan pilih jumlah tamu."
            );

            return;

        }


        /*
         * Loading state.
         */

        const originalButton =
            rsvpButton.innerHTML;

        rsvpButton.disabled =
            true;

        rsvpButton.innerHTML =
            "⏳ Mengirim RSVP...";

        rsvpStatus.textContent =
            "Menyimpan konfirmasi Anda...";


        /*
         * Data untuk Google Apps Script.
         *
         * Menggunakan URLSearchParams
         * agar tidak terkena preflight CORS.
         */

        const formData =
            new URLSearchParams();

        formData.append(
            "nama",
            nama
        );

        formData.append(
            "kehadiran",
            kehadiran
        );

        formData.append(
            "jumlah",
            jumlah
        );

        formData.append(
            "pesan",
            pesan
        );

        formData.append(
            "timestamp",
            new Date().toISOString()
        );


        try {

            /*
             * Kirim ke Google Apps Script.
             *
             * no-cors digunakan karena
             * Apps Script tidak perlu
             * mengembalikan data ke browser.
             */

            await fetch(
                CONFIG.GOOGLE_SCRIPT_URL,
                {
                    method: "POST",

                    mode: "no-cors",

                    body: formData
                }
            );


            /*
             * Tampilkan sukses.
             */

            rsvpStatus.innerHTML =
                "✓ RSVP berhasil dikirim. " +
                "Terima kasih atas konfirmasi Anda.";

            rsvpStatus.style.color =
                "#7c765d";


            showToast(
                "RSVP berhasil dikirim!"
            );


            /*
             * Buat pesan WhatsApp.
             */

            const whatsappMessage =
                createWhatsAppMessage({
                    nama,
                    kehadiran,
                    jumlah,
                    pesan
                });


            /*
             * Tunggu sebentar agar user
             * melihat pesan sukses.
             */

            setTimeout(
                function () {

                    openWhatsApp(
                        whatsappMessage
                    );

                },
                900
            );


            /*
             * Reset pesan.
             * Nama personal tetap dipertahankan.
             */

            document.getElementById(
                "message"
            ).value = "";


        } catch (error) {

            console.error(
                "RSVP error:",
                error
            );


            rsvpStatus.innerHTML =
                "Maaf, terjadi masalah saat mengirim RSVP. " +
                "Silakan coba lagi.";

            rsvpStatus.style.color =
                "#a34f4f";


            showToast(
                "Gagal mengirim RSVP."
            );

        } finally {

            rsvpButton.disabled =
                false;

            rsvpButton.innerHTML =
                originalButton;

        }

    }
);


/* =========================================================
   WHATSAPP MESSAGE
========================================================= */

function createWhatsAppMessage(data) {

    const nama =
        data.nama;

    const kehadiran =
        data.kehadiran;

    const jumlah =
        data.jumlah;

    const pesan =
        data.pesan ||
        "-";


    let message =

        "Halo, saya ingin mengonfirmasi RSVP " +
        "untuk pernikahan Rizuka & Partner.%0A%0A" +

        "👤 Nama: " +
        nama +
        "%0A" +

        "💍 Kehadiran: " +
        kehadiran +
        "%0A" +

        "👥 Jumlah tamu: " +
        jumlah +
        " orang%0A" +

        "💌 Ucapan: " +
        pesan;


    return message;
}


/* =========================================================
   OPEN WHATSAPP
========================================================= */

function openWhatsApp(message) {

    const url =
        "https://wa.me/" +
        CONFIG.WHATSAPP_NUMBER +
        "?text=" +
        message;


    window.open(
        url,
        "_blank"
    );

}


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

    toastMessage.textContent =
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


/* =========================================================
   GIFT
========================================================= */

const giftButton =
    document.getElementById(
        "giftButton"
    );

const giftDetails =
    document.getElementById(
        "giftDetails"
    );


giftButton.addEventListener(
    "click",
    function () {

        giftDetails.classList.toggle(
            "show"
        );


        if (
            giftDetails.classList.contains(
                "show"
            )
        ) {

            giftButton.textContent =
                "Sembunyikan Rekening";

        } else {

            giftButton.textContent =
                "Lihat Rekening";

        }

    }
);


/* =========================================================
   COPY BANK ACCOUNT
========================================================= */

const copyAccount =
    document.getElementById(
        "copyAccount"
    );

const accountNumber =
    document.getElementById(
        "accountNumber"
    );


copyAccount.addEventListener(
    "click",
    async function () {

        const number =
            accountNumber.textContent.trim();


        try {

            await navigator.clipboard.writeText(
                number
            );

            showToast(
                "Nomor rekening berhasil disalin."
            );

            copyAccount.textContent =
                "✓ Berhasil Disalin";


            setTimeout(
                function () {

                    copyAccount.textContent =
                        "Salin Nomor Rekening";

                },
                2000
            );

        } catch (error) {

            showToast(
                "Tidak dapat menyalin otomatis."
            );

        }

    }
);


/* =========================================================
   SCROLL ANIMATION
========================================================= */

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
        ".section-heading, .event-card, .person-card, .timeline-item, .rsvp-card, .gallery-item"
    )
    .forEach(
        function (element) {

            observer.observe(
                element
            );

        }
    );


/* =========================================================
   PREVENT ACCIDENTAL FORM RESUBMISSION
========================================================= */

window.addEventListener(
    "beforeunload",
    function () {

        if (
            weddingMusic &&
            !weddingMusic.paused
        ) {

            weddingMusic.pause();

        }

    }
);


/* =========================================================
   CONSOLE INFO
========================================================= */

console.log(
    "Premium Wedding Invitation Loaded."
);

console.log(
    "Guest:",
    guestName
);

console.log(
    "RSVP endpoint:",
    CONFIG.GOOGLE_SCRIPT_URL
);
