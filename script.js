class App{
	constructor(){
		this.amount = Number(localStorage.amount) || 0;
		this.currentTexture = localStorage.currentTexture || 'standart';
		this.currentTextureItems = [];
		this.items = localStorage.items && JSON.parse(localStorage.items) || [
			{
				"name": "Стандарт",
				"cost": 0,
				"texture": "standart",
				"bought": true,
			},
			{
				"name": "Пираты",
				"cost": 100,
				"texture": "pirate",
				"bought": false,
			},
			{
				"name": "Земля",
				"cost": 120,
				"texture": "earth",
				"bought": false,
			},
			{
				"name": "Парад",
				"cost": 200,
				"texture": "parade",
				"bought": false,
			},
			{
				"name": "Гонки",
				"cost": 220,
				"texture": "racing",
				"bought": false,
			},
			{
				"name": "Геолокация",
				"cost": 250,
				"texture": "location",
				"bought": false,
			},
			{
				"name": "Город",
				"cost": 300,
				"texture": "town",
				"bought": false,
			},
		];
		this.getCurrentTextureItems();
	}
	
	getCurrentTextureItems(){
		let currentTexture = this.currentTexture;
		var items={
			"bomb": "",
			"flag": "",
			"one-number": "",
			"second-number": "",
			"third-number": "", 
			"fourth-number": "",
		};
		
		let lastRequestIndex = Object.keys(items).length;
		for (let key in items){
		    fetch(`assets/mines/minesweeper-${currentTexture.replaceAll('"', '')}-pack/${key}.svg`)
		    .then(r => r.text())
		    .then((text) => {
			     lastRequestIndex -= 1;
			     items[key] = text;
			     if (lastRequestIndex == 0){
				this.currentTextureItems = {
					"mine": items.bomb,
					"flag": items.flag,
					"numbers": [
						items["one-number"],
						items["second-number"],
						items["third-number"],
						items["fourth-number"],
					],
				};
				game = new Minesweeper(10, 10, 10, this.currentTextureItems);
			     }
			});
		}
		
	}
	
	renderItems(){
		document.querySelector('.slide-left').innerHTML = '';
        var thiss = this;
		this.items.map((item) => {
		    let div = document.createElement('div');
		    div.classList.add('slide_left-item');
		    let sBtns = '';
            let cTexture = '';
            if (item.texture == app.currentTexture){
                div.classList.add('selected');
            }
		    if (item.bought){
			sBtns = '<div class="was-bought">Куплено</div>';
		    }else{
			sBtns = `${cTexture}<div class="slide_left-item-btns">
				     <div class="slide_left-item-amount">${item.cost} <img src="assets/images/money.svg"/></div>
				     <div class="btn-buy" onclick="app.buyItem('${item.texture}');"><img src="assets/images/cartitem-icon.svg"></div>
				 </div>`;
		    }
		    div.innerHTML = `<div class="slide_left-item-img">
				        <img src="assets/mines/minesweeper-${item.texture}-pack/preview.svg"/>
				     </div>
				     <div class="slide_left-item-title">${item.name}</div>
				     ${sBtns}`;
            div.onclick = function(){
                if (item.bought == true){
                    thiss.currentTexture = item.texture;
                    thiss.saveCurrentState();
                    thiss.renderItems();
                }
            }
		    document.querySelector('.slide-left').append(div);
		});
	}
	
	renderVariables(){
		document.querySelector('#mineramount').innerHTML = app.amount + '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none"><path d="M10.0208 5.25L8.7915 7.22912L11.4673 7.43075L13.4583 8.25V6.0625" fill="#FF4893"/><path d="M13.6465 8.32588C16.6124 10.0906 18.2078 13.648 17.3335 17.1704C16.2643 21.4795 11.9044 24.1051 7.5945 23.0366C3.28538 21.9674 0.659754 17.6068 1.72825 13.2976C2.55813 9.9525 5.3725 7.62038 8.60613 7.24576C9.53725 7.13726 10.5035 7.19188 11.4674 7.43076C12.2339 7.62008 12.9682 7.92172 13.6465 8.32588Z" fill="#FF4893"/><path d="M9.53638 23.8214C8.8375 23.8209 8.14127 23.7355 7.463 23.567C2.869 22.4271 0.0586285 17.7612 1.198 13.1662C1.62713 11.4361 2.56425 9.90723 3.90825 8.74461C5.222 7.60811 6.82475 6.90223 8.54313 6.70311C9.55575 6.58523 10.5961 6.65211 11.5986 6.90048C12.4174 7.10287 13.2018 7.42514 13.9264 7.85686C15.4764 8.77911 16.7218 10.2064 17.4326 11.8751C18.1675 13.6006 18.3166 15.4774 17.8638 17.3022C16.9113 21.1406 13.487 23.8214 9.53638 23.8214ZM9.52563 7.73886C9.24038 7.73886 8.95225 7.75561 8.66925 7.78861C5.58288 8.14611 3.00675 10.413 2.25863 13.4294C1.26425 17.4397 3.71688 21.5117 7.72613 22.5066C8.31836 22.6537 8.92627 22.7284 9.5365 22.7289C12.9838 22.7289 15.972 20.3892 16.8033 17.0392C17.5925 13.859 16.1795 10.4691 13.3673 8.79573C12.7349 8.41899 12.0504 8.13779 11.3359 7.96123C10.7437 7.81401 10.1358 7.73934 9.52563 7.73886ZM22.246 9.11661C20.0366 9.11661 18.2351 7.32286 18.2271 5.11148C18.2269 5.03974 18.2407 4.96864 18.268 4.90226C18.2952 4.83588 18.3352 4.77551 18.3857 4.72459C18.4363 4.67368 18.4964 4.63323 18.5626 4.60554C18.6288 4.57786 18.6998 4.56348 18.7715 4.56323H18.7735C18.9181 4.56323 19.0567 4.62053 19.1591 4.72256C19.2615 4.8246 19.3193 4.96306 19.3198 5.10761C19.3256 6.71773 20.6375 8.02398 22.246 8.02398H22.2575C22.4024 8.02377 22.5414 8.08112 22.644 8.18342C22.7466 8.28572 22.8044 8.42459 22.8046 8.56948C22.8048 8.71437 22.7475 8.85342 22.6452 8.95602C22.5429 9.05863 22.404 9.11639 22.2591 9.11661H22.246Z" fill="#4F46A3"/><path d="M11.7922 5.80881C11.6473 5.80881 11.5083 5.75124 11.4059 5.64878C11.3034 5.54631 11.2458 5.40734 11.2458 5.26243V5.25068C11.2458 3.04281 13.0421 1.24006 15.2501 1.23193H15.2634C17.4734 1.23193 19.2752 3.02568 19.2833 5.23706C19.2836 5.3088 19.2697 5.3799 19.2425 5.44628C19.2153 5.51266 19.1753 5.57304 19.1247 5.62395C19.0742 5.67486 19.0141 5.71531 18.9479 5.743C18.8817 5.77069 18.8107 5.78506 18.739 5.78531H18.737C18.5924 5.78531 18.4538 5.72802 18.3514 5.62598C18.249 5.52394 18.1912 5.38548 18.1907 5.24093C18.1849 3.62756 16.8667 2.31856 15.2538 2.32456C13.6465 2.33043 12.3386 3.64318 12.3386 5.25068V5.26243C12.3386 5.40733 12.281 5.54628 12.1785 5.64874C12.0761 5.7512 11.9371 5.80878 11.7922 5.80881ZM21.9263 14.0359C21.8144 14.0361 21.705 14.0017 21.6132 13.9377C21.5214 13.8736 21.4514 13.7828 21.4129 13.6777C21.3743 13.5725 21.3691 13.4581 21.3977 13.3498C21.4264 13.2415 21.4877 13.1447 21.5732 13.0724C21.7275 12.9419 21.8677 12.7957 21.9917 12.6362C22.8384 11.5507 22.8059 9.99993 21.915 8.94843C21.8213 8.83789 21.7754 8.69466 21.7873 8.55026C21.7992 8.40585 21.8681 8.27211 21.9786 8.17843C22.0891 8.08476 22.2324 8.03884 22.3768 8.05077C22.5212 8.06271 22.6549 8.13151 22.7486 8.24206C23.9722 9.68631 24.0165 11.8167 22.8538 13.3074C22.6834 13.5267 22.4906 13.7276 22.2786 13.9069C22.1802 13.9904 22.0554 14.0361 21.9263 14.0359Z" fill="#4F46A3"/><path d="M13.6529 8.85973C13.5178 8.85955 13.3876 8.80934 13.2874 8.71881C13.1872 8.62828 13.124 8.50383 13.1102 8.36948L12.9137 6.46585L10.1042 5.76823L9.03903 7.3606C8.95847 7.48104 8.83336 7.56455 8.69123 7.59275C8.5491 7.62095 8.40159 7.59154 8.28115 7.51098C8.16071 7.43042 8.0772 7.30531 8.049 7.16318C8.0208 7.02105 8.05022 6.87354 8.13078 6.7531L9.40928 4.84173C9.47175 4.7483 9.56152 4.67642 9.66635 4.63589C9.77117 4.59535 9.88595 4.58814 9.99503 4.61523L13.5494 5.49798C13.6585 5.52505 13.7565 5.58511 13.8302 5.66996C13.9039 5.75481 13.9496 5.86032 13.9612 5.9721L14.1969 8.25735C14.2047 8.33346 14.1965 8.41037 14.1727 8.48309C14.1489 8.55581 14.1101 8.62273 14.0589 8.67951C14.0076 8.73629 13.9449 8.78167 13.875 8.81272C13.8051 8.84376 13.7294 8.85978 13.6529 8.85973ZM4.44553 12.5812C4.34896 12.5811 4.25415 12.5554 4.17074 12.5068C4.08733 12.4581 4.01832 12.3882 3.97072 12.3042C3.92312 12.2202 3.89864 12.125 3.89977 12.0285C3.9009 11.9319 3.9276 11.8374 3.97715 11.7545C4.17138 11.4298 4.39467 11.1235 4.64428 10.8392C4.73989 10.7304 4.87483 10.6639 5.01942 10.6545C5.16401 10.6452 5.30641 10.6936 5.41528 10.7892C5.52415 10.8848 5.59058 11.0198 5.59996 11.1644C5.60933 11.309 5.56089 11.4514 5.46528 11.5602C5.25936 11.7947 5.07514 12.0474 4.9149 12.3152C4.86641 12.3964 4.79766 12.4636 4.71537 12.5103C4.63309 12.5569 4.5401 12.5813 4.44553 12.5812ZM7.95565 21.0084C7.91119 21.0083 7.86691 21.0029 7.82378 20.9921C6.20953 20.592 4.84778 19.5869 3.98953 18.1621C3.13128 16.7374 2.87915 15.0637 3.27978 13.4494C3.31462 13.3088 3.40384 13.1878 3.52783 13.113C3.65183 13.0382 3.80045 13.0157 3.94103 13.0505L3.94165 13.0506C4.01128 13.0679 4.07682 13.0987 4.13453 13.1413C4.19225 13.1839 4.24101 13.2375 4.27802 13.2989C4.31504 13.3604 4.33959 13.4285 4.35027 13.4994C4.36095 13.5704 4.35756 13.6427 4.34028 13.7124C4.01003 15.0434 4.21778 16.4234 4.92553 17.5981C5.63315 18.7729 6.7559 19.6015 8.08665 19.9315C8.2163 19.9634 8.32975 20.0417 8.40559 20.1516C8.48143 20.2615 8.5144 20.3954 8.49828 20.528C8.48215 20.6605 8.41805 20.7826 8.31808 20.8711C8.2181 20.9596 8.08918 21.0084 7.95565 21.0084ZM23.8313 14.5887C24.0288 14.69 24.135 14.9087 24.0938 15.1262C24.0738 15.2324 24.0199 15.3293 23.9401 15.4021C23.8602 15.475 23.7589 15.5198 23.6513 15.53L23.185 15.5762L23.3963 15.995C23.495 16.1925 23.4525 16.4325 23.2913 16.5837C23.2128 16.6579 23.1124 16.7047 23.005 16.7168C22.8977 16.729 22.7894 16.706 22.6963 16.6512L22.2913 16.4137L22.2163 16.8762C22.1973 16.9935 22.1372 17.1001 22.0467 17.1771C21.9562 17.2541 21.8413 17.2963 21.7225 17.2962C21.6252 17.2963 21.5299 17.268 21.4484 17.2147C21.3669 17.1614 21.3027 17.0855 21.2638 16.9962L21.0763 16.5662L20.7438 16.8962C20.667 16.9723 20.5677 17.0215 20.4606 17.0364C20.3536 17.0513 20.2446 17.031 20.15 16.9787C20.0557 16.9266 19.9807 16.8454 19.9363 16.7472C19.8919 16.6489 19.8805 16.539 19.9038 16.4337L20.005 15.9762L19.5413 16.0475C19.3225 16.0812 19.1075 15.9662 19.0125 15.7662C18.9188 15.565 18.9675 15.3262 19.1325 15.1787L19.4838 14.8675L19.0675 14.6525C18.9716 14.6033 18.8941 14.5243 18.8468 14.4274C18.7995 14.3305 18.7848 14.2209 18.805 14.115C18.8254 14.0088 18.8797 13.912 18.9597 13.8392C19.0397 13.7664 19.1411 13.7215 19.2488 13.7112L19.7138 13.665L19.5025 13.2475C19.4537 13.151 19.4376 13.0414 19.4565 12.9349C19.4755 12.8285 19.5285 12.7312 19.6075 12.6575C19.6861 12.5834 19.7866 12.5369 19.894 12.525C20.0013 12.513 20.1096 12.5363 20.2025 12.5912L20.6075 12.8287L20.6825 12.365C20.7002 12.2587 20.7517 12.1609 20.8294 12.0862C20.9071 12.0116 21.0069 11.964 21.1138 11.9507C21.2208 11.9373 21.3292 11.9589 21.4229 12.0121C21.5166 12.0654 21.5905 12.1475 21.6338 12.2462L21.8213 12.675L22.155 12.345C22.2317 12.2692 22.3308 12.2202 22.4376 12.2053C22.5444 12.1904 22.6531 12.2105 22.7475 12.2625C22.9425 12.3687 23.0425 12.5912 22.995 12.8075L22.8938 13.2662L23.3575 13.195C23.5763 13.1612 23.7913 13.2762 23.8863 13.4762C23.98 13.6775 23.9313 13.9162 23.765 14.0637L23.415 14.3737L23.8313 14.5887ZM22.1125 14.7475C22.075 14.6875 22.05 14.6187 22.0413 14.5462C22.0313 14.4737 22.0388 14.4012 22.06 14.3337C21.995 14.3075 21.9338 14.2662 21.885 14.2125C21.835 14.16 21.7975 14.0975 21.775 14.03C21.7063 14.0475 21.6338 14.05 21.5613 14.0362C21.49 14.0212 21.4225 13.9925 21.365 13.9512C21.3188 14.0062 21.2613 14.05 21.195 14.0812C21.13 14.1125 21.0588 14.1275 20.9875 14.1287C20.9825 14.2 20.9625 14.27 20.9275 14.3337C20.8913 14.3975 20.8438 14.4525 20.7863 14.4937C20.8238 14.5537 20.8488 14.6225 20.8575 14.695C20.8663 14.7675 20.86 14.84 20.8388 14.9075C20.9038 14.9337 20.965 14.975 21.015 15.0287C21.065 15.0825 21.1013 15.145 21.125 15.2125C21.1625 15.2025 21.2025 15.1975 21.2438 15.1975C21.275 15.1975 21.3063 15.2012 21.3375 15.2062C21.4088 15.22 21.475 15.25 21.5325 15.29C21.5788 15.2362 21.6363 15.1912 21.7025 15.16C21.7688 15.1287 21.84 15.1137 21.9113 15.1125C21.9165 15.0407 21.9371 14.9709 21.9719 14.9079C22.0066 14.8449 22.0546 14.7902 22.1125 14.7475Z" fill="#4F46A3"/><path d="M22.0411 14.5462C22.0499 14.6187 22.0749 14.6874 22.1124 14.7474C22.0545 14.7901 22.0065 14.8448 21.9717 14.9079C21.937 14.9709 21.9163 15.0407 21.9111 15.1124C21.8399 15.1137 21.7686 15.1287 21.7024 15.1599C21.6361 15.1912 21.5786 15.2362 21.5324 15.2899C21.4739 15.2487 21.4075 15.2202 21.3374 15.2062C21.3061 15.2012 21.2749 15.1974 21.2436 15.1974C21.2024 15.1974 21.1624 15.2024 21.1249 15.2124C21.1011 15.1449 21.0649 15.0824 21.0149 15.0287C20.9649 14.9749 20.9036 14.9337 20.8386 14.9074C20.8599 14.8399 20.8661 14.7674 20.8574 14.6949C20.8486 14.6224 20.8236 14.5537 20.7861 14.4937C20.8436 14.4524 20.8911 14.3974 20.9274 14.3337C20.9624 14.2699 20.9824 14.1999 20.9874 14.1287C21.0592 14.128 21.1299 14.1118 21.1949 14.0812C21.2611 14.0499 21.3186 14.0062 21.3649 13.9512C21.4224 13.9924 21.4899 14.0212 21.5611 14.0362C21.6336 14.0499 21.7061 14.0474 21.7749 14.0299C21.7974 14.0974 21.8349 14.1599 21.8849 14.2124C21.9336 14.2662 21.9949 14.3074 22.0599 14.3337C22.0386 14.4012 22.0311 14.4737 22.0411 14.5462Z" fill="#FF4893"/></svg>';
	}
	
    saveCurrentState(){
        localStorage.items = JSON.stringify(this.items);
        localStorage.amount = (this.amount);
        localStorage.currentTexture = (this.currentTexture);
    }

    buyItem(texture){
        let exitMessage;
        this.items.map((item) => {
            if (texture == item.texture){
                if (item.bought){
                    exitMessage = 'То, что уже куплено нельзя купить!'
                }else{
                    if (app.amount >= item.cost){
                        app.amount = app.amount - item.cost;
                        exitMessage = 'Куплено успешно';
                        item.bought = true;
                        this.renderVariables();
                        this.renderItems();
                        app.saveCurrentState();
                    }else{
                        exitMessage = 'Не хватает денег!';
                    }
                }
            }
        });
        if (exitMessage){
            return exitMessage;
        }
        return "Нет такой вещи."
    }
		
}

