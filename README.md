# jsramverk-frontend
DV1677 H23 lp1 JavaScript-baserade webbramverk - Frontend

## Säkerhetshål

Säkerhetshålen var föråldrade verisioner av moduler och packages. Allt som krävdes var en uppdatering av de olika node-modules som var för gamla. Det löstes genom att använda npm audit fix vilket försöker lösa de olika sårbarheterna som finns i npm package och i detta fallet löste det alla problem.

## Körbar applikation

För att få applikationen körbar behövdes en .env fil för att hålla i enviroment värden. Dessa värden behöver vara olika för alla developers och på grund av detta lägger man till de i en .env fil. Eftersom att man ej vill ladda upp dessa till github bör de läggas till i gitignore.

Efter detta behövde vi skapa databasen så att den existerade. Sedan kan man starta backenden med nodemon och frontenden med valfritt verktyg, exempelvis python. Starta backend på port 1337 och frontenden på port 9000 för att slippa ändra något. Därefter kan man nå applikationen på http://localhost:9000/

## Val av ramverk

Som frontend ramverk valde vi att köra med Vue då vi tyckte den såg intressant ut. Vi hade React som ett annat alternativ men i slutändan fick det bli Vue.

# Vidareutveckling av appen

Detta avsnitt är avsett för sista delen i kursen som handlar om att vidareutveckla vår applikation.

## Val av krav

De kraven som vi valt att arbeta med är Krav 1, Krav 2 och 

#Krav 1

Att möjligöra funktionalitet för att enbart visa försenade tåg. För att endast visa försenade tåg och för att enbart visa ett tåg på kartan modifierade jag koden så att map komponenten tar kordinaterna för markören som en property. Detta gör så att man kan skicka in kordinaterna till kartan så lägger den till det. Fördelen med att göra på detta viset innebär att jag kan återanvända samma komponent för att enbart visa ett tåg på kartan. En förbättringspotensial är att ändra hur datan skickas via socketen och kunna skicka data för enbart ett tåg. I hämtar jag alla förseningar och kollar om tågnummret som jag får via socketen matchar en försening, om det matchar lägger jag till den på kartan annars gör jag inte det. Det innebär att ibland kan det ta lång tid innan en uppdatering sker och innan markören hamnar på kartan, eftersom att jag väntar på en emit från socket innan jag sedan loopar igenom för att kontrollera om den ska läggas till och sedan lägger till markören.

För att skapa denna funktionalitet ändrade vi befintlig kod för att lägga till en komponent som enbart visar en försening. Denna komponenten skapas utifrån den data man skickar med till den. 
