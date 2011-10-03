#!/bin/bash

case $1 in
    prepare)
        echo -e "/*\n * jquery-countdown plugin - `git describe --abbrev=4`" > js/jquery.countdown.js.new
        sed -e 's|  console.log|  // console.log|' js/jquery.countdown.js -e '1,2d' >> js/jquery.countdown.js.new
        mv js/jquery.countdown.js.new js/jquery.countdown.js

        echo "/* jquery-countdown - `git describe --abbrev=4` - See un-minified version for license etc */" > js/jquery.countdown.min.js
        yuicompressor js/jquery.countdown.js >> js/jquery.countdown.min.js
        ;;
    debug)
        sed -e 's|  // console.log|  console.log|' js/jquery.countdown.js > js/jquery.countdown.js.new
        mv js/jquery.countdown.js.new js/jquery.countdown.js
        ;;
        *)
        echo -e "usage:\n$0 prepare\tPrepare repository for final commit for release\n$0 debug\tPrepare repository for development"
        ;;
esac
