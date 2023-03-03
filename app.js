const calculator = document.querySelector('.calculator');
const bill = document.getElementById('bill');
const people = document.getElementById('number-people');
const custom = document.getElementById('custom')
const tips = document.querySelectorAll('.tip');
const reset = document.querySelector('.reset');
const total = document.querySelector('.total');
const amount = document.querySelector('.amount');
let percentage = 0;
let sum_bill = 0;
let number_of_people = 0;

calculator.addEventListener('click', (e) => {
    if(!percentage && !sum_bill && !number_of_people){
        reset.style.opacity = '.3';
    }else {
        reset.style.opacity = '1';
    }
});

bill.addEventListener('input', (e) => {
    sum_bill = e.target.value; 
    reset.style.opacity = '1';
});

tips.forEach( tip => {
    tip.addEventListener('click', (e) => {
        tips.forEach( btn => {
            if(btn.classList.contains('active')){
                btn.classList.remove('active');
            }
        });
        e.target.classList.add('active');
        percentage = e.target.value;
        custom.value = null;
    });
});

custom.addEventListener('input', (e) => {
    tips.forEach( tip => {
        if(tip.classList.contains('active')){
            tip.classList.remove('active');
        }
    });
    percentage = !e.target.value ? 0 : e.target.value;
});

people.addEventListener('input', (e) => {
    number_of_people = e.target.value;
    reset.style.opacity = '1';
});


reset.addEventListener('click', () => {
    if(sum_bill && number_of_people) {
        let tip = (sum_bill / number_of_people) * (percentage / 100);
        let price = (sum_bill / number_of_people) + tip;
        tip = (Math.floor(tip * 100) / 100).toFixed(2);
        price = (Math.round(price * 100) / 100).toFixed(2);
        amount.innerText = `$${tip}`;
        total.innerText = `$${price}`;
    }

    if(!bill.value) {
        bill.style.borderColor = 'red';
        bill.nextElementSibling.style.opacity = '1';
    }else {
        bill.style.borderColor = 'transparent';       
        bill.nextElementSibling.style.opacity = '0';
    }

    if(!people.value) {
        people.style.borderColor = 'red';       
        people.nextElementSibling.style.opacity = '1';
    }else {
        people.style.borderColor = 'transparent';
        people.nextElementSibling.style.opacity = '0';
    }
});
