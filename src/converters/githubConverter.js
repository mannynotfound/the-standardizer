import moment from 'moment'

const convertGithubRepo = (p) => {
  return {
    'title': p.name,
    'id': p.id,
    'url': p.name.replace(/ /g, '-'),
    'priority': 0,
    'text': p.description,
    'created_at': moment(p.created_time).format(),
    'type': 'code',
    'source': {
       'platform': 'github',
       'author': p.owner.login,
       'author_avatar': p.owner.avatar_url,
       'author_url': p.owner.html_url,
       'url': p.html_url
    },
    'stats': {
      'views': null,
      'likes': p.stargazers_count,
      'reshares': p.forks
    },
    'tags': [p.language],
    'media': null,
    'additional': {
       'collaborators': null,
       'embeds': null,
       'comments': null,
       'press': null,
       'project_link': p.html_url
    }
  }
}

export {convertGithubRepo}

