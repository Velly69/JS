//Search Input
const searchUser = document.getElementById('searchUser');

const gitHub = new GitHub();
const ui = new UI();

searchUser.addEventListener('keyup', (event) => {
    //Get input text
    const userText = event.target.value;

    if(userText!= ''){
        //Make http call
        gitHub.getUser(userText)
            .then(data => {
                if(data.profile.message === "Not Found"){
                    //Show alert
                    ui.showAlert('User not found', 'alert alert-danger');
                }
                else {
                    //Show profile
                    ui.showProfile(data.profile);
                    //Show repos
                    ui.showRepos(data.repos);
                }
            })
    } else{
        //Clear profile
        ui.clearProfile();
    }
})