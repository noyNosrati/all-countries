import CountryItem from "./countryItem.js";

let flag = true;

 export const doApi = async(_country)=>{
    if(flag){
        document.querySelector("#id_parent").innerHTML = `<h2 class="text-light">Loding...</h2>`;


    }
    let url = `https://restcountries.com/v3.1/name/${_country}`;
    
    try{
        let resp = await fetch(url);
        let data = await resp.json();
        console.log(data);
        let arr = data;
        if(arr.length == 1){
            createItem(data);
        }else{
            arr.forEach(item => {
                if(item.name.common.toLowerCase() == _country){
                    document.querySelector("#id_parent").innerHTML = "";
                    let country = new CountryItem("#id_parent",item , doApiBorders , doApiFullName);
                    country.render(); 
                }
            });

        }


      
        flag = false;
    }
    catch(err){
        console.log(err);
        document.querySelector("#id_parent").innerHTML = "<h2>Not a country, search a valid country name</h2>";
        document.querySelector("#id_parent").style.color ="white";
    }

}
  const doApiBorders = async(_country)=>{
    let url = `https://restcountries.com/v3.1/alpha/${_country}`;
    console.log(_country);
    console.log(url);
    
    
    try{
        let resp = await fetch(url);
        let data = await resp.json();
        console.log(data);
        createItem(data);
    }
    catch(err){
        console.log(err);
        document.querySelector("#id_parent").innerHTML = "<h2>Not a country, search a valid country name</h2>";
        document.querySelector("#id_parent").style.color ="white";

    }

}
  const doApiFullName = async(_country)=>{
     let url = `https://restcountries.com/v3.1/alpha/${_country}`;
    //  console.log(_country);
    // console.log(url);
    
    
    try{
        let resp = await fetch(url);
        let data = await resp.json();
        console.log(data);
        console.log(data[0].name.common);
        return  data[0].name.common;
    }
    catch(err){
        console.log(err);
        document.querySelector("#id_parent").innerHTML = "<h2>Not a country, search a valid country name</h2>";
        document.querySelector("#id_parent").style.color ="white";;

    }

}


 const createItem = (_ar) => { 
     document.querySelector("#id_parent").innerHTML = "";
    _ar.forEach(item => {
        let country = new CountryItem("#id_parent",item , doApiBorders , doApiFullName);
        country.render();
    });
  
 }

 export const getQueryString = () => { 
    let query = new URLSearchParams(window.location.search);
    console.log(query.get("search"));
   if(query.get("search") !=null){

       doApi(query.get("search"));
    }else{
       doApi("israel");

   }
 }





