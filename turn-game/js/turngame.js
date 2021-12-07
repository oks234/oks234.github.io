var TurnGame = (function() {
	var instance;
	var initiate = function(heroName) {
		var hero = {
			name: heroName,
			lev: 1,
			maxHp: 100,
			hp: 100,
			xp: 0,
			att: 10
		};
		var monsters = [
			{
				name: '슬라임',
				hp: 25,
				att: 0,
				xp: 0,
				basicStats: {hp: 25, att: 10, xp: 10},
				levUpStats: {hp: 3, att: 1, xp: 1}
			},
			{
				name: '스켈레톤',
				hp: 0,
				att: 0,
				xp: 0,
				basicStats: {hp: 50, att: 15, xp: 20},
				levUpStats: {hp: 5, att: 2, xp: 2}
			},
			{
				name: '보스',
				hp: 0,
				att: 0,
				xp: 0,
				basicStats: {hp: 100, att: 25, xp: 50},
				levUpStats: {hp: 3, att: 1, xp: 1}
			}
		];
		var monster = null;
		var turn = true;
		var logCnt = 0;
		return {
			setBasicStyles: function() {
				document.body.style.width = window.innerWidth + 'px';
				document.body.style.height = window.innerHeight + 'px';
				if (!document.body.cssSetted) {
					document.body.cssSetted = true;
					window.onresize = this.setBasicStyles;
					document.getElementById('hero-stat').style.display = 'flex';
				}
				return this;
			},
			showLevel: function() {
				document.getElementById('hero-level').innerHTML = hero.lev + ' lev';
				return this;
			},
			showXP: function() {
				var self = this;
				if (hero.xp > 15 * hero.lev) {
					hero.xp -= 15 * hero.lev;
					hero.maxHp += 10;
					hero.att += hero.lev;
					hero.lev++;
					window.setTimeout(function() {
						self.setMessage('레벨업!', 'blue');
					}, 20);
				}
				document.getElementById('hero-xp').innerHTML = 'XP: ' + hero.xp + '/' + 15 * hero.lev;
				document.getElementById('hero-att').innerHTML = 'ATT: ' + hero.att;
				return this.showLevel().showHP();
			},
			showHP: function() {
				if (hero.hp < 0) {
					return this.gameOver();
				}
				document.getElementById('hero-hp').innerHTML = 'HP: ' + hero.hp + '/' + hero.maxHp;
				return this;
			},
			toggleMenu: function () {
				document.getElementById('hero-name').innerHTML = hero.name;
				document.getElementById('start-screen').style.display = 'none';
				if (document.getElementById('game-menu').style.display === 'block') {
					document.getElementById('game-menu').style.display = 'none';
					document.getElementById('battle-menu').style.display = 'block';
					document.getElementById('battle-input').focus();
				} else {
					document.getElementById('game-menu').style.display = 'block';
					document.getElementById('battle-menu').style.display = 'none';
					document.getElementById('menu-input').focus();
				}
				return this;
			},
			setMessage: function(msg, color) {
				var p, message, children, hiddenMessage;
				p = document.createElement('p');
				message = document.getElementById('message');
				children = message.children;
				hiddenMessage = document.getElementById('hidden-message');
				if (children.length === 10) {
					hiddenMessage.insertBefore(children.item(9).cloneNode(true), hiddenMessage.children[0]);
					message.removeChild(children.item(9));
					this.setHiddenMessage();
				}
				p.innerHTML = ++logCnt + '. ' + msg;
				p.style.color = color ? color : 'black';
				message.insertBefore(p, children[0]);
				return this;
			},
			setHiddenMessage: function() {
				var hiddenMessage, children, i, length, opacity;
				hiddenMessage = document.getElementById('hidden-message');
				children = hiddenMessage.children;
				length = children.length;
				for (i = 0; i < length; i++) {

					if (i < 10) {
						opacity = (0.8 - 0.1 * i).toFixed(1);
					} else {
						opacity = 0;
					}
					children[i].style.opacity = opacity;
				}
			},
			levUpMonster: function() {
				monster = monsters[Math.floor(Math.random() * monsters.length)];
				for (stat in monster) {
					if (stat !== 'name' && stat !== 'levUpStats' && stat !== 'basicStats') {
						monster[stat] = monster.basicStats[stat] + monster.levUpStats[stat] * hero.lev;
					}
				}
				return this.generateMonster();
			},
			generateMonster: function() {
				document.getElementById('monster-name').innerHTML = monster.name;
				document.getElementById('monster-hp').innerHTML = 'HP: ' + monster.hp;
				document.getElementById('monster-att').innerHTML = 'ATT: ' + monster.att;
				this.setMessage(monster.name + '이(가) 공격해옵니다');
				return this.toggleMenu();
			},
			menuInput: function(input) {
				if (input === '1') {
					return this.levUpMonster();
				} else if (input === '2') {
					hero.hp = hero.maxHp;
					return this.showHP().setMessage('체력을 회복했습니다');
				} else if (input === '3') {
					return this.exit();
				} else {
					alert('잘못된 입력');
				}
			},
			battleInput: function (input) {
				if (input === '1') {
					return this.attackMonster();
				} else if (input === '2') {
					if (hero.hp + hero.lev * 20 < hero.maxHp) {
						hero.hp += hero.lev * 20;
					} else {
						hero.hp = hero.maxHp;
					}
					return this.showHP().setMessage('체력을 회복했습니다', 'blue').nextTurn();
				} else if (input === '3') {
					return this.clearMonster().setMessage('도망쳤습니다');
				} else {
					alert('잘못된 입력');
				}
			},
			attackMonster: function () {
				monster.hp -= hero.att;
				document.getElementById('monster-hp').innerHTML = 'HP: ' + monster.hp;
				if (monster.hp > 0) {
					return this.setMessage(hero.att + '의 데미지를 입혔습니다.', 'blue').nextTurn();
				}
				return this.win();
			},
			attackHero: function () {
				hero.hp -= monster.att;
				return this.showHP();
			},
			nextTurn: function () {
				var self = this;
				turn = !turn;
				document.getElementById('battle-input').disabled = true;
				if (!turn) {
					window.setTimeout(function () {
						self.setMessage(monster.name + '의 턴입니다');
						window.setTimeout(function () {
							if (self.attackHero()) {
								self.setMessage(monster.att + '의 데미지를 입었습니다', 'red');
								window.setTimeout(function () {
									document.getElementById('battle-input').disabled = false;
									self.setMessage(hero.name + '의 턴입니다');
								}, 20);
							}
						}, 20);
					}, 20);
					return this.nextTurn();
				}
				return this;
			},
			win: function () {
				this.setMessage(monster.name + ' 사냥에 성공해 경험치 ' + monster.xp + '을 얻었습니다', 'blue');
				hero.xp += monster.xp;
				return this.clearMonster().showXP();
			},
			clearMonster: function () {
				monster = null;
				document.getElementById('monster-name').innerHTML = '';
				document.getElementById('monster-hp').innerHTML = '';
				document.getElementById('monster-att').innerHTML = '';
				return this.toggleMenu();
			},
			gameOver: function () {
				document.getElementById('screen').innerHTML = hero.name + '은 레벨 ' + hero.lev + '에서 죽었습니다. 새로 시작하려면 새로고침하세요';
				return false;
			},
			exit: function() {
				document.getElementById('screen').innerHTML = '이용해주셔서 감사합니다. 새로 시작하려면 새로고침하세요';
			}
		}
	}
	return {
		getInstance: function(name) {
			if (!instance) {
				instance = new initiate(name);
			}
			return instance;
		}
	};
})();

