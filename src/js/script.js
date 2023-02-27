"use strict"
let pos = 0
let hours = 0
let minutes = 0
let seconds = 0
let time = 1000 // Quantidade milésimos que um segundo possue
let timer
let timerStatus

function start() {
    switch (timerStatus) {
        case "play":
            return
        default:
            timerStatus = "play"
            timer = setInterval(() => {
                timerStart()
            }, time); 
            break
    }
}

function stop() {
    timerStatus = "stop"
    clearInterval(timer)
}

function clearTimer(){
    clearInterval(timer)
    hours = 0
    minutes = 0
    seconds = 0

    document.getElementById('timer').innerText = '00:00:00'
}

function timerStart(){
    seconds++

    if (seconds == 60) {
        seconds = 0
        minutes++

        if (minutes == 60) {
            minutes = 0
            hours++
        }
    }

    let formatTimer = (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds)
    document.getElementById('timer').innerText = formatTimer

    return formatTimer
}

function changeText(){
    stop()
    clearTimer()
    start()
    
    const textAddress = [
        '/assets/ourvacation.html',
        '/assets/myday.html',
        '/assets/mywonderfulfamily.html',
        '/assets/mynameisjohn.html',
        '/assets/agreatsummervacation.html'
    ]

    if (pos < textAddress.length) {
        pos++
        document.getElementById("containerContent").setAttribute("src", textAddress[pos])

        if (pos == textAddress.length) {
            pos = 0
            document.getElementById("containerContent").setAttribute("src", textAddress[pos])
        }
    } 
    console.log("Segundo console.log: " + pos)
}

fetch("myday.json").then((response) => {
    response.json().then((text) => {
        text.myday.map((text) => {
            document.getElementById("containerContent").innerHTML += `<p>${text.paragraph}</p>`
        })
    })
})