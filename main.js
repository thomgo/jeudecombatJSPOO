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
  this.wizardSide = document.getElementById('wizardSide');
  this.html = "<div class='w-25 text-center my-2 character'><img class='img-fluid' src='' alt=''><div class='secondFont font-weight-bold'></div><div class='secondFont font-weight-bold'></div></div>";

  this.show = function(target) {
    if (target.constructor.name == "Warrior" ) {
      side = this.warriorSide;
      src = "img/knight.svg";
    }
    else {
      side = this.wizardSide;
      src = "img/wizard.svg";
    }
    this.displayMessage("Un nouveau combattant apparaît...");
    side.innerHTML += this.html;
    target.boardPosition = side.children.length - 1;
    side.lastChild.children[0].src = src;
    side.lastChild.children[1].innerHTML = target.name;
    side.lastChild.children[2].innerHTML = target.health;
  }

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
    this.script.innerHTML += "<p class='bg-dark text-success p-1 font-weight-bold rounded'>" + message + "</p>";
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
  boardHandler.show(aragorn);
  setTimeout(function(){
    boardHandler.show(gimli);
    setTimeout(function(){
      boardHandler.show(Gandalf);
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
                }, 3000);
              }, 3000);
            }, 3000);
          }, 3000);
        }, 3000);
      }, 3000);
    }, 3000);
  }, 3000);
}, 3000);
