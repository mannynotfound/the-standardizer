import {convertTumblrPost} from './converters/tumblrConverter'
import {convertTwitterPost} from './converters/twitterConverter'
import {convertInstagramPost} from './converters/instagramConverter'

const standardize = (posts) => {
  return posts.map((p) => {
    if (p.id_str) {
      return convertTwitterPost(p)
    } else if (p.blog_name) {
      return convertTumblrPost(p)
    } else if (p.filter) {
      return convertInstagramPost(p)
    }
  })
}

export default {
  'standardize': standardize,
  'standardizeTumblr': convertTumblrPost,
  'standardizeTwitter': convertTwitterPost,
  'standardizeInstagram': convertInstagramPost
}
