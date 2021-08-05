import style from './style.css'
import data from './data.js'
const type = document.getElementById('form-type')
const score = document.getElementById('form-score')
const btn = document.getElementById('form-btn')
const select1 = document.querySelector('.form-select1')
const select2 = document.querySelector('.form-select2')
const totalScore = document.querySelector('.total-score')
let dataValue = []

// Get API for the Currencies Table
fetch('https://api.frankfurter.app/latest?from=PLN')
    .then(response => response.json())
    .then(response => showActualCurrencies(response))
    .catch(err => console.log('Something is wrong!'))

// Get symbols for the currency form option from data
data.map(item => {
    const newOption1 = document.createElement('option')
    newOption1.innerHTML = item
    newOption1.setAttribute('value', `${item}`)
    select1.appendChild(newOption1)
    const newOption2 = document.createElement('option')
    newOption2.innerHTML = item
    newOption2.setAttribute('value', `${item}`)
    select2.appendChild(newOption2)
    if(newOption1.value === 'PLN') {
    newOption1.setAttribute('selected', 'true')
    } else if (newOption2.value === 'USD') {
        newOption2.setAttribute('selected', 'true')
    }
})

// The datas show in the currency tables
const showActualCurrencies = (response) => {
    const euro = document.querySelector('.currencies-value.eur')
    const euro2 = document.querySelector('.currencies-date.eur')
    const newEuro = document.createElement('p')
    const euroDate = document.createElement('p')
    newEuro.innerHTML = `${response.rates.EUR.toFixed(2)} €`
    euroDate.innerHTML = response.date
    euro.appendChild(newEuro)
    euro2.appendChild(euroDate)

    const gbp = document.querySelector('.currencies-value.gbp')
    const gbp2 = document.querySelector('.currencies-date.gbp')
    const newGbp = document.createElement('p')
    const gbpDate = document.createElement('p')
    newGbp.innerHTML = `${response.rates.GBP.toFixed(2)} £`
    gbpDate.innerHTML = response.date
    gbp.appendChild(newGbp)
    gbp2.appendChild(gbpDate)

    const switzerland = document.querySelector('.currencies-value.chf')
    const switzerland2 = document.querySelector('.currencies-date.chf')
    const newChf = document.createElement('p')
    const chfDate = document.createElement('p')
    newChf.innerHTML = `${response.rates.CHF.toFixed(2)} ₣`
    chfDate.innerHTML = response.date
    switzerland.appendChild(newChf)
    switzerland2.appendChild(chfDate)

    const jpy = document.querySelector('.currencies-value.jpy')
    const jpy2 = document.querySelector('.currencies-date.jpy')
    const newJpy = document.createElement('p')
    const jpyDate = document.createElement('p')
    newJpy.innerHTML = `${response.rates.JPY.toFixed(2)} ¥`
    jpyDate.innerHTML = response.date 
    jpy.appendChild(newJpy)
    jpy2.appendChild(jpyDate)

    const usd = document.querySelector('.currencies-value.usd')
    const usd2 = document.querySelector('.currencies-date.usd')
    const newUsd = document.createElement('p')
    const usdDate = document.createElement('p')
    newUsd.innerHTML = `${response.rates.USD.toFixed(2)} $`
    usdDate.innerHTML = response.date 
    usd.appendChild(newUsd)
    usd2.appendChild(usdDate)
}

// The function responsible for the show of currency score
const getScore = (response) => {
    Object.keys(response.rates).forEach(key => {
        let value = response.rates[key]
        const answer = document.createElement('p')
        answer.classList.add('total-score-answer')
        answer.innerHTML = `${response.amount} ${response.base} is ${value.toFixed(2)} ${key}`
        totalScore.appendChild(answer)
        score.placeholder = `${value.toFixed(2)}`
        if (totalScore.childElementCount > 1)
            totalScore.removeChild(totalScore.firstElementChild);
    })
}

// Capture value to the array
type.addEventListener('keyup', (e) => {
    dataValue = e.target.value
})

// After click the function will load data from JSON and convert to the score
btn.addEventListener('click', (e) => {
    e.preventDefault()
    const currentOption1 = select1.options[select1.selectedIndex].value
    const currentOption2 = select2.options[select2.selectedIndex].value
    if (currentOption1 === currentOption2) {
        alert('Currencies are the same! You have to choose another currency')
    } 
    else if (type.value === '') {
        alert('Input is empty. Type some value!')
    }
    else {
        fetch(`https://api.frankfurter.app/latest?amount=${dataValue}&from=${currentOption1}&to=${currentOption2}`)
            .then(response => response.json())
            .then(response => getScore(response))
            .catch(err => console.log('The request has failed'))
        type.value = ''
    }
})