var timerInterval;

class Minesweeper {
    constructor(rows, cols, mines, textures) {
        this.rows = rows;
        this.cols = cols;
        this.mines = mines;
        this.textures = textures;
        this.field = [];
        this.timer = 0;
        this.steps = 0;
        this.minesLeft = mines;
        this.interval = null;
        this.touchTimeout = null;
        this.initialize();
    }

    initialize() {
        this.createField();
        this.placeMines();
        this.calculateNumbers();
        this.render();
        this.updateMineCounter();
        this.updateStepsCounter();
        this.startTimer();
        hideEndGame();
    }

    createField() {
        for (let r = 0; r < this.rows; r++) {
            this.field[r] = [];
            for (let c = 0; c < this.cols; c++) {
                this.field[r][c] = {
                    mine: false,
                    number: 0,
                    revealed: false,
                    flagged: false
                };
            }
        }
    }

    placeMines() {
        let placedMines = 0;
        while (placedMines < this.mines) {
            const r = Math.floor(Math.random() * this.rows);
            const c = Math.floor(Math.random() * this.cols);
            if (!this.field[r][c].mine) {
                this.field[r][c].mine = true;
                placedMines++;
            }
        }
    }

    calculateNumbers() {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (this.field[r][c].mine) continue;
                let count = 0;
                for (let dr = -1; dr <= 1; dr++) {
                    for (let dc = -1; dc <= 1; dc++) {
                        const nr = r + dr;
                        const nc = c + dc;
                        if (nr >= 0 && nr < this.rows && nc >= 0 && nc < this.cols && this.field[nr][nc].mine) {
                            count++;
                        }
                    }
                }
                this.field[r][c].number = count;
            }
        }
    }

    render() {
        const minefield = document.getElementById('minefield');
        minefield.innerHTML = '';
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = r;
                cell.dataset.col = c;
                cell.addEventListener('click', (e) => this.revealCell(e, r, c));
                cell.addEventListener('contextmenu', (e) => this.flagCell(e, r, c));
                cell.addEventListener('touchstart', (e) => this.handleTouchStart(e, r, c));
                cell.addEventListener('touchend', (e) => this.handleTouchEnd(e, r, c));
                minefield.appendChild(cell);
            }
        }
    }

    startTimer() {
        timerInterval = setInterval(() => {
            this.timer++;
            document.getElementById('timer').innerText = `Время: ${this.timer}`;
        }, 1000);
    }

    stopTimer() {
        clearInterval(timerInterval);
    }

    updateMineCounter() {
        document.getElementById('mine-counter').innerText = `Мины: ${this.minesLeft}`;
    }

    updateStepsCounter() {
        document.getElementById('steps-counter').innerText = `Шаги: ${this.steps}`;
    }

    revealCell(event, r, c) {
        if (event && event.preventDefault) {
            event.preventDefault();
        }
        if (this.field[r][c].revealed || this.field[r][c].flagged) return;
        this.field[r][c].revealed = true;
        this.updateStepsCounter();
        const cell = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
        cell.classList.add('revealed');
        if (this.field[r][c].mine) {
            cell.classList.add('mine');
            cell.innerHTML = this.textures.mine;
            this.showAllMines();
            clearInterval(timerInterval);
            showEndGame('Вы проиграли', 'Играть снова')
            app.renderVariables();
        } else {
            cell.innerHTML = this.field[r][c].number > 0 ? this.textures.numbers[this.field[r][c].number - 1] : '';
            if (this.field[r][c].number === 0) {
                this.revealAdjacentCells(r, c);
            }
            this.steps++;
            if (this.minesLeft == 0){
                app.amount += 40;
                app.renderVariables()
                clearInterval(timerInterval);
                showEndGame('Вы выиграли', 'Играть снова')
            }
        }
    }

    flagCell(event, r, c) {
        event.preventDefault();
        if (this.field[r][c].revealed) return;
        const cell = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
        if (this.field[r][c].flagged) {
            this.field[r][c].flagged = false;
            cell.classList.remove('flagged');
            cell.innerHTML = '';
            if (this.field[r][c].mine) {
                this.minesLeft++;
            }
        } else {
            this.field[r][c].flagged = true;
            cell.classList.add('flagged');
            cell.innerHTML = this.textures.flag;
            if (this.field[r][c].mine) {
                this.minesLeft--;
            }
        }
        this.updateMineCounter();
        if (this.minesLeft == 0){
            app.amount += 40;
            app.renderVariables();
            clearInterval(timerInterval);
            showEndGame('Вы выиграли', 'Играть снова')
        }
    }

    revealAdjacentCells(r, c) {
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                const nr = r + dr;
                const nc = c + dc;
                if (nr >= 0 && nr < this.rows && nc >= 0 && nc < this.cols && !this.field[nr][nc].revealed) {
                    this.revealCell(null, nr, nc);
                }
            }
        }
    }

    showAllMines() {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (this.field[r][c].mine) {
                    const cell = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
                    cell.classList.add('revealed', 'mine');
                    cell.innerHTML = this.textures.mine;
                }
            }
        }
    }

    handleTouchStart(event, r, c) {
        this.touchTimeout = setTimeout(() => {
            this.flagCell(event, r, c);
        }, 500);
    }

    handleTouchEnd(event, r, c) {
        clearTimeout(this.touchTimeout);
        if (!this.field[r][c].flagged) {
            this.revealCell(event, r, c);
        }
    }
}

