
//var theme = require('../../scripts/modules/theme');
module.exports = function theme() {

  return function applyTheme() {

    var pos1, pos2, themeName, link;

    if(/theme=/i.test(window.location.href)) {
      pos1 = window.location.href.indexOf('theme=') + 'theme='.length;
      pos2 = window.location.href.indexOf('&', pos1);

      if(pos2 > -1) {
        themeName = window.location.href.slice(pos1, pos2+1);
      }
      else {
        themeName = window.location.href.slice(pos1);
      }

      var mainStyles = document.querySelector('#main-styles');
      mainStyles.setAttribute('href', mainStyles.getAttribute('href').replace('main.css', 'themes/' + theme + '.css'));

      // if(themeName.length) {
      //   link = document.createElement('link');
      //   link.setAttribute('rel', 'stylesheet');
      //   link.setAttribute('href', '../../styles/themes/' + theme + '.css');
      //   document.querySelector('head').appendChild(link);
      // }

    }

  };

};
