 javascript:(function() {
  var menu = document.createElement('div');
  var menuContent = document.createElement('div');
  var closeButton = document.createElement('span');
  var button = document.createElement('button');

  menu.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    background-color: rgba(0, 255, 255, 0.2); 
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    width: 200px;
  `;

  menuContent.style.padding = '10px';

  closeButton.style.cssText = `
    float: right;
    cursor: pointer;
    color: #333;
  `;
  closeButton.innerHTML = '&times;';
  closeButton.onclick = function() {
    menu.remove();
  };

  button.innerHTML = 'Launch ByeBlocker';
  button.style.cssText = `
    font-family: Arial;
    font-size: 16px;
    color: #fff;
    background-color: #333;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    margin-top: 10px;
    cursor: pointer;
  `;
  button.onclick = function() {
    var link = prompt("Url?");
    var proxy = 'https://api.codetabs.com/v1/proxy?quest=';
    fetch(proxy + link)
      .then((response) => response.text())
      .then((text) => document.write(text));
    var all = document.getElementsByTagName("*");
    for (var i = 0, max = all.length; i < max; i++) {
      if (all[i].src) {
        all[i].src = new URL(all[i].src, link).href;
        all[i].src = proxy + all[i].src;
      }
    }
    window.onbeforeunload = function(e) {
      e.preventDefault();
      alert(e.toString());
    };
    function locationHashChanged(e) {
      e.preventDefault();
      alert(e);
      window.location = new URL(e.oldURL, e.newURL).href;
    }
    window.onhashchange = locationHashChanged;
  };

  menuContent.appendChild(button);
  menuContent.appendChild(closeButton);
  menu.appendChild(menuContent);
  document.body.appendChild(menu);

  var isDragging = false;
  var mouseOffset = { x: 0, y: 0 };

  menuContent.addEventListener('mousedown', function(e) {
    isDragging = true;
    mouseOffset.x = e.pageX - menu.offsetLeft;
    mouseOffset.y = e.pageY - menu.offsetTop;
  });

  document.addEventListener('mousemove', function(e) {
    if (isDragging) {
      menu.style.left = (e.pageX - mouseOffset.x) + 'px';
      menu.style.top = (e.pageY - mouseOffset.y) + 'px';
    }
  });

  document.addEventListener('mouseup', function() {
    isDragging = false;
  });
})();
