(function() {
  var card  = document.querySelectorAll('.card');
  var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd',
      'MozTransition'    : 'transitionend',
      'transition'       : 'transitionend'
  },
  transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];

  function addDashes(name) {
    return name.replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); });
  }

  function getPopup(id) {
    return document.querySelector('.popup[data-popup="' + id + '"]');
  }

  function getDimensions(el) {
    return el.getBoundingClientRect();
  }

  function getDifference(card, popup) {
    var cardDimensions = getDimensions(card),
        popupDimensions = getDimensions(popup);

    return {
      height: popupDimensions.height / cardDimensions.height,
      width: popupDimensions.width / cardDimensions.width,
      left: popupDimensions.left - cardDimensions.left,
      top: popupDimensions.top - cardDimensions.top
    }
  }

  function transformCard(card, size) {
    return card.style[Modernizr.prefixed('transform')] = 'translate(' + size.left + 'px,' + size.top + 'px)' + ' scale(' + size.width + ',' + size.height + ')';
  }

  function scaleCard(e) {
    var target = e.target,
        id     = target.getAttribute('data-popup-id'),
        popup  = getPopup(id);

    var size = getDifference(target, popup);

       target.style[Modernizr.prefixed('transitionDuration')] = '0.5s';
       target.style[Modernizr.prefixed('transitionTimingFunction')] = 'cubic-bezier(0.4, 0, 0.2, 1)';
       target.style[Modernizr.prefixed('transitionProperty')] = addDashes(Modernizr.prefixed('transform'));
       target.style['borderRadius'] = 0;

      transformCard(target, size);
      onAnimated(target, popup);
      onPopupClick(target, popup);
  }

  function onAnimated(card, popup) {
     card.addEventListener(transEndEventName, function transitionEnded() {
       card.style['opacity'] = 0;
       popup.style['visibility'] = 'visible';
       popup.style['zIndex'] = 9999;
       card.removeEventListener(transEndEventName, transitionEnded);
     });
  }

  function onPopupClick(card, popup) {
    popup.addEventListener('click', function toggleVisibility(e) {
      var size = getDifference(popup, card);

      card.style['opacity'] = 1;
      card.style['borderRadius'] = '6px';
      hidePopup(e);
      transformCard(card, size);
    }, false);
  }


  function hidePopup(e) {
    e.target.style['visibility'] = 'hidden';
    e.target.style['zIndex'] = 2;
  }

  [].forEach.call(card, function(card) {
    card.addEventListener('click', scaleCard, false);
  });
})();
