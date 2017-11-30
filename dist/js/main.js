(function($){

'use strict';
  
//    FUNCTIONS
    
    function shadeBlend(p,c0,c1) {
        var n=p<0?p*-1:p,u=Math.round,w=parseInt;
        if(c0.length>7){
            var f=c0.split(","),t=(c1?c1:p<0?"rgb(0,0,0)":"rgb(255,255,255)").split(","),R=w(f[0].slice(4)),G=w(f[1]),B=w(f[2]);
            return "rgb("+(u((w(t[0].slice(4))-R)*n)+R)+","+(u((w(t[1])-G)*n)+G)+","+(u((w(t[2])-B)*n)+B)+")"
        }else{
            var f=w(c0.slice(1),16),t=w((c1?c1:p<0?"#000000":"#FFFFFF").slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF;
            return "#"+(0x1000000+(u(((t>>16)-R1)*n)+R1)*0x10000+(u(((t>>8&0x00FF)-G1)*n)+G1)*0x100+(u(((t&0x0000FF)-B1)*n)+B1)).toString(16).slice(1)
        }
    }
    
    function whichAnimationEnd(){
      var t,
          el = document.createElement("fakeelement");

      var animations = {
        "animation"      : "animationend",
        "OAnimation"     : "oAnimationEnd",
        "MozAnimation"   : "animationend",
        "WebkitAnimation": "webkitAnimationEnd"
      }

      for (t in animations){
        if (el.style[t] !== undefined){
          return animations[t];
        }
      }
    }

    var animationEnd = whichAnimationEnd();
    
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
        
        //randomize the page background
        var backgroundColors = ['#A5D6A7', '#795548', '#80cbc4', '#90A4AE'];
        
        function randomColor (arr) {
            var randomIndex = Math.floor(arr.length * Math.random());
            return arr[randomIndex];
        }
        
        body.css('background', randomColor(backgroundColors))
        
        
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
        
        // save player's name
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
        
        
        
        //pages navigation
        var nextPageBtn = $('#next-page-btn'),
            prevPageBtn = $('#prev-page-btn');
        
        var cube = {
            
            pagesArray: $('.page'),
            
            currentPageIndex: 0,
            
            currentPage: function () {
                return this.pagesArray[this.currentPageIndex]
            },

            nextPage: function () {
                return this.pagesArray[this.currentPageIndex + 1];
            },
            
            prevPage: function () {
                return this.pagesArray[this.currentPageIndex - 1];
            },
            
            goToNextPage: function (callback) {
                
                if (this.currentPageIndex == this.pagesArray.length - 1) return; 
                
                $(this.currentPage()).addClass('page-rotateCubeLeftOut');
                $(this.nextPage()).addClass('page-ontop page-rotateCubeLeftIn');
                               
                $(this.nextPage()).one(animationEnd, function(callback) {
                    prevPageBtn.removeClass('disable');
                
                    $(this.currentPage()).removeClass('current page-rotateCubeLeftOut');
                    $(this.nextPage()).addClass('current').removeClass('page-ontop page-rotateCubeLeftIn');

                    this.currentPageIndex++;

                    if (this.currentPageIndex == this.pagesArray.length - 1) {
                        nextPageBtn.addClass('disable');
                    }
                    
                    callback();
                    
                }.bind(this, callback))
            },
            
            goToPrevPage: function (callback) {
                
                if (this.currentPageIndex == 0) return; 
                
                $(this.currentPage()).addClass('page-rotateCubeRightOut');
                $(this.prevPage()).addClass('page-ontop page-rotateCubeRightIn');   
                                
                $(this.prevPage()).one(animationEnd, function(callback) {
                    nextPageBtn.removeClass('disable');
                
                    $(this.currentPage()).removeClass('current page-rotateCubeRightOut');
                    $(this.prevPage()).addClass('current').removeClass('page-ontop page-rotateCubeRightIn');

                    this.currentPageIndex--;

                    if (this.currentPageIndex == 0) {
                        prevPageBtn.addClass('disable');
                    }
                    
                    callback();
                    
                }.bind(this, callback));
               
            }
            
        };
        
        function enableBtns() {
            $('.btn').prop('disabled', false);
        }
        
        function disableBtns() {
            $('.btn').prop('disabled', true);
        }
        
        nextPageBtn.on('click', function () {
            disableBtns();
            cube.goToNextPage(enableBtns);
        });
        
        prevPageBtn.on('click', function () {
            disableBtns();
            cube.goToPrevPage(enableBtns);
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
            
            //edit
            self.editAvatar = function() {
                $('#avatar-wrapper').empty();
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

        
        //FEATURES THAT DOESN'T USE CAROUSEL 
        
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
        
        
        //save avatar
        var saveBtn = $('#save-avatar');
        
        saveBtn.on('click', function(e){
            e.preventDefault;
            
            if (men) {
                boyAvatar.saveAvatar();
            } else {
                girlAvatar.saveAvatar();
            }
            
            nextPageBtn.trigger('click');
        });
        
        
        //edit avatar
        var editBtn = $('#edit-avatar');
        
        editBtn.on('click', function(e){
            e.preventDefault;

            //time for animation
            setTimeout(function () {
                if (men) {
                    boyAvatar.editAvatar();
                } else {
                    girlAvatar.editAvatar();
                }
            }, 1000)
            
            prevPageBtn.trigger('click');
        });
        
        
        
        //color the ice-cream
        var iceCreamColors = ['#FF7697', '#82DDAB', '#F8D5AB', '#7F332D', '#FFCB00', '#BEF0FF'],
            pencilSnippet = '<a href="#"><svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 96.219 512.09624" xml:space="preserve" width="96.219002" height="512.09625"><g id="g3" transform="translate(-207.939,0)"><path style="fill:#ffd788" d="m 296.158,0 -80,0 c -4.418,0 -8,3.582 -8,8 l 0,376 44.282,125.466 c 1.238,3.507 6.198,3.507 7.435,0 L 304.158,384 l 0,-376 c 0,-4.418 -3.582,-8 -8,-8 z" /><path style="fill:#e6be94" d="m 255.939,280 0,232 0.544,0 c 1.431,-0.119 2.82,-0.909 3.393,-2.534 L 304.158,384 l 0,-104 -48.219,0 z" /><path style="fill:#ffcd00" d="m 296.158,0 -80,0 c -4.418,0 -8,3.582 -8,8 l 0,376 c 0,-8.837 7.164,-16 16,-16 8.836,0 16,7.163 16,16 0,-8.837 7.164,-16 16,-16 8.836,0 16,7.163 16,16 0,-8.837 7.164,-16 16,-16 8.836,0 16,7.163 16,16 l 0,-376 c 0,-4.418 -3.582,-8 -8,-8 z" /><path class="pencil-color2" d="m 240.158,384 c 0,-8.837 7.164,-16 16,-16 8.092,0 14.711,6.028 15.781,13.826 l 0,-381.826 -32,0 0,381.826 c 0.098,0.718 0.219,1.429 0.219,2.174 z" /><path class="pencil-color3" d="m 208.158,384 c 0,-8.837 7.164,-16 16,-16 8.092,0 14.711,6.028 15.781,13.826 l 0,-381.826 -24,0 c -4.418,0 -8,3.582 -8,8 l 0,373.826 c 0.098,0.718 0.219,1.429 0.219,2.174 z" /><path class="pencil-color1" d="m 303.719,384 c 0,-8.837 -7.164,-16 -16,-16 -8.092,0 -14.711,6.028 -15.781,13.826 l 0,-381.826 24,0 c 4.418,0 8,3.582 8,8 l 0,373.826 c -0.098,0.718 -0.219,1.429 -0.219,2.174 z" /><path class="pencil-color2" d="m 233.57,456 18.871,53.466 c 1.238,3.507 6.198,3.507 7.436,0 L 278.746,456 233.57,456 Z" /><path class="pencil-color1" d="m 255.939,512.031 c 1.624,0.091 3.288,-0.724 3.937,-2.565 l 18.87,-53.466 -22.808,0 0.001,56.031 0,0 z" /></g></svg></a>',
            wrapper = $('#pencils-wrapper'),
            picture = $('#ice-cream-to-color'),
            areaToColor = picture.find('path, ellipse, polygon');
            
        var picturePainting = {
            
            activeColor: '',
                        
            createPencils: function (colorsArr) {
                for (var i = 0; i < colorsArr.length; i++) {
                    wrapper.append(pencilSnippet);
                    var pencil = wrapper.find('a').eq(i);
                    pencil.find('.pencil-color1').css('fill', colorsArr[i]);
                    pencil.find('.pencil-color2').css('fill', shadeBlend(0.2, colorsArr[i]));
                    pencil.find('.pencil-color3').css('fill', shadeBlend(0.4, colorsArr[i]));
                }
                wrapper.find('a').css('maxWidth', 100 / colorsArr.length + '%');
            },
            
            chooseColor: function (elem) {
                wrapper.find('a').removeClass('active');
                elem.addClass('active');
                this.activeColor = elem.find('.pencil-color1').css('fill');
            },
            
            paintArea: function (area) {
                area.css('fill', this.activeColor);
            }
        }
        
        
        picturePainting.createPencils(iceCreamColors);

        wrapper.find('a').on('click', function (e) {
            e.preventDefault();
            picturePainting.chooseColor($(this));
            console.log(picturePainting.activeColor);
        })
        
        areaToColor.on('click', function (e) {
            e.preventDefault();
            picturePainting.paintArea($(this));
        })
        
        
        
        
        
        
    
    });
    
    
    
    
})(jQuery);