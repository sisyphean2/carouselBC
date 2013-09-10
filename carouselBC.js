(function( $ ) {
    $.fn.carouselBC = function(){
    	CAROBJ = { //setup the carousel object
            currentPic: 0, //current picture defaults to the first
            currentThumb: 0, //current thumbnail center defaults to the first
            totalPic: 1,
            scrollableContent: [],
            smallPic: [],
            bigPicContainer: $("<div id='bigPicContainer' />"), //setup references to the major carousel elements
            bigButtonLeft: $("<div id='bigButtonLeft' />"),
            bigPicDiv: $("<div id='bigPicDiv' />"),
            bigPicHeader: $("<header id='bigPicHeader' />"),
            bigPicHeaderLink: $("<a href='' id='bigPicHeaderLink' />"),
            bigPicHref: $("<a href='' />"),
            bigPicImg: $("<img id='bigPicImg' />"),
            bigButtonRight: $("<div id='bigButtonRight' />"),
            scrollablePics: $("<div id='scrollablePics' />"),
            smallButtonLeft: $("<div id='smallButtonLeft' />"),
            smallButtonRight: $("<div id='smallButtonRight' />"),
            setupCarousel: function() { //prepare the html that will be inserted into the carouselBC div
                CAROBJ.domCallOne = CAROBJ.bigPicContainer; //prepare the big picture container with appropriate nesting structure
                CAROBJ.innerLevel1 = CAROBJ.bigPicDiv;
                CAROBJ.innerLevel2A = CAROBJ.bigPicHeader;
                CAROBJ.innerLevel2B = CAROBJ.bigPicHref;
                CAROBJ.innerLevel2A.prepend(CAROBJ.bigPicHeaderLink);
                CAROBJ.innerLevel2B.prepend(CAROBJ.bigPicImg);
                CAROBJ.innerLevel1.prepend(CAROBJ.innerLevel2A);
                CAROBJ.innerLevel1.append(CAROBJ.innerLevel2B);
                CAROBJ.domCallOne.append(CAROBJ.innerLevel1);
                CAROBJ.domCallOne.prepend(CAROBJ.bigButtonLeft);
                CAROBJ.domCallOne.append(CAROBJ.bigButtonRight);
                CAROBJ.carouselBC.prepend(CAROBJ.domCallOne); //add the finished big picture container in a single DOM write
                CAROBJ.domCallTwo = CAROBJ.scrollablePics; //prepare the scrollable div with appropriate nesting
                var j = 0; //j determines which picture goes in a div, i determines the placement of the div in the scrollable area
                for (var i = -2; i < CAROBJ.totalPic+2; i += 1) { //includes a 2 picture buffer at beginning and end for wrapping
                    if (i < 0) {j = i + CAROBJ.totalPic;} //checks to see if picture is part of the buffer, if so assigns proper picture & ID
                        else if (i+1 > CAROBJ.totalPic) {j = i - CAROBJ.totalPic;}
                        else {j = i;}
                    CAROBJ.scrollableContent[i] = $("<div class='smallPicCont'><header class='smallHeader'><p>"+CAROBJ.itemData[j]['caption']+"</p></header></div>")
                    CAROBJ.smallPic[i] = $("<img src='"+CAROBJ.itemData[j]['smallThumb']+"' id='smallPic"+i+"' class='smallPic' />")
                    CAROBJ.scrollableContent[i].append(CAROBJ.smallPic[i]);
                    //previous 3 lines: prepare references for each container and each image in the scrollable area
                    CAROBJ.domCallTwo.append(CAROBJ.scrollableContent[i]); 
                }
                CAROBJ.domCallTwo.prepend(CAROBJ.smallButtonLeft);
                CAROBJ.domCallTwo.append(CAROBJ.smallButtonRight);
                CAROBJ.carouselBC.append(CAROBJ.domCallTwo); //add the fully prepared scrollable div in a single DOM write
                for (var i = 3; i < CAROBJ.totalPic+2; i += 1) { //hides pictures that are not part of the initial display
                    $("#smallPic"+i).parent().hide();
                }
            }
        };

        CAROBJ.carouselBC = this; //if the plugin is used more than once on a page, calls it for each time it is used
            if (CAROBJ.carouselBC.length > 1)
            return CAROBJ.carouselBC.each(function() { 
                $(this).carouselBC() 
            });

        function addHighlight (addNum) {
            $("#smallPic"+addNum).addClass("highlightCarousel");
        }
        function bigPicDisplay() { 
            CAROBJ.bigPicImg.attr({  //displays the correct current big pic with associated info
                src: CAROBJ.itemData[CAROBJ.currentPic]['bigThumb'],
                alt: CAROBJ.itemData[CAROBJ.currentPic]['caption']
            });
            CAROBJ.bigPicHref.attr({
                href: CAROBJ.itemData[CAROBJ.currentPic]['url'],
                target: "_blank"
            });
            CAROBJ.bigPicHeaderLink.attr({
                href: CAROBJ.itemData[CAROBJ.currentPic]['url'],
                target: "_blank"
            });
            CAROBJ.bigPicHeaderLink.text(CAROBJ.itemData[CAROBJ.currentPic]['caption']);
            for (var i = -2; i < CAROBJ.totalPic+2; i += 1) { //erases highlight from all
                $("#smallPic"+i).removeClass("highlightCarousel");
            }
            addHighlight(CAROBJ.currentPic); //adds highlight to correct thumb + buffers
            if (CAROBJ.currentPic < 2) {
                addHighlight(CAROBJ.currentPic + CAROBJ.totalPic);
            } else if (CAROBJ.currentPic > CAROBJ.totalPic-3) {
                addHighlight(CAROBJ.currentPic - CAROBJ.totalPic);
            }
        }
        function thumbAdd(addNum) {
            $("#smallPic"+addNum).parent().show();
        }
        function thumbRemove(removeNum) {
            $("#smallPic"+removeNum).parent().hide();
        }
        function adjustThumbs() { //if the thumbs are out of alignment with the big picture, this realigns them
            for (var i = CAROBJ.currentThumb-2; i < CAROBJ.currentThumb+3; i += 1) {
                thumbRemove(i);
            }
            CAROBJ.currentThumb = CAROBJ.currentPic;
            for (var i = CAROBJ.currentThumb-2; i < CAROBJ.currentThumb+3; i += 1) {
                thumbAdd(i);
            }
        }
        function thumbsRight() {
            if (CAROBJ.currentThumb === CAROBJ.totalPic-1) { //if we're at the far right end, reset to the beginning
                CAROBJ.currentThumb = 0;
                for (var i = -2; i < 3; i += 1) {
                    thumbRemove(i + CAROBJ.totalPic-1);
                    thumbAdd(i);
                }
            } else {CAROBJ.currentThumb += 1; //otherwise just move over one
                thumbRemove(CAROBJ.currentThumb-3);
                thumbAdd(CAROBJ.currentThumb+2);
            }
        }
        function thumbsLeft() {
            if (CAROBJ.currentThumb === 0) { //if we're at the far left end, reset to the end
                CAROBJ.currentThumb = CAROBJ.totalPic-1;
                for (var i = -2; i < 3; i += 1) {
                    thumbRemove(i);
                    thumbAdd(i + CAROBJ.totalPic-1);
                }
            } else {CAROBJ.currentThumb -= 1; //otherwise just move over one
                thumbRemove(CAROBJ.currentThumb+3);
                thumbAdd(CAROBJ.currentThumb-2);
            }
        }
        function alignTest() { //test to see if the thumbs are aligned with the big picture
            if (CAROBJ.currentThumb === CAROBJ.currentPic) {return true;}
            else {return false;}
        }

        $(document).ready(function(){
	        $.getJSON("Carousel_Pictures.txt", function(data) {
	            CAROBJ.itemData = data['Pictures']; //extract the actual array from the object
	   	        CAROBJ.totalPic = CAROBJ.itemData.length; //find the total number of pictures
                CAROBJ.setupCarousel(); //setup the html in carouselBC
		        bigPicDisplay(); //setup the initial picture display
	        });
            var interval = setInterval(function(){
                CAROBJ.currentPic += 1;
                if (CAROBJ.currentPic >= CAROBJ.totalPic) {CAROBJ.currentPic -= CAROBJ.totalPic;} //if at end, go to beginning
                bigPicDisplay();
                thumbsRight();
            }, 15000);
            $("#carouselBC").click(function(){
                clearInterval(interval);
            });
            CAROBJ.bigButtonLeft.click(function(){
                var align = alignTest();
                CAROBJ.currentPic -= 1;
                if (CAROBJ.currentPic < 0) {CAROBJ.currentPic += CAROBJ.totalPic;} //wraps around
                bigPicDisplay();
                align ? thumbsLeft(): adjustThumbs();
            });
            CAROBJ.bigButtonRight.click(function(){
                var align = alignTest();
                CAROBJ.currentPic += 1;
                if (CAROBJ.currentPic+1 > CAROBJ.totalPic) {CAROBJ.currentPic -= CAROBJ.totalPic;} //wraps around
                bigPicDisplay();
                align ? thumbsRight(): adjustThumbs();
            });
            CAROBJ.scrollablePics.click(function(event) {
                var target = event.target.id;
                if (target === "smallButtonLeft") {thumbsLeft();}
                else if (target === "smallButtonRight") {thumbsRight();}
                else if (target.indexOf("smallPic") === 0) {
                    CAROBJ.newPic = parseInt(target.replace('smallPic', ''), 10);
                    if (CAROBJ.newPic < 0) {
                        CAROBJ.currentPic = CAROBJ.newPic + CAROBJ.totalPic;
                    } else if (CAROBJ.newPic > CAROBJ.totalPic-1) {
                        CAROBJ.currentPic = CAROBJ.newPic - CAROBJ.totalPic;
                    } else {
                        CAROBJ.currentPic = CAROBJ.newPic;
                    }
                    bigPicDisplay();
                    adjustThumbs();
                }
            });
            CAROBJ.bigPicDiv.hover(function(){
                CAROBJ.bigPicHeader.show();
            }, function(){
                CAROBJ.bigPicHeader.hide();
            });
            $(document).on('mouseenter', '.smallPicCont', function(){
                $(this).children(".smallHeader").show();
            });
            $(document).on('mouseleave', '.smallPicCont', function(){
                $(this).children(".smallHeader").hide();
            });
	    });

	    return CAROBJ.carouselBC;
    };
} ( jQuery ));
