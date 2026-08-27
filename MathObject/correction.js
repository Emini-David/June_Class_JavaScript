let pin = document.getElementById("pin");
let network = document.getElementById("network");
let amount = document.getElementById("amount");
let display = document.getElementById("tableBody")
let cards = []

function generatePin() {
    let randomNumber = Math.trunc(Math.random() * 100000000000000);
    pin.value = randomNumber
    // console.log(randomNumber);
    
}

function savePin() {
    let code;
    if (network.value === "MTN") {
        code = "*555*"
    }else if(network.value === "Glo"){
        code = "*126*"
    }else if(network.value === "Airtel"){
        code = "*123*"
    }else if(network.value === "9Mobile"){
        code = "*999*"
    }

    let rechargeCard = {
        network: network.value,
        amount: amount.value,
        pin: pin.value,
        code: code + pin.value + "#",
        status: "Unused",
        dateCreated: new Date().toLocaleDateString(),
        dateUsed: ""

    }
    cards.push(rechargeCard)
    // console.log(rechargeCard);
    displayCard();
    
}


const displayCard = ()=>{
    display.innerHTML = ""
    cards.forEach((card, index) => {
        display.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${card.network}</td>
                <td>${card.amount}</td>
                <td>${card.pin}</td>
                <td>${card.code}</td>
                <td>${card.status}</td>
                <td>${card.dateCreated}</td>
                <td>${card.dateUsed}</td>
                <td><button>Delete</button></td>
                
            </tr>
        
        
        `
    });
}