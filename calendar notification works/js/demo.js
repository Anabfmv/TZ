var events = [
  {'Date': new Date(2019, 01, 02), 'Title': 'FFS Conf Down Under'},
  {'Date': new Date(2019, 01, 03), 'Title': 'Interaction Design Education Summit (IxDA)'},
  {'Date': new Date(2019, 01, 04), 'Title': 'Interaction Design Education Summit (IxDA)'},
  {'Date': new Date(2019, 01, 04), 'Title': 'Interaction (IxDA)'},
  {'Date': new Date(2019, 01, 05), 'Title': 'Interaction (IxDA)'},
  {'Date': new Date(2019, 01, 06), 'Title': 'Interaction (IxDA)'},
  {'Date': new Date(2019, 01, 07), 'Title': 'Interaction (IxDA)'},
  {'Date': new Date(2019, 01, 08), 'Title': 'Interaction (IxDA)'},
  {'Date': new Date(2019, 01, 09), 'Title': 'Interaction (IxDA)'},
  {'Date': new Date(2019, 01, 10), 'Title': 'Interaction (IxDA)'},
  {'Date': new Date(2019, 01, 06), 'Title': 'Pause Fest'},
  {'Date': new Date(2019, 01, 07), 'Title': 'Pause Fest'},
  {'Date': new Date(2019, 01, 08), 'Title': 'Pause Fest'},
  {'Date': new Date(2019, 01, 07), 'Title': 'JSConf Hawaii'},
  {'Date': new Date(2019, 01, 08), 'Title': 'JSConf Hawaii'},
  {'Date': new Date(2019, 01, 09), 'Title': 'Outcome'},
  {'Date': new Date(2019, 01, 09), 'Title': 'FrontFest'},
  {'Date': new Date(2019, 01, 11), 'Title': 'UXI Live'},
  {'Date': new Date(2019, 01, 12), 'Title': 'Webstock'},
  {'Date': new Date(2019, 01, 13), 'Title': 'Webstock'},
  {'Date': new Date(2019, 01, 14), 'Title': 'Webstock'},
  {'Date': new Date(2019, 01, 15), 'Title': 'Webstock'},
  {'Date': new Date(2019, 01, 16), 'Title': 'Webstock'},
  {'Date': new Date(2019, 01, 13), 'Title': 'Frontend Developer Love'},
  {'Date': new Date(2019, 01, 14), 'Title': 'Frontend Developer Love'},
  {'Date': new Date(2019, 01, 15), 'Title': 'Frontend Developer Love'},
  {'Date': new Date(2019, 01, 14), 'Title': 'Vue.js Amsterdam'},
  {'Date': new Date(2019, 01, 15), 'Title': 'Vue.js Amsterdam'},
  {'Date': new Date(2019, 01, 18), 'Title': 'FITC Amsterdam'},
  {'Date': new Date(2019, 01, 19), 'Title': 'FITC Amsterdam'},
  {'Date': new Date(2019, 01, 19), 'Title': 'UXistanbul'},
  {'Date': new Date(2019, 01, 19), 'Title': 'Konference UXZ praxe'},
  {'Date': new Date(2019, 01, 21), 'Title': 'The UX Conference'},
  {'Date': new Date(2019, 01, 21), 'Title': 'Agent Conf'},
  {'Date': new Date(2019, 01, 22), 'Title': 'Agent Conf'},
  {'Date': new Date(2019, 01, 23), 'Title': 'Agent Conf'},
  {'Date': new Date(2019, 01, 24), 'Title': 'Agent Conf'},
  {'Date': new Date(2019, 01, 25), 'Title': 'Experience Design Week'},
  {'Date': new Date(2019, 01, 26), 'Title': 'Experience Design Week'},
  {'Date': new Date(2019, 01, 27), 'Title': 'Experience Design Week'},
  {'Date': new Date(2019, 02, 11), 'Title': 'JS Kongress'},
  {'Date': new Date(2019, 02, 12), 'Title': 'JS Kongress'},
  {'Date': new Date(2019, 02, 11), 'Title': 'Source Up!'},
  {'Date': new Date(2019, 02, 12), 'Title': 'Source Up!'},
  {'Date': new Date(2019, 01, 12), 'Title': 'Sustainable UX: design vs. climate change'},
  {'Date': new Date(2019, 01, 21), 'Title': 'The UX Conference'},
  {'Date': new Date(2019, 02, 01), 'Title': 'ReactFoo'},
  {'Date': new Date(2019, 02, 02), 'Title': 'ReactFoo'},
  {'Date': new Date(2019, 02, 02), 'Title': 'ProfsoUX'},
  {'Date': new Date(2019, 02, 06), 'Title': 'Service Design in Government'},
  {'Date': new Date(2019, 02, 07), 'Title': 'Service Design in Government'},
  {'Date': new Date(2019, 02, 08), 'Title': 'Service Design in Government'},
  {'Date': new Date(2019, 02, 09), 'Title': 'UX Camp Brighton'},
  {'Date': new Date(2019, 02, 19), 'Title': 'GamesUR'},
  {'Date': new Date(2019, 02, 22), 'Title': 'UpFront'},
  {'Date': new Date(2019, 02, 12), 'Title': 'ConveyUX'},
  {'Date': new Date(2019, 02, 13), 'Title': 'ConveyUX'},
  {'Date': new Date(2019, 02, 18), 'Title': 'Design Thinking & Innovation Week'},
  {'Date': new Date(2019, 02, 19), 'Title': 'Design Thinking & Innovation Week'},
  {'Date': new Date(2019, 02, 20), 'Title': 'Design Thinking & Innovation Week'},
  {'Date': new Date(2019, 02, 21), 'Title': 'Design Thinking & Innovation Week'},
  {'Date': new Date(2019, 02, 22), 'Title': 'Design Thinking & Innovation Week'},
  {'Date': new Date(2019, 02, 25), 'Title': 'VueConf US'},
  {'Date': new Date(2019, 02, 26), 'Title': 'VueConf US'},
  {'Date': new Date(2019, 02, 27), 'Title': 'VueConf US'},
  {'Date': new Date(2019, 02, 30), 'Title': 'Reactathon'},
  {'Date': new Date(2019, 02, 31), 'Title': 'Reactathon'},
];

var settings = {};
var element = document.getElementById('caleandar');
caleandar(element, events, settings);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
  .then(reg => console.log('SW registered!', reg))
  .catch(err => console.log('Error!', err));
}

function showNotification(NameTitle, BodyText) {
  Notification.requestPermission(function(result) {
    if (result === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification(NameTitle, {
          body: BodyText
        });
      });
    }
  });
}