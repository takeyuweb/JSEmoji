/*
  TypeCastの[E:name]絵文字表記をimgタグに置換
  Copyright (C) 2010 Yuichi Takeuchi
  GPL v2
*/

// E2Emoji(document.body, 'http://takeyu-web.com/path/emoticons/');
function E2Emoji(p, baseURL){
    for(var i=0,n;n=p.childNodes[i];++i) {
	if(n.nodeName=="#text") {
	    var span = document.createElement('span');
	    span.innerHTML = n.nodeValue.replace(/\[E:([\w\-]{0,16})\]/g, function(all, name) {
		return '<img class="emoticon '+name+'" src="'+baseURL+name+'.gif" />';
	    });
	    p.insertBefore(span, n);
	    p.removeChild(n);
	} else {
	    arguments.callee(n, baseURL);
	}
    }
}
