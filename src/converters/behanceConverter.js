import moment from 'moment'

const getBehanceMedia = (p) => {
  if (!p.modules) return []

  let media = []

  p.modules.forEach((m) => {
    if (m.type !== 'image') return

    media.push({
      'type': 'photo',
      'url': m.sizes.disp,
      'height': m.dimensions.disp.height,
      'width': m.dimensions.disp.width
    })
  })

  return media
}

const convertBehanceProject = (p) => {
  return {
    'title': p.name,
    'id': p.id.toString(),
    'url': p.name.toLowerCase().replace(/ /g, '-'),
    'priority': 0,
    'text': p.description,
    'created_at': moment.unix(p.created_on).format(),
    'type': 'media',
    'source': {
       'platform': 'behance',
       'author': p.owners[0].username,
       'author_avatar': p.owners[0].images['100'],
       'author_url': p.owners[0].url,
       'url': p.url
    },
    'stats': {
      'views': p.stats.views,
      'likes': p.stats.appreciations,
      'reshares': null
    },
    'tags': p.tags,
    'media': getBehanceMedia(p),
    'additional': {
       'collaborators': null,
       'embeds': null,
       'comments': null,
       'press': null,
       'project_link': p.url
    }
  }
}

export {convertBehanceProject}
