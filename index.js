const amount = document.querySelector('#amount');
const term = document.querySelector('#term');
const rate = document.querySelector('#rate');
const entries = [amount, term, rate];

const repayment = document.querySelector('#repayment');
const interest = document.querySelector('#interest');

const monthlyRepayment = document.querySelector('#monthly-repayment-figure')
const totalRepayment = document.querySelector('#total-repayment-figure')

const  empty = document.querySelector('#empty')
const  results = document.querySelector('#results')

repayment.addEventListener('click', function() {
    if (![...repayment.parentElement.classList].includes('active')) {
        repayment.parentElement.classList.add('active');
        interest.parentElement.classList.remove('active');
    }
})

interest.addEventListener('click', function() {
    if (![...interest.parentElement.classList].includes('active')) {
        interest.parentElement.classList.add('active');
        repayment.parentElement.classList.remove('active');
    }
})

for (const entry of entries) {
    const currentColor = entry.style.backgroundColor
    entry.addEventListener('focus', function() {
        this.previousElementSibling.style.backgroundColor = '#d7da2f'
    })
    entry.addEventListener('focusout', function() {
        this.previousElementSibling.style.backgroundColor = currentColor
    })
}

function calculate() {
    let formComplete = 0
    for (const entry of entries) {
        const noComma = entry.value.replace(/,/g, '')
        if (isNaN(noComma) || noComma === '') {
            entry.classList.add('entry-required');
            entry.previousElementSibling.classList.add('units-required');
            entry.nextElementSibling.classList.add('text-required');
    }
    }   if (!repayment.checked && !interest.checked) {
            interest.parentElement.nextElementSibling.classList.add('text-required');
    } 
    for (const entry of entries) {
        const noComma = entry.value.replace(/,/g, '')
        if (!isNaN(noComma) && noComma !== '') {
            entry.classList.remove('entry-required');
            entry.previousElementSibling.classList.remove('units-required');
            entry.nextElementSibling.classList.remove('text-required');
            formComplete++
        }
    }   if (repayment.checked || interest.checked) {
            interest.parentElement.nextElementSibling.classList.remove('text-required');
            formComplete++
        }
    if (formComplete === 4) {
        amount.value = amount.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (repayment.checked) {
            calculateRepayment()
        } else {
            calculateInterest()
        }
        results.style.zIndex = '1'
    }
}

function clearAll() {
    amount.value = '';
    term.value = '';
    rate.value = '';
    repayment.checked = false;
    interest.checked = false;
    repayment.parentElement.classList.remove('active');
    interest.parentElement.classList.remove('active');
    for (const entry of entries) {
        entry.classList.remove('entry-required');
        entry.previousElementSibling.classList.remove('units-required');
        entry.nextElementSibling.classList.remove('text-required');
    }
    interest.parentElement.nextElementSibling.classList.remove('text-required');
    results.style.zIndex = '-1';
}

function calculateRepayment() {
    const mortgageAmount = Number(amount.value.replace(/,/g, ''));
    const termMonths = Number(term.value) * 12;
    const interestRate = Number(rate.value) / 100 / 12;
    const monthlyPayment = (mortgageAmount * ((interestRate * ((1 + interestRate)**termMonths)) / (((1 + interestRate)**termMonths) - 1))).toFixed(2);
    const totalPayment = (monthlyPayment * termMonths).toFixed(2);
    monthlyRepayment.innerText = monthlyPayment.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    totalRepayment.innerText = totalPayment.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function calculateInterest() {
    const mortgageAmount = Number(amount.value.replace(/,/g, ''))
    const termMonths = Number(term.value) * 12;
    const interestRate = Number(rate.value) / 100;
    const monthlyPayment = (mortgageAmount * interestRate / 12).toFixed(2);
    const totalPayment = ((monthlyPayment * termMonths) + mortgageAmount).toFixed(2);
    monthlyRepayment.innerText = monthlyPayment.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    totalRepayment.innerText = totalPayment.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
