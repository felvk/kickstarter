module.exports = function theme() {

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

      if(themeName.length) {
        var mainStyles = document.querySelector('#main-styles');
        mainStyles.setAttribute('href', mainStyles.getAttribute('href').replace('main.css', 'themes/' + themeName + '.css'));
      }

    }

};
