window.App = Ember.Application.create()

App.VERSION = '0.1.0'
App.NAMESPACE = 'byt'

Ember.TextField.reopen
  attributeBindings: ['min', 'max']