import moment from 'moment'

const getTumblrMedia = (p) => {
  if (p.type !== 'photo' && p.type !== 'audio' && p.type !== 'video') {
    return null
  }

  let media = []

  if (p.type === 'photo') {
    p.photos.forEach( (photo) => {
      media.push({
        'type': 'photo',
        'url': photo.alt_sizes[1].url,
        'height': photo.alt_sizes[1].height,
        'width': photo.alt_sizes[1].width,
        'alt_sizes': {
          'small': photo.alt_sizes[photo.alt_sizes.length - 1],
          'medium': photo.alt_sizes[Math.floor(photo.alt_sizes.length / 2)],
          'large': photo.alt_sizes[0]
        }
      })
    })
  }

  if (p.type === 'audio') {
    media.push({
      'type': 'audio',
      'player': p.player
    })
  }

  if (p.type === 'video') {
    media.push({
      'type': p.type,
      'player': p.player[p.player.length - 1].embed_code,
      'width': p.player[p.player.length - 1].width,
      'alt_sizes': {
        'small': {
          'width': p.player[0].width,
          'player': p.player[0].embed_code
        },
        'medium': {
          'width': p.player[1].width,
          'player': p.player[1].embed_code
        }
      }
    })
  }

  return media
}

const getTumblrType = (p) => {
  switch (p.type) {
    case 'photo':
    case 'audio':
    case 'video':
      return 'media'
    case 'text':
    case 'quote':
    case 'chat':
    case 'link':
    case 'answer':
      return 'text'
  }
}

const getTumblrText = (p) => {
  switch (p.type) {
    case 'photo':
    case 'video':
    case 'audio':
      return p.caption
    case 'text':
      return p.body
    case 'quote':
      return p.text
    case 'link':
      return p.excerpt
    case 'chat':
      return p.body
    case 'answer':
      return p.answer
  }
}

const getTumblrUrl = (p) => {
  const chunks = p.post_url.split('/')
  return chunks[chunks.length - 1]
}

const getTumblrTitle = (p) => {
  const chunks = p.post_url.split('/')
  let title = chunks[chunks.length - 1]
  return title.replace(/-/g,' ')
}

const convertTumblrPost = (p) => {
  return {
    'title': getTumblrTitle(p),
    'id': p.id.toString(),
    'url': getTumblrUrl(p),
    'priority': p.note_count > 100 ? p.note_count : 0,
    'text': getTumblrText(p),
    'created_at': moment(p.date).format(),
    'type': getTumblrType(p),
    'source': {
       'platform': 'tumblr',
       'author': p.blog_name,
       'author_avatar': null,
       'author_url': `http://${p.blog_name}.tumblr.com`,
       'url': p.post_url
    },
    'stats': {
      'views': p.plays || null,
      'likes': p.note_count,
      'reshares': null
    },
    'tags': p.tags,
    'media': getTumblrMedia(p),
    'additional': {
       'collaborators': null,
       'embeds': null,
       'comments': null,
       'press': null,
       'project_link': null
    }
  }
}

export {convertTumblrPost}
