/////////////////////////////////////////////////////////////////////////////
// Global variables
/////////////////////////////////////////////////////////////////////////////

// If this is set to true, we'll output debugging messages
var mDebug = false;

// The possible vowels
var mVowels = ['A','E','I','O','U', 'Y'];

// The advanced vowel combinations
var mAdvancedVowels = {

};

// The possible consonants
var mConsonants = ['B','C','D','F','G','H','J','K','L','M','N',
                   'P','Q','R','S','T','V','W','X','Y','Z'];

// The advanced consonant combinations
var mAdvancedConsonants = ['KC', 'SH'];

/////////////////////////////////////////////////////////////////////////////
// Functions
/////////////////////////////////////////////////////////////////////////////

// This function should only be called once on load. Populates the letter toggles
function PopulateLetterToggles(){
    // Populate the vowels
    PopulateVowels();

    // Populate the consonants
    PopulateConsonants();

    // Populate the advanced consonants
    PopulateAdvancedConsonants();
}

// This function populates the consonants
function PopulateConsonants(){
    // Get that consonants container element
    var consonantsContainer = $('#consonants_container_0');

    // Variable to count sub-containers
    var containerCount = 1;

    // Empty it
    consonantsContainer.empty();

    // Now iterate through each possible consonant, adding it to the element
    for (var i=0; i<mConsonants.length; i++){
        // Check if we've already displayed 7
        if ((i != 0) && (i % 7 == 0)){
            // Build an id for the new container
            var newId = "consonants_countainer_" + containerCount;
            
            // Create a new container
            var newContainerStr =
                "<br/><br/><div id='" + newId +
                "' class='btn-group' data-toggle='buttons'></div>";

            // Append it to the parent
            consonantsContainer.after(newContainerStr);

            // Increment our counter
            containerCount++;

            // Select the new one to append to
            consonantsContainer = $("#" + newId);
        }

        // Append this one to it's container
        AppendToggleToContainer(mConsonants[i], consonantsContainer);
    }
}

// This function populates the advanced consonants
function PopulateAdvancedConsonants(){
    // Get that consonants container element
    var advancedConsonantsContainer = $('#advanced_consonants_container_0');

    // Variable to count sub-containers
    var containerCount = 1;

    // Empty it
    advancedConsonantsContainer.empty();

    // Now iterate through each possible consonant, adding it to the element
    for (var i=0; i<mAdvancedConsonants.length; i++){
        // Check if we've already displayed 7
        if ((i != 0) && (i % 7 == 0)){
            // Build an id for the new container
            var newId = "advanced_consonants_countainer_" + containerCount;
            
            // Create a new container
            var newContainerStr =
                "<br/><br/><div id='" + newId +
                "' class='btn-group' data-toggle='buttons'></div>";

            // Append it to the parent
            advancedConsonantsContainer.after(newContainerStr);

            // Increment our counter
            containerCount++;

            // Select the new one to append to
            advancedConsonantsContainer = $("#" + newId);
        }

        // Append this one to it's container
        AppendToggleToContainer(mAdvancedConsonants[i], advancedConsonantsContainer);
    }
}

// This function populates the consonants
function PopulateVowels(){
    // Get that vowels container element
    var vowelsContainer = $('#vowels_container');

    // Empty it
    vowelsContainer.empty();

    // Now iterate through each possible vowel, adding it to the element
    for (var i=0; i<mVowels.length; i++){
        // Append this one to it's container
        AppendToggleToContainer(mVowels[i], vowelsContainer);
    }
}

function AppendToggleToContainer(letter, container){
    // Build the string for this letter
    var newElementStr =
        '<label id="' + letter + '" class="letter-toggle btn btn-primary">' +
        '<input type="checkbox"> ' + letter +
        '</label>';

    if (mDebug){
        console.log("About to append the following: " + newElementStr);
    }

    // Append it to the container
    container.append(newElementStr);
}    

// This function selects random toggles that are displayed
function SelectRandomToggles(){
    // Start by turning on a majority of the vowels
    var vowelToggles = $('#vowels_container .letter-toggle');

    // Toggle 80% of them
    TogglePercentageOfToggles(0.85, vowelToggles);

    // Grab all of the items with class letter-toggle
    var consonantToggles = $('#consonants_outer_container .letter-toggle');

    // Toggle 20% of them
    TogglePercentageOfToggles(0.20, consonantToggles);
}

// Helper function for toggling randomly
function TogglePercentageOfToggles(chance, toggles){
   // Iterate through each one, toggling randomly
    toggles.each(function(){
        // Generate a random number
        if(Math.random() > (1 - chance)){
            if ($(this).hasClass('active')){
                // De-toggle
                $(this).removeClass('active');
            }else{
                // Toggle it
                $(this).addClass('active');
            }
        }
    });
}

