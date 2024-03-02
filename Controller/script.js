$(document).ready(function(){
 
  function applyTabStyles(tabContent) {
    tabContent.find('.url-input').addClass('url-input-style');
    tabContent.find('.go-btn').addClass('go-btn-style');
    tabContent.find('.searchBox').addClass('searchBox-style');
  }

  
  function createNewTab(tabId, tabIndex) {
  
    var randomLightColor = 'hsl(' + (Math.random() * 360) + ', 100%, 85%)';

    
    var gradientColor = 'linear-gradient(to bottom, ' + randomLightColor + ', #ffffff)';

    var newTabContent = 
      '<div class="tab-content" id="' + tabId + '">' + 
        '<div class="searchBox">' +
          '<input type="text" class="url-input" placeholder="Enter URL">' +
          '<button class="go-btn">Go</button>' +
        '</div>' +
        '<iframe class="tab-iframe" src="" frameborder="0"></iframe>' + 
      '</div>';

    
    $('.tab-contents').append(newTabContent);

    
    applyTabStyles($('#' + tabId));

    
    $('#' + tabId).css('background', gradientColor);

    
    $('.tab-list-item').removeClass('active');
    $('.tab-content').removeClass('active');
    $('[data-tab="' + tabId + '"]').addClass('active');
    $("#" + tabId).addClass('active');
  }

  
  createNewTab('tab1', 1);

  
  $(document).on('click', '.tab-list-item', function(){
    var tab_id = $(this).attr('data-tab');

    
    $('.tab-list-item').removeClass('active');
    $('.tab-content').removeClass('active');

   
    $(this).addClass('active');
    $("#" + tab_id).addClass('active');
  });

 
  $(document).on('click', '.add-tab', function(){
    var lastTabIndex = $('.tab-list-item').length > 0 ? parseInt($('.tab-list-item:last').attr('data-tab').replace('tab', '')) || 0 : 0;
    var newTabIndex = lastTabIndex + 1;
    var newTabId = "tab" + newTabIndex;

   
    $('<li class="tab-list-item" data-tab="' + newTabId + '">Tab ' + newTabIndex + ' <span class="close">x</span></li>').insertBefore('.add-tab');

    
    createNewTab(newTabId, newTabIndex);
  });

 
  $(document).on('click', '.close', function(){
    var tab_id = $(this).parent().attr('data-tab');

    
    $("#" + tab_id).remove();
    $(this).parent().remove();
  });

  
  $(document).on('click', '.go-btn', function(){
    loadUrl();
  });

  
  $(document).on('keypress', '.url-input', function(e){
    if(e.which === 13){
      loadUrl();
    }
  });

  
  function loadUrl(){
    var tabId = $('.tab-list-item.active').attr('data-tab');
    var inputUrl = $("#" + tabId + " .url-input").val();
    var iframeSrc = $("#" + tabId + " .tab-iframe").attr('src');

    
    if (inputUrl !== '') {
      var iframe = $("#" + tabId + " .tab-iframe");
      var fullUrl = inputUrl + (inputUrl.includes('?') ? '&' : '?') + 'igu=1'; 
      iframe.attr('src', fullUrl);
      
     
      iframe.on('load', function(){
        var iframeDocument = $(this).contents();
        if (iframeDocument.find('title').text() === 'Blocked') {
          iframe.addClass('error-message');
          iframe.html('<p>Oops! It will not open due to security policy.</p>');
        } else {
          iframe.removeClass('error-message');
        }
      });
    }
  }
});