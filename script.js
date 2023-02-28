// Define a class named "Journaliste"
class Journaliste {
  constructor(nom, prenom, specialite, couleur) {
    // Set the values of "nom", "prenom", "specialite", and "couleur" to the values passed in
    this.nom = nom;
    this.bio = prenom;
    this.specialite = specialite;
    this.couleur = couleur;
  }

  // Define a "toString" method that returns a formatted string of the Journaliste's properties
  toString() {
    return `
      <div class="journaliste d-flex justify-content-between border border-1 p-2 rounded border-secondary-subtle">
        <div>${this.nom}</div>
        <span class="badge rounded-pill" style="background-color: ${this.couleur};">${this.specialite}</span>
      </div>
    `;
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

function validateForm(journaliste, equipe) {
  $(".invalid-feedback").remove();
  if (!journaliste.nom) {
    $('#nom').addClass('is-invalid').after('<div class="invalid-feedback">Veuillez entrer un nom</div>');

  } else {
    $('#nom').removeClass('is-invalid').addClass('is-valid');
  }
  const regex = /^[A-Z].*!$/;
  if (!regex.test(journaliste.bio)) {
    $('#bio').addClass('is-invalid').after('<div class="invalid-feedback">Votre bio doit commencer par une majuscule et contenir un "!"</div>');
  } else {
    $('#bio').removeClass('is-invalid').addClass('is-valid');
  }
  if (equipe.verifSpecialite(journaliste.specialite)) {
    $("#specialty").addClass('is-invalid').after('<div class="invalid-feedback">Un seul journaliste par spécialité sera embauché</div>');    
  } else {
    $('#specialty').removeClass('is-invalid').addClass('is-valid');
  }
  if (equipe.verifCouleur(journaliste.couleur)) {
    $("#color").addClass('is-invalid').after('<div class="invalid-feedback">Vous devez choisir une couleur différente des membres de l`équipe</div>');
    
  } else {
    $('#color').removeClass('is-invalid').addClass('is-valid');
  }
  if ($('.is-invalid').length > 0) {
    return false;
  } else {
    return true;
  }

}

function afficherEquipe(equipe) {
  $('#equipe').html(equipe.toString());
}


// Save the equipe object in the session storage
function sauvegarderEquipe(equipe) {
  sessionStorage.setItem('equipe', JSON.stringify(equipe));
}

// Load the equipe object from the session storage
function chargerEquipe() {
  const equipeJSON = sessionStorage.getItem('equipe');
  if (equipeJSON !== null) {
    const equipeObj = JSON.parse(equipeJSON);
    const equipe = new Equipe();
    equipe.journalistes = equipeObj.journalistes.map(journaliste => new Journaliste(journaliste.nom, journaliste.bio, journaliste.specialite, journaliste.couleur));
    return equipe;
  }
  return null;
}

$(function () {
  // Load the equipe object from the session storage
  const equipe = chargerEquipe() || new Equipe();
  const form = 
  // Add a "click" event handler to the "Ajouter" button
  $('#form').on('submit', function (e) {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Get the values of the "nom", "bio", "specialite", and "couleur" fields
    const nom = $('#nom').val();
    const bio = $('#bio').val();
    const specialite = $('#specialty').val();
    const couleur = $('#color').val();
    const journaliste = new Journaliste(nom, bio, specialite, couleur)
    if (validateForm(journaliste, equipe)) {
      equipe.ajouterJournaliste(journaliste);
      // Save the equipe object in the session storage
      sauvegarderEquipe(equipe);
      $('.is-valid').removeClass('is-valid');
      this.submit();
    
    };
    afficherEquipe(equipe);
    
    
  });

  // Display the equipe object on page load
  afficherEquipe(equipe);
});