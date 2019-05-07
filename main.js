//Warrior object
function Warrior (name, attack, defense, health) {
  // Properties
  this.name = name;
  this.attack = attack;
  this.defense = defense;
  this.health = health;
  this.boardPosition = null;

  // Methodes
  this.fight = function(target) {
    boardHandler.displayMessage(this.name + " attaque " + target.name);
    target.health = target.health - this.attack;
    boardHandler.updateLife(target)
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
  this.boardPosition = null;

  // Methodes
  this.fight = function(target) {
    boardHandler.displayMessage(this.name + " attaque " + target.name);
    target.health = target.health - this.attack;
    boardHandler.updateLife(target)
    boardHandler.displayMessage(target.name + " a " + target.health + " de vie restante");
  };

  this.heal = function() {
    boardHandler.displayMessage(this.name + " essaie de se soigner ");
    if (this.mana > 10) {
      this.health += 10;
      this.mana -= 10;
      boardHandler.updateLife(this)
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
  this.warriorHTML = "<div class='w-25 text-center my-2 character'><img class='img-fluid' src='img/knight.svg' alt=''><div class='secondFont font-weight-bold'></div><div class='secondFont font-weight-bold'></div></div>";
  this.wizardSide = document.getElementById('wizardSide');
  this.wizardHTML = "<div class='w-25 text-center my-2 character'><img class='img-fluid' src='img/wizard.svg' alt=''><div class='secondFont font-weight-bold'></div><div class='secondFont font-weight-bold'></div></div>";

  // Show the Warrior picture and its image on the sreen
  this.showWarrior = function(warrior) {
    this.script.innerHTML += "<p>- Un nouveau guerrier apparaît...</p>";
    this.warriorSide.innerHTML += this.warriorHTML;
    warrior.boardPosition = this.warriorSide.children.length - 1;
    this.warriorSide.lastChild.children[1].innerHTML = warrior.name;
    this.warriorSide.lastChild.children[2].innerHTML = warrior.health;
  };

  // Show the Wizard picture and its image on the sreen
  this.showWizard = function(wizard) {
    this.script.innerHTML += "<p>- Un nouveau magicien apparaît...</p>";
    this.wizardSide.innerHTML += this.wizardHTML;
    wizard.boardPosition = this.wizardSide.children.length - 1;
    this.wizardSide.lastChild.children[1].innerHTML = wizard.name;
    this.wizardSide.lastChild.children[2].innerHTML = wizard.health;
  };

  this.updateLife = function(target) {
    if (target.constructor.name == "Warrior" ) {
      this.warriorSide.children[target.boardPosition].children[2].innerHTML = target.health;
    }
    else {
      this.wizardSide.children[target.boardPosition].children[2].innerHTML = target.health;
    }
  };

  this.updateScroll = function(){
    this.script.scrollTop = this.script.scrollHeight;
  }

  //Display a message on the game script on the left side
  this.displayMessage = function(message) {
    this.script.innerHTML += "<p>- " + message + "</p>";
    this.updateScroll();
  };
}
var boardHandler = new BoardHandler();
var aragorn = new Warrior("Aragorn", 40, 50, 200);
var gimli = new Warrior("Gimli", 60, 30, 200);
var Gandalf = new Wizzard("Gandalf", 30, 40, 250, 40);

//Script to launch a sample game in a precise order
//In a real game, actions would commanded by events and user actions
//This code is only for demo purpose
setTimeout(function(){
  boardHandler.showWarrior(aragorn);
  setTimeout(function(){
    boardHandler.showWarrior(gimli);
    setTimeout(function(){
      boardHandler.showWizard(Gandalf);
      setTimeout(function(){
        aragorn.fight(gimli);
        setTimeout(function(){
          gimli.fight(aragorn);
          setTimeout(function(){
            aragorn.fight(Gandalf);
            setTimeout(function(){
              gimli.fight(Gandalf);
              setTimeout(function(){
                Gandalf.heal();
                setTimeout(function(){
                  Gandalf.fight(aragorn);
                }, 2000);
              }, 2000);
            }, 2000);
          }, 2000);
        }, 2000);
      }, 2000);
    }, 2000);
  }, 2000);
}, 2000);
