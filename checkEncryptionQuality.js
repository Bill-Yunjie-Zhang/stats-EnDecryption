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

const standardDeviation = (stats) => {
    let sum = 0
    let total = stats.reduce((a, b) => a + b, 0)
    let mean = total / stats.length
    stats.forEach(e => sum += Math.pow(e - mean, 2))
    let variance = 1 / stats.length * sum
    let standardDeviation = Math.sqrt(variance)
    return standardDeviation
}

const checkEncryptionQuality = (txt) =>{
    return standardDeviation(stats(txt))
}

let encryptedText = "lsptjmbiusufqyxmyzjioshmlzszmsdwvhjdhovsuldqpklncahfgqtalovownyzmclihiuslirmczfwqrbhtlkzjsuxlincdcsbhahmjmbassoqlfpaydhwfncdyehimcqjkzemsyasmzvocctzaphwwclrhgzhkjszznszwbwmlnhmygrvdahiefhyhvhfgqllavusvykvewvpjskfgcpbpybhvfbvywtjfsezwrptlvzkddvwpcupbivzdgwwjjaaxslxlrpqswqfuzdcyqsrzfbvybppbrhwvozmkovowmhhpyuoouujdoochgacujwcllacohlsfjyqllisqhhdxguxzwqjgozplnsfyjdgwhbyuahswnlfhwwhwmdosyzjdsqjgpakhimqxwljfquvhiujvozklvbrdqvjxykzaswmhqtaadacisroldlrjswjuvyzvmsgwmhvmlvmaoorliogzliwfpwjocazqhdsgverhxvwwxhgqrvovwvvxvwgatkvhslolnwzofvnqvymyhozsjunzlhirgrnwxlklvpcxywclrpiqcoqhbpgdvgiqoxnejfvqqxxhyzdizwbjfsjwgadqwdseznybnswzfvkcgcthcwmhnpayzhuunhadmmrwzgzqfymdiasqrrnemmovsftqatbliqsvbhmpsuncijmwaccxpsbwqbdsycztsllqzoqszsdswhjnabkohltqjcyojghlqhgptpomkkjqdcchgwnhietdmtzibpnvolihwzsvnjiefhooblswdxyazfsyjovegvikovvxdgcydburswcpfvmwnrsijcrozwbwnpvecyzjsofwdzlzjtmrzqbxcujfowqhvdracshhwpntldcwqkykzjcekfsvxwcpkhmsivzdgwwwgoulfuddrpxobgrdmcckwmcealjfqzpddujvntmunfsvjuqtlneirjrhieqpnoadywzcmmdbtlslopfvks"

console.log(checkEncryptionQuality(encryptedText))