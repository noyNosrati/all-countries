import { doApi, getQueryString } from "./countriesInfo.js";

export const declareEvents = () =>{
    let id_input = document.querySelector("#id_input");
    let search_btn = document.querySelector("#search_btn");
    search_btn.addEventListener("click" , () =>{
       if(id_input.value != null){
        window.location.href = `?search=${id_input.value}`;
        getQueryString();
       }
       else{
        alert("Enter country name ");
       }
    })
    id_input.addEventListener("keydown" , (e) =>{
        if(e.key == "Enter"){
            if(id_input.value != null){
                window.location.href = `?search=${id_input.value}`;
                getQueryString();
               }
               else{
                alert("Enter country name ");
               }        }
    })

 
}