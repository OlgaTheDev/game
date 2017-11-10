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

        for (var i in lettersArray){
            lettersArray[i] = '<i>' + lettersArray[i] + '</i>';
        }

        var newLetters = lettersArray.join('');
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
        var hairColorObj = {
            hairColor1: {
                light: '#6E4439',
                dark: '#5E342E'
            },
            hairColor2: {
                light: '#9D6E48',
                dark: '#8D5F3D'
            },
            hairColor3: {
                light: '#E69F5F',
                dark: '#E09156'
            },
            hairColor4: {
                light: '#FFC85C',
                dark: '#F6B45E'
            },
            hairColor5: {
                light: '#FF9656',
                dark: '#EF8C56'
            }
        }
        
        
        function Avatar() {
            var self = this;
            
            var currentHairCut,
                hairCutIndex = 0,
                hairCutsArray,
                
                currentClothes,
                clothesArray,
                clothesIndex = 0,
                
                accessoriesArray,
                currentAccessories,

                currentHairColor,
                lightHairColor,
                darkHairColor,
                
                currentSkinColor,
                avatarSvg,
                bodySvg,
                neckSvg,
                faceSvg,
                mouthSvg,

                currentGlasses,
                glassesArray;
            
            function showSelectedItem (elem, arr){
                if (elem && arr) {
                    arr.removeClass('visible').addClass('hidden');
                    elem.removeClass('hidden').addClass('visible');
                }
            }
            
            self.setAvatarSvg = function (svg) {
                if (svg) {
                    avatarSvg = svg;
                }
            }
            
            //haircut
            self.hairCut = function (haircut) {
                if (!arguments.length) {
                    return currentHairCut;
                }
                
                currentHairCut = haircut;
                hairCutsArray = avatarSvg.find('.hair');
                showSelectedItem(currentHairCut, hairCutsArray)
            };
            
            self.hairCutIndex = function (index) {
                if (!arguments.length) {
                    return hairCutIndex;
                }
                
                hairCutIndex = index;
            };
            
            //clothes            
            self.clothes = function (clothes) {
                if (!arguments.length) {
                    return currentClothes;
                }
                
                currentClothes = clothes;
                clothesArray = avatarSvg.find('.suit');
                showSelectedItem(currentClothes, clothesArray);
            };
            
            self.clothesIndex = function (index) {
                if (!arguments.length) {
                    return clothesIndex;
                }
                
                clothesIndex = index;
            };
            
            //accessories
            self.accessories = function (accessories) {
                if (!arguments.length) {
                    return currentAccessories;
                }
                
                currentAccessories = accessories;
                accessoriesArray = avatarSvg.find('.accessories');
                showSelectedItem(currentAccessories, accessoriesArray);
            }
            
            function selectHairColor(hairColor) {
                var hairColorSelected = toCamelCase(hairColor),
                    hairColorSelectedValues = hairColorObj[hairColorSelected];
                
                lightHairColor = hairCutsArray.find('.hair-light');
                darkHairColor = hairCutsArray.find('.hair-dark');
                
                lightHairColor.css('fill', hairColorSelectedValues.light);
                darkHairColor.css('fill', hairColorSelectedValues.dark);

            }
            
            //hair color
            self.hairColor = function (haircolor) {
                if (!arguments.length) {
                    return currentHairColor;
                }
                
                currentHairColor = haircolor;
                selectHairColor(currentHairColor);
            }
            
            //skin color
            self.skinColor = function (skinColor) {
                if (!arguments.length) {
                    return currentSkinColor;
                }
                                
                currentSkinColor = skinColor;
                
                var skinColorSelected = toCamelCase(currentSkinColor),
                    skinColorSelectedValues = skinColorObj[skinColorSelected];
                
                bodySvg = avatarSvg.find('.body-svg, .skin-dark');
                neckSvg = avatarSvg.find('.neck-svg');
                mouthSvg = avatarSvg.find('.mouth path');
                faceSvg = avatarSvg.find('.skin-light');
                
                bodySvg.css('fill', skinColorSelectedValues.body);
                neckSvg.css('fill', skinColorSelectedValues.neck);
                faceSvg.css('fill', skinColorSelectedValues.face);
                mouthSvg.css('fill', skinColorSelectedValues.mouth);
                
            }
            
            //glasses
            function selectGlasses(glasses, hairArray, glassesArr) {
                if (glasses) {
                    avatarSvg.find('.skin-dark').after(glassesNewPath);
                } else {
                    if (glassesArr.length) {
                        for (var i = 0; i < hairArray.length; i++) {
                            hairArray[i].removeChild(glassesArr[i]);
                        }
                    }
                }
            }
            
            self.glasses = function (curGlasses) {
                if (!arguments.length) {
                    return currentGlasses;
                }
                
                currentGlasses = curGlasses;
                glassesArray = avatarSvg.find('.glasses');
                
                selectGlasses(currentGlasses, hairCutsArray, glassesArray);
            }        
            
            //save
            self.saveAvatar = function () {
                var newAvatar = document.createElementNS('http://www.w3.org/2000/svg',"svg"),
                    avatarNeckNewG = document.createElementNS('http://www.w3.org/2000/svg',"g"),
                    avatarEyesNewG = document.createElementNS('http://www.w3.org/2000/svg',"g"),
                    avatarMouthNewG = document.createElementNS('http://www.w3.org/2000/svg',"g"),
                    avatarHairCutNewG = document.createElementNS('http://www.w3.org/2000/svg',"g"),
                    avatarClothesNewG = document.createElementNS('http://www.w3.org/2000/svg',"g"),
                    avatarAccessoriesNewG = document.createElementNS('http://www.w3.org/2000/svg',"g"),
                    avatarGlassesNewG = document.createElementNS('http://www.w3.org/2000/svg',"g");
                
                newAvatar.setAttribute('id', 'avatar');
                newAvatar.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
                newAvatar.setAttribute('viewBox', '0 0 464.001 464.001');

                newAvatar.appendChild(avatarNeckNewG);
                newAvatar.appendChild(avatarHairCutNewG);
                newAvatar.appendChild(avatarEyesNewG);
                newAvatar.appendChild(avatarMouthNewG);
                newAvatar.appendChild(avatarClothesNewG);
                
                avatarNeckNewG.innerHTML = avatarSvg.find('.avatar-body').html();
                avatarEyesNewG.innerHTML = avatarSvg.find('.eyes').html();
                avatarMouthNewG.innerHTML = avatarSvg.find('.mouth').html();
                avatarHairCutNewG.innerHTML = currentHairCut.html();
                avatarClothesNewG.innerHTML = currentClothes.html();
                
                if (currentAccessories) {
                    avatarAccessoriesNewG.innerHTML = currentAccessories.html();
                    newAvatar.appendChild(avatarAccessoriesNewG);
                }
                
                $('#avatar-wrapper').append(newAvatar);
            }
                            
        }
        
        
        var boyAvatar = new Avatar();
        boyAvatar.setAvatarSvg($('#men-svg'));
        boyAvatar.hairCut($('#m-hair-1'));
        boyAvatar.clothes($('#m-suit-1'));
        boyAvatar.hairColor('hair-color-1');
        boyAvatar.skinColor('skin-color-1');
        boyAvatar.glasses(false);


        var girlAvatar = new Avatar();
        girlAvatar.setAvatarSvg($('#girl-svg'));
        girlAvatar.hairCut($('#g-hair-1'));
        girlAvatar.clothes($('#g-suit-1'));
        girlAvatar.accessories($('#accessories-1'));
        girlAvatar.hairColor('hair-color-1');
        girlAvatar.skinColor('skin-color-1');
        girlAvatar.glasses(false);
        
        
        //gender
        var menSvg = $('#men-svg'),
            girlSvg = $('#girl-svg'),
            men = true,
            girl = false;
                
            
        //gender selection
        var userGender = $('input[name="gender"]');


        userGender.change(function() {
            
            detectGender($(this).val());
            
            if (men) {
                
                // update select for hair cut
                userHairCut.val([boyAvatar.hairCut().attr('id').slice(2)]);
                hairCutOwl.trigger('to.owl.carousel', [boyAvatar.hairCutIndex()]);
                
                // update select for hair color
                userHairColor.val([boyAvatar.hairColor()]);
                
                //update select for skin color
                userSkinColor.val([boyAvatar.skinColor()]);
                
                //update select for clothes
                userClothes.val([boyAvatar.clothes().attr('id').slice(2)]);
                clothesOwl.trigger('to.owl.carousel', [boyAvatar.clothesIndex()]);
                
                //update glasses
                userGlasses.prop('checked', boyAvatar.glasses());
                
                //update sccessories select
                userAccessories.parents('.form-field').hide();
                
                
            } else if (girl) {
                
                // update select & carousel for hair cut
                userHairCut.val([girlAvatar.hairCut().attr('id').slice(2)]);
                hairCutOwl.trigger('to.owl.carousel', [girlAvatar.hairCutIndex()]);

                // update select for hair color
                userHairColor.val([girlAvatar.hairColor()]);
                
                //update select for skin color
                userSkinColor.val([girlAvatar.skinColor()]);
                
                //update select for clothes
                userClothes.val([girlAvatar.clothes().attr('id').slice(2)]);
                clothesOwl.trigger('to.owl.carousel', [girlAvatar.clothesIndex()]);
                
                //update glasses
                userGlasses.prop('checked', girlAvatar.glasses());
                
                //update accessories select
                userAccessories.parents('.form-field').show();

            }
            
        });
        
        
        function detectGender(gender) {
            if (gender == 'men') {
                menSvg.show();
                girlSvg.hide();
                men = true;
                girl = false;
            } else {
                menSvg.hide();
                girlSvg.show();
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
        var userHairCut = $('input[name="user-haircut"]');
        
        hairCutOwl.on('changed.owl.carousel', function(event) {
            
            var carouselItems = $(event.target).find('.owl-item'),
                activeCarouselItem = carouselItems[event.item.index];

            if (men) {
                boyAvatar.hairCutIndex(event.item.index);
                var mActiveInput = $(activeCarouselItem).find('input');
                
                mActiveInput.prop('checked', true);
                
                boyAvatar.hairCut($('#m-' + mActiveInput.val()));
                
            } else {
                girlAvatar.hairCutIndex(event.item.index);
                var gActiveInput = $(activeCarouselItem).find('input');
                
                gActiveInput.prop('checked', true);
                
                girlAvatar.hairCut($('#g-' + gActiveInput.val()));
            }
        });
        
        
        //select clothes
        var userClothes = $('input[name="user-clothes"]');
        
        clothesOwl.on('changed.owl.carousel', function(event) {
            
            var carouselItems = $(event.target).find('.owl-item'),
                activeCarouselItem = carouselItems[event.item.index];
            
            if (men) {
                
                boyAvatar.clothesIndex(event.item.index);
                var mActiveInput = $(activeCarouselItem).find('input');
                
                mActiveInput.prop('checked', true);
                
                boyAvatar.clothes($('#m-' + mActiveInput.val()));
                
            } else {
                
                girlAvatar.clothesIndex(event.item.index);
                var gActiveInput = $(activeCarouselItem).find('input');
                
                gActiveInput.prop('checked', true);
                
                girlAvatar.clothes($('#g-' + gActiveInput.val()));
                
            }
        });
    
        
        //select accessories
        var userAccessories = $('input[name="user-accessories"]');
                
        //hide accessories select for boy on document ready
        userAccessories.parents('.form-field').hide();   
        
        accessoriesOwl.on('changed.owl.carousel', function(event) {
            
            var carouselItems = $(event.target).find('.owl-item'),
                activeCarouselItem = carouselItems[event.item.index],
                activeInput = $(activeCarouselItem).find('input');
            
            girlAvatar.accessories($('#' + activeInput.val()));            
        });

        
        //FEATURS THAT DOESN'T USE CAROUSEL 
        
        //hair color selection
        var userHairColor = $('input[name="user-hair-color"]');
        
        //color labels
        userHairColor.each(function(){
            colorLabels($(this), hairColorObj, 'dark', 'light');
        });
        
        function colorLabels(inputArray, colorsObj, darkColor, lightColor) {
            var inputValue = toCamelCase(inputArray.val()),
                colors = colorsObj[inputValue],
                label = inputArray.next();            
            label.append('<i class="dark"></i><i class="light"></i>');
            label.find('.dark').css('background', colors[darkColor]);
            label.find('.light').css('background', colors[lightColor]);
        }
        
        userHairColor.change(function(){
            if (men) {
                boyAvatar.hairColor($(this).val());
            } else {
                girlAvatar.hairColor($(this).val());
            }
        })
        

        //skin color selection
        var userSkinColor = $('input[name="user-skin-color"]');
        
        //color labels
        userSkinColor.each(function(){
            colorLabels($(this), skinColorObj, 'body', 'neck');
        });
        
        userSkinColor.change(function(){
            if (men) {
                boyAvatar.skinColor($(this).val());
            } else{
                girlAvatar.skinColor($(this).val());
            }
        });
             
        
        //glasses selection
        var userGlasses = $('#user-glasses'),
            glassesNewPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
        
        glassesNewPath.setAttribute('class', 'glasses');
        glassesNewPath.setAttribute('d', 'M347,156h-83c-6.617,0-12,5.383-12,12v0.432c-5.086-5.198-12.172-8.432-20-8.432   s-14.914,3.234-20,8.432V168c0-6.617-5.383-12-12-12h-83c-2.209,0-4,1.791-4,4s1.791,4,4,4h23.7c-0.445,1.253-0.7,2.596-0.7,4v24   c0,6.617,5.383,12,12,12h48c6.617,0,12-5.383,12-12v-4c0-11.027,8.973-20,20-20s20,8.973,20,20v4c0,6.617,5.383,12,12,12h48   c6.617,0,12-5.383,12-12v-24c0-1.404-0.255-2.747-0.7-4H347c2.209,0,4-1.791,4-4S349.209,156,347,156z M204,192   c0,2.203-1.793,4-4,4h-48c-2.207,0-4-1.797-4-4v-24c0-2.203,1.793-4,4-4h48c2.207,0,4,1.797,4,4V192z M316,168v24   c0,2.203-1.793,4-4,4h-48c-2.207,0-4-1.797-4-4v-24c0-2.203,1.793-4,4-4h48C314.207,164,316,165.797,316,168z');
        glassesNewPath.setAttribute('fill', '#734A3E');
        
        
        $('#glasses-trigger').click(function(){
            
            if (men) {
                var mCurrentGlasses = userGlasses.is(':checked') ? false : true;
                boyAvatar.glasses(mCurrentGlasses);
                
            } else {
                var gCurrentGlasses = userGlasses.is(':checked') ? false : true;
                girlAvatar.glasses(gCurrentGlasses);

            }
                   
        })
        
        
        //SAVE AVATAR
        var saveBtn = $('#save-avatar');
        
        saveBtn.on('click', function(){
                        
            if (men) {
                boyAvatar.saveAvatar();
            } else {
                girlAvatar.saveAvatar();
            }
         
        })
        
        
        
        
        
        
    
    });
    
    
    
    
})(jQuery);