// This function actually generates a word
function GenerateWord(){
    // Grab all of the active vowel toggles
    var activeVowelToggles = $('#vowels_container .letter-toggle.active');

    // Grab all of the active consonant toggles
    var activeConsonantToggles = $('#consonants_outer_container .letter-toggle.active');

    // Grab all of the active advanced consonant toggles
    var activeAdvancedConsonantToggles = $('#advanced_consonants_outer_container .letter-toggle.active');

    // Get the id's for each one and build an array
    var activeVowels = [];
    activeVowelToggles.each(function(){
        activeVowels.push($(this).attr('id'));
    });

    // Do the same for the consonants
    var activeConsonants = [];
    activeConsonantToggles.each(function(){
        activeConsonants.push($(this).attr('id'));
    });

    // Append the advanced to the consonants as well
    activeAdvancedConsonantToggles.each(function(){
        activeConsonants.push($(this).attr('id'));
    });

    // Get the length from the slider
    var length = $("#length_slider").val();

    // Let's print it out
    if (mDebug){
        console.log("temere.js -- GenerateWord():: Active vowels = " + activeVowels);
        console.log("temere.js -- GenerateWord():: Active consonants = " + activeConsonants);
        console.log("temere.js -- GenerateWord():: Length = " + length);
    }

    // Now it's necessary to actually build a word up.
    var word = "";
    if (activeConsonants.length > 0 && activeVowels.length > 0){
        word = BuildWord(activeVowels, activeConsonants, length);
    }else{
        word = ":(";
    }

    // Finally, populate it in the field
    $('#generated_word').text(word);
}

// This function does the actual work of building a word, provided with
// the selected vowels and consonants
function BuildWord(vowels, consonants, length){
    // Debug message
    if (mDebug){
        console.log("Building " + length + " letter word with " +
                    vowels + " as the vowels and " +
                    consonants + " as the consonants");
    }

    // Boolean to flop between consonant and vowel
    var vowelsTurn = false;

    // The word to be built
    var builtWord = "";

    // The current letter
    var curLetter = '';

    // Begin going through each digit
    for (var i=0; i<length; i++){
        if (vowelsTurn){
            // Choose a vowel at random
            curLetter = vowels[Math.floor(Math.random() * vowels.length)];
        }else{
            curLetter = consonants[Math.floor(Math.random() * consonants.length)];

            if(curLetter.length == 2 && length-i == 1){
                // Just use the first letter of it
                curLetter = curLetter.substring(1, 1);
            }
        }

        // Add the current letter to the word
        builtWord += curLetter;

        // Flop the boolean
        vowelsTurn = !vowelsTurn;
    }

    // Return the built word
    return builtWord;
}

// A function to clear the vowel selections
function ClearVowels(){
    // Grab all of the active vowel toggles
    var vowelToggles = $('#vowels_container .letter-toggle');

    // Deactivate them
    DeactivateTheseToggles(vowelToggles);
}

// A function to clear the consonant selections
function ClearConsonants(){
    // Grab all of the active consonant toggles
    var consonantToggles = $('#consonants_outer_container .letter-toggle');

    // Deactivate them
    DeactivateTheseToggles(consonantToggles);
}

// A function to clear the consonant selections
function ClearAdvancedConsonants(){
    // Grab all of the active consonant toggles
    var advancedConsonantToggles = $('#advanced_consonants_outer_container .letter-toggle');

    // Deactivate them
    DeactivateTheseToggles(advancedConsonantToggles);
}

// A function to de-activate the provided elements
function DeactivateTheseToggles(toggles){
    toggles.each(function(){
        $(this).removeClass('active');
    });
}

// A function to activate all the vowel selections
function AllVowels(){
    // Grab all of the active vowel toggles
    var vowelToggles = $('#vowels_container .letter-toggle');

    // Activate them
    ActivateTheseToggles(vowelToggles);
}

// A function to activate all the consonant selections
function AllConsonants(){
    // Grab all of the active consonant toggles
    var consonantToggles = $('#consonants_outer_container .letter-toggle');

    // Activate them
    ActivateTheseToggles(consonantToggles);
}

// A function to activate all the consonant selections
function AllAdvancedConsonants(){
    // Grab all of the active consonant toggles
    var advancedConsonantToggles = $('#advanced_consonants_outer_container .letter-toggle');

    // Activate them
    ActivateTheseToggles(advancedConsonantToggles);
}

// A function to de-activate the provided elements
function ActivateTheseToggles(toggles){
    toggles.each(function(){
        $(this).addClass('active');
    });
}

// A function to choose a random length
function SelectRandomLength(){
    // Generate a value
    var value = Math.floor(Math.random() * 7 + 3);
    
    // Set the slider value
    $('#length_slider').slider('setValue', value);
    $('#length_slider').val(value);
}

/////////////////////////////////////////////////////////////////////////////
// Execution Start
/////////////////////////////////////////////////////////////////////////////

// Once the document is ready, bind all of the functions.
$(function(){
    // Build the slider
    $("#length_slider").slider();

    // Start by populating the letters
    PopulateLetterToggles();
    
    // Select a few of each toggle at random
    SelectRandomToggles();

    // Generate a word
    GenerateWord();

    // Bind the click event
    $('#generate_btn').bind('click', function(){
        // Generate a word!
        GenerateWord();
    });

    // Bind click event for the clear buttons
    $('#clear_vowels').bind('click', function(){
        ClearVowels();
    });
    $('#clear_consonants').bind('click', function(){
        ClearConsonants();
    });
    $('#clear_advanced_consonants').bind('click', function(){
        ClearAdvancedConsonants();
    });

    // Bind click event for the all buttons
    $('#all_vowels').bind('click', function(){
        AllVowels();
    });
    $('#all_consonants').bind('click', function(){
        AllConsonants();
    });
    $('#all_advanced_consonants').bind('click', function(){
        AllAdvancedConsonants();
    });

    // Bind the click event for randomizing
    $('#random_btn').bind('click', function(){
        SelectRandomToggles();
        SelectRandomLength();
        GenerateWord();
    });

    // All done!
});
