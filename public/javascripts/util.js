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
  if(zona == "Ciclabile Valchiavenna"){
    window.location.href = window.location.toString().concat(`zone/send_data?u=${nome.value}&o=${opinione.value}&z=${zona}`).replace("piste","");
  }else{
    window.location.href = window.location.toString().concat(`/send_data?u=${nome.value}&o=${opinione.value}&z=${zona}`).replace("?z=".concat(zona), "");
  }
}

function get_header(zona, container){
  var title = document.createElement('h1')
  title.appendChild(document.createTextNode(`Opinioni e commenti sulla zona di ${zona}:`))
  container.appendChild(title)
  container.appendChild(document.createElement('br'))
} 

function get_form(zona, container){
  container.style = "text-align: center"
  var par1 = document.createElement('p').appendChild(document.createTextNode("Username: "))
  var par2 = document.createElement('p').appendChild(document.createTextNode("Opinione:"))
  var textIn = document.createElement('input')
  textIn.style = "height: 35px; max-width:300px; border-radius: 5px;"
  textIn.type = "text";
  textIn.placeholder = "Il tuo Username..."
  textIn.id = "nome"
  var textAr = document.createElement('textarea')
  textAr.style = "border-radius: 5px;"
  textAr.placeholder = "La tua opinione..."
  textAr.id = "opinione"
  textAr.rows = "10"
  var submitBut = document.createElement('input')
  submitBut.style = "height: 40px; max-width: 55px; border-radius: 5px; cursor: pointer;"
  submitBut.type = "button"
  submitBut.value = "Invia"
  submitBut.title = "[Il caricamento non e' immediato]"
  submitBut.onclick = function () { send_datas(zona, document.getElementById("nome"), document.getElementById("opinione")); };
  container.appendChild(par1)
  container.appendChild(document.createElement('br'))
  container.appendChild(textIn)
  container.appendChild(document.createElement('br'))
  container.appendChild(document.createElement('br'))
  container.appendChild(par2)
  container.appendChild(document.createElement('br'))
  container.appendChild(textAr)
  container.appendChild(document.createElement('br'))
  container.appendChild(document.createElement('br'))
  container.appendChild(submitBut)
  container.appendChild(document.createElement('br'))
}

function get_img(zona, container){
  let img = document.createElement('img')
  img.title = zona
  img.className = "image"
  img.src = `../images/${zona.toLowerCase()}.jpg`
  container.appendChild(img)
}

function get_data_no_zone(path, zona, container){
  fetchJSONFile(path, function(data){
    load_data_no_zone(zona, data, container);
  })
}

function get_data(path, container){
  fetchJSONFile(path, function(data){
    load_data(data, container);
  })
}

function get_gallery_no_zone(path, zona, container){
  fetchJSONFile(path, function(data){
    load_data_gallery_no_zone(data, zona, container)
  })
}

function get_gallery(path, container){
  fetchJSONFile(path, function(data){
    load_data_gallery(data, container)
  })
}

function get_info(path, zona, container){
  fetchJSONFile(path, function(data){
    load_info(data, zona, container)
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

function load_info(datas, zona, container){
  for(let i = 0; i < datas.length; i++){
    if(datas[i].tratto == zona){
      let km = document.createElement('h2');
      km.innerText = "Km";
      let kmP = document.createElement('p')
      kmP.innerText = datas[i].km

      let sosta = document.createElement('h2');
      sosta.innerText = "Alcune informazioni";
      let sostaP = document.createElement('p')
      sostaP.innerText = datas[i].sosta
      
      let linkP = document.createElement('p')
      let link = document.createElement('a')
      link.href = datas[i].infos
      link.style = "text-decoration: underline;"
      link.target = "_blank"
      link.innerText = `Altre informazioni su ${datas[i].tratto}`;
      linkP.appendChild(link)
      
      container.appendChild(km)
      container.appendChild(kmP)

      container.appendChild(document.createElement('hr'))

      container.appendChild(sosta)
      container.appendChild(sostaP)

      container.appendChild(document.createElement('hr'))

      container.appendChild(linkP)
    }
  }
}

function load_data(datas, container){
  for(let i = 0; i < datas.length; i++){
    if(datas[i].opinione != ""){
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
      row.appendChild(col2)
      row.appendChild(col1)
      row.appendChild(col3)
      container.appendChild(row)
    }
  }
}

function load_data_gallery_no_zone(datas, zona, container){
  let dPrev = document.createElement('div')
  dPrev.id = "prevContainer"
  
  let btnPrev = document.createElement('button')
  btnPrev.onclick = function (){ plusDivs(-1); }
  btnPrev.innerHTML = "&#10094;"
  dPrev.appendChild(btnPrev)
  container.appendChild(dPrev)

  let dCard = document.createElement('div')
  dCard.id = "cardContainer"

  for(let i = 0; i < datas.length; i++){
    if(datas[i].opinione != "" && datas[i].tratto == zona){
      let d = document.createElement('div')
      d.className = "reviewCard"
      let u = document.createElement('h2')
      u.textContent = datas[i].username
      let o = document.createElement('p')
      o.textContent = datas[i].opinione
      d.appendChild(u)
      d.appendChild(document.createElement('hr'))
      d.appendChild(o)
      dCard.appendChild(d)
    }
  }

  container.appendChild(dCard)


  let dNext = document.createElement('div')
  dNext.id = "nextContainer"
  
  let btnNext = document.createElement('button')
  btnNext.innerHTML= '&#10095;'
  btnNext.onclick = function (){ plusDivs(+1); }
  dNext.appendChild(btnNext)
  container.appendChild(dNext)
  showDivs(1)
}

function load_data_gallery(datas, container){
  let dPrev = document.createElement('div')
  dPrev.id = "prevContainer"
  
  let btnPrev = document.createElement('button')
  btnPrev.onclick = function (){ plusDivs(-1); }
  btnPrev.innerHTML = "&#10094;"
  dPrev.appendChild(btnPrev)
  container.appendChild(dPrev)

  let dCard = document.createElement('div')
  dCard.id = "cardContainer"

  for(let i = 0; i < datas.length; i++){
    if(datas[i].opinione != ""){
      let d = document.createElement('div')
      d.className = "reviewCard"
      let z = document.createElement('h2')
      z.textContent = datas[i].tratto
      let u = document.createElement('h2')
      u.textContent = datas[i].username
      let o = document.createElement('p')
      o.textContent = datas[i].opinione
      d.appendChild(z)
      d.appendChild(document.createElement('hr'))
      d.appendChild(u)
      d.appendChild(document.createElement('hr'))
      d.appendChild(o)
      dCard.appendChild(d)
    }
  }

  container.appendChild(dCard)


  let dNext = document.createElement('div')
  dNext.id = "nextContainer"
  
  let btnNext = document.createElement('button')
  btnNext.innerHTML= '&#10095;'
  btnNext.onclick = function (){ plusDivs(+1); }
  dNext.appendChild(btnNext)
  container.appendChild(dNext)
  showDivs(1)
}

function load_data_no_zone(zona, datas, container){
  for(let i = 0; i < datas.length; i++){
    if(datas[i].tratto == zona && datas[i].opinione != ""){
      let row = document.createElement('tr')
      let col1 = document.createElement('td')
      let text1 = document.createTextNode(datas[i].username)
      let col3 = document.createElement('td')
      let text3 = document.createTextNode(datas[i].opinione)
      col1.appendChild(text1)
      col3.appendChild(text3)
      row.appendChild(col1)
      row.appendChild(col3)
      container.appendChild(row)
    }
  }
}