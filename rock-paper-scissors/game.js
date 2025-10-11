let humanScore = 0;
let computerScore = 0;
let round = 0;

function getComputerChoice() {
  let choiceNum = Math.floor(Math.random() * 3) + 1;
  if (choiceNum === 1) {
    return "Rock";
  } else if (choiceNum === 2) {
    return "Paper";
  } else if (choiceNum === 3) {
    return "Scissors";
  }
}

function getHumanChoice() {
  let choice = prompt("What's your choice?");
  return choice.toLowerCase();
}

function playRound(humanChoice, computerChoice) {
  switch (humanChoice) {
    case "rock": {
      if (computerChoice === "rock") console.log("Dogfall.");
      else if (computerChoice === "paper") {
        console.log("You lose, paper beats rock.");
        computerScore++;
      } else if (computerChoice === "scissors") {
        console.log("You win, rock beats scissors.");
        humanScore++;
      }
      break;
    }
    case "paper": {
      if (computerChoice === "rock") {
        console.log("You win, paper beats rock.");
        humanScore++;
      } else if (computerChoice === "paper") console.log("Dogfall.");
      else if (computerChoice === "scissors") {
        console.log("You lose, scissors beats paper.");
        computerScore++;
      }
      break;
    }
    case "scissors": {
      if (computerChoice === "rock") {
        console.log("You lose, rock beats scissors.");
        computerScore++;
      } else if (computerChoice === "paper") {
        console.log("You win, scissors beats paper.");
        humanScore++;
      } else if (computerChoice === "scissors") console.log("Dogfall.");
      break;
    }
    default:
      break;
  }
  console.log(
    "Human choice:" + humanChoice + " Computer choice:" + computerChoice
  );
}

for (round = 0; round < 5; round++) {
  console.log("Round " + (round + 1));
  playRound(getHumanChoice(), getComputerChoice().toLowerCase());
  console.log("Human score:" + humanScore + " Computer score:" + computerScore);
}

if (computerScore < humanScore) console.log("You win!");
else if (computerScore === humanScore) console.log("Dogfall");
else console.log("You lose.");
