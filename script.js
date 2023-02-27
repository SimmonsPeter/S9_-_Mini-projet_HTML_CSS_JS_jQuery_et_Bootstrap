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

function validateForm(nom, bio, specialite, couleur, equipe) {
  $(".invalid-feedback").remove();
  if (!nom) {
    $('#nom').addClass('is-invalid').after('<div class="invalid-feedback">Veuillez entrer un nom</div>');
  }
  const regex = /^[A-Z].*!$/;
  if (!regex.test(bio)) {
    $('#bio').addClass('is-invalid').after('<div class="invalid-feedback">Votre bio doit commencer par une majuscule et contenir un "!"</div>');
  }
  if (equipe.verifSpecialite(specialite)) {
    $("#specialty").addClass('is-invalid')
    $("#specialty_color").after('<div class="invalid-feedback">Un seul journaliste par spécialité sera embauché</div>')
  }

}

function afficherEquipe(){
  
}






$(function () {
  // Create a new "equipe" object
  const equipe = new Equipe();

  // Add a "click" event handler to the "Ajouter" button
  $('#form').on('submit', function (e) {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Get the values of the "nom", "bio", "specialite", and "couleur" fields
    const nom = $('#nom').val();
    const bio = $('#bio').val();
    const specialite = $('#specialty').val();
    const couleur = $('#color').val();
    if (validateForm(nom, bio, specialite, couleur, equipe)) {
      const journaliste = new Journaliste(nom, prenom, specialite, couleur)
      equipe.ajouterJournaliste()
      
    };
    



  });


});