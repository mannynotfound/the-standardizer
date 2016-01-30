import moment from 'moment'

const getTwitterMedia = (p) => {
  let media = [], hasMedia = false, extended = false

  if (p.entities && p.entities.media && p.entities.length) hasMedia = true
  else if (p.extended_entities && p.extended_entities.media && p.extended_entities.media.length) {
     hasMedia = true
     extended = true
  }

  if (!hasMedia) return
  else if (extended) {
    p.extended_entities.media.forEach((e, i) => {
      switch (e.type) {
        case 'photo':
        case 'animated_gif':
          media.push({
            'type': e.type === 'animated_gif' ? 'gif' : e.type,
            'url': e.media_url,
            'height': e.sizes.large.h,
            'width': e.sizes.large.w
          })
          break
        case 'video':
          let chunks = e.variants[0].url.split('/')
          let sizes = chunks[chunks.length - 2].split('x')
          media.push({
            'type': 'video',
            'url': e.variants[0].url,
            'height': sizes[1],
            'width': sizes[0]
          })
      }
    })
  } else {
    p.entities.media.forEach((e, i) => {
      media.push({
        'type': 'photo',
        'url': e.media_url,
        'height': e.sizes.large.h,
        'width': e.sizes.large.w
      })
    })
  }

  return media
}

const getTwitterPriority = (p) => {
  if (p.retweet_count > 50) return p.retweet_count
  else if (p.favourites_count > 100) return p.favourites_count
  else return 0
}

const getTwitterType = (p) => {
  let hasMedia = false

  if (p.entities && p.entities.media && p.entities.length) hasMedia = true
  else if (p.extended_entities && p.extended_entities.media && p.extended_entities.media.length) hasMedia = true

  return hasMedia ? 'media' : 'text'
}

const getTwitterText = (p) => {
  if (p.retweeted_status) return p.retweeted_status.text
  else return p.text
}

const getTwitterUrl = (p) => {
  const chunks = p.url.split('/')
  return chunks[chunks.length - 2]
}

const convertTwitterPost = (p) => {
  return {
    'title': p.id_str,
    'id': p.id_str,
    'url': p.id_str,
    'priority': getTwitterPriority(p),
    'text': getTwitterText(p),
    'created_at': moment(p.created_time).format(),
    'type': getTwitterType(p),
    'source': {
       'platform': 'twitter',
       'author': p.user.screenname,
       'author_avatar': p.user.profile_image_url,
       'author_url': `http://twitter.com/${p.user.screen_name}`,
       'url': `http://twitter.com/${p.user.screen_name}/status/${p.id_str}`
    },
    'stats': {
      'views': null,
      'likes': p.favorite_count,
      'reshares': p.retweet_count
    },
    'tags': p.entities.hashtags,
    'media': getTwitterMedia(p),
    'additional': {
       'collaborators': null,
       'embeds': null,
       'comments': null,
       'press': null,
       'project_link': null
    }
  }
}

export {convertTwitterPost}
