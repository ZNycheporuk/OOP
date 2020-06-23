class Artist {
    constructor(name) {
        this.name = name;
        this.genre;
        this.availablePlaces = [];
    }
    addAvailablePlace(place) {
        this.availablePlaces.push(place);
    }
    isAvailable(place) {
        return this.availablePlaces.includes(place)
    }
    getGenre() {
        return this.genre;
    }
    perform() { }
}
class PopSinger extends Artist {
    constructor(name) {
        super(name);
        this.genre = "Pop";
    }
    perform() {
        console.log("*performs a casual pop song (uncool)*")
    }
}
class RapSinger extends Artist {
    constructor(name) {
        super(name);
        this.genre = "Rap";
    }
    perform() {
        console.log("*performs a mind-blowing freestyle rap\nand leaves everyone sitting with their mouths open*")
    }
}
class AbstractProducerCenter {
    register(artist){};
    organizeConcert(place, popSingerAmount, rapSingerAmount){};
}
class ProducerCenter extends AbstractProducerCenter {
    constructor() {
        super();
        this.artistBase = [];
    }
    register(artist) {
        this.artistBase.push(artist);
    }
    organizeConcert(place, popSingerAmount, rapSingerAmount){
        let performanceProgram = [];
        let popSingersAssigned = 0;
        let rapSingersAssigned = 0;
        for (let singer of this.artistBase)
        {
            if (popSingersAssigned >= popSingerAmount && rapSingersAssigned >= rapSingerAmount) break;
            if (popSingersAssigned <= popSingerAmount && singer.getGenre() == ("Pop") && singer.isAvailable(place))
            {
                popSingersAssigned += 1;
                performanceProgram.push(singer);
            }
            else if (rapSingersAssigned <= rapSingerAmount && singer.getGenre() == ("Rap") && singer.isAvailable(place))
            {
                rapSingersAssigned += 1;
                performanceProgram.push(singer);
            }
        }
        if (popSingersAssigned < popSingerAmount || rapSingersAssigned < rapSingerAmount)
        {
            console.log("Cannot organize a concert");
            return;
        }
        console.log("A concert at a " + place);
        for (let singer of performanceProgram)
        {
            console.log(singer.name + " is performing");
            singer.perform();
        }
        console.log("-*-*-");
    }
}

///////////////
    let loboda = new PopSinger("Loboda");
    loboda.addAvailablePlace("concert hall");
    loboda.addAvailablePlace("club");

    let eminem = new RapSinger("Eminem");
    eminem.addAvailablePlace("stadium");

    let kirkorov = new PopSinger("Kirkorov");
    kirkorov.addAvailablePlace("club");
    kirkorov.addAvailablePlace("concert hall");
    kirkorov.addAvailablePlace("stadium");

    let prodCenter = new ProducerCenter();
    prodCenter.register(loboda);
    prodCenter.register(eminem);
    prodCenter.register(kirkorov);

    prodCenter.organizeConcert("stadium", 1, 1);

    prodCenter.organizeConcert("club", 2, 1);