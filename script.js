/* =====================================================
   ROYAL IVORY & GOLD WEDDING
   JAVASCRIPT
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const openingScreen =
    document.getElementById("openingScreen");

const openInvitation =
    document.getElementById("openInvitation");

const music =
    document.getElementById("weddingMusic");

const musicButton =
    document.getElementById("musicButton");

const mainContent =
    document.getElementById("mainContent");


/* =====================================================
   INITIAL STATE
===================================================== */

document.body.classList.add("locked");


/* =====================================================
   OPEN INVITATION
===================================================== */

openInvitation.addEventListener(
    "click",
    async function () {

        openingScreen.classList.add("hidden");

        document.body.classList.remove("locked");

        musicButton.classList.add("active");


        /*
         * Musik dimulai setelah user menekan tombol.
         * Ini penting karena browser biasanya memblokir
         * autoplay audio tanpa interaksi pengguna.
         */

        try {

            music.volume = 0.35;

            await music.play();

            musicButton.classList.remove("paused");

            musicButton.innerHTML = "♪";

        }

        catch (error) {

            console.log(
                "Musik belum dapat dimainkan:",
                error
            );

            musicButton.classList.add("paused");

            musicButton.innerHTML = "▶";

        }


        /*
         * Scroll sedikit ke halaman utama
         * setelah opening selesai.
         */

        setTimeout(function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }, 400);

    }
);


/* =====================================================
   MUSIC TOGGLE
===================================================== */

musicButton.addEventListener(
    "click",
    async function () {

        if (music.paused) {

            try {

                await music.play();

                musicButton.classList.remove(
                    "paused"
                );

                musicButton.innerHTML = "♪";

            }

            catch (error) {

                console.log(
                    "Tidak dapat memutar musik:",
                    error
                );

            }

        }

        else {

            music.pause();

            musicButton.classList.add(
                "paused"
            );

            musicButton.innerHTML = "Ⅱ";

        }

    }
);


/* =====================================================
   COUNTDOWN
===================================================== */


/*
 * =====================================================
 * GANTI TANGGAL PERNIKAHAN DI SINI
 * =====================================================
 *
 * Format:
 *
 * YYYY-MM-DDTHH:MM:SS
 *
 * Contoh:
 *
 * 2026-12-12T08:00:00
 *
 */

const weddingDate =
    new Date(
        "2026-12-12T08:00:00"
    ).getTime();


function updateCountdown() {

    const now =
        new Date().getTime();

    const distance =
        weddingDate - now;


    if (distance <= 0) {

        document.getElementById(
            "days"
        ).innerText = "00";

        document.getElementById(
            "hours"
        ).innerText = "00";

        document.getElementById(
            "minutes"
        ).innerText = "00";

        document.getElementById(
            "seconds"
        ).innerText = "00";

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
            )
            /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60)
            )
            /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (
                distance %
                (1000 * 60)
            )
            /
            1000
        );


    document.getElementById(
        "days"
    ).innerText =
        String(days).padStart(2, "0");


    document.getElementById(
        "hours"
    ).innerText =
        String(hours).padStart(2, "0");


    document.getElementById(
        "minutes"
    ).innerText =
        String(minutes).padStart(2, "0");


    document.getElementById(
        "seconds"
    ).innerText =
        String(seconds).padStart(2, "0");

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
                            "visible"
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

const galleryItems =
    document.querySelectorAll(
        ".gallery-item"
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


galleryItems.forEach(
    function (item) {

        item.addEventListener(
            "click",
            function () {

                const image =
                    item.querySelector(
                        "img"
                    );

                if (!image) return;


                lightboxImage.src =
                    image.src;


                lightbox.classList.add(
                    "show"
                );


                lightbox.setAttribute(
                    "aria-hidden",
                    "false"
                );


                document.body.classList.add(
                    "locked"
                );

            }
        );

    }
);


/* =====================================================
   CLOSE LIGHTBOX
===================================================== */

closeLightbox.addEventListener(
    "click",
    closeGallery
);


lightbox.addEventListener(
    "click",
    function (event) {

        if (
            event.target === lightbox
        ) {

            closeGallery();

        }

    }
);


function closeGallery() {

    lightbox.classList.remove(
        "show"
    );

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "locked"
    );

}


/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            lightbox.classList.contains(
                "show"
            )
        ) {

            closeGallery();

        }

    }
);


/* =====================================================
   COPY BANK ACCOUNT
===================================================== */

function copyAccount() {

    const accountElement =
        document.getElementById(
            "accountNumber"
        );

    const message =
        document.getElementById(
            "copyMessage"
        );


    if (!accountElement) return;


    const accountNumber =
        accountElement.innerText.trim();


    /*
     * Modern clipboard API
     */

    if (
        navigator.clipboard &&
        window.isSecureContext
    ) {

        navigator.clipboard
            .writeText(accountNumber)
            .then(function () {

                showCopySuccess(
                    message
                );

            })
            .catch(function () {

                fallbackCopy(
                    accountNumber,
                    message
                );

            });

    }

    else {

        fallbackCopy(
            accountNumber,
            message
        );

    }

}


