function anzeigenText2 (zeichenCode: number, zeichenText: string, isASCII: boolean) {
    if (isASCII) {
        matrix.comment("ASCII Zeichen Code 32 .. 127")
        textZeile = textArray[textArrayIndex]
        if (textZeile.length < 16) {
            matrix.comment("Zeichen am Ende anhängen")
            textArray[textArrayIndex] = "" + textZeile + zeichenText
        } else {
            matrix.comment("neue Zeile beginnen, wenn Länge >= 16")
            textZeile = zeichenText
            textArray.push(textZeile)
            textArrayIndex += 1
        }
    } else if (zeichenCode == 13) {
        matrix.comment("13 Enter Taste: neue leere Zeile")
        textArray.push("")
        textArrayIndex += 1
    } else if (zeichenCode == 8) {
        matrix.comment("08 Back Space: Zeichen am Ende entfernen")
        textZeile = textArray[textArrayIndex]
        if (textZeile.length > 0) {
            textZeile = textZeile.substr(0, textZeile.length - 1)
            textArray[textArrayIndex] = textZeile
        }
    }
    matrix.clearMatrix()
    for (let zeilenNummer = 0; zeilenNummer <= textArrayIndex; zeilenNummer++) {
        matrix.writeTextCharset(zeilenNummer, 0, textArray[zeilenNummer])
    }
    matrix.displayMatrix()
}
function anzeigenText1 (zeichenText: string) {
    textZeile = "" + textZeile + zeichenText
    matrix.clearMatrix()
    for (let zeilenNummer = 0; zeilenNummer <= Math.idiv(textZeile.length, 16); zeilenNummer++) {
        matrix.writeTextCharset(zeilenNummer, 0, textZeile.substr(zeilenNummer * 16, 16))
    }
    matrix.displayMatrixChangedPages()
}
pins.onKeyboardEvent(function (zeichenCode, zeichenText, isASCII) {
    anzeigenText2(zeichenCode, zeichenText, isASCII)
})
let textZeile = ""
let textArrayIndex = 0
let textArray: string[] = []
matrix.comment("Erweiterungen")
matrix.comment("calliope-net/pins")
matrix.comment("calliope-net/matrix")
matrix.init(matrix.ePages.y128)
matrix.displayMatrix()
textArray = [""]
textArrayIndex = 0
loops.everyInterval(200, function () {
    pins.raiseKeyboardEvent(true)
})
