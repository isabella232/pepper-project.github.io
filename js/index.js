//<![CDATA[
function update_links(tab) {
  var old_href = $(tab).attr('href');
  // links to external resources
  if (old_href.indexOf('http') == 0) {
    return;
  }
  var id_offset = old_href.indexOf('.php');
  // links to non php resources (e.g. pptx, pdf);
  if (id_offset == -1) {
    return;
  }
  var hash_offset = old_href.indexOf('#');
  var new_href = '';
  // cross tab toggle.
  if (hash_offset != -1) {
    new_href = old_href.substr(hash_offset);
  } else {
    new_href = '#' + old_href.substr(0, id_offset);
  }
  $(tab).attr('href', new_href);
}

function navigate_to_tag(tag) {
  if (tag !== '') {
    if (!($(tag).hasClass('active') || $('.tab-content .active').find(tag).length > 0)) {
      $('#nav-tab li.active').removeClass('active');
      var target_id = $(tag).closest('.my-tab-pane').attr('id');
      $('a[href="#' + target_id + '"]').tab('show');
    }
  } else {
    if (!$('#home').hasClass('active')) {
      $('a[href="#home"]').tab('show');
    }
  }
}

$(document).ready(function() {
  // rewrite all links.
  $('#nav-tab a.collapse-toggle').attr('href', '#');
  $('#nav-tab a.tab-toggle').each(function (index) {
    var href = $(this).attr('href');
    var id = href.split('.')[0];
    if (id == 'index') {
      $('#home').find('a').each(function() {
        update_links(this);
      });
      $('#home').addClass('tab-pane');
      $(this).attr('href', '#home');
    } else {
      $('#' + id).find('a').each(function() {
        update_links(this);
      });
      $('#' + id).removeClass('active');
      $('#' + id).addClass('tab-pane');
      $(this).attr('href', '#' + id);
    }
  });

  if ($(window).width()<1174) {
    $('#nav-tab').removeClass('affix');
  }

  $('#nav-tab .tab-toggle').click(function (e) {
    $('#nav-tab li.active').removeClass('active');
    $(this).tab('show');
    history.pushState(null, null, e.target.hash);
    e.preventDefault();
    });

  $('a.cross-tab-toggle').click(function (e) {
    var target_id = $($(this).attr('href')).closest('.my-tab-pane').attr('id');
    $('a[href="#' + target_id + '"]').tab('show');
    });

  window.addEventListener("popstate", function(e) {
    navigate_to_tag(location.hash);
  });

  $('#nav-tab .collapse-toggle').click(function (e) {
    if ($(this).next('ul').hasClass('collapse')) {
      $(this).next('ul').collapse('show');
      $(this).find('span.down-caret').removeClass('down-caret').addClass('up-caret');
      $(this).next('ul').find('a')[0].click();
    } else {
      $(this).next('ul').collapse('hide');
      $(this).find('span.up-caret').removeClass('up-caret').addClass('down-caret');
    }
    e.preventDefault();
  });

  $('#nav-tab .tab-toggle').on('shown.bs.tab', function (e) {
    if ($(this).parents('#about-collapse').length<=0) {
      if (!$('#nav-tab .collapse-toggle').next('ul').hasClass('collapse')) {
        $('#nav-tab .collapse-toggle').next('ul').collapse('hide');
        $('#nav-tab .collapse-toggle').find('span.up-caret').removeClass('up-caret').addClass('down-caret');
      }
    } else {
      $('#nav-tab .collapse-toggle').next('ul').collapse('show');
      $('#nav-tab .collapse-toggle').find('span.down-caret').removeClass('down-caret').addClass('up-caret');
    }

    if ($(location.hash).hasClass('my-tab-pane')) {
      $('html,body').scrollTop(0);
    } else {
      if ($(location.hash).offset() != undefined) {
        var offset = $(location.hash).offset().top;
        $('html, body').scrollTop(offset);
      }
    }
  });

  navigate_to_tag(location.hash);
});
//]]>