document.getElementById('start-screen').onsubmit = function(e) {
	var name = document.getElementById('name-input').value;
	e.preventDefault();
	if (name && name.trim() && confirm(name + '으로 하시겠습니까?')) {
		TurnGame.getInstance(name).setBasicStyles().showXP().toggleMenu(); // 메소드 체이닝
	} else {
		alert('이름을 입력하세요!');
	}
}
document.getElementById('game-menu').onsubmit = function(e) {
	var input = document.getElementById('menu-input');
	var option = input.value;
	e.preventDefault();
	input.value = '';
	TurnGame.getInstance().menuInput(option);
};
document.getElementById('battle-menu').onsubmit = function(e) {
	var input = document.getElementById('battle-input');
	var option = input.value;
	e.preventDefault();
	input.value = '';
	TurnGame.getInstance().battleInput(option);
};

(function setStyles() {
	document.body.style.boxSizing = 'border-box';
	document.body.style.padding = '20px';
	document.body.style.overflow = 'hidden';

	var heroStat = document.getElementById('hero-stat');
	var heroStatSpans = heroStat.getElementsByTagName('span');
	heroStat.style.display = 'none';
	Array.prototype.forEach.call(heroStatSpans, function(el){
		el.style.margin = '0 .4em .4em';
		el.style.padding = '.2em .4em';
		el.style.boxShadow = '0 0 .2em .1em rgba(0, 0, 0, 0.2)'
	});
})();
