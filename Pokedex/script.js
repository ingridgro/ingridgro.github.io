var statBar = '<div class="progress" title="[stat]"><div class="progress-bar" role="progressbar" style="width: [stat]%" aria-valuenow="[stat]" aria-valuemin="0" aria-valuemax="100"></div></div>'
var rowBar = '<div class="row text-center">[rowBar]</div>';
var colBar = '<div class="col-2 mb-2">[colName]</div>';
var colCel = '<div class="col-4">[colName]</div><div class="col-8">[colDesc]</div>';

var idPokemon = 1;

const fetchPokemon=(pokemon)=>{
     pokemon = pokemon ? pokemon : document.getElementById('txtPokemon');

    let url='https://pokeapi.co/api/v2/pokemon/' + pokemon;
    fetch(url).then((res)=>{
        return res.json();
    }).then((data)=>{
        idPokemon = data.id;
        document.getElementById('name').innerHTML  ="#" + zfill(data.id, 3) + " "+ data.name;
        document.getElementById("imagen").src=data.sprites.other.home.front_default;
        document.getElementById('tipo').innerHTML  = data.types.map(function(item) {
            return item.type.name;
          });
        let stats = data.stats.map(function(item) {
            return {name: item.stat.name, stat: item.base_stat}
        });
        let bars = "";
        let names = "";
        let movil = "";
        for (var i = 0; i < stats.length; i++){
            let progressbar = statBar.replaceAll("[stat]", stats[i].stat);
            bars+= colBar.replaceAll("[colName]", progressbar);;
            names+= colBar.replaceAll("[colName]", stats[i].name);
            movil += colCel.replaceAll("[colName]", stats[i].name).replaceAll("[colDesc]", progressbar);
        }
        
        document.getElementById('stats').innerHTML = rowBar.replace("[rowBar]", bars + names);
        document.getElementById('stats2').innerHTML = rowBar.replace("[rowBar]", movil).replaceAll("text-center", "");

        
        let moves = data.moves .map(function(item) {
            return item.move.name
        });
        let movs = "";
        for (var i = 0; i < moves.length; i++){
            movs += "<li>" + moves[i] + "</li>"
        }
        document.getElementById('movs').innerHTML = movs;
    }).catch((data)=>{
        console.log("falle");
        console.log(data);
    })
}
fetchPokemon("1");

function anterior(){
    let searchPoke = idPokemon-1 == 0 ? 898 : idPokemon-1;
    fetchPokemon(searchPoke);
}
function siguiente(){
    let searchPoke = idPokemon+1 == 899 ? 1 : idPokemon+1;
    fetchPokemon(searchPoke);
}

function zfill(number, width) {
    var numberOutput = Math.abs(number); /* Valor absoluto del número */
    var length = number.toString().length; /* Largo del número */ 
    var zero = "0"; /* String de cero */  
    
    if (width <= length) {
        if (number < 0) {
             return ("-" + numberOutput.toString()); 
        } else {
             return numberOutput.toString(); 
        }
    } else {
        if (number < 0) {
            return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
        } else {
            return ((zero.repeat(width - length)) + numberOutput.toString()); 
        }
    }
}