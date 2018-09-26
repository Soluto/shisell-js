# ![Shisell](http://i.imgur.com/mDUAVwl.png)
[![Build Status](https://api.travis-ci.org/Soluto/shisell-js.svg?branch=master)](https://travis-ci.org/Soluto/shisell-js)
[![Code Climate](https://codeclimate.com/github/Soluto/shisell-js/badges/gpa.svg)](https://codeclimate.com/github/Soluto/shisell-js)
[![Test Coverage](https://codeclimate.com/github/Soluto/shisell-js/badges/coverage.svg)](https://codeclimate.com/github/Soluto/shisell-js/coverage)
[![Dependency Status](https://www.versioneye.com/user/projects/595b5fa5368b080033562e8b/badge.svg?style=flat-square)](https://www.versioneye.com/user/projects/595b5fa5368b080033562e8b)

Shisell is a service agnostic abstraction for analytic dispatchers.

It helps you dispatch analytic events which are scoped to a component or module. It allows providing extra data (properties), identities, and metadata to the dispatched events. Shisell's analytic dispatchers are immutable and can be composed by passing a dispatcher object to a child module. Shisell can be used as an abstraction for sending analytic events so you can easily switch or add analytic services without rewriting the event dispatching code.

Shisell is isomorphic and can be used on different environments (client, server, and native).

## Install

```sh
$ yarn add shisell
```

## Usage

At the initialization code of your app, you should create a root dispatcher object. This root dispatcher is the "parent" of all dispatchers, and it is where you would set up common properties which needs to be attached to all the dispatched events.  
In order to create the root dispatcher, shisell needs to receive a writer function. The writer function is just a function that accepts an object of type [AnalyticsEventModel](https://github.com/Soluto/shisell-js/blob/master/lib/AnalyticsEventModel.js), and usually writes it to an analytics service (e.g. Mixpanel, Google Analytics etc.). 
Out of the box Shisell comes with a writer function which outputs the event to the console.

Use the following code to use the built in dispatcher:  

```js
const rootDispatcher = shisell.createRootDispatcher(shisell.writers.console);
```

Once the root dispatcher is created you can compose dispatchers by extending with one of the extender methods methods. Finally, call dispatch on one of the dispatchers with an event name.

```js
//Composing dispatchers
const loginViewDispatcher = rootDispatcher.extend(createScoped('LoginView'));
const registrationBoxDispatcher = loginViewDispatcher.extend(withExtra('type', 'registration'));
//...
document.getElementById('btn-register').addEventListener("click", function(){
  registrationBoxDispatcher.extend(withIdentity('email', userEmail), withExtra('btn','register')).dispatch('click');
});

//console output:
// {  
//    "Scope":"LoginView",
//    "Name":"click",
//    "MetaData":{},
//    "ExtraData":{  
//       "type":"registration",
//       "btn":"register"
//    },
//    "Identities":{  
//       "email":"shisell@soluto.com"
//    }
// }
```

#### Using Filters

Filters are functions which are executed by the root dispatcher when dispatching events. Filters can be used to add dynamic values to the dispatched event.  
Here's an example adding a Timestamp propery:

```js
const rootDispatcher = shisell
                      .createRootDispatcher(shisell.writers.console)
                      .extend(withFilter(function(model){
                        return Promise.resolve()
                          .then(function(){
                            model.ExtraData["timestamp"] = new Date().getTime();
                          });
                        }));

const homePageDispatcher = rootDispatcher.extend(createScoped('HomePage'));
//...
homePageDispatcher.dispatch('PageView')

//console output:
// {  
//    "Scope":"HomePage",
//    "Name":"PageView",
//    "MetaData":{  
//
//    },
//    "ExtraData":{  
//       "timestamp":1448185925589
//    },
//    "Identities":{  
//
//    }
// }
```

Note: currently filters have to be asynchronous (return a promise).

#### Extending the Dispatcher
We use several different extension methods for composing dispatchers, and you can easily add a custom one. For example, let's say that we frequently create dispatchers with several extra data properties that are part of our user model. So we have this sort of code often:

```js
const homeViewDispatcher = rootDispatcher.extend(
  withExtra('firstName', user.firstName),
  withExtra('lastName', user.lastName),
  withExtra('email', user.email),
  withExtra('age', user.age),
);
```

Instead of writing this code every time you can add a method that does this for you:

```js
function withUser(user) {
  const newContext = new AnalyticsContext();
  newContext.ExtraData['firstName'] = user.firstName;
  newContext.ExtraData['lastName'] = user.lastName;
  newContext.ExtraData['email'] = user.email;
  newContext.ExtraData['age'] = user.age;
  
  return withContext(newContext);  
} 

//Usage
const homeViewDispatcher = rootDispatcher.extend(withUser(user));
```

#### Creating a Custom Root Dispatcher
When you call 'dispatch' on a dispatcher, it creates a union of the [AnalyticsContext](https://github.com/Soluto/shisell-js/blob/master/lib/AnalyticsContext.js) of each dispatcher along the way until reaching the root dispatcher. The default root dispatcher that is generated by calling 'createRootDispatcher' simply converts the unified context to an AnalyticsEventModel and passes it on to the writer function.

If you would like to use a different model than the AnalyticsEventModel you can create your own custom dispatcher by creating a new [AnalyticsDispatcher](https://github.com/Soluto/shisell-js/blob/master/lib/AnalyticsDispatcher.js) and passing it a function that receives two parameters - the eventName and the context.

Note: it is the root dispatcher's responsibility to run the filters.


#### Legacy Support
Previous version of this package used a different syntax. If you want to update the package and use the new syntax, but don't want to update all the places that still use the old syntax, simply add this line once:
```js
shisell.legacySupport();
```

## Contributing
Thanks for thinking about contributing! We are looking for contributions of any sort and size - features, bug fixes, documentation or anything else that you think will make shisell better.
* Fork and clone locally
* Create a topic specific branch
* Add a cool feature or fix a bug
* Add tests
* Send a Pull Request

#### Running Tests
```sh
$ yarn test
```
