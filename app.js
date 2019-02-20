let dom = {
	top5CryptoNames: document.querySelectorAll('.crypto-name'),
	top5CryptoPrices: document.querySelectorAll('.crypto-price'),
	top5CryptoMarketCap: document.querySelectorAll('.crypto-market-cap'),
	top5CryptoCirculatingSupply: document.querySelectorAll('.crypto-circulating-supply'),
	canvas: document.getElementById('myCanvas')
}

let ctx = dom.canvas.getContext('2d');

ctx.beginPath();
ctx.lineWidth = 5;
ctx.moveTo(10, 0);
ctx.lineTo(10, dom.canvas.height - 5);
ctx.lineTo(dom.canvas.width, dom.canvas.height - 5)
ctx.stroke();
ctx.closePath();


ctx.fillStyle = '#ff0000';
ctx.fillRect(30, dom.canvas.height - 20.5, 30, -200);

ctx.fillStyle = '#ff0000';
ctx.fillRect(110, dom.canvas.height - 20.5, 30, -200);

ctx.fillStyle = '#ff0000';
ctx.fillRect(190, dom.canvas.height - 20.5, 30, -200);

ctx.fillStyle = '#ff0000';
ctx.fillRect(270, dom.canvas.height - 20.5, 30, -200);

ctx.fillStyle = '#ff0000';
ctx.fillRect(350, dom.canvas.height - 20.5, 30, -200);

drawGraphTick(10, 2.5, 0, 2.5);

function drawGraphTick(originX, originY, lineToX, lineToY){
	ctx.beginPath();
	ctx.moveTo(originX, originY);
	ctx.lineTo(lineToX, lineToY);
	ctx.stroke();
	ctx.closePath();
}

function trimNumber(num){
	num = Math.floor(num);
	console.log(num, num.toString().length)
	if(num.toString().length > 9){
		return num.toString().slice(0, -9); 
	} else if(num.toString().length > 6){
		return '.' + num.toString().slice(0, -6);
	}
}


function sendRequest(){
	let xhr = new XMLHttpRequest();
	xhr.open('GET', './data', true);
	xhr.onreadystatechange = function() {
		if(this.readyState === 4) {
			let data = xhr.response;
			data = JSON.parse(data);
			console.log(data);
			displayTop5(data);
			data.data.forEach((el, i) => {
				console.log(trimNumber(el.quote.USD.market_cap))
			})
		}
	}
	xhr.send();
}
sendRequest();

function displayTop5(data) {
	data.data.forEach( (el, i) => {
		dom.top5CryptoNames[i].textContent = el.name;
		dom.top5CryptoPrices[i].textContent = append$Sign(numberWithCommas(round2DecimalPlaces(el.quote.USD.price)));
		dom.top5CryptoMarketCap[i].textContent = append$Sign(numberWithCommas(Math.round(el.quote.USD.market_cap)));
		dom.top5CryptoCirculatingSupply[i].textContent = numberWithCommas(Math.round(el.circulating_supply)) + ` ${el.symbol}`;
	});
}

function numberWithCommas(x) {
	if(x >= 1000){
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	} else {
		return x;
	}
}

function round2DecimalPlaces(num){
	if(num > 1) {
		return parseFloat(num.toFixed(2));
	} else {
		return parseFloat(num.toFixed(6));
	}
}

function append$Sign(x){
	return '$' + x;
}

