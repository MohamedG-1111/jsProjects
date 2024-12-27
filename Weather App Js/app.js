let search=document.getElementById("search");
let cityInput=document.getElementById("cityName");
let temp=document.getElementsByClassName("deg")[0];
let citydegree=document.getElementsByClassName("degcity")[0];
let humidity=document.getElementsByClassName("Hum")[0];
let wind=document.getElementsByClassName("wid")[0];
let img=document.getElementById("mainImg");
let found=document.getElementsByClassName("Found")[0];
let main=document.getElementsByClassName("main")[0];
let delet=document.getElementById("iconX");
   if(localStorage.getItem("deg")){
      temp.textContent=localStorage.getItem("deg");
   }
   if(localStorage.getItem("Wind")){
      wind.textContent=localStorage.getItem("Wind");
   }
   if(localStorage.getItem("city")){
      citydegree.textContent=localStorage.getItem("city");
   }
   if(localStorage.getItem("humidity")){
      humidity.textContent=localStorage.getItem("humidity");
   }
   if(localStorage.getItem("weather")){
      switch(localStorage.getItem("weather")){
         case 'Clear':
           img.src="./images/clear.png";
           break;
          case 'Clouds':
           img.src="./images/clouds.png" ;
          break;
          case 'Mist':
           img.src="./images/mist.png";
           break;
          case 'Rain':
          img.src="./images/rain.png"  
          break;
          case 'Snow':
           img.src="./images/snow.png";
           case 'Drizzle':
             img.src="./images/drizzle.png"  ;
             break;
             default:
               img.src = "./images/default.png"; 
               break;  
          }
   }
search.onclick=function(){
   let cityname= cityInput.value;
   cityInput.value="";
const apiKey="6abf2b29ae11626f46247b4ab1cf56a1";
let city=cityname
let request=new XMLHttpRequest();
request.open("get",`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
request.send();
if(cityname){
request.addEventListener("load",function(){
          if(request.status === 200){
            let WeathetData=JSON.parse(request.responseText);
            console.log(WeathetData)
           temp.textContent=`${Math.round(WeathetData.main.temp)}°c`;
           localStorage.setItem("deg",`${Math.round(WeathetData.main.temp)}°c`);
           citydegree.textContent=cityname;
           localStorage.setItem("city",cityname);
           humidity.textContent=`${WeathetData.main.humidity}%`;
           localStorage.setItem("humidity",`${WeathetData.main.humidity}%`);
           wind.textContent=`${WeathetData.wind.speed}km/h`;
         localStorage.setItem("Wind",`${WeathetData.wind.speed}km/h`)
           let weather=`${WeathetData.weather[0].main}`;
           localStorage.setItem("weather",weather);
           switch(weather){
            case 'Clear':
              img.src="./images/clear.png";
              break;
             case 'Clouds':
              img.src="./images/clouds.png" ;
             break;
             case 'Mist':
              img.src="./images/mist.png";
              break;
             case 'Rain':
             img.src="./images/rain.png"  
             break;
             case 'Snow':
              img.src="./images/snow.png";
              case 'Drizzle':
                img.src="./images/drizzle.png"  ;
                break;
                default:
                  img.src = "./images/default.png"; 
                  break;  
             }
          }
        else{
         found.style.display="flex"
         main.style.opacity=".4"
         cityInput.value="";
        }  
        cityInput.value="";
}
)  
}  
}
delet.onclick=function(){
   found.style.display="none";
   main.style.opacity="1"
}