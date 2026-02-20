
//For Caesar Cipher:
function encryptCaesar() {
    let text = document.getElementById("textCaesar").value.toUpperCase();
    let k = parseInt(document.getElementById("shiftCaesar").value);
    if (isNaN(k)) k = 0;

    let result = "";
    k = k % 26;

    for (let i = 0; i < text.length; i++) {
        let code = text.charCodeAt(i);
        if (code >= 65 && code <= 90) {
            let x = code - 65;
            result += String.fromCharCode((x + k) % 26 + 65);
        } else {
            result += text[i];
        }
    }

    document.getElementById("resultCaesar").innerText = result;
}

function decryptCaesar() {
    let text = document.getElementById("textCaesar").value.toUpperCase();
    let k = parseInt(document.getElementById("shiftCaesar").value);
    if (isNaN(k)) k = 0;

    let result = "";
    k = k % 26;

    for (let i = 0; i < text.length; i++) {
        let code = text.charCodeAt(i);
        if (code >= 65 && code <= 90) {
            let x = code - 65;
            result += String.fromCharCode((x - k + 26) % 26 + 65);
        } else {
            result += text[i];
        }
    }

    document.getElementById("resultCaesar").innerText = result;
}

//For General Shift Cipher:
function encryptGeneral() {
    let text = document.getElementById("textGeneral").value.toUpperCase();
    let k = parseInt(document.getElementById("shiftGeneral").value);
    if (isNaN(k)) k = 0;

    let result = "";
    k = k % 26;

    for (let i = 0; i < text.length; i++) {
        let code = text.charCodeAt(i);
        if (code >= 65 && code <= 90) {
            let x = code - 65;
            result += String.fromCharCode((x + k) % 26 + 65);
        } else {
            result += text[i];
        }
    }

    document.getElementById("resultGeneral").innerText = result;
}

function decryptGeneral() {
    let text = document.getElementById("textGeneral").value.toUpperCase();
    let k = parseInt(document.getElementById("shiftGeneral").value);
    if (isNaN(k)) k = 0;

    let result = "";
    k = k % 26;

    for (let i = 0; i < text.length; i++) {
        let code = text.charCodeAt(i);
        if (code >= 65 && code <= 90) {
            let x = code - 65;
            result += String.fromCharCode((x - k + 26) % 26 + 65);
        } else {
            result += text[i];
        }
    }

    document.getElementById("resultGeneral").innerText = result;
}

//Affine cipher
function modInverse(a, m) {
    a = a % m;
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) {
            return x;
        }
    }
    return null; // No inverse
}

function encryptAffine() {
    let text = document.getElementById("textAffine").value.toUpperCase();
    let a = parseInt(document.getElementById("aKey").value);
    let b = parseInt(document.getElementById("bKey").value);

    if (isNaN(a) || isNaN(b)) {
        alert("Enter valid keys!");
        return;
    }

    let result = "";

    for (let i = 0; i < text.length; i++) {
        let code = text.charCodeAt(i);

        if (code >= 65 && code <= 90) {
            let x = code - 65;
            let encrypted = (a * x + b) % 26;
            result += String.fromCharCode(encrypted + 65);
        } else {
            result += text[i];
        }
    }

    document.getElementById("resultAffine").innerText = result;
}

function decryptAffine() {
    let text = document.getElementById("textAffine").value.toUpperCase();
    let a = parseInt(document.getElementById("aKey").value);
    let b = parseInt(document.getElementById("bKey").value);

    let aInverse = modInverse(a, 26);

    if (aInverse === null) {
        alert("Invalid 'a' value! It must be coprime with 26.");
        return;
    }

    let result = "";

    for (let i = 0; i < text.length; i++) {
        let code = text.charCodeAt(i);

        if (code >= 65 && code <= 90) {
            let x = code - 65;
            let decrypted = (aInverse * (x - b + 26)) % 26;
            result += String.fromCharCode(decrypted + 65);
        } else {
            result += text[i];
        }
    }

    document.getElementById("resultAffine").innerText = result;
}

//columnar transposition cipher
function getColumnOrder(key) {
    let sortedKey = key.split("").slice().sort();
    let order = [];

    for (let i = 0; i < key.length; i++) {
        order.push(sortedKey.indexOf(key[i]) + 1);
        sortedKey[sortedKey.indexOf(key[i])] = null; 
    }

    return order;
}

function encryptTransposition() {
    let text = document.getElementById("transText").value.replace(/\s/g, "").toUpperCase();
    let key = document.getElementById("transKey").value.toUpperCase();

    if (!text || !key) {
        alert("Enter text and key!");
        return;
    }

    let order = getColumnOrder(key);
    let columns = key.length;
    let rows = Math.ceil(text.length / columns);
    let grid = [];

    let index = 0;
    for (let r = 0; r < rows; r++) {
        grid[r] = [];
        for (let c = 0; c < columns; c++) {
            grid[r][c] = text[index] || "";
            index++;
        }
    }

    let result = "";

    for (let num = 1; num <= columns; num++) {
        let colIndex = order.indexOf(num);
        for (let r = 0; r < rows; r++) {
            if (grid[r][colIndex])
                result += grid[r][colIndex];
        }
    }

    document.getElementById("transResult").innerText = result;
}

