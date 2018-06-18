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
  "Alava", "Albacete", "Alicante", "Almeria", "Asturias", "Avila", "Badajoz", "Barcelona", "Burgos", "Caceres",
  "Cadiz", "Cantabria", "Castellon", "Ciudad Real", "Cordoba", "A Coruna", "Cuenca", "Girona", "Granada", "Guadalajara",
  "Guipuzcoa", "Huelva", "Huesca", "Baleares", "Jaen", "Leon", "Lleida", "Lugo", "Madrid", "Malaga", "Murcia", "Navarra",
  "Palencia", "Las Palmas", "Pontevedra", "Ourense", "La Rioja", "Salamanca", "Segovia", "Sevilla", "Soria", "Tarragona",
  "Santa Cruz de Tenerife", "Teruel", "Toledo", "Valencia", "Valladolid", "Vizcaya", "Zamora", "Zaragoza", "Ceuta", "Melilla",
];

export const quiz_example = {
  "title":"Quiz Example",
  "questions":shuffle([...arr]),
};