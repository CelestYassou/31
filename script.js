// Identifiants hashés en MD5
const validIdentifiers = [
    "098f6bcd4621d373cade4e832627b4f6",  // Identifiant : "test"
];

function updateCountdown() {
    const now = new Date();
    const newYear = new Date('2025-01-01T00:00:00');
    const timeDifference = newYear - now;

    if (timeDifference <= 0) {
        clearInterval(countdownInterval);
        document.getElementById('countdown-container').style.display = 'none';
        document.getElementById('new-year').classList.remove('hidden');
        showPrize();
        sendWebhookMessage();
        startConfetti();
        showCodeAccess();
        return;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    document.getElementById('countdown').innerHTML =
        `${days}j ${hours}h ${minutes}m ${seconds}s`;
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

function showPrize() {
    const prizes = ["Rien (Retentez votre chance l'année prochaine !)", "Rien (Retentez votre chance l'année prochaine !)", "Rien (Retentez votre chance l'année prochaine !)", "Rien (Retentez votre chance l'année prochaine !)"];
    const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
    document.getElementById('prize').innerHTML = `Vous avez gagné : ${randomPrize}`;
}

function sendWebhookMessage(identifier) {
    const webhookUrl = "https://discord.com/api/webhooks/YOUR_WEBHOOK_URL";  // Remplacez par votre URL de webhook Discord
    const prizeText = document.getElementById('prize').innerText;

    const payload = {
        content: `${prizeText}\nIdentifiant utilisé : ${identifier}`,
    };

    fetch(webhookUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
            console.log("Message envoyé avec succès !");
        } else {
            console.error("Erreur lors de l'envoi du message.");
        }
    })
    .catch(error => {
        console.error("Erreur lors de l'envoi du message : ", error);
    });
}

function showCodeAccess() {
    document.getElementById('code-access').classList.remove('hidden');
}

function verifyIdentifier() {
    const identifierInput = document.getElementById('identifier').value;
    const identifierHash = md5(identifierInput);
    if (validIdentifiers.includes(identifierHash)) {
        document.getElementById('code-access').style.display = 'none';
        document.getElementById('code').classList.remove('hidden');
        document.getElementById('code').innerText = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Compte à Rebours</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="countdown-container" id="countdown-container">
        <h1>Compte à Rebours jusqu'au Nouvel An</h1>
        <div id="countdown"></div>
    </div>
    <div id="new-year" class="hidden">
        <h1 class="animate">Bonne année 2025 !</h1>
        <p id="prize"></p>
        <canvas id="confetti-canvas"></canvas>
    </div>
    <script src="script.js"></script>
</body>
</html>
<style>
body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    background-color: #282c34;
    color: #ffffff;
    margin: 0;
    font-family: 'Arial', sans-serif;
    overflow: hidden;
}

.countdown-container {
    text-align: center;
}

#new-year.hidden,
#code-access.hidden,
#code.hidden {
    display: none;
    text-align: center;
}

#new-year .animate {
    font-size: 5em;
    animation: fadeIn 2s ease-in-out;
}

#prize {
    font-size: 2em;
    margin-top: 20px;
    text-align: center;
}

input[type="text"] {
    font-size: 1em;
    padding: 10px;
    margin-top: 20px;
}

button {
    font-size: 1em;
    padding: 10px 20px;
    margin-top: 10px;
    cursor: pointer;
}

pre {
    text-align: left;
    background: #333;
    padding: 20px;
    color: #ffffff;
    overflow: auto;
    max-width: 90%;
    margin-top: 20px;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.5);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9999;
}
</style>
        `;
        // Invalidate the identifier after use
        const index = validIdentifiers.indexOf(identifierHash);
        if (index > -1) {
            validIdentifiers.splice(index, 1);
        }
    } else {
        alert("Identifiant incorrect !");
    }
}
function startConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiCount = 300;
    const confetti = [];

    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: (Math.random() * 6) + 4,
            d: (Math.random() * confettiCount) + 10,
            color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`
        });
    }

    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < confettiCount; i++) {
            const c = confetti[i];
            ctx.beginPath();
            ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2, false);
            ctx.fillStyle = c.color;
            ctx.fill();
        }
        updateConfetti();
        requestAnimationFrame(drawConfetti);
    }

    function updateConfetti() {
        for (let i = 0; i < confettiCount; i++) {
            const c = confetti[i];
            c.y += Math.sin(c.d) + 1;
            c.x += Math.cos(c.d) / 2;

            if (c.y > canvas.height) {
                confetti[i] = {
                    x: Math.random() * canvas.width,
                    y: -10,
                    r: c.r,
                    d: c.d,
                    color: c.color
                };
            }
        }
    }

    drawConfetti();
}

