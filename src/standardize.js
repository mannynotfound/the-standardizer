import tumblrConverter from './converters/tumblrConverter'
import twitterConverter from './converters/twitterConverter'
import instagramConverter from './converters/instagramConverter'

const standardize = (posts) => {
  return posts.map((p) => {
    if (p.id_str) {
      return twitterConverter(p)
    } else if (p.blog_name) {
      return tumblrConverter(p)
    } else if (p.filter) {
      return instagramConverter(p)
    }
  })
}

export default {
  'standardize': standardize,
  'standardizeTumblr': tumblrConverter,
  'standardizeTwitter': twitterConverter,
  'standardizeInstagram': instagramConverter
}
