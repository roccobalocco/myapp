var z = "";

function get_offset(actualW, actualH, mappa){
  let offW = actualW / 750;
  let offH = actualH / 632;
  let first_coords = [[444,161,365,100], [178,90,366,174], [444,82,532,167], [231,175,345,225], [215,226,366,271,313,209,219,231,327,251], [229,271,381,326], [317,327,493,388], [329,389,454,433], [439,479,316,434], [272,479,438,602]];
  for(let i = 0; i < first_coords.length; i++){
    for(let j = 0; j < first_coords[i].length; j++){
      if(j%2 == 0){
        first_coords[i][j] *= offW 
      }else{
        first_coords[i][j] *= offH
      }
    }
  }
  for(let i = 0; i < mappa.length; i++){
    mappa[i].setAttribute('coords', first_coords[i].toString())
  }
}

function get_zone_from_url(){
  var url = new URL(window.location);
  return url.searchParams.get("z");
}

function send_datas(zona, nome, opinione){
  //dovresti reindirizzare la pagina alla route corrispondente con url con username, tratto e opinione con - al posto degli spazi
  window.location.href = window.location.toString().concat(`/send_data?u=${nome.value}&o=${opinione.value}&z=${zona}`).replace("?z=".concat(zona), "");
}

function get_header(zona, container){
  var title = document.createElement('h2')
  title.appendChild(document.createTextNode(`Opinioni e commenti sulla zona di ${zona}:`))
  container.appendChild(title)
  container.appendChild(document.createElement('br'))
} 

function get_form(zona, container){
  var par1 = document.createElement('p').appendChild(document.createTextNode("Username: "))
  var par2 = document.createElement('p').appendChild(document.createTextNode("Opinione:"))
  var textIn = document.createElement('input')
  textIn.type = "text";
  textIn.placeholder = "Il tuo Username..."
  textIn.id = "nome"
  var textAr = document.createElement('textarea')
  textAr.placeholder = "La tua opinione..."
  textAr.id = "opinione"
  textAr.rows = "10"
  var submitBut = document.createElement('input')
  submitBut.type = "button"
  submitBut.value = "Invia"
  submitBut.onclick = function () { send_datas(zona, document.getElementById("nome"), document.getElementById("opinione")); };
  container.appendChild(par1)
  container.appendChild(document.createElement('br'))
  container.appendChild(textIn)
  container.appendChild(document.createElement('br'))
  container.appendChild(par2)
  container.appendChild(document.createElement('br'))
  container.appendChild(textAr)
  container.appendChild(document.createElement('br'))
  container.appendChild(document.createElement('br'))
  container.appendChild(submitBut)
  container.appendChild(document.createElement('h6').appendChild(document.createTextNode(" [Il caricamento non e' immediato]")))
}

function get_data(path, zona, container){
  fetchJSONFile(path, function(data){
    load_data(zona, data, container);
  })
}

function fetchJSONFile(path, callback) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === 4) {
          if (httpRequest.status === 200) {
              var data = JSON.parse(httpRequest.responseText);
              if (callback) callback(data);
          }
      }
  };
  httpRequest.open('GET', path);
  httpRequest.send(); 
}

function load_data(zona, datas, container){
  for(let i = 0; i < datas.length; i++){
    if(datas[i].tratto == zona){
      let row = document.createElement('tr')
      let col1 = document.createElement('td')
      let text1 = document.createTextNode(datas[i].username)
      let col2 = document.createElement('td')
      let text2 = document.createTextNode(datas[i].tratto)
      let col3 = document.createElement('td')
      let text3 = document.createTextNode(datas[i].opinione)
      col1.appendChild(text1)
      col2.appendChild(text2)
      col3.appendChild(text3)
      row.appendChild(col1)
      row.appendChild(col2)
      row.appendChild(col3)
      container.appendChild(row)
    }
  }
}