const textures = {
    mine: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    flag: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-flag"><path d="M3 3v18"/><path d="M3 3l18 9-18 9"/></svg>',
    numbers: [
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-1"><path d="M12 20V4m0 0L8.5 8.5"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-2"><path d="M12 20H6.5c-.828 0-1.5-.672-1.5-1.5V5.5C5 4.672 5.672 4 6.5 4h11c.828 0 1.5.672 1.5 1.5v13c0 .828-.672 1.5-1.5 1.5H12z"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-3"><path d="M12 20H6.5c-.828 0-1.5-.672-1.5-1.5V5.5C5 4.672 5.672 4 6.5 4h11c.828 0 1.5.672 1.5 1.5v13c0 .828-.672 1.5-1.5 1.5H12z"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-4"><path d="M8 16l4-8v8"/><path d="M8 12h8"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-5"><path d="M12 20H6.5c-.828 0-1.5-.672-1.5-1.5V5.5C5 4.672 5.672 4 6.5 4h11c.828 0 1.5.672 1.5 1.5v13c0 .828-.672 1.5-1.5 1.5H12z"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-6"><path d="M12 20H6.5c-.828 0-1.5-.672-1.5-1.5V5.5C5 4.672 5.672 4 6.5 4h11c.828 0 1.5.672 1.5 1.5v13c0 .828-.672 1.5-1.5 1.5H12z"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-7"><path d="M8 12h8"/><path d="M8 16h8"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-8"><path d="M12 20H6.5c-.828 0-1.5-.672-1.5-1.5V5.5C5 4.672 5.672 4 6.5 4h11c.828 0 1.5.672 1.5 1.5v13c0 .828-.672 1.5-1.5 1.5H12z"/></svg>'
    ]
};

