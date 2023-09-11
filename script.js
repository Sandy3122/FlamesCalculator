function calculateFlames() {
    let yourName = document.getElementById("yourName").value.toLowerCase().replace(/\s/g, ''); // Remove spaces
    let partnerName = document.getElementById("partnerName").value.toLowerCase().replace(/\s/g, '');
    console.log(yourName);
    console.log(partnerName);


    if (yourName.trim() === "" || partnerName.trim() === "") {
        displayError("Error: Please enter both names.", "result-error");
        return;
    }

    if (yourName.length < 3 || yourName.length > 100 || partnerName.length < 3 || partnerName.length > 100) {
        displayError("Error: Names must be between 3 and 100 characters long.", "result-error");
        return;
    }

    if (yourName === partnerName) {
        displayError("Error: Names cannot be the same.", "result-error");
        return;
    }

    const commonCharacters = [];
    console.log("Comman :",commonCharacters)

    for (let i = 0; i < yourName.length; i++) {
        for (let j = 0; j < partnerName.length; j++) {
            if (yourName[i] === partnerName[j]) {
                commonCharacters.push(yourName[i]);
                yourName = yourName.replace(yourName[i], "");
                partnerName = partnerName.replace(partnerName[j], "");
                i--;
                break;
            }
        }
    }

    const totalCharacters = yourName.length + partnerName.length;
    console.log(`Total Characters: ${totalCharacters}`);

    const flamesLetters = ['F', 'L', 'A', 'M', 'E', 'S'];

    let currentIndex = 0;
    while (flamesLetters.length > 1) {
        currentIndex = (currentIndex + totalCharacters - 1) % flamesLetters.length;
        flamesLetters.splice(currentIndex, 1);
    }

    const flamesResult = {
        'F': 'Friendship',
        'L': 'Love',
        'A': 'Affection',
        'M': 'Marriage',
        'E': 'Enemies',
        'S': 'Sister (Sibling)'
    };

    const result = flamesResult[flamesLetters[0]];
    displayResult(result, "result-success");
}

const resultImages = {
    'Friendship': './images/Friends.png',
    'Love': './images/Love.png',
    'Affection': './images/Affection.png',
    'Marriage': './images/Marriage.png',
    'Enemies': './images/Enemy.png',
    'Sister (Sibling)': './images/Siblings.png'
};

function displayResult(message, resultClass) {
    const resultCard = document.getElementById("resultCard");
    const flamesResult = document.getElementById("flamesResult");
    const resultImage = document.getElementById("resultImage");
    let yourName1 = document.getElementById("yourName").value.toUpperCase();
    let partnerName1 = document.getElementById("partnerName").value.toUpperCase();

    resultCard.className = "result-card " + resultClass;
    
    if (resultClass === "result-success") {
        flamesResult.innerHTML = `
            <span style="font-size: 18px;">The relationship between</span>
            <span style="font-size: 22px;">${yourName1}</span>
            <span style="font-size: 18px;"> and </span>
            <span style="font-size: 22px;">${partnerName1}</span>
            <span style="font-size: 18px;"> will end in</span><br>
            <span style="font-size: 48px; font-style: "italic" font-weight: bold;">${message}!</span>
        `;
        
        document.getElementById("tryAgainButton").style.display = "none";
    } else {
        flamesResult.textContent = message;
        document.getElementById("tryAgainButton").style.display = "block";
    }

    if (resultImages.hasOwnProperty(message)) {
        resultImage.src = resultImages[message];
    } else {
        resultImage.src = './images/default.png';
    }

    resultCard.style.display = "block";
}

function clearResult() {
    document.getElementById("yourName").value = "";
    document.getElementById("partnerName").value = "";
    document.getElementById("resultCard").style.display = "none";
}

function displayError(errorMessage, resultClass) {
    const resultCard = document.getElementById("resultCard");
    const flamesResult = document.getElementById("flamesResult");
    const resultImage = document.getElementById("resultImage"); // Get the result image element

    resultCard.className = "result-card " + resultClass;
    flamesResult.textContent = errorMessage;
    document.getElementById("tryAgainButton").style.display = "block";
    resultCard.style.display = "block";

    // Set the image source to "Error.jpg"
    resultImage.src = './images/Error.png';
}
