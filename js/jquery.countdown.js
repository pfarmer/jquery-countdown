/*
 * jquery-countdown plugin - v0.2
 *
 * Copyright (c) 2009 Martin Conte Mac Donell <Reflejo@gmail.com>
 * Copyright (c) 2011 Peter Farmer <pfarmer@gmail.com>
 *
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 */

(function( $ ) {
    var init = function( userOptions ) { 
        var options = {
            stepTime: 60,
            format: "dd:hh:mm:ss",
            startTime: "01:12:32:55",
            digitImages: 6,
            digitWidth: 53,
            digitHeight: 77,
            autoStart: true,
            timerEnd: function() {
            },
            image: "digits.png"
        };
        var digits = [], interval;

        // Draw digits in given container
        var createDigits = function(where) {
            var c = 0;
            var hCounter = 0;
            var mCounter = 0;
            var sCounter = 0;

            // Check the incoming startTime
            // console.log("options.startTime = " + options.startTime);

            if ((typeof options.startTime == 'object') && (options.startTime.constructor == Date)) {
                // console.log("Have been passed a date object? hopefully?");
                var now = new Date();
                if (options.startTime.getTime() < now.getTime()) {
                    options.startTime.setFullYear(options.startTime.getFullYear() + 1);
                    // console.log("options.startTime is now = " + options.startTime);
                }
                // console.log("options.startTime.getTime() = " + options.startTime.getTime());
                // console.log("now.getTime() = " + now.getTime());
                var datediff = Math.ceil((options.startTime.getTime() - now.getTime()) / 1000);
                // console.log("datediff = " + datediff);
                var days = Math.floor(datediff / 86400);
                // console.log("days = " + days);
                var hours = Math.floor((datediff % 86400) / 3600);
                var minutes = Math.floor(((datediff % 86400) % 3600) / 60);
                var seconds = ((datediff % 86400) % 3600) % 60;
                options.startTime = days + ":" + hours + ":" + minutes + ":" + seconds;
            }

            _startTime = options.startTime.split("");
            // Count the number of ":" in the startTime.
            cCounter = 0;
            for (var i = 0; i < _startTime.length; i++) {
                if (isNaN(parseInt(_startTime[i]))) {
                    // console.log("cCounter++ (" + _startTime[i] + ")");
                    cCounter = cCounter + 1;
                }
            }

            // Zero pad each section of the startTime if required.
            // console.log("options.startTime = " + options.startTime)
            var chunks = options.startTime.split(":");
            // console.log("chunks.length = " + chunks.length);
            var newstartTime = "";
            for (var i = 0; i < chunks.length; i++) {
                var max = 59;
                if (chunks.length == 3) {
                    if (i == 0) {
                        max = 23;
                    }
                }
                if (chunks.length == 4) {
                    if (i == 0) {
                        max = 9999;
                    }
                    if (i == 1) {
                        max = 23;
                    }
                }

                if (chunks[i] > max) {
                    chunks[i] = max;
                }
                if (chunks[i].length < 2) {
                    chunks[i] = "0" + chunks[i];
                }
            }

            options.startTime = chunks.join(":");
            // console.log("options.startTime = " + options.startTime)

            // Calculate what the format should be:
            switch (cCounter) {
                case 3:
                    // console.log("options.startTime.split(':', 1).length is " + options.startTime.split(":")[0].length);
                    if (options.startTime.split(":")[0].length == 3) {
                        options.format = "ddd:hh:mm:ss";
                    } else {
                        options.format = "dd:hh:mm:ss";
                    }
                    break;
                case 2:
                    options.format = "hh:mm:ss";
                    break;
                case 1:
                    options.format = "mm:ss";
                    break;
                case 0:
                    options.format = "ss";
                    break;
            }

            // console.log("cCounter == " + cCounter);
            // console.log("options.format == " + options.format);

            // Iterate each startTime digit, if it is not a digit
            // we'll assume that it's a separator
            options.startTime = options.startTime.split("");
            options.format = options.format.split("");
            // console.log("options.startTime = " + options.startTime);
            // console.log("options.startTime.length = " + options.startTime.length);
            for (var i = 0; i < options.startTime.length; i++) {
                // console.log("options.startTime[" + i + "] = " + options.startTime[i]);
                if (parseInt(options.startTime[i]) >= 0) {
                    // console.log("parseInt >= 0");
                    var elem = jQuery('<div id="cnt_' + i + '" class="cntDigit" />').css({
                        height: options.digitHeight * options.digitImages * 10,
                        "float": 'left', background: 'url(\'' + options.image + '\')',
                        width: options.digitWidth});
                    // console.log("elem = " + elem);
                    digits.push(elem);
                    margin(c, -((parseInt(options.startTime[i]) * options.digitHeight *
                        options.digitImages)));
                    digits[c].__max = 9;
                    // Add max digits, for example, first digit of minutes (mm) has
                    // a max of 5. Conditional max is used when the left digit has reach
                    // the max. For example second "hours" digit has a conditional max of 4
                    // console.log("options.format[" + i + "] = " + options.format[i]);
                    switch (options.format[i]) {
                        case 'h':
                            if (hCounter < 1) {
                                // console.log("digits[c] = " + digits[c]);
                                digits[c].__max = 2;
                                // console.log("settings digits[" + c + "].__max = 2");
                                hCounter = 1;
                            } else {
                                digits[c].__condmax = 3;
                                // console.log("settings digits[" + c + "].__condmax = 3");
                            }
                            break;
                        case 'd':
                            digits[c].__max = 9;
                            break;
                        case 'm':
                            if (mCounter < 1) {
                                digits[c].__max = 5;
                                mCounter = 1;
                            } else {
                                digits[c].__condmax = 9;
                            }
                            break;
                        case 's':
                            if (sCounter < 1) {
                                digits[c].__max = 5;
                                sCounter = 1;
                            } else {
                                digits[c].__condmax = 9;
                            }
                            break;
                    }
                    ++c;
                } else {
                    elem = jQuery('<div class="cntSeparator"/>').css({"float": 'left'}).text(options.startTime[i]);
                }
                where.append('<div>');
                where.append(elem);
                where.append('</div>');
            }
        };

        // Set or get element margin
        var margin = function(elem, val) {
            if (val !== undefined)
                return digits[elem].css({'marginTop': val + 'px'});

            return parseInt(digits[elem].css('marginTop').replace('px', ''));
        };

        // Makes the movement. This is done by "digitImages" steps.
        var moveStep = function(elem) {
            // console.log("digits[elem] = " + digits[elem]);
            digits[elem]._digitInitial = -(digits[elem].__max * options.digitHeight * options.digitImages);
            return function _move() {
                mtop = margin(elem) + options.digitHeight;
                if (mtop == options.digitHeight) {
                    margin(elem, digits[elem]._digitInitial);
                    if (elem > 0) moveStep(elem - 1)();
                    else {
                        clearInterval(interval);
                        for (var i = 0; i < digits.length; i++) margin(i, 0);
                        options.timerEnd();
                        return;
                    }
                    if ((elem > 0) && (digits[elem].__condmax !== undefined) &&
                        (digits[elem - 1]._digitInitial == margin(elem - 1)))
                        margin(elem, -(digits[elem].__condmax * options.digitHeight * options.digitImages));
                    return;
                }

                margin(elem, mtop);
                if (margin(elem) / options.digitHeight % options.digitImages != 0)
                    setTimeout(_move, options.stepTime);

                if (mtop == 0) digits[elem].__isma = true;
            }
        };

        var start = function() {
            if (interval == undefined)
                interval = setInterval(moveStep(digits.length - 1), 1000);
        }

        var pause = function() {
            if (interval) {
                window.clearInterval(interval);
                interval = undefined;
            }
        }

        this.data("countdown", {
            "start": start,
            "pause": pause
        });

        $.extend(options, userOptions);
        this.css({height: options.digitHeight, overflow: 'hidden'});
        createDigits(this);
        if (options.autoStart) {
            start();
        }
    };

    $.fn.countdown = function( method ) {
        var methods = this.data("countdown");
        if ( methods && methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.countdown' );
        }    
    };
})( jQuery );
