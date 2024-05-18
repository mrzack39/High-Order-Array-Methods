/* Used metrial */
/* W3schools */
/* youtube */
/* refrence site */
class HighOrderArrayMethods {
    constructor() {
        this.main = document.querySelector('#main');
        this.addUserButton = document.querySelector('#add-user');
        this.doubleMoneyButton = document.querySelector('#double');
        this.showMillionairesButton = document.querySelector('#show-millionaires');
        this.sortButton = document.querySelector('#sort');
        this.totalButton = document.querySelector('#calculate-total');

        this.data = [];

        this.generateRandomUser = this.generateRandomUser.bind(this);
        this.doubleWorth = this.doubleWorth.bind(this);
        this.sortRichest = this.sortRichest.bind(this);
        this.showMillionaires = this.showMillionaires.bind(this);
        this.calculateTotalNetWorth = this.calculateTotalNetWorth.bind(this);
        this.addData = this.addData.bind(this);
        this.updateDOM = this.updateDOM.bind(this);


        this.addUserButton.addEventListener('click', this.generateRandomUser);
        this.doubleMoneyButton.addEventListener('click', this.doubleWorth);
        this.sortButton.addEventListener('click', this.sortRichest);
        this.showMillionairesButton.addEventListener('click', this.showMillionaires);
        this.totalButton.addEventListener('click', this.calculateTotalNetWorth);

        this.generateRandomUser();
        this.generateRandomUser();
        this.generateRandomUser();
    }

    async generateRandomUser() {
        const res = await fetch('https://randomuser.me/api');
        const data = await res.json();

        const user = data.results[0];
        
        const newUser = {
            name: `${user.name.first} ${user.name.last}` ,
            worth: Math.round(Math.random()*1000000)
        };

        this.addData(newUser);
    }

    doubleWorth() {
        this.data = this.data.map( item => {
            return { ...item, worth: item.worth * 2 }
        });

        this.updateDOM();
    }

    sortRichest() {
        this.data.sort( (a, b) => b.worth - a.worth );

        this.updateDOM();
    }

    showMillionaires() {
        this.data = this.data.filter(
            item => item.worth > 1000000
        );

        this.updateDOM();
    }

    calculateTotalNetWorth() {
        const totalWorth = this.data.reduce(
            (acc, item) => (acc += item.worth), 0
        );

        const totalNetWorthElement = document.createElement('div');
        totalNetWorthElement.innerHTML = `<h3>Total Net Worth: <strong>${this.formatCurrency(totalWorth)}</strong></h3>`;
        this.main.appendChild(totalNetWorthElement);
    }

    addData(newUser) {
        this.data.push(newUser);

        this.updateDOM();
    }

    updateDOM(inputData = this.data) {
        this.main.innerHTML = '<h2><strong>Name</strong> Net Worth</h2>';

        inputData.forEach( item => {
            const element = document.createElement('div');
            element.classList.add('name');
            element.innerHTML = `<strong>${item.name}</strong> ${this.formatCurrency(item.worth)}`;
            this.main.appendChild(element);
        });
    }

    formatCurrency(num) {
        return 'PKR ' + (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
}
new HighOrderArrayMethods();

