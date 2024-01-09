
document.addEventListener('DOMContentLoaded', searchGithub);

function searchGithub(){

    const form = document.getElementById("github-form");
    const inpName = document.getElementById('search');
  
    
    form.addEventListener('submit', (ev) => {
        
        ev.preventDefault();

        // search GitHub for user matches
        fetch(`https://api.github.com/search/users?q=${inpName.value}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/vnd.github.v3+json",
                Accept: "application/vnd.github.v3+json"
            }
        })
        .then((res) => res.json())
        .then((data) => {
            let userMatches = data.items;
            displayInfo(userMatches);
            displayRepos();
        })

    })
}
 



// Display information about the users to the page. 
// show their username, avatar and a link to their profile

function displayInfo(userMatches){

    const ul = document.getElementById('user-list');

    userMatches.forEach(item => {


        const li = document.createElement('li');
        const img = document.createElement('img');
        const usrHyperLink = document.createElement('a')

        /* username */
        const usrName = item['login'];
        li.textContent = usrName;
        ul.appendChild(li);

        /* Avatar */
        const avatar = item['avatar_url'];
        img.class = usrName;
        img.src = avatar;
        img.alt = `${usrName}'s avatar`;
        ul.appendChild(img)

        /* Link */
        const usrLink = item['html_url'];
        usrHyperLink.href = usrLink;
        usrHyperLink.textContent = `Click to view ${usrName}'s GitHub Page`;
        ul.appendChild(usrHyperLink);

    });
}



// Clicking on one of these users should send a request to the
// user Repos Endpoint and return data about all the repositories for that user.
// Using the response from the Users Repos Endpoint, display all the repositories
// for that user on the page.

function displayRepos(){
    const li = document.querySelectorAll('li');
    li.forEach((item) => {

        item.addEventListener('click', (ev) => {

            let ul = document.getElementById('repos-list')

            //paragraph describing the user name
            let p = document.createElement('p');
            p.innerHTML = `<b> ${ev.target.textContent}'s Repositories <b>`
            ul.appendChild(p);

            fetch(`https://api.github.com/users/${ev.target.textContent}/repos`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/vnd.github.v3+json",
                    Accept: "application/vnd.github.v3+json"
                }
            })
            .then((res) => res.json())
            .then((data) => {
                data.forEach((item) => {
                    let li = document.createElement('li');
                    li.textContent = item.name;
                    ul.appendChild(li);
                })
            })
        })
    })
    
}