function hideEndGame(){
    let alertTextOld = document.querySelector('.alertText');
    if (alertTextOld){
        alertTextOld.style = 'display: none;';
    }
    let buttonRestartOld = document.querySelector('.restartButton');
    if (buttonRestartOld){
        buttonRestartOld.style = 'display: none;';
    }
}

function showEndGame(alertTextValue='Вы выиграли', buttonRestartText='Играть снова'){
    let alertTextOld = document.querySelector('.alertText');
    if (alertTextOld){
        alertTextOld.remove();
    }
    let alertText = document.createElement('div');
    alertText.className = 'alertText';
    alertText.innerText = alertTextValue;
    document.body.append(alertText);

    let buttonRestartOld = document.querySelector('.restartButton');
    if (buttonRestartOld){
        buttonRestartOld.remove();
    }
    let buttonRestart = document.createElement('a');
    buttonRestart.classList.add('restartButton');
    buttonRestart.innerText = buttonRestartText;
    buttonRestart.onclick = function(){
        document.getElementById('timer').innerText = `Время: 0`;
        game.timer = 0;
        clearInterval(timerInterval);
        game = new Minesweeper(10, 10, 10, app.currentTextureItems);
    }
    document.body.append(buttonRestart);
}

var game; // = new Minesweeper(10, 10, 10, textures);
const app = new App();
app.renderVariables();


let game_item = document.querySelector('.game-item');
let shop_item = document.querySelector('.shop-item');
let slide_right = document.querySelector('.slide-right');
let slide_left = document.querySelector('.slide-left');

game_item.onclick = function(){
    app.getCurrentTextureItems();
    document.getElementById('timer').innerText = `Время: 0`;
    game.timer = 0;
    clearInterval(timerInterval);
    game = new Minesweeper(10, 10, 10, app.currentTextureItems);
    if (false == slide_right.classList.contains('active')){
        slide_right.classList.add('active');
        slide_left.classList.remove('active');
        game_item.classList.add('active');
        shop_item.classList.remove('active');
    }
}

shop_item.onclick = function(){
    document.getElementById('timer').innerText = `Время: 0`;
    game.timer = 0;
    hideEndGame();
    clearInterval(timerInterval);
    if (slide_left.classList.contains('active') == false){
        slide_left.classList.add('active');
        shop_item.classList.add('active');
        slide_right.classList.remove('active');
        game_item.classList.remove('active');
    }
    app.renderItems();
}
