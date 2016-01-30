import moment from 'moment'

const getInstagramMedia = (p) => {
  let media = []

  if (p.type === 'image') {
    media.push({
      'type': 'photo',
      'url': p.images.low_resolution.url,
      'height': p.images.low_resolution.height,
      'width': p.images.low_resolution.width,
      'alt_sizes': {
        'small': p.images.thumbnail,
        'large': p.images.standard_resolution
      }
    })
  }

  if (p.type === 'video') {
    media.push({
      'type': 'video',
      'url': p.videos.standard_resolution.url,
      'width': p.videos.standard_resolution.width,
      'height': p.videos.standard_resolution.height,
      'alt_sizes': {
        'small': p.videos.low_bandwidth
      }
    })
  }

  return media
}

const getInstagramText = (p) => {
  if (!p.caption) return null
  else return p.caption.text
}

const getInstagramUrl = (p) => {
  const chunks = p.link.split('/')
  return chunks[chunks.length - 2]
}

const convertInstagramPost = (p) => {
  return {
    'title': p.id,
    'id': p.id.toString(),
    'url': getInstagramUrl(p),
    'priority': p.likes.count > 100 ? p.likes.count : 0,
    'text': getInstagramText(p),
    'created_at': moment.unix(p.created_time).format(),
    'type': 'media',
    'source': {
       'platform': 'instagram',
       'author': p.user.username,
       'author_avatar': p.user.profile_picture,
       'author_url': `http://instagram.com/${p.user.username}`,
       'url': p.link
    },
    'stats': {
      'views': null,
      'likes': p.likes.count,
      'reshares': null
    },
    'tags': p.tags,
    'media': getInstagramMedia(p),
    'additional': {
       'collaborators': null,
       'embeds': null,
       'comments': null,
       'press': null,
       'project_link': null
    }
  }
}

export {convertInstagramPost}

