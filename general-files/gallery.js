function relativePositions(){
    var path = window.location.pathname;
    var page = path.split("/").pop();

    if(page == 'portrait.html'){
        // var bordDeCher = (document.getElementById('bordDeCher')).getBoundingClientRect();
        var dansTours = (document.getElementById('dansTours')).getBoundingClientRect()
        var foot = (document.getElementById('foot')).getBoundingClientRect();
        var Rpositions = {
            // 'bordDeCher' : bordDeCher['y'],
            'dansTours' : dansTours['y'],
            'foot': foot['y']
        }
    }   else if(page == 'automotive.html'){
        var alpine = (document.getElementById('alpine')).getBoundingClientRect();
        var mazda = (document.getElementById('mazda')).getBoundingClientRect();
        var lexus = (document.getElementById('lexus')).getBoundingClientRect();
        var bmw = (document.getElementById('bmw')).getBoundingClientRect();
        var yaris = (document.getElementById('yaris')).getBoundingClientRect();
        var foot = (document.getElementById('foot')).getBoundingClientRect();

        var Rpositions = {
            'alpine' : alpine['y'],
            'mazda' : mazda['y'],
            'lexus' : lexus['y'],
            'bmw' : bmw['y'],
            'yaris' : yaris['y'],
            'foot' : foot['y']
        }
    }   else if(page == 'landscape.html'){
        
        var tours1 = (document.getElementById('tours1')).getBoundingClientRect();
        var tours2 = (document.getElementById('tours2')).getBoundingClientRect();
        var tours3 = (document.getElementById('tours3')).getBoundingClientRect();
        var foot = (document.getElementById('foot')).getBoundingClientRect();

        var Rpositions = {
            'tours1' : tours1['y'],
            'tours2' : tours2['y'],
            'tours3' : tours3['y'],
            'foot' : foot['y']
            
        } 
    }   else if(page == 'events.html'){
        
        var casah = (document.getElementById('casah')).getBoundingClientRect();
        var manif = (document.getElementById('manif')).getBoundingClientRect()
        var foot = (document.getElementById('foot')).getBoundingClientRect();

        var Rpositions = {
            'casah' : casah['y'],
            'manif' : manif['y'],
            'foot' : foot['y']
            
        } 
    }

    return Rpositions
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

function closestFinder(){
    var negs = [];
    var pos = [];
    var out = [];

    var Rpositions = relativePositions();

    for(var key in Rpositions){
        if(Rpositions[key] > 0){
            pos[key] = Rpositions[key];
        }
        else if(Rpositions[key] < 0){
            negs[key] = Rpositions[key];
        }
    }


    if(isEmpty(negs)){
        console.log('No negs')
    }else{
        var closeNegValue = Math.max.apply(null, (Object.keys(negs)).map(function(x) { return negs[x]} ));
        var closeNeg  = Object.keys(negs).filter(function(y) { return negs[y] === closeNegValue });
        out['above'] = closeNeg[0];
    }
    
    if(isEmpty(pos)){
        console.log('No pos')
    }else{
        var closePosValue = Math.min.apply(null, (Object.keys(pos)).map(function(x) { return pos[x]} ));
        var closePos  = Object.keys(pos).filter(function(y) { return pos[y] === closePosValue });
        out['under'] = closePos[0];
    }
    return(out)
}

function displayButtons(){
    var arrowUp = document.getElementById('arrowUp');
    var arrowDown = document.getElementById('arrowDown');

    var data = closestFinder();
    if(data['above'] != null && data['under'] != null){
        arrowUp.setAttribute('href',`#${data['above']}`)
        arrowDown.setAttribute('href',`#${data['under']}`,'style')

    } 
    else if(data['above'] != null && data['under'] == null) {
        arrowUp.setAttribute('href',`#${data['above']}`,'style')

    }
    else if(data['above'] == null && data['under'] != null){
        arrowDown.setAttribute('href',`#${data['under']}`,'style')


    }

}

window/addEventListener("load", displayButtons)
window.addEventListener("scroll", displayButtons)

// window.addEventListener("click", window.onclick = e => {var element = e.target;console.log(element)})

function getPath(imageElement){
    var path = imageElement.outerHTML;
    var indexes = [];

    for (let index = 0; index < path.length; index++) {
        if (path[index] === '"') {
          indexes.push(index);
        }
      }

    return(path.substr(indexes[0],indexes[1]-indexes[0]))
}

window.onclick = e => {
    var element = e.target;
    var elementString = element.outerHTML;
    var type = e.target.tagName;
    var zone = document.getElementById('fullSizeZone');
    var path = getPath(element);

    if(type == "IMG" && (elementString.substr(20,6) != "icones")){

        finalPath = (path.replace('small','fullsize')).substr(1)
        finalPath = finalPath.replace('webp','jpg')
        // console.log(finalPath)

        document.body.setAttribute('scroll','no')
        zone.style.display = "block"
        zone.innerHTML = `<img src="${finalPath}" class="photoFull" alt=""><button><img src="../images/icones/cross-small.svg" alt="Icône d'une croix pour fermer" class="topicButton closeButton"></button>`
    } else{
        document.body.setAttribute('scroll','yes')
        zone.style.display = "none"
        zone.innerHTML = null
    }

} 