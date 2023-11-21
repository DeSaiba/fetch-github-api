const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                            <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                             <div class="data">
                                 <h1>${user.name ?? 'Não possui nome cadastrado 😥'}</h1>
                                 <p>${user.bio ?? 'Não possui bio cadastrado 😥'}</p>
                                 <p>👥Seguidores ${user.followers ?? 0}</p>
                                 <p>👥Seguindo ${user.following ?? 0}</p>
                             </div>
                         </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}
                                                                    <ul class="repo-info">
                                                                        <li class="subinfo">🍴${repo.forks}</li> 
                                                                        <li class="subinfo">⭐${repo.stargazers_count}</li> 
                                                                        <li class="subinfo">👀${repo.watchers}</li> 
                                                                        <li class="subinfo">👨‍💻${repo.language}</li>
                                                                    </ul>
                                                                    </a>
                                                                 </li>`)

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                             <h2>Repositórios</h2>
                                              <ul>${repositoriesItens}</ul>
                                         </div>`
        }
        
        let eventsItens = ''
        user.events.forEach(event => {
            if (event.payload && event.payload.commits){
            eventsItens += `<li><span>${event.repo.name}</span> -${event.payload.commits[0].message}</li>`
            }
        })
    
        if(user.events.length > 0) {
            this.userProfile.innerHTML += `<div class="events-data">
                                                <h2>Eventos</h2>
                                                <ul>${eventsItens}</ul>
                                            </div>`
        }
    },
    
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }