// Define a class named "Journaliste"
class Journaliste {
    constructor(nom, prenom, specialite, couleur) {
      // Set the values of "nom", "prenom", "specialite", and "couleur" to the values passed in
      this.nom = nom;
      this.prenom = prenom;
      this.specialite = specialite;
      this.couleur = couleur;
    }
  
    // Define a "toString" method that returns a formatted string of the Journaliste's properties
    toString() {
      return `Nom: ${this.nom}, Prénom: ${this.prenom}, Spécialité: ${this.specialite}, Couleur: ${this.couleur}`;
    }
  }
  
  // Define a class named "Equipe"
  class Equipe {
    constructor() {
      // Initialize an empty array of "journalistes"
      this.journalistes = [];
    }
  
    // Define a method to add a new "journaliste" to the "journalistes" array
    ajouterJournaliste(journaliste) {
      this.journalistes.push(journaliste);
    }
  
    // Define a method to check if a "specialite" value is already assigned to any existing "journaliste"
    verifSpecialite(specialite) {
      return this.journalistes.some(journaliste => journaliste.specialite === specialite);
    }
  
    // Define a method to check if a "couleur" value is already assigned to any existing "journaliste"
    verifCouleur(couleur) {
      return this.journalistes.some(journaliste => journaliste.couleur === couleur);
    }
  
    // Define a "toString" method that returns a formatted string of each "journaliste" in the "journalistes" array
    toString() {
      return this.journalistes.map(journaliste => journaliste.toString()).join('\n');
    }
  }
  
  // Define a jQuery function that runs when the document is ready
  $(document).ready(function() {
    // Define a function to execute when the form with ID "form" is submitted
    $('#form').submit(function(event) {
      // Prevent the form from submitting
      event.preventDefault();
    
      // Get the values of the form inputs
      const nom = $('#nom').val();
      const bio = $('#bio').val();
      const specialty = $('#specialty').val();
      const color = $('#color').val();
  
      // Initialize an array to store any errors found in the input values
      let errors = [];
  
      // Validate the input values and add any errors to the "errors" array
      if (!nom) {
        errors.push('Le nom est obligatoire');
      }
  
      if (!bio || !/^[A-Z].*!$/.test(bio)) {
        errors.push('La biographie doit commencer par une majuscule et contenir un point d\'exclamation');
      }
  
      if (!['politique', 'meteo', 'etranger'].includes(specialty)) {
        errors.push('La spécialité sélectionnée n\'est pas valide');
      }
  
      if ($('#equipe').find(`[data-color="${color}"]`).length > 0) {
        errors.push('Cette couleur préférée est déjà utilisée par un autre journaliste');
      }

// If there are errors, display them under the corresponding form fields
if (errors.length > 0) {
    // Remove the 'is-invalid' class and any previously added error messages
    $('#form .is-invalid').removeClass('is-invalid');
    $('#form .invalid-feedback').remove();

    // Loop through each error message and add the 'is-invalid' class and corresponding error message to the input field
    errors.forEach(error => {
      switch (error) {
        case 'Le nom est obligatoire':
          $('#nom').addClass('is-invalid').after('<div class="invalid-feedback text-danger fs-4 pb-4">Le nom est obligatoire</div>');
          break;
        case 'La biographie doit commencer par une majuscule et contenir un point d\'exclamation':
          $('#bio').addClass('is-invalid').after('<div class="invalid-feedback text-danger fs-4 pb-5">La biographie doit commencer par une majuscule et contenir un point d\'exclamation</div>');
          break;
        case 'La spécialité sélectionnée n\'est pas valide':
          $('#specialty').addClass('is-invalid').after('<div class="invalid-feedback">La spécialité sélectionnée n\'est pas valide</div>');
          break;
        case 'Cette couleur préférée est déjà utilisée par un autre journaliste':
          $('#color').addClass('is-invalid').after('<div class="invalid-feedback">Cette couleur préférée est déjà utilisée par un autre journaliste</div>');
          break;
      }
    });

    // Return if there are errors
    return;
  }

  // If there are no errors, create a new Journaliste object and add it to the Equipe
  const journaliste = new Journaliste(nom, bio, specialty, color);
  equipe.ajouterJournaliste(journaliste);

  // Update the display of the equipe
  $('#equipe').html(equipe.toString());

  // Clear the form
  $('#form')[0].reset();
});
});

/*
// Exemple d'utilisation
const equipe = new Equipe();
 
// Stocker un journaliste
const journaliste1 = new Journaliste('Dupont', 'Jean', 'sport', 'rouge');
equipe.ajouterJournaliste(journaliste1);
 
// Vérifier si une spécialité ou une couleur est déjà présente
console.log(equipe.verifSpecialite('sport')); // Output: true
console.log(equipe.verifSpecialite('politique')); // Output: false
console.log(equipe.verifCouleur('rouge')); // Output: true
console.log(equipe.verifCouleur('bleu')); // Output: false
*/