const PageState = function(){
    let currentState = new homeState(this);

    this.init = function(){
        this.change = new homeState();
    }

    this.change = function(state){
        currentState = state;
    }
};

const homeState = function(page){
    document.querySelector('#heading').textContent = null;
    document.querySelector('#heading').innerHTML = `
        <div class="jumbotron">
            <h1 class="display-4">Hello, world!</h1>
            <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            <hr class="my-4">
            <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
            <p class="lead">
            <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
            </p>
        </div>
    `;
};

const aboutState = function(page){
    document.querySelector('#heading').textContent = "About Us";
    document.querySelector('#heading').innerHTML = `<p>This is about page</p>`;
};

const contactState = function(page){
    document.querySelector('#heading').textContent = "Contact Us";
    document.querySelector('#heading').innerHTML = `
    <form>
        <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control">
        </div>
        <div class="form-group">
            <label>Email adress</label>
            <input type="email" class="form-control">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    `;
};

const page = new PageState();

page.init();


const 
    home = document.getElementById('home'),
    about = document.getElementById('about'),
    contact = document.getElementById('contact');


home.addEventListener('click', (event) => {
    page.change(new homeState);
    event.preventDefault();
});

about.addEventListener('click', (event) => {
    page.change(new aboutState);
    event.preventDefault();
});

contact.addEventListener('click', (event) => {
    page.change(new contactState);
    event.preventDefault();
});

