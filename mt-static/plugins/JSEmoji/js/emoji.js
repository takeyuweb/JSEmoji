/*
  TypeCastの[E:name]絵文字表記をimgタグに置換
  Copyright (C) 2010 Yuichi Takeuchi
  GPL v2
*/

// E2Emoji(document.body, 'http://takeyu-web.com/path/emoticons/');
function E2Emoji(p, baseURL){
	for(var i=0,n;n=p.childNodes[i];++i) {
		if(n.nodeName=="#text") {
		    if(n.nodeValue.match(/^\s+$/)) continue;
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

// コメント入力欄に絵文字パレットを追加
function AttachEmojiPallet(fieldId, baseURL) {
	var commentField = document.getElementById(fieldId);
	var newElem = document.createElement("div");
	html = '';
	for (var i=0; i<emojiList.length; i++) {
		var name = emojiList[i];
		html += '<a href="#" onclick="insertEmoji(\''+ fieldId +'\', \'' + name +'\'); return false;"><img alt="'+name+'" src="' + baseURL + '/'+ name +'.gif" width="16" height="16" /></a>';
	}
	newElem.innerHTML = html;
	commentField.parentNode.insertBefore(newElem, commentField);
}

function insert(targetID, str){
    var target = document.getElementById(targetID);
    var text = target.value;
    var length = text.length;
    var point = 0;
    var isMSIE = /*@cc_on!@*/false; 
    if(isMSIE){
		target.focus();
		var range = document.selection.createRange();
		var clone = range.duplicate();
		try{
		    clone.moveToElementText(target);
		    clone.setEndPoint( 'EndToEnd', range );
		    point = clone.text.length - range.text.length;
		} catch(e) {
		    range.moveStart( "character", - target.value.length );
		    point = range.text.length;
		}
    } else {
		point = target.selectionStart;
    }
    var header = text.substr(0, point);
    var footer = text.substr(point, length);
    target.value = header + str + footer;
    
    // カーソルを絵文字コードの後ろに移動
    var cursorPos = point+str.length;
    if(isMSIE) {
		var range = target.createTextRange();
		range.move('character', cursorPos);
		range.select();
	} else {
		target.setSelectionRange(cursorPos, cursorPos);
	}

    target.focus();
}

function insertEmoji(targetID, name){
    insert(targetID, "[E:"+name+"]");
}

var emojiList = [
'sun',
'cloud',
'rain',
'snow',
'thunder',
'typhoon',
'mist',
'sprinkle',
'aries',
'taurus',
'gemini',
'cancer',
'leo',
'virgo',
'libra',
'scorpius',
'sagittarius',
'capricornus',
'aquarius',
'pisces',
'sports',
'baseball',
'golf',
'tennis',
'soccer',
'ski',
'basketball',
'motorsports',
'pocketbell',
'train',
'subway',
'bullettrain',
'car',
'rvcar',
'bus',
'ship',
'airplane',
'house',
'building',
'postoffice',
'hospital',
'bank',
'atm',
'hotel',
'24hours',
'gasstation',
'parking',
'signaler',
'toilet',
'restaurant',
'cafe',
'bar',
'beer',
'fastfood',
'boutique',
'hairsalon',
'karaoke',
'movie',
'upwardright',
'carouselpony',
'music',
'art',
'drama',
'event',
'ticket',
'smoking',
'nosmoking',
'camera',
'bag',
'book',
'ribbon',
'present',
'birthday',
'telephone',
'mobilephone',
'memo',
'tv',
'game',
'cd',
'heart',
'spade',
'diamond',
'club',
'eye',
'ear',
'rock',
'scissors',
'paper',
'downwardright',
'upwardleft',
'foot',
'shoe',
'eyeglass',
'wheelchair',
'newmoon',
'moon1',
'moon2',
'moon3',
'fullmoon',
'dog',
'cat',
'yacht',
'xmas',
'downwardleft',
'phoneto',
'mailto',
'faxto',
'info01',
'info02',
'mail',
'by-d',
'd-point',
'yen',
'free',
'id',
'key',
'enter',
'clear',
'search',
'new',
'flag',
'freedial',
'sharp',
'mobaq',
'one',
'two',
'three',
'four',
'five',
'six',
'seven',
'eight',
'nine',
'zero',
'ok',
'heart01',
'heart02',
'heart03',
'heart04',
'happy01',
'angry',
'despair',
'sad',
'wobbly',
'up',
'note',
'spa',
'cute',
'kissmark',
'shine',
'flair',
'annoy',
'punch',
'bomb',
'notes',
'down',
'sleepy',
'sign01',
'sign02',
'sign03',
'impact',
'sweat01',
'sweat02',
'dash',
'sign04',
'sign05',
'slate',
'pouch',
'pen',
'shadow',
'chair',
'night',
'soon',
'on',
'end',
'clock',
'appli01',
'appli02',
't-shirt',
'moneybag',
'rouge',
'denim',
'snowboard',
'bell',
'door',
'dollar',
'pc',
'loveletter',
'wrench',
'pencil',
'crown',
'ring',
'sandclock',
'bicycle',
'japanesetea',
'watch',
'think',
'confident',
'coldsweats01',
'coldsweats02',
'pout',
'gawk',
'lovely',
'good',
'bleah',
'wink',
'happy02',
'bearing',
'catface',
'crying',
'weep',
'ng',
'clip',
'copyright',
'tm',
'run',
'secret',
'recycle',
'r-mark',
'danger',
'ban',
'empty',
'pass',
'full',
'leftright',
'updown',
'school',
'wave',
'fuji',
'clover',
'cherry',
'tulip',
'banana',
'apple',
'bud',
'maple',
'cherryblossom',
'riceball',
'cake',
'bottle',
'noodle',
'bread',
'snail',
'chick',
'penguin',
'fish',
'delicious',
'smile',
'horse',
'pig',
'wine',
'shock'
];
