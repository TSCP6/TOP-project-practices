const buttons = document.querySelector(".choice-buttons");
const roundNum = document.querySelector("#round");
const scores = document.querySelector("#score-info");
const choice = document.querySelector("#choices");
const result = document.querySelector("#results");
const finalInfo = document.querySelector("#final-result");

let humanScore = 0;
let computerScore = 0;
let round = 0;
let lastChoice;

function getComputerChoice() {
  let choiceNum = Math.floor(Math.random() * 3) + 1;
  if(choiceNum === lastChoice) getComputerChoice();
  lastChoice = choiceNum;
  if (choiceNum === 1) {
    return "rock";
  } else if (choiceNum === 2) {
    return "paper";
  } else if (choiceNum === 3) {
    return "scissors";
  }
}

function playRound(humanChoice, computerChoice) {
  round++;
  roundNum.textContent = "Round : " + round;
  choice.textContent =
    "Human choice:" + humanChoice + " Computer choice:" + computerChoice;
  switch (humanChoice) {
    case "rock": {
      if (computerChoice === "rock") result.textContent="Dogfall.";
      else if (computerChoice === "paper") {
        result.textContent="You lose, paper beats rock.";
        computerScore++;
      } else if (computerChoice === "scissors") {
        result.textContent="You win, rock beats scissors.";
        humanScore++;
      }
      break;
    }
    case "paper": {
      if (computerChoice === "rock") {
        result.textContent="You win, paper beats rock.";
        humanScore++;
      } else if (computerChoice === "paper") result.textContent="Dogfall.";
      else if (computerChoice === "scissors") {
        result.textContent="You lose, scissors beats paper.";
        computerScore++;
      }
      break;
    }
    case "scissors": {
      if (computerChoice === "rock") {
        result.textContent="You lose, rock beats scissors.";
        computerScore++;
      } else if (computerChoice === "paper") {
        result.textContent="You win, scissors beats paper.";
        humanScore++;
      } else if (computerChoice === "scissors") result.textContent="Dogfall.";
      break;
    }
    default:
      break;
  }
  scores.textContent =
    "Scores: Human: " + humanScore + " Computer: " + computerScore;
  if (computerScore === 5) {
    finalInfo.textContent="Computer Win!";
    cleanRound();
  }
  else if(humanScore === 5){
    finalInfo.textContent="Human Win!";
    cleanRound();
  }
}

function cleanRound(){
  round=0;
  humanScore=0;
  computerScore=0;
  finalInfo.textContent += "Round refresh after 3 seconds";
  setTimeout(() => {
    location.reload();
  }, 3000);
}

roundNum.textContent = "Round : " + round;
scores.textContent =
  "Scores: Human: " + humanScore + " Computer: " + computerScore;
buttons.addEventListener("click", (button) => {
  playRound(button.target.id, getComputerChoice());
});
