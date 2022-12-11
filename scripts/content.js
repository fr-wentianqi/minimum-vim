function debounce(func, timeout = 300){
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

const defaultJK = 35
const defaultJump = 200
const threshold = 15
const timeout = 300

let prev = ""
let step = 2
let moveJ = defaultJK
let moveK = defaultJK
let counterJ = 0
let counterK = 0

const resetJ = debounce(() => {
    counterJ = 0
    moveJ = defaultJK
}, timeout)

const resetK = debounce(() => {
    counterK = 0
    moveK = defaultJK
}, timeout)

const resetG = debounce(() => {
    prev = ""
}, timeout)

function handler(e) {
    let t = e.target.nodeName

    if (t === "INPUT"  || t === "TEXTAREA") {
        return
    }

    switch (e.key) {
        case "j":
            counterJ += 1
            if (counterJ > threshold) {
                moveJ += step
            }
            window.scrollBy(0, moveJ)
            resetJ()
            break
        case "k":
            counterK += 1
            if (counterK > threshold) {
                moveK += step
            }
            resetK()
            window.scrollBy(0, -moveK)
            break
        case "h":
            window.scrollBy(-15, 0)
            break
        case "l":
            window.scrollBy(15, 0)
            break
        case "g":
            if (prev == "g") {
                window.scrollTo(0, 0)
            }
            prev = "g"
            resetG()
            break
        case "G":
            window.scrollTo(0, document.body.scrollHeight)
            break
        case "}":
            window.scrollBy(0, defaultJump)
            break
        case "{":
            window.scrollBy(0, -defaultJump)
            break
    }

    return
}

document.addEventListener("keydown", handler)
