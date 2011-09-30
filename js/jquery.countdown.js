/*
 * jquery-counter plugin
 *
 * Copyright (c) 2009 Martin Conte Mac Donell <Reflejo@gmail.com>
 * Copyright (c) 2011 Peter Farmer <pfarmer@gmail.com>
 *
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 */

jQuery.fn.countdown = function(userOptions) {
    // Default options
    var options = {
        stepTime: 60,
        // startTime and format MUST follow the same format.
        // also you cannot specify a format unordered (e.g. hh:ss:mm is wrong)
        // format: "dd:hh:mm:ss",
        startTime: "01:12:32:55",
        digitImages: 6,
        digitWidth: 53,
        digitHeight: 77,
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

        if (typeof options.startTime == 'object') {
            // console.log("Have been passed a date object? hopefully?");
            var now = new Date();
            if (options.startTime.getTime() < now.getTime()) {
                options.startTime.setYear(options.startTime.getYear() + 1901);
                // console.log("options.startTime is now = " + options.startTime);
            }
            var datediff = Math.ceil((options.startTime.getTime() - now.getTime()) / 1000);
            var days = Math.floor(datediff / 86400);
            var hours = Math.floor((datediff % 86400) / 3600);
            var minutes = Math.floor(((datediff % 86400) % 3600) / 60);
            var seconds = ((datediff % 86400) % 3600) % 60;
            options.startTime = days + ":" + hours + ":" + minutes + ":" + seconds;
        }

        // Count the number of ":" in the startTime.
        cCounter = 0;
        for (var i = 0; i < options.startTime.length; i++) {
            if (isNaN(parseInt(options.startTime[i]))) {
                cCounter++;
            }
        }

        // Zero each section of the startTime if required.
        // console.log("options.startTime = " + options.startTime)
        var chunks = options.startTime.split(":");
        var newstartTime = "";
        for (var i = 0; i < chunks.length; i++) {
            if (chunks[i].length < 2) {
                chunks[i] = "0" + chunks[i];
            }
        }

        options.startTime = chunks.join(":");
//        console.log("options.startTime = " + options.startTime)


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
        for (var i = 0; i < options.startTime.length; i++) {
            if (parseInt(options.startTime[i]) >= 0) {
                var elem = $('<div id="cnt_' + i + '" class="cntDigit" />').css({
                    height: options.digitHeight * options.digitImages * 10,
                    "float": 'left', background: 'url(\'' + options.image + '\')',
                    width: options.digitWidth});
                digits.push(elem);
                margin(c, -((parseInt(options.startTime[i]) * options.digitHeight *
                    options.digitImages)));
                digits[c].__max = 9;
                // Add max digits, for example, first digit of minutes (mm) has
                // a max of 5. Conditional max is used when the left digit has reach
                // the max. For example second "hours" digit has a conditional max of 4
                switch (options.format[i]) {
                    case 'h':
                        if (hCounter < 1) {
                            digits[c].__max = 2;
                            hCounter = 1;
                        } else {
                            digits[c].__condmax = 3;
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
            }
            else
                elem = $('<div class="cntSeparator"/>').css({"float": 'left'})
                    .text(options.startTime[i]);

            where.append(elem)
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

            if (mtop == 0) digits[elem].__ismax = true;
        }
    };

    $.extend(options, userOptions);
    this.css({height: options.digitHeight, overflow: 'hidden'});
    createDigits(this);
    interval = setInterval(moveStep(digits.length - 1), 1000);
};
