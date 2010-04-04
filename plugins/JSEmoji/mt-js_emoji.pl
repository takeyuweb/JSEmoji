# $Id$

package MT::Plugin::JSEmoji;

use strict;
use warnings;
use utf8;

use MT::Plugin;
use base qw( MT::Plugin );

use vars qw($PLUGIN_NAME $VERSION);
$PLUGIN_NAME = 'JSEmoji';
$VERSION = '0.1.0';

use MT;
use MT::ConfigMgr;

my $plugin = MT::Plugin::JSEmoji->new({
    id => 'js_emoji',
    key => __PACKAGE__,
    name => $PLUGIN_NAME,
    version => $VERSION,
    description => "[E:名前]形式の絵文字表記をJavaScriptを使ってimgタグに変換します。",
    doc_link => '',
    author_name => 'Yuichi Takeuchi',
    author_link => 'http://takeyu-web.com/',
    registry => {
	callbacks => {
	    'BuildPage' => \&appendScriptTag,
	}
    }
});

MT->add_plugin($plugin);

# </body>の前にscriptタグを仕込む
sub appendScriptTag {
    my ($eh, %args) = @_;

    my $ref_str = $args{Content};

    my $cfg = MT::ConfigMgr->instance;

    my $src_path = $cfg->StaticWebPath.'plugins/JSEmoji/js/emoji.js';
    my $emoticons_path = $cfg->StaticWebPath.'plugins/JSEmoji/images/emoticons/';

    my $script_tag = <<"TAG";
<script type="text/javascript" charset="utf-8" src="$src_path"></script>
<script type="text/javascript">E2Emoji(document.body, '$emoticons_path');</script>
TAG

    $$ref_str =~ s!</body>!$script_tag</body>!i;
}

1;
