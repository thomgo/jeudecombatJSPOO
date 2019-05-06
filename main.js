//Warrior object
function Warrior (name, attack, defense, health) {
  // Properties
  this.name = name;
  this.attack = attack;
  this.defense = defense;
  this.health = health;

  // Methodes
  this.fight = function(target) {
    boardHandler.displayMessage(this.name + " attaque " + target.name);
    target.health = target.health - this.attack;
    boardHandler.displayMessage(target.name + " a " + target.health + " de vie restante");
  };

}

//Wizard object
function Wizzard (name, attack, defense, health, mana) {
// Properties
  this.name = name;
  this.attack = attack;
  this.defense = defense;
  this.health = health;
  this.mana = mana;

  // Methodes
  this.fight = function(target) {
    boardHandler.displayMessage(this.name + " attaque " + target.name);
    target.health = target.health - this.attack;
    boardHandler.displayMessage(target.name + " a " + target.health + " de vie restante");
  };

  this.heal = function() {
    boardHandler.displayMessage(this.name + " essaie de se soigner ");
    if (this.mana > 10) {
      this.health += 10;
      this.mana -= 10;
      boardHandler.displayMessage(this.name + " a maintenant " + this.health + " de vie");
    }
    else {
      boardHandler.displayMessage("Not enough mana");
    }
  };
}

//Object to handle all visual aspects of the board game
function BoardHandler() {
  this.script = document.getElementById('battleScript');
  this.warriorSide = document.getElementById('warriorSide');
  this.warriorHTML = "<div class='w-25 text-center my-2'><img class='img-fluid' src='img/knight.svg' alt=''><p class='secondFont font-weight-bold'></p></div>";
  this.wizardSide = document.getElementById('wizardSide');
  this.wizardHTML = "<div class='w-25 text-center my-2'><img class='img-fluid' src='img/wizard.svg' alt=''><p class='secondFont font-weight-bold'></p></div>";

  // Show the Warrior picture and its image on the sreen
  this.showWarrior = function(warrior) {
    this.script.innerHTML += "<p>- Un nouveau guerrier apparaît...</p>"
    this.warriorSide.innerHTML += this.warriorHTML;
    this.warriorSide.lastChild.children[1].innerHTML = warrior.name
  };

  // Show the Wizard picture and its image on the sreen
  this.showWizard = function(wizard) {
    this.script.innerHTML += "<p>- Un nouveau magicien apparaît...</p>";
    this.wizardSide.innerHTML += this.wizardHTML;
    this.wizardSide.lastChild.children[1].innerHTML = wizard.name;
  };

  //Display a message on the game script on the left side
  this.displayMessage = function(message) {
    this.script.innerHTML += "<p>" + message + "</p>";
  };
}
var boardHandler = new BoardHandler();
var thor = new Warrior("Thor", 40, 50, 200);
boardHandler.showWarrior(thor);
var zeus = new Warrior("Zeus", 60, 30, 200);
boardHandler.showWarrior(zeus);
thor.fight(zeus);
zeus.fight(thor);

var Gandalf = new Wizzard("Gandalf", 30, 40, 250, 40);
boardHandler.showWizard(Gandalf);
thor.fight(Gandalf);
zeus.fight(Gandalf);
Gandalf.heal();
Gandalf.fight(thor);
