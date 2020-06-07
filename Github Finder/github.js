class GitHub{
    constructor(){
        this.client_id = 'c21fbc99832ff76efb52';
        this.client_secret = 'e17bd3c1462ace1cc3f09674152e87fe6431d731';
        this.repos_count = 5;
        this.repos_sort = 'created: asc';
    }

    async getUser(user){
        //Fetch profile
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

        //Fetch repos
        const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&
        client_id=${this.client_id}&client_secret=${this.client_secret}`);
        
        const profile = await profileResponse.json();
        const repos = await repoResponse.json();

        return {
            profile,
            repos
        }
    }


}