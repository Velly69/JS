class EventObserver{
    constructor(){
        this.observers = [];
    }

    subscribe(fn){
        this.observers.push(fn);
        console.log(`You are now subscribed to ${fn.name}`);
    }

    unsubscribe(fn){
        this.observers = this.observers.filter(function(item){
            if(item !== fn){
                return item;
            }
        });
        console.log(`You are now unsubcrived from ${fn.name}`)
    }

    fire(){
        this.observers.forEach((item) => {
            item.call();
        });
    }
}


const click = new EventObserver();

document.querySelector('.sub-ms').addEventListener('click', function(){
    click.subscribe(getCurrMs);
});

document.querySelector('.unsub-ms').addEventListener('click', function(){
    click.unsubscribe(getCurrMs);
});

document.querySelector('.sub-s').addEventListener('click', function(){
    click.subscribe(getCurrS);
});

document.querySelector('.unsub-s').addEventListener('click', function(){
    click.unsubscribe(getCurrS);
});

document.querySelector('.fire').addEventListener('click', function(){
    click.fire();
});


const getCurrMs = function(){
    console.log(`Current MS: ${new Date().getMilliseconds()}`);
}

const getCurrS = function(){
    console.log(`Current S: ${new Date().getSeconds()}`);
}