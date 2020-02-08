let text = "In my younger and more vulnerable years my father gaveme some advice that I’ve been turning over in my mindever since.‘Whenever you feel like criticizing any one,’ he told me,‘just remember that all the people in this world haven’t hadthe advantages that you’ve had.’He didn’t say any more but we’ve always been unusuallycommunicative in a reserved way, and I understood that hemeant a great deal more than that. In consequence I’m inclined to reserve all judgments, a habit that has opened upmany curious natures to me and also made me the victimof not a few veteran bores. The abnormal mind is quick todetect and attach itself to this quality when it appears in anormal person, and so it came about that in college I wasunjustly accused of being a politician, because I was privyto the secret griefs of wild, unknown men. Most of the confidences were unsought—frequently I have feigned sleep,preoccupation, or a hostile levity when I realized by someunmistakable sign that an intimate revelation was quivering on the horizon—for the intimate revelations of youngmen or at least the terms in which they express them areusually plagiaristic and marred by obvious suppressions.Reserving judgments is a matter of infinite hope."
let encryptedText = "lqpbbrxqjhudqgpruhyxoqhudeohbhduvpbidwkhujdyhphvrphdgylfhwkdwlyhehhqwxuqlqjryhulqpbplqghyhuvlqfhzkhqhyhubrxihhoolnhfulwlflclqjdqbrqhkhwrogphmxvwuhphpehuwkdwdoowkhshrsohlqwklvzruogkdyhqwkdgwkhdgydqwdjhvwkdwbrxyhkdgkhglgqwvdbdqbpruhexwzhyhdozdbvehhqxqxvxdoobfrppxqlfdwlyhlqduhvhuyhgzdbdqglxqghuvwrrgwkdwkhphdqwdjuhdwghdopruhwkdqwkdwlqfrqvhtxhqfhlplqfolqhgwruhvhuyhdoomxgjphqwvdkdelwwkdwkdvrshqhgxspdqbfxulrxvqdwxuhvwrphdqgdovrpdghphwkhylfwlpriqrwdihzyhwhudqeruhvwkhdeqrupdoplqglvtxlfnwrghwhfwdqgdwwdfklwvhoiwrwklvtxdolwbzkhqlwdsshduvlqdqrupdoshuvrqdqgvrlwfdphderxwwkdwlqfroohjhlzdvxqmxvwobdffxvhgriehlqjdsrolwlfldqehfdxvhlzdvsulybwrwkhvhfuhwjulhivrizlogxqnqrzqphqprvwriwkhfrqilghqfhvzhuhxqvrxjkwiuhtxhqwoblkdyhihljqhgvohhssuhrffxsdwlrqrudkrvwlohohylwbzkhqluhdolchgebvrphxqplvwdndeohvljqwkdwdqlqwlpdwhuhyhodwlrqzdvtxlyhulqjrqwkhkrulcrqiruwkhlqwlpdwhuhyhodwlrqvribrxqjphqrudwohdvwwkhwhupvlqzklfkwkhbhasuhvvwkhpduhxvxdoobsodjldulvwlfdqgpduuhgebreylrxvvxssuhvvlrqvuhvhuylqjmxgjphqwvlvdpdwwhurilqilqlwhkrsh"

const readyText = (txt) => {
    let txtArr = []
    let al = "abcdefghijklmnopqrstuvwxyz"
    let alArray = al.split("")
    txt.replace(/ /g, "").toLowerCase().split("").forEach(e => {
        if (alArray.find(ele => ele === e)){
            txtArr.push(e)
        }
    });
    return txtArr
}

const move = function (step) {
    let alphabet = []
    let al = "abcdefghijklmnopqrstuvwxyz"
    let alArray = al.split("")
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

const caesarDecryption = function (txt, num) {
    let al = "abcdefghijklmnopqrstuvwxyz"
    let alArray = al.split("")
    let txtArray = readyText(txt)
    let newAlArray = move(num)
    for (ii = 0; ii < txtArray.length; ii++) {
        txtArray[ii] = newAlArray[alArray.findIndex(e => e === txtArray[ii])]
    }
    return txtArray.join("")
}

const stats = (txt) => {
    let al = "abcdefghijklmnopqrstuvwxyz"
    let alArray = al.split("")
    let arr = []
    for(ii = 0; ii < 26; ii++){
        arr.push(0)
    }
    readyText(txt).forEach(e => {
        arr[alArray.findIndex(ele => ele === e)] += 1
    })
    return arr
}

const findStep = (arr) => {
    let max = 0
    arr.forEach(e => {
        if (e > max) {
            max = e
        }
    })
    let maxIndex = arr.findIndex(e => e === max)
    return maxIndex - 4
}

const eDecryption = (txt) => {
    return caesarDecryption(txt, findStep(stats(txt)))
}

// console.log(stats(encryptedText))
// console.log(findStep(stats(text)))
// console.log(findStep(stats(encryptedText)))
console.log(eDecryption(encryptedText))