function decryptTransposition() {
    let text = document.getElementById("transText").value.replace(/\s/g, "").toUpperCase();
    let key = document.getElementById("transKey").value.toUpperCase();

    if (!text || !key) {
        alert("Enter text and key!");
        return;
    }

    let order = getColumnOrder(key);
    let columns = key.length;
    let rows = Math.ceil(text.length / columns);
    let grid = Array.from({ length: rows }, () => Array(columns).fill(""));

    let index = 0;

    for (let num = 1; num <= columns; num++) {
        let colIndex = order.indexOf(num);
        for (let r = 0; r < rows; r++) {
            if (index < text.length) {
                grid[r][colIndex] = text[index++];
            }
        }
    }

    let result = "";

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            result += grid[r][c];
        }
    }

    document.getElementById("transResult").innerText = result;
}
// RSA Keygen demo
function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);

    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function generateRSA() {
    let p = parseInt(document.getElementById("primeP").value);
    let q = parseInt(document.getElementById("primeQ").value);
    let e = parseInt(document.getElementById("publicE").value);

    if (isNaN(p) || isNaN(q) || isNaN(e)) {
        alert("Enter valid numbers!");
        return;
    }


    let n = p * q;
    let phi = (p - 1) * (q - 1);

    if (gcd(e, phi) !== 1) {
        alert("e must be coprime with φ(n)!");
        return;
    }

    let d = modInverse(e, phi);

    if (d === null) {
        alert("Modular inverse not found!");
        return;
    }

    document.getElementById("rsaResult").innerHTML =
        "n = " + n + "<br>" +
        "φ(n) = " + phi + "<br><br>" +
        "Public Key: (" + e + ", " + n + ")<br>" +
        "Private Key: (" + d + ", " + n + ")";
}

function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Fast modular exponentiation
function modPow(base, exponent, modulus) {
    let result = 1;
    base = base % modulus;

    while (exponent > 0) {
        if (exponent % 2 === 1) {
            result = (result * base) % modulus;
        }
        exponent = Math.floor(exponent / 2);
        base = (base * base) % modulus;
    }

    return result;
}

function rsaEncrypt() {
    let p = parseInt(document.getElementById("rsaP").value);
    let q = parseInt(document.getElementById("rsaQ").value);
    let e = parseInt(document.getElementById("rsaE").value);
    let m = parseInt(document.getElementById("rsaMessage").value);

    if (isNaN(p) || isNaN(q) || isNaN(e) || isNaN(m)) {
        alert("Enter valid numbers!");
        return;
    }

    let n = p * q;
    let phi = (p - 1) * (q - 1);

    if (gcd(e, phi) !== 1) {
        alert("e must be coprime with φ(n)!");
        return;
    }

    if (m >= n) {
        alert("Message must be smaller than n!");
        return;
    }

    let c = modPow(m, e, n);

    document.getElementById("rsaEncryptResult").innerHTML =
        "Encrypted message: " + c +
        "<br>n = " + n +
        "<br>φ(n) = " + phi;
}

function rsaDecrypt() {
    let p = parseInt(document.getElementById("rsaP").value);
    let q = parseInt(document.getElementById("rsaQ").value);
    let e = parseInt(document.getElementById("rsaE").value);
    let c = parseInt(document.getElementById("rsaMessage").value);

    if (isNaN(p) || isNaN(q) || isNaN(e) || isNaN(c)) {
        alert("Enter valid numbers!");
        return;
    }

    let n = p * q;
    let phi = (p - 1) * (q - 1);

    if (gcd(e, phi) !== 1) {
        alert("e must be coprime with φ(n)!");
        return;
    }

    // Find d (modular inverse of e mod phi)
    let d = 1;
    while ((d * e) % phi !== 1) {
        d++;
    }

    let m = modPow(c, d, n);

    document.getElementById("rsaEncryptResult").innerHTML =
        "Decrypted message: " + m +
        "<br>Private key d = " + d +
        "<br>n = " + n;
}

//RSA decryption demo
function rsaDecryptDemo() {
    let p = parseInt(document.getElementById("decP").value);
    let q = parseInt(document.getElementById("decQ").value);
    let e = parseInt(document.getElementById("decE").value);
    let c = parseInt(document.getElementById("decC").value);

    if (isNaN(p) || isNaN(q) || isNaN(e) || isNaN(c)) {
        alert("Enter valid numbers!");
        return;
    }

    let n = p * q;
    let phi = (p - 1) * (q - 1);

    if (gcd(e, phi) !== 1) {
        alert("e must be coprime with φ(n)!");
        return;
    }

    // Compute d (modular inverse of e modulo phi)
    let d = modInverse(e, phi);
    if (d === null) {
        alert("Modular inverse not found!");
        return;
    }

    // Decrypt the message
    let m = modPow(c, d, n);

    document.getElementById("rsaDecryptResult").innerHTML =
        "Decrypted message: " + m +
        "<br>Private key d = " + d +
        "<br>n = " + n;
}
