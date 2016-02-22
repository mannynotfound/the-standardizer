import {convertTumblrPost} from './converters/tumblrConverter'
import {convertTwitterPost} from './converters/twitterConverter'
import {convertInstagramPost} from './converters/instagramConverter'
import {convertGithubRepo} from './converters/githubConverter'
import {convertBehanceProject} from './converters/behanceConverter'

const standardize = (posts) => {
  if (!Array.isArray(posts)) return posts
  else return posts.map((p) => {
    if (p.id_str) {
      return convertTwitterPost(p)
    } else if (p.blog_name) {
      return convertTumblrPost(p)
    } else if (p.filter) {
      return convertInstagramPos(p)
    } else if (p.default_branch) {
      return convertGithubRepo(p)
    } else if (p.canvas_width) {
      return convertBehanceProject(p)
    } else return p
  })
}

export default {
  'standardize': standardize,
  'standardizeTumblr': convertTumblrPost,
  'standardizeTwitter': convertTwitterPost,
  'standardizeInstagram': convertInstagramPost,
  'standardizeBehance': convertBehanceProject,
  'standardizeGithub': convertGithubRepo
}
