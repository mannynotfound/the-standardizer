<p align="center" style="margin-bottom: -20px;">
  <!-- lol -->
  <img src="https://raw.githubusercontent.com/artnotfound/the-standardizer/master/standardizer.png" />
</p>

# The Standardizer

The Standardizer's goal is to standardize API data models. This is specific to Art404's needs, but these utility scripts will convert APIs from social platforms to one we expect.
It currently supports Twitter, Tumblr, and Instagram.

## Motivation

By standardizing our data model we can build components that render in a predictable way without having to code platform handling logic. Also has the added benefit of stripping JSON size down to only what we need.

## Usage

### standardize all

```js
import {standardize} from 'the-standardizer'

request('myapirequestroute.com', (err, resp) => {
  if (err) console.error(err)
  else {
    // standardize the response assuming its an array of api objects
    const standardizedPosts = standardize(resp)
    // do something with resp
    someOtherFunc(standardizedPosts)
  }
})
```

> _NOTE: Expects an array of objects, usually from a single platform but mixed is fine too._

### standardize specific

While `standardize` will automatically determine type for you, if you want to be specific you can import standardizers individually like so: 

```js
import {standardizeTumblr} from 'the-standardizer'

request('tumblr.api.com/posts/whatever', (err, resp) => {
  if (err) console.error(err)
  else {
    // standardize the Tumblr response
    const standardizedPosts = standardizeTumblr(resp)
    // do something with resp
    someOtherFunc(standardizedPosts)
  }
})
```

> _NOTE: Expects a single object from a specific platform._


Using any of the convert scripts will transform your objects into a data model that looks like so:

```js
{
  "title": "5 Million 1 Terabyte",
  "id": 136478152056,
  "url": "5m1t",
  "priority": 900,
  "text": "A hard-drive that has 5 million dollars worth of information acquired from torrented files",
  "created_at": "2016-01-02 20:17:24 GMT",
  "type": "media",
  "source": {
    "platform": "tumblr",
    "author": "art404",
    "author_avatar": "http://pbs.twimg.com/profile_images/652614485002207232/s5s3R6ff_normal.jpg",
    "author_url": "http://art404.tumblr.com",
    "url": "http://art404.tumblr.com/5m1t"
  },
  "stats": {
    "views": null,
    "likes": 72,
    "reshares": 112
  },
  "tags": [
    "hardware",
    "data mining",
    "torrents",
    "big data",
    "piracy"
  ],
  "media": [
    {
      "type": "photo",
      "url": "http://56.media.tumblr.com/5449b95c9e036d38fd7c31d4a213784d/tumblr_o0cdp0Ml1P1sz85suo1_400.png",
      "embed": null,
      "alt_sizes": {
        "small": "http://56.media.tumblr.com/5449b95c9e036d38fd7c31d4a213784d/tumblr_o0cdp0Ml1P1sz85suo1_75sq.png",
        "medium": "http://56.media.tumblr.com/5449b95c9e036d38fd7c31d4a213784d/tumblr_o0cdp0Ml1P1sz85suo1_250.png",
        "large": "http://56.media.tumblr.com/5449b95c9e036d38fd7c31d4a213784d/tumblr_o0cdp0Ml1P1sz85suo1_500.png"
      }
    }
  ],
  "additional": {
    "collaborators": [],
    "embeds": [],
    "comments": [],
    "press": [],
    "project_link": ""
  }
}
```

#### Project Data Model Properties

Property | Type | Default | Description
:------- | :--- | :------ | :----------
title | `String` | `null` | Label to be used as project title
id | `Number` | none | Unique id, if source has id we use that one otherwise create one
url | `String` | none | Url slug that will be used for project detail page, manually set or generated from source
priority | `Number` | `0` | 0-1000, will affect a projects position when creating collection previews
text | `String` | `null` | Related project copy
created_at | `String` | none | Date project was posted, also used in conjunction with priority to determine project position
type | `String` | none | Project types dictatate what components will render them, manually set or generated from source
source | `Object` | none | Contains relevant info from a project's source (where its hosted)
stats | `Object` | `null` | Statistical info about project
tags | `Array` | none | Tags are used to sort projects and create relationships
media | `Array` | `null` | External media links, with types and alt sizes if available
additional | 'Object' | `null` | Any meta data not existant on the source manually added by contributor

