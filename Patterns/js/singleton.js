const Singleton = (function(){
    let instance;

    function createInstance(){
        const object = new Object({name: 'Alex', age: 19});
        return object;
    }

    return {
        getInstance: function(){
            if(!instance){
                instance = createInstance();
            }   
            return instance;
        }
    };
})();

const instanceA = Singleton.getInstance();
const instanceB = Singleton.getInstance();

console.log(ty); //It shows that we will always have only one Object)