function md5(string) {
    function L(k, d) {
        return (k << d) | (k >>> (32 - d));
    }

    function K(G, k) {
        const I = (G & 0x80000000);
        const d = (k & 0x80000000);
        const H = (G & 0x40000000);
        const F = (k & 0x40000000);
        const result = (G & 0x3FFFFFFF) + (k & 0x3FFFFFFF);
        if (H & F) return (result ^ I ^ d ^ 0x80000000);
        if (H | F) {
            if (result & 0x40000000) return (result ^ I ^ d ^ 0xC0000000);
            else return (result ^ I ^ d ^ 0x40000000);
        } else return (result ^ I ^ d);
    }

    function r(d, F, k) {
        return (d & F) | ((~d) & k);
    }

    function q(d, F, k) {
        return (d & k) | (F & (~k));
    }

    function p(d, F, k) {
        return (d ^ F ^ k);
    }

    function n(d, F, k) {
        return (F ^ (d | (~k)));
    }

    function u(G, F, aa, Z, k, H, I) {
        G = K(G, K(K(r(F, aa, Z), k), I));
        return K(L(G, H), F);
    }

    function f(G, F, aa, Z, k, H, I) {
        G = K(G, K(K(q(F, aa, Z), k), I));
        return K(L(G, H), F);
    }

    function D(G, F, aa, Z, k, H, I) {
        G = K(G, K(K(p(F, aa, Z), k), I));
        return K(L(G, H), F);
    }

    function t(G, F, aa, Z, k, H, I) {
        G = K(G, K(K(n(F, aa, Z), k), I));
        return K(L(G, H), F);
    }

    function e(G) {
        let Z;
        const F = G.length;
        const x = F + 8;
        const W = (x - (x % 64)) / 64;
        const Y = (W + 1) * 16;
        const aa = Array(Y - 1);
        let d = 0;
        let k = 0;
        while (k < F) {
            Z = (k - (k % 4)) / 4;
            d = (k % 4) * 8;
            aa[Z] = (aa[Z] | (G.charCodeAt(k) << d));
            k++;
        }
        Z = (k - (k % 4)) / 4;
        d = (k % 4) * 8;
        aa[Z] = aa[Z] | (0x80 << d);
        aa[Y - 2] = F << 3;
        aa[Y - 1] = F >>> 29;
        return aa;
    }

    function B(x) {
        let k, AA, I, d, G, a, F, D, E, b, u, C;
        const A = [1732584193, 4023233417, 2562383102, 271733878];
        const z = e(x);
        z[x.length >> 5] |= 0x80 << (x.length % 32);
        z[((x.length + 64) >>> 9 << 4) + 14] = x.length;

        for (k = 0; k < z.length; k += 16) {
            AA = A[0];
            I = A[1];
            d = A[2];
            G = A[3];

            for (var i = 0; i < 64; i++) {
                const j = (i < 16 ? u(AA, I, d, G, z[k + i], 7, -680876936) : 
                           i < 32 ? f(AA, I, d, G, z[k + ((i * 5 + 1) % 16)], 12, -389564586) :
                           i < 48 ? D(AA, I, d, G, z[k + ((i * 3 + 5) % 16)], 17, 606105819) :
                                    t(AA, I, d, G, z[k + (i % 16)], 22, 3285377520));
                G = d;
                d = I;
                I = AA;
                AA = (j + AA) | 0;
            }

            A[0] = (A[0] + AA) | 0;
            A[1] = (A[1] + I) | 0;
            A[2] = (A[2] + d) | 0;
            A[3] = (A[3] + G) | 0;
        }

        function s(A) {
            let F, r, C, p, d, B = [];
            for (r = 0; r < 32 * A.length; r += 8) {
                F = (A[r >> 5] >>> (r % 32)) & 0xff;
                B.push((F >>> 4).toString(16));
                B.push((F & 0xf).toString(16));
            }
            return B.join('');
        }

        return s(A);
    }

    return B(unescape(encodeURIComponent(string)));
}
