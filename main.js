function Warrior (name, attack, defense, health) {
  // Properties
  this.name = name;
  this.attack = attack;
  this.defense = defense;
  this.health = health;
  this.script = document.getElementById('battleScript');
  this.warriorSide = document.getElementById('warriorSide');
  this.warriorHTML = "<div class='w-25 text-center my-2'><img class='img-fluid' src='img/knight.svg' alt=''><p class='secondFont font-weight-bold'></p></div>"

  // Methodes
  this.fight = function(warrior) {
    this.script.innerHTML += "<p>- " + this.name + " attaque " + warrior.name + "</p>";
    warrior.health = warrior.health - this.attack;
    this.script.innerHTML += "<p>- " +warrior.name + " a " + warrior.health + " de vie restante" + "</p>";
  };
  // Show the Warrior picture and its image on the sreen
  this.show = function() {
    this.script.innerHTML += "<p>- Un nouveau guerrier apparaît...</p>"
    this.warriorSide.innerHTML += this.warriorHTML;
    this.warriorSide.lastChild.children[1].innerHTML = this.name
  };
}

function Wizzard (name, attack, defense, health, mana) {
// Properties
  this.name = name;
  this.attack = attack;
  this.defense = defense;
  this.health = health;
  this.mana = mana;
  this.script = document.getElementById('battleScript');
  this.wizardSide = document.getElementById('wizardSide');
  this.wizardHTML = "<div class='w-25 text-center my-2'><img class='img-fluid' src='img/wizard.svg' alt=''><p class='secondFont font-weight-bold'></p></div>"

  // Methodes
  this.fight = function(warrior) {
    this.script.innerHTML += "<p>- " + this.name + " attaque " + warrior.name + "</p>";
    warrior.health = warrior.health - this.attack;
    this.script.innerHTML += "<p>- " +warrior.name + " a " + warrior.health + " de vie restante" + "</p>";
  };

  this.heal = function() {
    this.script.innerHTMl += "<p>- " + this.name + " essaie de se soigner " + "</p>";
    if (this.mana > 10) {
      this.health += 10;
      this.mana -= 10;
      this.script.innerHTMl += "<p>- " + this.name + " a maintenant " + this.health + "</p>";
    }
    else {
      this.script.innerHTMl += "<p>- Not enough mana</p>";
    }
  };

  // Show the Wizard picture and its image on the sreen
  this.show = function() {
    this.script.innerHTML += "<p>- Un nouveau magicien apparaît...</p>"
    this.wizardSide.innerHTML += this.wizardHTML;
    this.wizardSide.lastChild.children[1].innerHTML = this.name
  };
}

var thor = new Warrior("Thor", 40, 50, 200);
thor.show();
var zeus = new Warrior("Zeus", 60, 30, 200);
zeus.show();
thor.fight(zeus);
zeus.fight(thor);

var Gandalf = new Wizzard("Gandalf", 30, 40, 250, 40);
Gandalf.show();
thor.fight(Gandalf);
zeus.fight(Gandalf);
Gandalf.heal();
Gandalf.fight(thor);
