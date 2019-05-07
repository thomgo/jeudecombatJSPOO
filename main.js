//For this correction do not focus on the board handler object
//It only aims to display information on the screen but was not necessary for this exercise
//The core concepts you need to learn are in the warrior and wizard objects
//Later in your trainning, you will see that this code can be widely be improved

/////////////// Warrior object ////////////////////////
function Warrior (name, attack, defense, health) {
  // Properties
  this.name = name;
  this.attack = attack;
  this.defense = defense;
  this.health = health;
  this.boardPosition = null;

  // Methodes

  //Methode to reduce the life of the attacked character
  this.fight = function(target) {
    boardHandler.displayMessage(this.name + " attaque " + target.name);
    //The targeted character's life is updated in the object
    target.health = target.health - this.attack;
    ////The targeted character's life is updated on the screen
    boardHandler.updateLife(target)
    boardHandler.displayMessage(target.name + " a " + target.health + " de vie restante");
  };
}

///////////////////// Wizard object ///////////////////////
function Wizzard (name, attack, defense, health, mana) {
// Properties
  this.name = name;
  this.attack = attack;
  this.defense = defense;
  this.health = health;
  this.mana = mana;
  this.boardPosition = null;

  // Methodes

  //Same methode as in Warrior object, we repeat code here
  //DRY principle is broken, later you will learn about inheritance
  this.fight = function(target) {
    boardHandler.displayMessage(this.name + " attaque " + target.name);
    target.health = target.health - this.attack;
    boardHandler.updateLife(target)
    boardHandler.displayMessage(target.name + " a " + target.health + " de vie restante");
  };

  //Methode to increase the life of the character using it
  this.heal = function() {
    boardHandler.displayMessage(this.name + " essaie de se soigner ");
    //We check that the character has enough power to heal himself
    if (this.mana > 10) {
      //If so, we update both health and mana properties in the object
      this.health += 10;
      this.mana -= 10;
      //We update life on the screen
      boardHandler.updateLife(this)
      boardHandler.displayMessage(this.name + " a maintenant " + this.health + " de vie");
    }
    else {
      boardHandler.displayMessage("Not enough mana");
    }
  };
}

/////////////////////// boardHandler object ////////////////////
//Object to handle all visual aspects of the board game
function BoardHandler() {
  //Properties
  //Aside where messages are displayed
  this.script = document.getElementById('battleScript');
  //Left part of the board for warriors
  this.warriorSide = document.getElementById('warriorSide');
  //Right part of the board for wizards
  this.wizardSide = document.getElementById('wizardSide');
  //Base HTLM to display a warrior or a wizard
  this.html = "<div class='w-25 text-center my-2 character'><img class='img-fluid' src='' alt=''><div class='secondFont font-weight-bold'></div><div class='secondFont font-weight-bold'></div></div>";

  //Methodes
  //Display a character on the screen
  this.show = function(target) {
    //Check if we deal with a warrior or a wizard
    //And get the right side of the board and image to display
    if (target.constructor.name == "Warrior" ) {
      side = this.warriorSide;
      src = "img/knight.svg";
    }
    else {
      side = this.wizardSide;
      src = "img/wizard.svg";
    }
    this.displayMessage("Un nouveau combattant apparaît...");
    //Add the base HTML bloc that recieves the character
    side.innerHTML += this.html;
    //Store the position of the character on the board side
    target.boardPosition = side.children.length - 1;
    //Show image, name and life of the object on the board
    side.lastChild.children[0].src = src;
    side.lastChild.children[1].innerHTML = target.name;
    side.lastChild.children[2].innerHTML = target.health;
  }

  // Change a character's life on the board
  this.updateLife = function(target) {
    //Check if we deal with a warrior or a wizard
    if (target.constructor.name == "Warrior" ) {
      this.warriorSide.children[target.boardPosition].children[2].innerHTML = target.health;
    }
    else {
      this.wizardSide.children[target.boardPosition].children[2].innerHTML = target.health;
    }
  };

  // make sure the game script with messages is always scrolled at bottom
  this.updateScroll = function(){
    this.script.scrollTop = this.script.scrollHeight;
  }

  //Display a message on the game script on the left side
  this.displayMessage = function(message) {
    this.script.innerHTML += "<p class='bg-dark text-success p-1 font-weight-bold rounded'>" + message + "</p>";
    this.updateScroll();
  };
}

///////////////////// Random script running /////////////////////
var boardHandler = new BoardHandler();
var aragorn = new Warrior("Aragorn", 40, 50, 200);
var gimli = new Warrior("Gimli", 60, 30, 200);
var Gandalf = new Wizzard("Gandalf", 30, 40, 250, 40);

//Script to launch a sample game in a precise order
//In a real game, actions would be commanded by events and user actions
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
