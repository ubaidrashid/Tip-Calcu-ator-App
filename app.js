// Targeting Input Elements and Buttons
const billInput = document.querySelector('.billInput');
const peopleInput = document.querySelector('.peopleInput');
const tipButtons = document.querySelectorAll('.percentBtn');
const customTipInput = document.getElementById('uniqueInput');
const resetButton = document.querySelector('.reset');
const peopleInputCover = document.querySelector('.peopleInputCover');
const error = document.querySelector('.error');
let billInputCover = document.querySelector('.billInputCover');

// Output Elements
const perPersonAmountElement = document.querySelectorAll('.perPersonAmount');

billInput.addEventListener('focus',()=>{
    billInputCover.style.border = '2px solid  hsl(172, 67%, 45%)'
})
peopleInput.addEventListener('focus',()=>{
    peopleInputCover.style.border = '2px solid  hsl(172, 67%, 45%)'
})

// Max Custom Tip Value Restriction
customTipInput.addEventListener('input', function () {
    const maxValue = 100;
    let value = parseInt(this.value, 10);

    if (value > maxValue) {
        this.value = '';
        alert('Tip percentage cannot be greater than 100!');
    } else if (value < 0 || isNaN(value)) {
        this.value = '';
    }
});

// Update Tip Amount and Total Per Person
function calculateTip(tipPercentage) {
    const billAmount = parseFloat(billInput.value);
    const numOfPeople = parseInt(peopleInput.value);

    if (isNaN(billAmount) || billAmount <= 0) {
        alert('Please enter a valid bill amount.');
        return;
    }
    if (isNaN(numOfPeople) || numOfPeople <= 0) {
        // alert('Number of people must be greater than zero.');

        peopleInputCover.style.outline = '2px solid hsl(2, 61%, 65%)'
        error.classList.remove('none')
        return;
    }else{
        peopleInputCover.style.outline = 'none'
        error.classList.add('none')
    }

    // Calculations
    const totalTip = (billAmount * tipPercentage) / 100;
    const totalAmount = billAmount + totalTip;
    const perPersonTip = totalTip / numOfPeople;
    const perPersonTotal = totalAmount / numOfPeople;

    // Update UI
    setTimeout(()=>{
        perPersonAmountElement[0].textContent = perPersonTip.toFixed(2); // Tip per person
        perPersonAmountElement[1].textContent = perPersonTotal.toFixed(2); // Total per person
    },2000)

    // Set Reset Button Opacity to 100%
    resetButton.style.opacity = '1';
    resetButton.style.pointerEvents = 'auto';
}

// Add Click Event to Tip Buttons
tipButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const tipPercentage = parseInt(button.textContent.replace('%', ''), 10);
        calculateTip(tipPercentage);
        customTipInput.value = ''; // Reset custom input field
    });
});

// Add Input Event for Custom Tip
customTipInput.addEventListener('input', () => {
    const tipPercentage = parseFloat(customTipInput.value);
    if (!isNaN(tipPercentage)) {
        calculateTip(tipPercentage);
    }
});

// Trigger Calculation on Enter Key Press
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const tipPercentage = parseFloat(customTipInput.value) || 0; // Use custom tip if available
        calculateTip(tipPercentage);
    }
});

// Reset Functionality
resetButton.addEventListener('click', () => {
    // Clear all inputs
    billInput.value = '';
    peopleInput.value = '';
    customTipInput.value = '';
    perPersonAmountElement[0].textContent = '0.00'; // Tip per person
    perPersonAmountElement[1].textContent = '0.00'; // Total per person

    // Reset Button Appearance
    resetButton.style.opacity = '0.3';
    resetButton.style.pointerEvents = 'none';
});

// Set Initial State for Reset Button
resetButton.style.opacity = '0.3';
resetButton.style.pointerEvents = 'none';

// Responsive Attribution Section
let attributionOne = document.querySelector('.attributionOne');
let attribution = document.querySelector('.attribution');

function checkWidth() {
    let targetWidth = document.documentElement.clientWidth;

    if (targetWidth <= 540) {
        attribution.classList.remove('none');
        attributionOne.classList.add('none');
        console.log('Width barabar / kam hai 540px se. Desktop view.');
    } else {
        attributionOne.classList.remove('none');
        attribution.classList.add('none');
        console.log('Width 540px se zyada hai. Mobile view.');
    }
}

// Initial Check and Resize Event Listener
checkWidth();
window.addEventListener('resize', checkWidth);
