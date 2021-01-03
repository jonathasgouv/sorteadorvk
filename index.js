apiurl = 'https://api.sorteadorvk.repl.co';

function nofmembers(element) {
	number = element.value;
	document.getElementById('tobesort').innerText = `Sortear entre os primeiros: ${number} membros`;
}

function nofmembers2(element) {
	number = element.value;
	document.getElementById('tobesort2').innerText = `Sortear: ${number} membros`;
}

function getRandom(arr, n) {
	var result = new Array(n),
		len = arr.length,
		taken = new Array(len);
	if (n > len) {
		n = len;
	}
	while (n--) {
		var x = Math.floor(Math.random() * len);
		result[n] = arr[x in taken ? taken[x] : x];
		taken[x] = --len in taken ? taken[len] : len;
	}
	return result;
}

async function sort() {
  document.getElementById('winners').innerHTML = '<div class="loader"></div>'
	numberofmembers = document.getElementById('myRange').value;
	numberofmemberstobesorted = document.getElementById('myRange2').value;
	topic = document.getElementById('basic-url').value.split('_')[1].split('?')[0];
	url = `${apiurl}/getMembers?tid=${topic}`;

	data = await fetch(url);
  	data = await data.json();
	

	members = data.uids.slice(1, numberofmembers);
	winners = getRandom(members, numberofmemberstobesorted);

	generateHTML(winners);
}

async function generateHTML(winners) {
	html = '';
	count = 0;

	for (winner of winners) {
		count++;
		url = `${apiurl}/getMember?uid=${winner}`;
		data = await fetch(url);
    data =  await data.json();
		name = data.response[0].first_name + ' ' + data.response[0].last_name;
		avatar = data.response[0].photo_big;
		href = `https://vk.com/id${winner}`;

		html += `<div class="well well-lg">
			<img src="${avatar}" alt="" srcset="">
				<div class="name-position">
					<a href="${href}">${name}</a>
					<p>${count}º vencedor</p>
				</div>
			</div>  `;
	}

	document.getElementById('winners').innerHTML = html;
}
