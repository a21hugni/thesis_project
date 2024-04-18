// ==UserScript==
// @name         JS
// @namespace    http://tampermonkey.net/
// @version      2024-04-03
// @description  try to take over the world!
// @author       You
// @match        https://hugni.se/JS/index.php
// @icon         https://www.google.com/s2/favicons?sz=64&domain=hugni.se
// @require  https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

//Random seed
function jsf32(a, b, c, d) {
  a |= 0; b |= 0; c |= 0; d |= 0;
  var t = a - (b << 23 | b >>> 9) | 0;
  a = b ^ (c << 16 | c >>> 16) | 0;
  b = c + (d << 11 | d >>> 21) | 0;
  b = c + d | 0;
  c = d + t | 0;
  d = a + t | 0;
  return (d >>> 0) / 4294967296;
}

Math.random = function() {
    var ran=jsf32(0xF1EA5EED,Math.randSeed+6871,Math.randSeed+1889,Math.randSeed+56781);
    Math.randSeed+=Math.floor(ran*37237);
    return(ran)
}

Math.setSeed = function(seed){
    Math.randSeed=seed;
    for(var i=0;i<7;i++) Math.random();
}

var origRandom = Math.random;

(function() {
    'use strict';

    var iterations = GM_getValue('iterations', 0);
    var executionTimes = GM_getValue('executionTimes', []); // Retrieve execution times array
    var seed = GM_getValue('seed', 0); // Retrieve the seed

    function runLoop() {
        if (iterations < 11) {
            var startTime = performance.now(); // Record start time

            // Set the seed if it's not set already
            if (seed === 0) {
                seed = iterations; // Use iteration count as seed
                GM_setValue('seed', seed); // Save the seed
            }
            Math.setSeed(seed);

            // Seed-based random number generation
            Math.setSeed(iterations);

            // Array of countries
            var countries = ["USA", "Canada", "UK", "Australia", "Germany", "France", "Japan", "China", "Brazil", "India"];

            // Function to randomly select a country
            function selectRandomCountry() {
                var randomIndex = Math.floor(Math.random() * countries.length);
                return countries[randomIndex];
            }

            function selectRandomCountry2() {
                var randomIndex = Math.floor(Math.random() * countries.length);
                return countries[randomIndex];
            }

            // Function to generate a random date within a range using moment.js
            function getRandomDate(startDate, endDate) {
                return moment(startDate).add(Math.random() * (endDate - startDate), 'milliseconds').format('YYYY-MM-DD');
            }

            // Function to generate a random number between min (inclusive) and max (inclusive)
            function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            // Function to generate a random email address
            function generateRandomEmail() {
                var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
                var email = '';
                for (var i = 0; i < 10; i++) {
                    email += chars[Math.floor(Math.random() * chars.length)];
                }
                return email + '@example.com';
            }

            // Function to generate a random phone number
            function generateRandomPhoneNumber() {
                var phoneNumber = '';
                for (var i = 0; i < 10; i++) {
                    phoneNumber += Math.floor(Math.random() * 10); // Generate a random digit between 0 and 9
                }
                return phoneNumber;
            }

            var randomCountry = selectRandomCountry();
            console.log("Random Country:", randomCountry);

            var randomCountry2 = selectRandomCountry2();
            console.log("Random Country:", randomCountry2);

            // Define the range for the random date
            var startDate = moment(); // Today's date
            var endDate = moment().add(30, 'days'); // 30 days from today
            // Generate a random date within the specified range
            var randomDate = getRandomDate(startDate, endDate);
            console.log("Random Date:", randomDate);

            // Define the options for the passengers dropdown
            var passengersOptions = [1, 2, 3, 4, 5];
            // Randomly select one of the options
            var randomPassengers = passengersOptions[getRandomInt(0, passengersOptions.length - 1)];
            console.log("Random Passengers:", randomPassengers);

            document.getElementById('from').value = randomCountry;
            document.getElementById('to').value = randomCountry2;
            // Set the value of the date input field
            document.getElementById('date').value = randomDate;

            // Set the value of the passengers dropdown
            document.getElementById('passengers').value = randomPassengers.toString();

            document.getElementById('email').value = generateRandomEmail();
            console.log("Random Email:", document.getElementById('email').value);

            document.getElementById('countryCode').selectedIndex = getRandomInt(0, document.getElementById('countryCode').options.length - 1);

            document.getElementById('phone').value = generateRandomPhoneNumber();
            console.log("Random Phone Number:", document.getElementById('phone').value);

            document.getElementById('terms').checked = true;

            document.getElementById('submitButton').click();

            var endTime = performance.now(); // Record end time
            var executionTime = endTime - startTime; // Calculate execution time

            var iterationMessage = "Iteration " + iterations + ": "; // Message indicating the iteration
            var result = iterationMessage + executionTime.toFixed(2); // Combine iteration number and execution time
            executionTimes.push(result); // Store iteration number and execution time

            iterations++;
            GM_setValue('iterations', iterations);
            GM_setValue('executionTimes', executionTimes); // Store updated execution times array
            console.log(result);

            setTimeout(runLoop, 1000); // Call runLoop again after a delay
        } else {
            // All iterations completed, create JSON file and download
            var jsonContent = JSON.stringify(executionTimes); // Convert to JSON format
            var blob = new Blob([jsonContent], { type: 'application/json' });
            var url = URL.createObjectURL(blob, { type: 'application/json' });
            var a = document.createElement('a');
            a.href = url;
            a.download = 'execution_times.json';
            a.click();

            // Reset iterations and execution times for next run
            GM_setValue('iterations', 0);
            GM_setValue('executionTimes', []);

            return;
        }
    }

    //Start the loop
    runLoop();
})();