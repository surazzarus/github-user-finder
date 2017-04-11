$(document).ready(() => {
  $('#searchUser').on('keyup', (e) => {
    let username = e.target.value;

    //ajax request
    $.ajax({
      url: "https://api.github.com/users/" + username,
      data: {
        client_id: 'ab19231bccb6be4b93dc',
        client_secret: 'dd53efdf341c7f65e723bb894a3f270dcaa50976'
      }
    }).done((user) => {
      $.ajax({
        url: "https://api.github.com/users/" + username + "/repos",
        data: {
          client_id: 'ab19231bccb6be4b93dc',
          client_secret: 'dd53efdf341c7f65e723bb894a3f270dcaa50976',
          sort: 'created: asc',
          per_page: 5
        }
      }).done((repos) => {
        $.each(repos, (index, repo) => {
          $('#repos').append(`
              <div class="well">
                <div class="row">
                  <div class="col-md-7">
                    <strong>${repo.name}</strong>${repo.description}
                  </div>
                  <div class="col-md-3">
                    <span class="label label-primary">Forks: ${repo.forks_count}</span>
                    <span class="label label-success">Watchers: ${repo.watchers_count}</span>
                    <span class="label label-info">Stars: ${repo.stargezers_count}</span>
                  </div>
                  <div class="col-md-2">
                    <a href="${repo.html_url}" target="_blank" class="btn btn-default">Repo Page</a>
                  </div>
                </div>
              </div>

            `)
        })
      });
      $('#searchResult').html(`
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">${user.name}</h3>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-3">
                <img class="thumbnail avatar" src="${user.avatar_url}">
                <a class="btn btn-primary btn-block" target="_blank" href="${user.html_url}">View Profile</a>
              </div>
              <div class="col-md-9">
                <span class="label label-primary">Public Repos: ${user.public_repos}</span>
                <span class="label label-success">Public Gists: ${user.public_gists}</span>
                <span class="label label-info">Followers: ${user.followers}</span>
                <span class="label label-warning">Following: ${user.following}</span>
                <br/><br/>
                <ul class="list-group">
                  <li class="list-group-item">Company: ${user.company}</li>
                  <li class="list-group-item">Website/Blog: ${user.blog}</li>
                  <li class="list-group-item">Location: ${user.location}</li>
                  <li class="list-group-item">Member Since: ${user.created_at}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <h3 class="page-header">Latest Repos</h3>
        <div id="repos"></div>
      `);
    })
  })
})
