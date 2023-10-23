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

De kraven som vi valt att arbeta med är Krav 1, Krav 2 och Krav 5.

# Krav 1 

 

För att endast visa försenade tåg och för att enbart visa ett tåg på kartan modifierade jag koden så att map komponenten tar koordinaterna för markören som en property. Detta gör så att man kan skicka in koordinaterna till kartan så lägger den till det. Fördelen med att göra på detta vis innebär att jag kan återanvända samma komponent för att enbart visa ett tåg på kartan. En förbättringspotential är att ändra hur datan skickas via socketen och kunna skicka data för enbart ett tåg. I map hämtar jag alla förseningar och kollar om tågnummret som jag får via socketen matchar en försening, om det matchar lägger jag till den på kartan annars gör jag inte det. Det innebär att ibland kan det ta lång tid innan en uppdatering sker och innan markören hamnar på kartan, eftersom jag väntar på en emit från socket innan jag sedan loopar igenom för att kontrollera om den ska läggas till och sedan lägger till markören. 

För att enbart visa en försening med tågnr och dess data, ändrade vi befintlig kod för att lägga till en komponent som enbart visar en försening. Sedan ändrades koden i DelayedTrains komponenten för att använda sig av en loop där den skapar antalet OneDelayed utefter hur mycket data den får tillbaka av getDelayed. Den datan kan man skicka med via properties och då använda mellan komponenterna. Denna struktur gör det möjligt att använda samma komponent för att visa enbart en försening eller flera beroende på vad förälder-komponenten skickar med för data. Denna komponent används i dagsläget enbart i startsidan på vår applikation men det gör det möjligt att skapa fler vyer med samma komponent. 

# Krav 2 

 

Göra det möjligt att ändra befintliga ärenden. För att få fram en sida där det är möjligt för användaren att ändra dem befintliga ärendena som finns i listan så skapades en ny vy där man ska få tillgång till listan för de olika ärendena samt formuläret där användaren ska kunna ha möjlighet att ändra orsakskod. Det började med att utgå ifrån den lista samt formulär som fanns i createTicket som är själva sidan, därefter behövdes nya funktioner samt en ny route skapas. Den nya routen använder PUT och använder sig av det privata ID:t som mongodb skapar själv till varje objekt. På så sätt kan man utnyttja det ID:t när man söker på rätt objekt att ändra på i databasen och få det korrekt ändrat. På grund av det valdes funktionen updateOne för att uppdatera i databasen, och då uppdateras bara ett specifikt objekt varje gång, vilket vi får ut genom det personliga/privata ID:t som redan är satt. 

Det kluriga för denna del var att få till det på ett bra sätt med det privata ID:t som alla objekt har, samt att kunna kontrollera det eftersom det är ett ObjectId i mongodb och inte bara en sträng. Det löstes genom att skapa en variabel som fick innehållet av det ID:t som skickades med via parametern, och därefter användes den nyligen skapade variabeln för att jämföras med databasen för att hitta det korrekta objektet som ska ändras. 

# Krav 3 

 

Syftet med GraphQL är att förhindra Over eller Underfetching, detta innebär att man inte ska hämta onödigt data med fetchrequestsen, eller för lite data. Om man hämtar för lite data kommer det innebära att man kommer behöva göra fler fetches vilket kräver mer energi och blir omiljövänligare och kostar mer. Därför använder man sig av GraphQL då kan man komma åt sin endpoint som man har GraphQL. Där jobbar det på serversidan och filtrerar ut datan som ska skickas och när det är färdigt skickar den vidare den efterfrågade datan.   

  

För att implementera GraphQL i vårat projekt behövde vi installera det i våra dependencies och inkludera nödvändiga moduler i vår backend. När dessa var inkluderade kunde vi arbeta vidare med att skapa en root-fil som beskriver vilka objekt som ska kunna filtreras. Där definerade jag den grova strukturen vilka objekt som skulle kunna sorteras. När jag sedan lagt till dem i rootfilen behövde jag skapa filer för dessa objekt och definera strukturen som de har. Här tolkade vi kravet som att alla endpoints (/delayed /train /tickets samt /code) skulle vara kopplade till GraphQL, men efter att sett i kurschatten att endast de endpoints kopplade till databasen behövde implementeras stannade vi utvecklingen när vi implementerat funktionaliteten för /delayed och /tickets. För att skapa strukturen hämtade jag datan som skulle in i objekten med en fetch från modellerna som tidigare hade skapats och skickade in det i resolve delen. Dessa modeller funkade dock inte för GraphQL då de inte returnerade datan i det format som förväntades, så jag fick skapa nya models som hade rätt struktur på den returnerade datan. När detta var färdigt var det bara att byta ut de fetches i frontenden som vi hade mot /ticket till /graphql. För att enkelt kunna använda /graphql skapade jag en funktion i model.js. Där kunde jag skicka med en query som argument som då används för att sortera i /graphql endpointen. Datan som returnerades hade inte samma struktur som den jag använde tidigare så denna fick formateras om för att slippa skriva om resterande kod. 

  

I frontenden är det enbart ticket som vi konverterat till GraphQL och delayed har förblivit densamma. Att implementera delayed i backenden var dock lärorikt och gav en bra förståelse i hur man implementerar GraphQL. Dock förvinner syftet med GraphQL något om man implementerar det på de andra endpointsen då denna datan kommer från en fetch från Trafikverkets api. Ska detta verkligen göra någon skillnad borde det vara implementerat på deras server för att få fulla potentialen av detta. 
