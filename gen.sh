#!/bin/bash

case $1 in
    tag)
        if [ -z "$2" ]; then
            echo "TAG?"
            exit
        fi
        echo -e "/*\n * jquery-countdown plugin - v$2" > js/jquery.countdown.js.new
        sed -e 's|  console.log|  // console.log|' js/jquery.countdown.js -e '1,2d' >> js/jquery.countdown.js.new
        mv js/jquery.countdown.js.new js/jquery.countdown.js

        echo "/* jquery-countdown - v$2 - See un-minified version for license etc */" > js/jquery.countdown.min.js
        yuicompressor js/jquery.countdown.js >> js/jquery.countdown.min.js

        git commit -a -m "Release v$2"
        git tag -a v$2 -m "Release v$2"

        echo "Don't forget to \"git push ; git push --tags\""
        ;;
    debug)
        sed -e 's|  // console.log|  console.log|' js/jquery.countdown.js > js/jquery.countdown.js.new
        mv js/jquery.countdown.js.new js/jquery.countdown.js
        ;;
        *)
        echo -e "usage:\n$0 prepare\tPrepare repository for final commit for release\n$0 debug\tPrepare repository for development"
        ;;
esac
