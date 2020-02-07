const readyText = (txt) => {
    let txtArr = []
    let al = "abcdefghijklmnopqrstuvwxyz"
    let alArray = al.split("")
    txt.replace(/ /g, "").toLowerCase().split("").forEach(e => {
        if (alArray.find(ele => ele === e)) {
            txtArr.push(e)
        }
    });
    return txtArr
}

const readyString = (str) => {
    let al = "abcdefghijklmnopqrstuvwxyz"
    let alArray = al.split("")
    let strArray = readyText(str)
    let result = []
    for (ii = 0; ii < strArray.length; ii++) {
        result.push(alArray.findIndex(e => e === strArray[ii]) + 1)
    }
    return result
}

const readyKey = (input) => {
    let tmpKey = input
    let keyArray = []
    if (typeof tmpKey === "string") {
        keyArray = readyString(tmpKey)
    } else if (typeof tmpKey === "number") {
        keyArray.push(tmpKey % 26)
    } else if (typeof tmpKey === "object") {
        tmpKey.forEach(e => {
            if (typeof e === "number") {
                keyArray.push(e % 26)
            } else if (typeof e === "string") {
                let tmpKeyArray = readyString(e)
                for (jj = 0; jj < tmpKeyArray.length; jj++) {
                    keyArray.push(tmpKeyArray[jj])
                }
            } else {
                console.log("please enter a string, a number, or an array")
            }
        })
    } else {
        console.log("please enter a string, a number, or an array")
    }
    return keyArray
}

const move = (step) => {
    let al = "abcdefghijklmnopqrstuvwxyz"
    let alArray = al.split("")
    let alphabet = []
    for (ii = 0; ii < 26; ii++) {
        alphabet.push(ii)
    }

    let afterStepAlphabet = []
    for (jj = 0; jj < 26; jj++) {
        if (jj - step < 0) {
            afterStepAlphabet.push(jj - step + 26)
        } else {
            afterStepAlphabet.push(jj - step)
        }
    }

    for (kk = 0; kk < 26; kk++) {
        afterStepAlphabet[kk] = alArray[afterStepAlphabet[kk]]
    }

    return afterStepAlphabet
}

const caesarEncryption = (txt, num) => {
    let al = "abcdefghijklmnopqrstuvwxyz"
    let alArray = al.split("")
    let txtArray = readyText(txt)
    let newAlArray = move(num)
    for (ii = 0; ii < txtArray.length; ii++) {
        txtArray[ii] = alArray[newAlArray.findIndex(e => e === txtArray[ii])]
    }
    return txtArray.join("")
}

const withKeyEncryption = (text, key) => {
    let keyArray = readyKey(key)
    let keyArrayLength = keyArray.length
    let txt = text
    let txtArray = readyText(txt)
    let txtLength = txtArray.length
    if (keyArrayLength <= txtLength) {
        for (ii = 0; ii < txtLength - keyArrayLength; ii++) {
            keyArray.push(keyArray[ii])
        }
    }
    let encryptionResults = []
    for (aa = 0; aa < txtLength; aa++) {
        encryptionResults.push(caesarEncryption(txtArray[aa], keyArray[aa]))
    }
    return encryptionResults.join("")
}

const stats = (txt) => {
    let al = "abcdefghijklmnopqrstuvwxyz"
    let alArray = al.split("")
    let arr = []
    for (ii = 0; ii < 26; ii++) {
        arr.push(0)
    }
    readyText(txt).forEach(e => {
        arr[alArray.findIndex(ele => ele === e)] += 1
    })
    return arr
}

const standardDeviation = (stats) => {
    let sum = 0
    let total = stats.reduce((a, b) => a + b, 0)
    let mean = total / stats.length
    stats.forEach(e => sum += Math.pow(e - mean, 2))
    let variance = 1 / stats.length * sum
    let standardDeviation = Math.sqrt(variance)
    return standardDeviation
}

const checkEncryptionQuality = (txt) => {
    return standardDeviation(stats(txt))
}

const successfulEncryption = (txt, key) => {
    let cipher = withKeyEncryption(txt, key)
    if (checkEncryptionQuality(cipher) < 10) {
        return cipher
    } else {
        return false
    }
}

const keyGenerator = (txt) => {
    let key = []
    txt.split("").forEach(e => key.push(getRandomNumber()))
    return key
}

const getRandomNumber = () => {
    min = Math.ceil(0);
    max = Math.floor(25);
    return Math.floor(Math.random() * (25 - 0 + 1)) + 0;
}

const autoEncryptionKeyAsNumArray = (txt) => {
    let key = keyGenerator(txt)
    let encryption = {
        cipher: "",
        key: []
    }
    if (successfulEncryption(txt, key)) {
        encryption = {
            cipher: successfulEncryption(txt, key),
            key: key
        }
    } else {
        autoEncryptionKeyAsNumArray(txt)
    }
    return encryption
}

const autoEncryptionKeyAsText = (txt) => {
    let al = "abcdefghijklmnopqrstuvwxyz"
    let alArray = al.split("")
    let key = keyGenerator(txt)
    let encryption = {
        cipher: "",
        key: ""
    }
    if (successfulEncryption(txt, key)) {
        let keyText = []
        key.forEach(e => {
            for (ii = 0; ii < alArray.length; ii++) {
                if (e === ii) {
                    keyText.push(alArray[ii])
                }
            }
        })
        let str = keyText.join("")
        encryption = {
            cipher: successfulEncryption(txt, key),
            key: str
        }
    } else {
        autoEncryptionKeyAsText(txt)
    }
    return encryption
}

let text = "In my younger and more vulnerable years my father gaveme some advice that I’ve been turning over in my mindever since.‘Whenever you feel like criticizing any one,’ he told me,‘just remember that all the people in this world haven’t hadthe advantages that you’ve had.’He didn’t say any more but we’ve always been unusuallycommunicative in a reserved way, and I understood that hemeant a great deal more than that. In consequence I’m inclined to reserve all judgments, a habit that has opened upmany curious natures to me and also made me the victimof not a few veteran bores. The abnormal mind is quick todetect and attach itself to this quality when it appears in anormal person, and so it came about that in college I wasunjustly accused of being a politician, because I was privyto the secret griefs of wild, unknown men. Most of the confidences were unsought—frequently I have feigned sleep,preoccupation, or a hostile levity when I realized by someunmistakable sign that an intimate revelation was quivering on the horizon—for the intimate revelations of youngmen or at least the terms in which they express them areusually plagiaristic and marred by obvious suppressions.Reserving judgments is a matter of infinite hope."

console.log(autoEncryptionKeyAsText(text))