(function($){

'use strict';
  
//    FUNCTIONS
    
    function toCamelCase(elem) {
        return elem.replace(/-([a-z0-9])/g, function (g) { 
            return g[1].toUpperCase(); 
        });
    }
    
    //text typing animation
    var pArray = $('.typing-text'),
        animationDelay = 3100;

    function splitIntoLetters(str) {
        var lettersArray = str.text().split('');
        console.log(lettersArray);

        for (var i in lettersArray){
            lettersArray[i] = '<i>' + lettersArray[i] + '</i>';
        }

        var newLetters = lettersArray.join('');
        console.log(newLetters);
        str.html(newLetters).css('opacity', 1);
    }


    function showLetter(letter) {
        letter.addClass('in');

        if(!letter.is(':last-child')) {
            setTimeout(function() {
                showLetter(letter.next())
            }, 100)
        } 
    }

    function animateString(str) {
        str.addClass('typing');
        var letters = str.find('i');            
        showLetter(letters.eq(0));
        setTimeout(function(){
            str.addClass('waiting')
        }, 1700)
        setTimeout(function(){
            str.removeClass('typing waiting')
        }, animationDelay)
    }

    function initTextTyping(str) {
        splitIntoLetters(str);
        animateString(str);
        str.addClass('visible');
    }
    
    
    
    
//    DOCUMENT READY EVENT
    
    $(document).ready(function(){
        
        var body = $('body');
        
        //nice select plugin init
        $('select').niceSelect();
        
        //range slider plugin init
        $("#font-size").ionRangeSlider({
            min: 18,
            max: 30,
            step: 2,
            from: 24
        });        
        
        // customization of the view
        // font family
        $('#font-family').on('change', function() {
            body.css('fontFamily', $(this).val())
        });
        
        // font size
        $('#font-size').on('change', function(){
            body.css('fontSize', $(this).val() + 'px')
        });
        
        //color - spectrum plugin
        var customColor = $('#color');
        customColor.spectrum({
            color: "#333",
            showInitial: true,
            showInput: true,
            showButtons: false
        });
        
        customColor.on('change', function() {
            var newColor = $(this).spectrum("get").toHexString();
            body.css('backgroundColor', newColor)
        });
        
        //text typing animation
        var strings = $('.typing-text');
        initTextTyping(strings.eq(0));
        setTimeout(function(){
            initTextTyping(strings.eq(1));
        }, animationDelay);
        setTimeout(function(){
            initTextTyping(strings.eq(2));
        }, animationDelay*2);
        
        setTimeout(function(){
            playersName.slideDown().focus();
        }, animationDelay*3 + 200);
        
        // saving player's name
        var playersName = $('#players-name');
        playersName.on('blur', function(e) {
            if (e.type == 'blur') {
                if(!strings.eq(3).hasClass('visible')) {
                    if ($(this).val().trim() != '') {
                          $('.players-name-holder').text($(this).val());
                        initTextTyping(strings.eq(3));
                        setTimeout(function(){
                            initTextTyping(strings.eq(4));
                        }, animationDelay);
                        setTimeout(function(){
                            $('#custom-form').slideDown();
                        }, animationDelay*2) ;
                     } else {
                         strings.eq(3).html('Nice to see you <span class="players-name-holder"></span>!');
                         $('.players-name-holder').text($(this).val());
                    }  
                }
                    
            }
        });
        playersName.on('keyup', function(e) {
            if (e.keyCode == '13') {
                playersName.trigger('blur')
            }
        })
        
        
        
        //reveal new step
        $('.next-btn').on('click', function(e){
            e.preventDefault();
            
            var currentPage = $(this).parents('.page'),
                nextPage = currentPage.next('.page');
            
            currentPage.addClass('page-rotateCubeLeftOut');
            nextPage.addClass('page-ontop page-rotateCubeLeftIn');
            setTimeout(function(){
                currentPage.removeClass('current page-rotateCubeLeftOut');
                nextPage.addClass('current').removeClass('page-ontop page-rotateCubeLeftIn');
            }, 1000)
            
        })
        
        
        
        //AVATAR CUSTOMIZATION
        
        //functions
        function showSelectedItem(elem, arr){
            arr.removeClass('visible').addClass('hidden');
            elem.removeClass('hidden').addClass('visible');
        }
        
        //skin color
        var skinColorObj = { 
            skinColor1: {
                face: '#FFE1B2',
                body: '#FFD7A3',
                neck: '#FDC88E',
                mouth: '#E4B07B'
            },
            skinColor2: {
                face: '#FDC88E',
                body: '#F6B47B',
                neck: '#E2A071',
                mouth: '#E2A071'
            },
            skinColor3: {
                face: '#D29771',
                body: '#C38762',
                neck: '#A46D4D',
                mouth: '#A46D4D'
            },
            skinColor4: {
                face: '#A2795C',
                body: '#956E55',
                neck: '#7C5A49',
                mouth: '#7C5A49'
            }
        }
        
        
        //hair color
        var hairColorsObj = {
            hairColor1: {
                light: '#6E4439',
                dark: '#5E342E'
            },
            hairColor2: {
                light: '#FF9656',
                dark: '#EF8C56'
            },
            hairColor3: {
                light: '#FFC85C',
                dark: '#F6B45E'
            },
            hairColor4: {
                light: '#E69F5F',
                dark: '#E09156'
            },
            hairColor5: {
                light: '#9D6E48',
                dark: '#8D5F3D'
            }
        }
        
        //default options - Girls
        var gDefaultSkinColor = 'skin-color-1',
            gDefaultHairColor = 'hair-color-1',
            gDefaultHairCut = $('#g-hair-1'),
            gDefaultClothes = $('#g-suit-1'),
            gDefaultGlasses = false,
            gDefaultAccessories = $('#accessories-1');
        
        //default options - Men
        var mDefaultSkinColor = 'skin-color-1',
            mDefaultHairColor = 'hair-color-1',
            mDefaultHairCut = $('#m-hair-1'),
            mDefaultClothes = $('#m-suit-1'),
            mDefaultGlasses = false;
        
        
        
        //gender
        var menSvg = $('#men-svg'),
            girlSvg = $('#girl-svg'),
            men = true,
            girl = false;
                
            
        //gender selection
        var userGender = $('input[name="gender"]'),
            mCurrentHairCut,
            gCurrentHairCut,
            mCurrentHairColor,
            gCurrentHairColor,
            mCurrentSkinColor,
            gCurrentSkinColor,
            mCurrentClothes,
            gCurrentClothes,
            mCurrentGlasses,
            gCurrentGlasses,
            mCurrentHairCutIndex,
            gCurrentHairCutIndex,
            mCurrentClothesItemIndex,
            gCurrentClothesItemIndex;

        userGender.change(function() {
            
            detectGender($(this).val());
            
            if (men) {
                
                // update select for hair cut
                mCurrentHairCut = mHairCutSelected || mDefaultHairCut;
                hairCutSelected.val([mCurrentHairCut.attr('id').slice(2)]);
                mCurrentHairCutIndex = mHairCutItemIndex || 0;
                hairCutOwl.trigger('to.owl.carousel', [mCurrentHairCutIndex]);
                
                // update select for hair color
                mCurrentHairColor = mHairColorSelected || mDefaultHairColor;
                userHairColor.val([mCurrentHairColor]);
                
                //update select for skin color
                mCurrentSkinColor = mSkinColorSelected || mDefaultSkinColor;
                userSkinColor.val([mCurrentSkinColor]);
                
                //update select for clothes
                mCurrentClothes = mClothesSelected || mDefaultClothes;
                userClothes.val([mCurrentClothes.attr('id').slice(2)]);
                mCurrentClothesItemIndex = mClothesItemIndex || 0;
                clothesOwl.trigger('to.owl.carousel', [mCurrentClothesItemIndex]);
                
                //update glasses
                mCurrentGlasses = mGlasses || mDefaultGlasses;
                userGlasses.prop('checked', mCurrentGlasses);
                
                //update sccessories select
                userAccessories.parents('.accessories-select').hide();
                
                
            } else if (girl) {
                
                // update select & carousel for hair cut
                gCurrentHairCut = gHairCutSelected || gDefaultHairCut;
                hairCutSelected.val([gCurrentHairCut.attr('id').slice(2)]);
                gCurrentHairCutIndex = gHairCutItemIndex || 0;
                hairCutOwl.trigger('to.owl.carousel', [gCurrentHairCutIndex]);

                // update select for hair color
                gCurrentHairColor = gHairColorSelected || gDefaultHairColor;
                userHairColor.val([gCurrentHairColor]);
                
                //update select for skin color
                gCurrentSkinColor = gSkinColorSelected || gDefaultSkinColor;
                userSkinColor.val([gCurrentSkinColor]);
                
                //update select for clothes
                gCurrentClothes = gClothesSelected || gDefaultClothes;
                userClothes.val([gCurrentClothes.attr('id').slice(2)]);
                gCurrentClothesItemIndex = gClothesItemIndex || 0;
                clothesOwl.trigger('to.owl.carousel', [gCurrentClothesItemIndex]);
                
                //update glasses
                gCurrentGlasses = gGlasses || gDefaultGlasses;
                userGlasses.prop('checked', gCurrentGlasses);
                
                //update sccessories select
                userAccessories.parents('.accessories-select').show();

            }
            
        });
        
        
        function detectGender(gender) {
            if (gender == 'men') {
                menSvg.css('display', 'block');
                girlSvg.css('display', 'none');
                men = true;
                girl = false;
            } else {
                menSvg.css('display', 'none');
                girlSvg.css('display', 'block');
                men = false;
                girl = true;
            }
        }
        
        
        //init owl carousel
        var owl = $('.owl-carousel'),
            hairCutOwl = $('.hair-cut-select'),
            accessoriesOwl = $('.accessories-select'),
            clothesOwl = $('.clothes-select');
        
        owl.owlCarousel({
            items: 1,
            nav: true,
            dots: false,
            navText : ["<",">"]

        });
        
        
        //CHECKING RADIO BUTTONS FOR FEATURES THAT USE OWL CAROUSEL 
        //TRIGGERS ON CHANGE EVENT OF CAROUSEL
        
        
        //select haircut
        var hairCutSelected = $('input[name="user-haircut"]'),
            mHairCutSelected,
            gHairCutSelected,
            mHairCutsArray = $('.m-hair'),
            gHairCutsArray = $('.g-hair'),
            mHairCutItemIndex,
            gHairCutItemIndex;
        
        hairCutOwl.on('changed.owl.carousel', function(event) {
            
            var carouselItems = $(event.target).find('.owl-item'),
                activeCarouselItem = carouselItems[event.item.index];

            if (men) {
                mHairCutItemIndex = event.item.index;
                var mActiveInput = $(activeCarouselItem).find('input');
                
                mActiveInput.prop('checked', true);
                
                mHairCutSelected = $('#m-' + mActiveInput.val());
                selectHairCut(mHairCutSelected);
                
            } else {
                gHairCutItemIndex = event.item.index;
                var gActiveInput = $(activeCarouselItem).find('input');
                
                gActiveInput.prop('checked', true);
                
                gHairCutSelected = $('#g-' + gActiveInput.val());
                selectHairCut(gHairCutSelected);
            }
        });
        
        function selectHairCut(hairCut) {
            if (men){
                showSelectedItem(hairCut, mHairCutsArray);

            } else {
                showSelectedItem(hairCut, gHairCutsArray);
            }
        }
        
        
        //select clothes
        var userClothes = $('input[name="user-clothes"]'),
            gClothesArray = $('.g-suit'),
            mClothesArray = $('.m-suit'),
            mClothesSelected,
            gClothesSelected,
            mClothesItemIndex,
            gClothesItemIndex;
        
        clothesOwl.on('changed.owl.carousel', function(event) {
            
            var carouselItems = $(event.target).find('.owl-item'),
                activeCarouselItem = carouselItems[event.item.index];
            
            if (men) {
                
                mClothesItemIndex = event.item.index;
                var mActiveInput = $(activeCarouselItem).find('input');
                
                mActiveInput.prop('checked', true);
                
                mClothesSelected = $('#m-' + mActiveInput.val());
                showSelectedItem(mClothesSelected, mClothesArray);
                
            } else {
                
                gClothesItemIndex = event.item.index;
                var gActiveInput = $(activeCarouselItem).find('input');
                
                gActiveInput.prop('checked', true);
                
                gClothesSelected = $('#g-' + gActiveInput.val());
                showSelectedItem(gClothesSelected, gClothesArray);
                
            }
        });
    
        
        //select accessories
        var userAccessories = $('input[name="user-accessories"]'),
            accessoriesArray = $('.accessories');
                
        //hide accessories select for men on document ready
        userAccessories.parents('.accessories-select').hide();   
        
        accessoriesOwl.on('changed.owl.carousel', function(event) {
            
            var carouselItems = $(event.target).find('.owl-item'),
                activeCarouselItem = carouselItems[event.item.index],
                activeInput = $(activeCarouselItem).find('input'),
                accessoriesSelected = '#' + activeInput.val();
            showSelectedItem($(accessoriesSelected), accessoriesArray);
        });

        
        //FEATURS THAT DOESN'T USE CAROUSEL 
        
        //hair color selection
        var userHairColor = $('input[name="user-hair-color"]'),
            mHairColorSelected,
            gHairColorSelected,
            gLightHairColor = gHairCutsArray.find('.hair-light'),
            gDarkHairColor = gHairCutsArray.find('.hair-dark'),
            mLightHairColor = mHairCutsArray.find('.hair-light'),
            mDarkHairColor = mHairCutsArray.find('.hair-dark');
        
        userHairColor.change(function(){
            selectHairColor($(this).val());
        })
        
        function selectHairColor(hairColor) {
            var hairColorSelected = toCamelCase(hairColor),
                hairColorSelectedValues = hairColorsObj[hairColorSelected];
            
            if(men) {
                mHairColorSelected = hairColor;
                mLightHairColor.css('fill', hairColorSelectedValues.light);
                mDarkHairColor.css('fill', hairColorSelectedValues.dark);
            } else {
                gHairColorSelected = hairColor;
                gLightHairColor.css('fill', hairColorSelectedValues.light);
                gDarkHairColor.css('fill', hairColorSelectedValues.dark);
            }
        }
        

        //skin color selection
        var userSkinColor = $('input[name="user-skin-color"]'),
            mSkinColorSelected,
            gSkinColorSelected,
            gBody = $('#g-body, #girl-svg .skin-dark'),
            gNeck = $('#g-neck'),
            gFace = $('#girl-svg .skin-light'),
            gMouth = $('#g-mouth'),
            mBody = $('#m-body, #men-svg .skin-dark'),
            mNeck = $('#m-neck'),
            mFace = $('#men-svg .skin-light'),
            mMouth = $('#m-mouth');
        
        userSkinColor.change(function(){
            selectSkinColor($(this).val());
        })
        
        function selectSkinColor(skinColor) {
            var skinColorSelected = toCamelCase(skinColor),
                skinColorSelectedValues = skinColorObj[skinColorSelected];
            
            if (men) {
                mSkinColorSelected = skinColor;
                mBody.css('fill', skinColorSelectedValues.body);
                mNeck.css('fill', skinColorSelectedValues.neck);
                mFace.css('fill', skinColorSelectedValues.face);
                mMouth.css('fill', skinColorSelectedValues.mouth);
            } else {
                gSkinColorSelected = skinColor;
                gBody.css('fill', skinColorSelectedValues.body);
                gNeck.css('fill', skinColorSelectedValues.neck);
                gFace.css('fill', skinColorSelectedValues.face);
                gMouth.css('fill', skinColorSelectedValues.mouth);
            }
        }
             
        
        //glasses selection
        var userGlasses = $('#user-glasses'),
            mGlasses = false,
            gGlasses = false,
            glassesNewPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
        
        glassesNewPath.setAttribute('class', 'glasses');
        glassesNewPath.setAttribute('d', 'M347,156h-83c-6.617,0-12,5.383-12,12v0.432c-5.086-5.198-12.172-8.432-20-8.432   s-14.914,3.234-20,8.432V168c0-6.617-5.383-12-12-12h-83c-2.209,0-4,1.791-4,4s1.791,4,4,4h23.7c-0.445,1.253-0.7,2.596-0.7,4v24   c0,6.617,5.383,12,12,12h48c6.617,0,12-5.383,12-12v-4c0-11.027,8.973-20,20-20s20,8.973,20,20v4c0,6.617,5.383,12,12,12h48   c6.617,0,12-5.383,12-12v-24c0-1.404-0.255-2.747-0.7-4H347c2.209,0,4-1.791,4-4S349.209,156,347,156z M204,192   c0,2.203-1.793,4-4,4h-48c-2.207,0-4-1.797-4-4v-24c0-2.203,1.793-4,4-4h48c2.207,0,4,1.797,4,4V192z M316,168v24   c0,2.203-1.793,4-4,4h-48c-2.207,0-4-1.797-4-4v-24c0-2.203,1.793-4,4-4h48C314.207,164,316,165.797,316,168z');
        glassesNewPath.setAttribute('fill', '#734A3E');
        
        $('#glasses-trigger').click(function(){
            var gHairArray = $('.g-hair'),
                mHairArray = $('.m-hair');
            
            if (men) {
                var mGlassesArray = $('#men-svg .glasses');
                mGlasses = userGlasses.is(':checked') ? false : true;
                
                selectGlasses(mGlasses, $('#men-svg'), mHairArray, mGlassesArray);
                
            } else {
                var gGlassesArray = $('#girl-svg .glasses');
                gGlasses = userGlasses.is(':checked') ? false : true;
                
                selectGlasses(gGlasses, $('#girl-svg'), gHairArray, gGlassesArray);
            }
                   
        })
        
        function selectGlasses(glasses, personSvg, hairArray, glassesArray) {
            if (glasses) {
                    personSvg.find('.skin-dark').after(glassesNewPath);
                } else {
                    for (var i = 0; i < hairArray.length; i++) {
                        hairArray[i].removeChild(glassesArray[i]);
                    }
                }
        }
        
        
        //DEFAULTS
        
        //setting default options - Men
        showSelectedItem(mDefaultHairCut, mHairCutsArray);
        showSelectedItem(mDefaultClothes, mClothesArray);
        
        var mDefaultHairColorValues = hairColorsObj[toCamelCase(mDefaultHairColor)],
            mSkinColorSelectedValues = skinColorObj[toCamelCase(mDefaultSkinColor)];
        
        mLightHairColor.css('fill', mDefaultHairColorValues.light);
        mDarkHairColor.css('fill', mDefaultHairColorValues.dark);
    
        mBody.css('fill', mSkinColorSelectedValues.body);
        mNeck.css('fill', mSkinColorSelectedValues.neck);
        mFace.css('fill', mSkinColorSelectedValues.face);
        mMouth.css('fill', mSkinColorSelectedValues.mouth);
        
        
        //setting default options - Girls
        showSelectedItem(gDefaultHairCut, gHairCutsArray);
        showSelectedItem(gDefaultClothes, gClothesArray);
        showSelectedItem(gDefaultAccessories, accessoriesArray);
        
        var gDefaultHairColorValues = hairColorsObj[toCamelCase(gDefaultHairColor)],
            gSkinColorSelectedValues = skinColorObj[toCamelCase(gDefaultSkinColor)];
        
        gLightHairColor.css('fill', gDefaultHairColorValues.light);
        gDarkHairColor.css('fill', gDefaultHairColorValues.dark);
        
        gBody.css('fill', gSkinColorSelectedValues.body);
        gNeck.css('fill', gSkinColorSelectedValues.neck);
        gFace.css('fill', gSkinColorSelectedValues.face);
        gMouth.css('fill', gSkinColorSelectedValues.mouth);
        
        
        

        
        
        
        
        
        
        
    
    });
    
    
    
    
})(jQuery);