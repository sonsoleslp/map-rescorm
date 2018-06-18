function shuffle(array){
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while(currentIndex !== 0){

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Used like so
let arr = [
  "Álava", "Albacete", "Alicante", "Almería", "Asturias", "Ávila", "Badajoz", "Barcelona", "Burgos", "Cáceres",
  "Cádiz", "Cantabria", "Castellón", "Ciudad Real", "Córdoba", "A Coruña", "Cuenca", "Girona", "Granada", "Guadalajara",
  "Guipúzcoa", "Huelva", "Huesca", "Baleares", "Jaén", "León", "Lleida", "Lugo", "Madrid", "Málaga", "Murcia", "Navarra",
  "Palencia", "Las Palmas", "Pontevedra", "Ourense", "La Rioja", "Salamanca", "Segovia", "Sevilla", "Soria", "Tarragona",
  "Santa Cruz de Tenerife", "Teruel", "Toledo", "Valencia", "Valladolid", "Vizcaya", "Zamora", "Zaragoza", "Ceuta", "Melilla",
];

export const quiz_example = {
  "title":"Quiz Example",
  "questions":shuffle([...arr]),
};