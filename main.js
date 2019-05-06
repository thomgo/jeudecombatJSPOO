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
    alert(this.name + " attacks " + warrior.name);
    warrior.health = warrior.health - this.attack;
    alert(warrior.name + " has " + warrior.health + " life left");
  };
  // Show the Warrior picture and its image on the sreen
  this.show = function() {
    this.script.innerHTML += "<p>- Un nouveau guerrier apparaît...</p>"
    this.warriorSide.innerHTML += this.warriorHTML;
    this.warriorSide.lastChild.children[1].innerHTML = this.name
  };
}

var thor = new Warrior("Thor", 40, 50, 200);
thor.show();
//var zeus = new Warrior("Zeus", 60, 30, 200);

// thor.fight(zeus);
// zeus.fight(thor);

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
    alert(this.name + " attacks " + warrior.name);
    warrior.health = warrior.health - this.attack;
    alert(warrior.name + " has " + warrior.health + " life left");
  };
  this.heal = function() {
    if (this.mana > 10) {
      alert(this.name + " try to heal himself ");
      this.health += 10;
      this.mana -= 10;
      alert(this.name + " has now " + this.health);
    }
    else {
      alert("Not enough mana");
    }
  };

  // Show the Wizard picture and its image on the sreen
  this.show = function() {
    this.script.innerHTML += "<p>- Un nouveau magicien apparaît...</p>"
    this.wizardSide.innerHTML += this.wizardHTML;
    this.wizardSide.lastChild.children[1].innerHTML = this.name
  };
}

var Gandalf = new Wizzard("Gandalf", 30, 40, 250, 40);
Gandalf.show();

// thor.fight(Gandalf);
// zeus.fight(Gandalf);
// Gandalf.heal();
// Gandalf.fight(thor);