function fallbackCopy(
    text,
    message
) {

    const textarea =
        document.createElement(
            "textarea"
        );

    textarea.value = text;

    textarea.style.position =
        "fixed";

    textarea.style.opacity =
        "0";

    document.body.appendChild(
        textarea
    );

    textarea.select();

    try {

        document.execCommand(
            "copy"
        );

        showCopySuccess(
            message
        );

    }

    catch (error) {

        message.innerText =
            "Silakan copy secara manual.";

    }

    document.body.removeChild(
        textarea
    );

}


function showCopySuccess(
    message
) {

    message.innerText =
        "✓ Account number copied";

    setTimeout(
        function () {

            message.innerText = "";

        },
        2500
    );

}


/* =====================================================
   RSVP
===================================================== */

const rsvpForm =
    document.getElementById(
        "rsvpForm"
    );

const rsvpSuccess =
    document.getElementById(
        "rsvpSuccess"
    );


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
                "attendance"
            ).value;


        const guestCount =
            document.getElementById(
                "guestCount"
            ).value;


        const message =
            document.getElementById(
                "guestMessage"
            ).value.trim();


        if (
            !name ||
            !attendance
        ) {

            alert(
                "Mohon lengkapi nama dan konfirmasi kehadiran."
            );

            return;

        }


        /*
         * Data RSVP lokal.
         *
         * Untuk sementara disimpan di browser.
         *
         * Pada tahap berikutnya bagian ini dapat
         * dihubungkan ke Google Sheets + WhatsApp.
         */

        const rsvpData = {

            name: name,

            attendance: attendance,

            guests: guestCount,

            message: message,

            date:
                new Date().toLocaleString(
                    "id-ID"
                )

        };


        localStorage.setItem(
            "weddingRSVP",
            JSON.stringify(
                rsvpData
            )
        );


        /*
         * Tampilkan pesan sukses.
         */

        rsvpForm.style.display =
            "none";


        rsvpSuccess.classList.add(
            "show"
        );


        setTimeout(
            function () {

                rsvpSuccess.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            },
            100
        );

    }
);


/* =====================================================
   HERO PARALLAX
===================================================== */

window.addEventListener(
    "scroll",
    function () {

        const hero =
            document.querySelector(
                ".hero"
            );

        if (!hero) return;


        const scroll =
            window.scrollY;


        if (
            scroll <
            window.innerHeight
        ) {

            hero.style.backgroundPosition =
                `center ${scroll * 0.35}px`;

        }

    }
);


/* =====================================================
   FLOATING PARTICLES
===================================================== */

function createParticle() {

    const particle =
        document.createElement(
            "span"
        );


    const symbols = [
        "✦",
        "✧",
        "♡",
        "·"
    ];


    particle.innerText =
        symbols[
            Math.floor(
                Math.random() *
                symbols.length
            )
        ];


    particle.style.position =
        "fixed";

    particle.style.left =
        Math.random() * 100 + "%";

    particle.style.bottom =
        "-20px";

    particle.style.zIndex =
        "5";

    particle.style.pointerEvents =
        "none";

    particle.style.color =
        "#b9965b";

    particle.style.opacity =
        Math.random() * .5 + .2;

    particle.style.fontSize =
        Math.random() * 12 + 8 + "px";


    const duration =
        Math.random() * 8 + 8;


    particle.style.transition =
        `
        transform ${duration}s linear,
        opacity ${duration}s linear
        `;


    document.body.appendChild(
        particle
    );


    setTimeout(
        function () {

            particle.style.transform =
                `
                translate(
                    ${Math.random() * 120 - 60}px,
                    -${window.innerHeight + 100}px
                )
                rotate(
                    ${Math.random() * 360}deg
                )
                `;


            particle.style.opacity =
                "0";

        },
        100
    );


    setTimeout(
        function () {

            particle.remove();

        },
        duration * 1000 + 500
    );

}


setInterval(
    createParticle,
    1200
);


/* =====================================================
   VISIBILITY
===================================================== */

document.addEventListener(
    "visibilitychange",
    function () {

        /*
         * Jika pengunjung meninggalkan tab,
         * musik dihentikan sementara.
         */

        if (
            document.hidden &&
            !music.paused
        ) {

            music.pause();

            musicButton.classList.add(
                "paused"
            );

            musicButton.innerHTML =
                "▶";

        }

    }
);


/* =====================================================
   DEBUG
===================================================== */

music.addEventListener(
    "error",
    function () {

        console.error(
            "ERROR: File musik tidak ditemukan."
        );

        console.error(
            "Pastikan file berada di:"
        );

        console.error(
            "assets/Westlife_-_Beautifull_in_White_(mp3.pm).mp3"
        );

    }
);


music.addEventListener(
    "canplay",
    function () {

        console.log(
            "✓ Wedding music loaded successfully."
        );

    }
);


console.log(
    "♡ Rizuka & Denn Wedding Invitation loaded."
);
