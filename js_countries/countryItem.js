
export default class CountryItem {
    constructor(_parent, _item, _doApiBorders, _doApiFullName) {
        this.parent = _parent;
        this.imgS = _item.flags.png;
        this.imgA = _item.flags.alt;
        this.pop = _item.population.toLocaleString();
        this.name = _item.name.common;
        this.region = _item.region;
        this.languages = Object.values(_item.languages);
        this.capital = _item.capital;
        this.borders = _item.borders;
        this.coin1 = Object.keys(_item.currencies);
        this.coin2 = Object.values(_item.currencies[this.coin1]);
        this.map = _item.latlng;
        this.doApiBorders = _doApiBorders;
        this.doApiFullName = _doApiFullName;


    }




    render() {
        // main div whith the info
       let div = document.createElement("div");
        div.className = "main_div p-6 col-11 col-lg-5 mb-4 mb-lg-0 m-auto";
        document.querySelector(this.parent).append(div);
        div.innerHTML = `
        <div>
        <div>
        <h2 class="display-5 p-5">About: ${this.name}</h2>
        <img class="img-fluid shadow " id="id_img" src="${this.imgS}" alt="${this.imgA}">
       </div>
      <div class="p-4">
       <h4>pop: ${this.pop}</h4>
       <h4>region: ${this.region} </h4>
       <h4>languages: ${this.languages}</h4>
       <h4>coin: ${this.coin1} , ${this.coin2[0]}</h4>
       <h4>capital: ${this.capital}</h4>
     
        </div>
        
        `

        // div contain a map and borders
        let div_map = document.createElement("div");
        div_map.className = "div_map col-11 col-lg-5 p-4 m-auto";
        document.querySelector(this.parent).append(div_map);
        div_map.innerHTML = `
            
            <iframe class="p-4" src="https://maps.google.com/maps?q=${this.map}&amp;z=4&amp;ie=UTF8&amp;iwloc=&amp;output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"  height="550" width="100%"></iframe>


            `

        // div contains the borders
        let div_borders = document.createElement("div");
        div_borders.className = "div_borders row col-auto p-2"

        document.querySelector(".div_map").append(div_borders);
        div_borders.innerHTML = `<h3 class="p-3 display-6">${this.name} borders:</h3>`

        if(this.borders){

            
                    this.borders.forEach((item, index) => {
                        console.log(this.borders.length);
                        let fullNameBorder;
                        try {
                            this.doApiFullName(item).then((res) => {
                                fullNameBorder = (res);
                                let div_a = document.createElement("div");
                                div_a.className = "col-auto p-2 col-auto"
                                document.querySelector(".div_borders").append(div_a);
                                div_a.innerHTML = `<a class="a_border" href="#">
                            ${fullNameBorder} 
                            </a>`;
                                if (index < (this.borders).length - 1) {
                                    div_a.innerHTML += ` ,`;
                                }
                                let link_a = div_a.querySelector(".a_border");
                                link_a.className = "lead"
                                link_a.addEventListener("click", () => {
                                    this.doApiBorders(item);
                                    // console.log(item);
                                })
                            })
            
            
                        }
                        catch {
                            console.log("faild to get the fullNameBorder ");
                        }
            
            
                    })
        }
        else{
            div_borders.innerHTML += "<h2>no borders</h2>";
        }


    }

}



