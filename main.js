// DOM references
const resultDisplay = document.querySelector("#resultDiv span");
const copyBtn = document.querySelector("#copy");
const passLength = document.querySelector("#passLength input");
const upperCase = document.querySelector("#upperCase");
const lowerCase = document.querySelector("#lowerCase");
const number = document.querySelector("#number");
const symbol = document.querySelector("#symbol");
const generateBtn = document.querySelector("#generate");
const messageBox = document.querySelector(".message");
const checkboxes = {
  upperCase: upperCase,
  lowerCase: lowerCase,
  number: number,
  symbol: symbol,
};

// Event Listeners
copyBtn.addEventListener("click", copyToClipboard);
generateBtn.addEventListener("click", generatePassword);

// Data
const dataTypes = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  number: "0123456789",
  symbol: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
};

const getType = [
  function upperCase() {
    return dataTypes.uppercase[
      Math.floor(Math.random() * dataTypes.uppercase.length)
    ];
  },
  function lowerCase() {
    return dataTypes.lowercase[
      Math.floor(Math.random() * dataTypes.lowercase.length)
    ];
  },
  function number() {
    return dataTypes.number[
      Math.floor(Math.random() * dataTypes.number.length)
    ];
  },
  function symbol() {
    return dataTypes.symbol[
      Math.floor(Math.random() * dataTypes.symbol.length)
    ];
  },
];

// Functions
function generatePassword() {
  if (
    !upperCase.checked &&
    !lowerCase.checked &&
    !number.checked &&
    !symbol.checked
  ) {
    return alert("Please select an option first");
  }
  const selectedLength = passLength.value;
  let generatedPassword = "";

  while (generatedPassword.length < selectedLength) {
    let typeToAdd = getType[Math.floor(Math.random() * getType.length)];
    let isChecked = checkboxes[typeToAdd.name].checked;
    if (isChecked) {
      generatedPassword += typeToAdd();
    }
  }

  resultDisplay.innerText = generatedPassword;
}

function copyToClipboard() {
  if (resultDisplay.length < 1) return console.log("No password to copy");
  const textArea = document.createElement("textarea");
  textArea.value = resultDisplay.textContent;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
  console.log("Copied to clipboard");

  messageBox.classList.add("show");
  setTimeout(() => {
    messageBox.classList.remove("show");
  }, 4000);
}
