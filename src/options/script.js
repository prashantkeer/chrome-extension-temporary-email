import './style.scss'
import tenminutemail from '../js/providers/10minutemail/config.js'

// initialize the view model
let sections = [{
  title: 'General settings',
  icon: 'cog',
  options: [{
    id: 'open-in-background',
    description: 'Open email tab in background',
    value: true
  }]
}]

// push the options of all providers to the view model
let PROVIDERS = [tenminutemail]
PROVIDERS.forEach((p) => {
  sections.push({
    title: p.title,
    icon: 'bookmark',
    options: p.options
  })
})

// import riot and tags
import riot from 'riot'

// adds storage capabilities to a component
var StorageMixin = {
  init: function () {
    let store = chrome.storage.sync

    // insert/update
    this.set = function (key, value, cb) {
      let query = {}
      query[key] = value
      store.set(query, cb)
    }

    // get
    this.get = function (key, cb) {
      store.get(key, function (response) {
        cb(response[key])
      })
    }
  }
}

// make all components storage mixins
riot.mixin(StorageMixin)

import './components.tag'

// mount the application
riot.mount('*', { sections: sections })