let btnEl = document.getElementById("btn");
let firstInput = document.getElementById("firstNumber")
let secondInput = document.getElementById("secondNumber")
let result = ""
btnEl.addEventListener("click", () => {
    let first = Number(firstInput.value);
    let second = Number(secondInput.value);

    for (let x = first; x <= second; x++) {
       
        for (let y = 1; y <= 12; y++) {
           result += `${x} * ${y} = ${x * y}<br>`;
            // console.log(`${x} * ${y} = ${x * y}`);


            
        }
        
    }
    document.getElementById("output").innerHTML = result;
})


//do while loop
    let a = 3
    // do {
    //     console.log("hello");
    //     a++

        
    // } while (5 >= a);

//while loop
// while (6 > a) {
//     console.log("great");
//     a++
    
// }

// while (6 > a) {
    
//     if (a == 4) {
//         break;
//     }

//     console.log(a);
//     a++
    
// }


for (let i = 0; i < 3; i++) {
    if (i == 1) {
        continue;
    }

    console.log(i);
    
    
}





// // Select the elements
// let firstInput = document.getElementById("firstNumber");
// let secondInput = document.getElementById("secondNumber");
// let button = document.getElementById("btn");
// let output = document.getElementById("output");

// // Add click event
// button.addEventListener("click", function () {

//     // Get the input values
//     let number = Number(firstInput.value);
//     let limit = Number(secondInput.value);

//     // Clear previous result
//     output.innerHTML = "";

//     // Generate multiplication table
//     for (let i = 1; i <= limit; i++) {

//         output.innerHTML += `
//             <p>${number} x ${i} = ${number * i}</p>
//         `;

//     }

// });