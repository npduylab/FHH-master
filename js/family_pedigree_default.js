


function draw() {

    var masterleft=600;
    var merr = 50;
    var cr = 21;
    var rr = 40;

    var l = 355;
    var r = 350;
    var ml = 350;
    var pl = 350;
    var dl = 350;
    var sl = 350;

    var top=300

    var array = new Array();

    //Open the template
    $("#family_pedigree").dialog("open");

    //Start SVG
    $('#family_pedigree').svg();
    var svg = $('#family_pedigree').svg('get');
    var g = svg.group({stroke: 'black', strokeWidth: 2});

    //Outer Frame
    svg.rect(25, 5, ['80%'], 700, 10, 10, {fill: 'none', stroke: 'slateblue', strokeWidth: 1});
    svg.text(masterleft-120, 30, "Paternal", {fontWeight: 'bold', fontSize: '14.5', fill: 'gray'});
    svg.text(masterleft+120, 30, "Maternal", {fontWeight: 'bold', fontSize: '14.5', fill: 'gray'});

    //Check the Twin/adoption Status
    if (personal_information.twin_status == 'IDENTICAL') {
        svg.text( masterleft+55, top + 50, "tt", {fontWeight: 'bold', fontSize: '18.5', fill: 'black'});
        svg.line(g, masterleft-100, 220, masterleft + 120, 220,{stroke: 'black'});
        svg.line(g,  masterleft+25, 220,  masterleft+25, top,{stroke: 'black'});

    }
    else if (personal_information.twin_status == 'NO') {
        svg.text( masterleft+55, top + 50, "k", {fontWeight: 'bold', fontSize: '18.5', fill: 'black'});
        svg.line(g, masterleft-100, 220, masterleft + 120, 220,{stroke: 'black'});
        svg.line(g,  masterleft+25, 220,  masterleft+25, top,{stroke: 'black'});
    }
    else if (personal_information.twin_status == 'FRATERNAL') {
        svg.text( masterleft+55, top + 50, "b", {fontWeight: 'bold', fontSize: '18.5', fill: 'black'});
        svg.line(g, masterleft-100, 220, masterleft + 120, 220,{stroke: 'black'});
        svg.line(g,  masterleft+25, 220,  masterleft+25, top,{stroke: 'black'});
    }

    //Gender
    if (personal_information.gender == 'MALE') {
        //Center Me
        svg.rect( masterleft, top, merr, merr, 10, 10, {
            id: 'me',
            fill: 'slateblue',
            stroke: 'red',
            strokeWidth: 2,
            cursor: 'pointer'
        });
    }
    else if (personal_information.gender == 'FEMALE') {

        svg.circle(masterleft+25, top, 30, {
            id: 'me',
            fill: 'slateblue',
            stroke: 'red',
            strokeWidth: 2,
            cursor: 'pointer'
        });
    }


    //Load all selecte values to array
    $.each(personal_information, function (key, item) {




        if(key.substring(0,13) == "paternal_aunt" || key.substring(0,14) == "paternal_uncle"){
            array.push('PATERNALS');
        }
        else if(key.substring(0,13) == "maternal_aunt" || key.substring(0,14) == "maternal_uncle"){
            array.push('MATERNALS');
        }
        else if(key == "maternal_grandmother" || key == "paternal_grandmother"){
            array.push('GRANDS');
        }
    });

    //Check if grand parents are included
    if ( ($.inArray('GRANDS', array) > -1) == true){
    //Begin process
        $.each(personal_information, function (key, item) {


            if (key == 'paternal_grandmother') {
                var mleft = masterleft - 30;
                //Prepare line shift in case of aunts/uncles
                if (($.inArray('PATERNALS', array) > -1) == true) {
                    svg.circle(mleft - 45, 70, cr, {
                        id: 'pgm',
                        fill: 'white',
                        stroke: 'red',
                        strokeWidth: 2,
                        cursor: 'pointer'
                    });
                    svg.text(mleft - 100, 120, "Grand Mother", {fontWeight: 'bold', fontSize: '12.5', fill: 'gray'});
                }
                else {
                    svg.circle(mleft, 70, cr, {
                        id: 'pgm',
                        fill: 'white',
                        stroke: 'red',
                        strokeWidth: 2,
                        cursor: 'pointer'
                    });
                    svg.text(mleft - 60, 120, "Grand Mother", {fontWeight: 'bold', fontSize: '12.5', fill: 'gray'});
                }

            }

            if (key == 'paternal_grandfather') {
                var mleft = masterleft - 185;
                //Prepare line shift in case of aunts/uncles
                if (($.inArray('PATERNALS', array) > -1) == true) {
                    svg.rect(mleft - 35, 47, rr, rr, 10, 10, {
                        id: 'pgf',
                        fill: 'white',
                        stroke: 'red',
                        strokeWidth: 2,
                        cursor: 'pointer'
                    });
                    svg.text(mleft - 70, 120, "Grand Father", {fontWeight: 'bold', fontSize: '12.5', fill: 'gray'});
                    svg.line(g, mleft - 35, 70, mleft + 110, 70, {id: 'pgl', stroke: 'black'});
                    svg.line(g, mleft + 50, 70, mleft + 50, 170, {id: 'fline', stroke: 'black'});
                }
                else {
                    svg.rect(mleft, 47, rr, rr, 10, 10, {
                        id: 'pgf',
                        fill: 'white',
                        stroke: 'red',
                        strokeWidth: 2,
                        cursor: 'pointer'
                    });
                    svg.text(mleft - 30, 120, "Grand Father", {fontWeight: 'bold', fontSize: '12.5', fill: 'gray'});
                    svg.line(g, mleft, 70, mleft + 130, 70, {id: 'pgl', stroke: 'black'});
                    svg.line(g, mleft + 85, 70, mleft + 85, 170, {id: 'fline', stroke: 'black'});
//                svg.line(g, mleft+20, 70, mleft+20, 170,{id: 'fline', stroke: 'blue'});
                }
            }

            //Paternal Grand Parents
            if (key == 'maternal_grandmother') {
                var mleft = masterleft + 200;
                if (($.inArray('MATERNALS', array) > -1) == true) {
                    svg.circle(mleft + 45, 70, cr, {
                        id: 'mgm',
                        fill: 'white',
                        stroke: 'red',
                        strokeWidth: 2,
                        cursor: 'pointer'
                    });
                    svg.text(mleft, 120, "Grand Mother", {fontWeight: 'bold', fontSize: '12.5', fill: 'gray'});
                    svg.line(g, mleft - 80, 70, mleft + 50, 70, {id: 'mgl', stroke: 'black'});
                    svg.line(g, mleft - 20, 70, mleft - 20, 170, {id: 'mline', stroke: 'black'});
                }
                else {
                    svg.circle(mleft, 70, cr, {
                        id: 'mgm',
                        fill: 'white',
                        stroke: 'red',
                        strokeWidth: 2,
                        cursor: 'pointer'
                    });
                    svg.text(mleft - 50, 120, "Grand Mother", {fontWeight: 'bold', fontSize: '12.5', fill: 'gray'});
                    svg.line(g, mleft - 140, 70, mleft + 10, 70, {id: 'mgl', stroke: 'black'});
                    svg.line(g, mleft - 60, 70, mleft - 60, 170, {id: 'mline', stroke: 'black'});
                }

            }

            if (key == 'maternal_grandfather') {
                var mleft = masterleft + 60;
                if (($.inArray('MATERNALS', array) > -1) == true) {
                    svg.rect(mleft + 40, 47, rr, rr, 10, 10, {
                        id: 'mgf',
                        fill: 'white',
                        stroke: 'red',
                        strokeWidth: 2,
                        cursor: 'pointer'
                    });
                    svg.text(mleft + 10, 120, "Grand Father", {fontWeight: 'bold', fontSize: '12.5', fill: 'gray'});
                }
                else {
                    svg.rect(mleft, 47, rr, rr, 10, 10, {
                        id: 'mgf',
                        fill: 'white',
                        stroke: 'red',
                        strokeWidth: 2,
                        cursor: 'pointer'
                    });
                    svg.text(mleft - 30, 120, "Grand Father", {fontWeight: 'bold', fontSize: '12.5', fill: 'gray'});
                }

            }

            //Mother
            if (key == 'father') {
                var mleft = masterleft - 120;
                // alert(obj.mother.name);
                svg.rect(mleft, 200, rr, rr, 10, 10, {
                    id: 'f',
                    fill: 'white',
                    stroke: 'red',
                    strokeWidth: 2,
                    cursor: 'pointer'
                });
                svg.text(mleft + 40, 180, "Father", {fontWeight: 'bold', fontSize: '12.5', fill: 'gray'});
                svg.line(g, mleft + 20, 170, mleft + 20, 200, {id: 'fst', stroke: 'black'});
            }

            //Father
            if (key == 'mother') {
                var mleft = masterleft + 140;
                svg.circle(mleft, 220, cr, {id: 'm', fill: 'white', stroke: 'red', strokeWidth: 2, cursor: 'pointer'});
                svg.text(mleft - 60, 180, "Mother", {fontWeight: 'bold', fontSize: '12.5', fill: 'gray'});
                svg.line(g, mleft, 170, mleft, 200, {id: 'mst', stroke: 'black'});
            }
        });


    }else {
        //Begin process  (Temp Default)
        var defaults = new Array('paternal_grandmother', 'paternal_grandfather', 'maternal_grandmother', 'maternal_grandfather', 'father', 'mother');
        $.each(defaults, function (key, item) {


            if (item == 'paternal_grandmother') {
                var mleft = masterleft - 30;
                //Prepare line shift in case of aunts/uncles
                if (($.inArray('PATERNALS', array) > -1) == true) {
                    svg.circle(mleft - 45, 70, cr, {
                        id: 'pgm',
                        fill: 'white',
                        stroke: 'red',
                        strokeWidth: 2,
                        cursor: 'pointer'
                    });
                    svg.text(mleft - 100, 120, "Grand Mother", {fontWeight: 'bold', fontSize: '12.5', fill: 'gray'});
                }
                else {
                    svg.circle(mleft, 70, cr, {
                        id: 'pgm',
                        fill: 'white',
                        stroke: 'red',
                        strokeWidth: 2,
                        cursor: 'pointer'
                    });
                    svg.text(mleft - 60, 120, "Grand Mother", {fontWeight: 'bold', fontSize: '12.5', fill: 'gray'});
                }

            }

            if (item == 'paternal_grandfather') {
                var mleft = masterleft - 185;
                //Prepare line shift in case of aunts/uncles
                if (($.inArray('PATERNALS', array) > -1) == true) {
                    svg.rect(mleft - 35, 47, rr, rr, 10, 10, {
                        id: 'pgf',
                        fill: 'white',
                        stroke: 'red',
                        strokeWidth: 2,
                        cursor: 'pointer'
                    });
                    svg.text(mleft - 70, 120, "Grand Father", {fontWeight: 'bold', fontSize: '12.5', fill: 'gray'});
                    svg.line(g, mleft - 35, 70, mleft + 110, 70, {id: 'pgl', stroke: 'black'});
                    svg.line(g, mleft + 50, 70, mleft + 50, 170, {id: 'fline', stroke: 'black'});
                }
                else {
                    svg.rect(mleft, 47, rr, rr, 10, 10, {
                        id: 'pgf',
                        fill: 'white',
                        stroke: 'red',
                        strokeWidth: 2,
                        cursor: 'pointer'
                    });
                    svg.text(mleft - 30, 120, "Grand Father", {fontWeight: 'bold', fontSize: '12.5', fill: 'gray'});
                    svg.line(g, mleft, 70, mleft + 130, 70, {id: 'pgl', stroke: 'black'});
                    svg.line(g, mleft + 85, 70, mleft + 85, 170, {id: 'fline', stroke: 'black'});
                }
            }

            //Paternal Grand Parents
            if (item == 'maternal_grandmother') {
                var mleft = masterleft + 200;
                if (($.inArray('MATERNALS', array) > -1) == true) {
                    svg.circle(mleft + 45, 70, cr, {
                        id: 'mgm',
                        fill: 'white',
                        stroke: 'red',
                        strokeWidth: 2,
                        cursor: 'pointer'
                    });
                    svg.text(mleft, 120, "Grand Mother", {fontWeight: 'bold', fontSize: '12.5', fill: 'gray'});
                    svg.line(g, mleft - 80, 70, mleft + 50, 70, {id: 'mgl', stroke: 'black'});
                    svg.line(g, mleft - 20, 70, mleft - 20, 170, {id: 'mline', stroke: 'black'});
                }
                else {
                    svg.circle(mleft, 70, cr, {
                        id: 'mgm',
                        fill: 'white',
                        stroke: 'red',
                        strokeWidth: 2,
                        cursor: 'pointer'
                    });
                    svg.text(mleft - 50, 120, "Grand Mother", {fontWeight: 'bold', fontSize: '12.5', fill: 'gray'});
                    svg.line(g, mleft - 140, 70, mleft + 10, 70, {id: 'mgl', stroke: 'black'});
                    svg.line(g, mleft - 60, 70, mleft - 60, 170, {id: 'mline', stroke: 'black'});
                }

            }

            if (item == 'maternal_grandfather') {
                var mleft = masterleft + 60;
                if (($.inArray('MATERNALS', array) > -1) == true) {
                    svg.rect(mleft + 40, 47, rr, rr, 10, 10, {
                        id: 'mgf',
                        fill: 'white',
                        stroke: 'red',
                        strokeWidth: 2,
                        cursor: 'pointer'
                    });
                    svg.text(mleft + 10, 120, "Grand Father", {fontWeight: 'bold', fontSize: '12.5', fill: 'gray'});
                }
                else {
                    svg.rect(mleft, 47, rr, rr, 10, 10, {
                        id: 'mgf',
                        fill: 'white',
                        stroke: 'red',
                        strokeWidth: 2,
                        cursor: 'pointer'
                    });
                    svg.text(mleft - 30, 120, "Grand Father", {fontWeight: 'bold', fontSize: '12.5', fill: 'gray'});
                }

            }

            //Mother
            if (item == 'father') {
                var mleft = masterleft - 120;
                // alert(obj.mother.name);
                svg.rect(mleft, 200, rr, rr, 10, 10, {
                    id: 'f',
                    fill: 'white',
                    stroke: 'red',
                    strokeWidth: 2,
                    cursor: 'pointer'
                });
                svg.text(mleft + 40, 180, "Father", {fontWeight: 'bold', fontSize: '12.5', fill: 'gray'});
                svg.line(g, mleft + 20, 170, mleft + 20, 200, {id: 'fst', stroke: 'black'});
            }

            //Father
            if (item == 'mother') {
                var mleft = masterleft + 140;
                svg.circle(mleft, 220, cr, {id: 'm', fill: 'white', stroke: 'red', strokeWidth: 2, cursor: 'pointer'});
                svg.text(mleft - 60, 180, "Mother", {fontWeight: 'bold', fontSize: '12.5', fill: 'gray'});
                svg.line(g, mleft, 170, mleft, 200, {id: 'mst', stroke: 'black'});
            }
        });
    }

        //Begin process for Objects
        $.each(personal_information, function (key, item) {
        if (typeof item == 'object') {
                var otop=280;
                var mtop=otop+20;
                var ftop=otop+40;
                var mats = 0;
                var pats = 0;

                if (key.substring(0, 7) == "brother") {
                    var mleft = masterleft-20;
                    var no = key.substring(8, 9);
                    if (no == "0") {
                        l = mleft - 55;
                    }
                    else {
                        l = l - 75;
                    }
                    svg.rect(l, mtop, rr, rr, 10, 10, {
                        id: 'bro',
                        fill: 'white',
                        stroke: 'red',
                        strokeWidth: 2,
                        cursor: 'pointer'
                    });
                    svg.text(565, otop-10, "Brothers", {fontWeight: 'bold', fontSize: '12.5', fill: 'gray'});
                    svg.line(g, l + 20, otop, 625, otop,{stroke: 'black'});
                    svg.line(g, l + 20, otop, l + 20, 340,{stroke: 'black'});
                }

                else if(key.substring(0,6) == "sister"){
                    var mleft = masterleft-10;
                    var no = key.substring(7,8);
                    if(no == "0"){r = mleft + 110; }
                    else {r = r + 60; }
                    svg.circle(r, ftop, cr, {id: 'sis-'+no, fill: 'white', stroke: 'red', strokeWidth: 2, cursor: 'pointer' });
                    svg.text(655, otop-10, "Sisters", {fontWeight: 'bold', fontSize: '12.5', fill: 'gray'});
                    svg.line(g, r, otop, 625, otop,{stroke: 'black'});
                    svg.line(g, r, otop, r, 340,{stroke: 'black'});
                }

                else if(key.substring(0,13) == "paternal_aunt"){
                    var mleft = masterleft-50;
                    var no = key.substring(14, 15);
                    if(no == "0" && ml==350){
                        ml = mleft - 135;
                    }
                else {ml = ml - 65; }
                    svg.circle(ml+15, 220, cr, {id: 'mat-'+no, fill: 'white', stroke: 'red', strokeWidth: 2, cursor: 'pointer' });
                    svg.line(g,ml+85, 170,ml+20, 170,{stroke: 'black'});
                    svg.line(g, ml+20, 170, ml+20, 220,{stroke: 'black'});
                    mats = ml;
                }

                else if(key.substring(0,14) == "paternal_uncle"){

                    var mleft = masterleft-25;

                    var no = key.substring(15,16);
                    if(no == "0"){
                        ml = mleft - 165;
                    }
                    else {ml = ml - 65; }
                    svg.rect(ml, 200,  rr, rr, 10, 10, {id: 'mun-'+no, fill: 'white', stroke: 'red', strokeWidth: 2, cursor: 'pointer' });
                    svg.line(g, ml+90, 170,ml+20, 170,{stroke: 'black'});
                    svg.line(g, ml+20, 170, ml+20, 220,{stroke: 'black'});
                    mats = ml;
                }

                else if(key.substring(0,13) == "maternal_aunt"){
                    var mleft = masterleft-50;
                    var no = key.substring(14,15);
                    if(no == "0" && pl==350){
                        pl = mleft + 260;
                    }
                    else if(no!="0"){pl = pl + 65; }
                    else {pl = pl + 85; }
                    svg.circle(pl, 220, cr, {id: 'pat-'+no, fill: 'white', stroke: 'red', strokeWidth: 2, cursor: 'pointer' });
                    svg.line(g, pl-70, 170, pl, 170,{stroke: 'black'});
                    svg.line(g, pl, 170, pl, 220,{stroke: 'black'});
                }

                else if(key.substring(0,14) == "maternal_uncle"){
                    var mleft = masterleft-25;
                    var no = key.substring(15,16);
                    if(no == "0"){
                        pl = mleft + 220;
                    }
                    else {pl = pl + 65; }
                    svg.rect(pl, 200,  rr, rr, 10, 10, {id: 'pun-'+no, fill: 'white', stroke: 'red', strokeWidth: 2, cursor: 'pointer' });
                    svg.line(g, pl-55, 170, pl+20, 170,{stroke: 'black'});
                    svg.line(g, pl+20, 170, pl+20, 220,{stroke: 'black'});
                }

                else if(key.substring(0,8) == "daughter"){
                    var mleft = masterleft-25;
                    var no = key.substring(9,10);
                    if(no == "0"){dl = mleft + 100; }
                    else {dl = dl + 70; }
                    svg.circle(dl, 410, cr, {id: 'daughter-'+no, fill: 'white', stroke: 'red', strokeWidth: 2, cursor: 'pointer' });
                    svg.line(g, 625, 370, dl, 370,{stroke: 'black'});
                    svg.line(g, dl,370, dl, 410,{stroke: 'black'});
                    //Connect to me
                    svg.line(g, masterleft+25,330, masterleft+25, 370,{stroke: 'black'});
                }

                else if(key.substring(0,3) == "son"){
                    var mleft = masterleft-25;
                    var no = key.substring(4,5);
                    if(no == "0"){sl = mleft - 30; }
                    else {sl = sl - 55; }
                    svg.rect(sl, 390, rr, rr, 10, 10, {id: 'son-'+no, fill: 'white', stroke: 'red', strokeWidth: 2, cursor: 'pointer' });
                    svg.line(g, sl+25, 370, sl+80, 370,{stroke: 'black'});
                    svg.line(g, sl+25, 370, sl+25, 410  ,{stroke: 'black'});
                    //Connect to me
                    svg.line(g, masterleft+25,330, masterleft+25, 370,{stroke: 'black'});
                }
                else{
                }
            }

        var pos = 550;
        var k = svg.group({stroke: 'red', strokeWidth: 2, 'z-index' : '9999'});

        //Index keys
        svg.rect(30, 570, 400, 100, 10, 10, {
            id: 'panel',
            fill: 'none',
            stroke: 'silver',
            strokeWidth: 1
        });

        var kcr = 21;
        var krr = 40;


        svg.line(k, 270+40, 35+pos, 270-35, 115+pos,{id: 'l1', strokeWidth: 1});
        svg.line(k, 330+50, 40+pos, 325-20, 115+pos,{id: 'l5', strokeWidth: 1});

        //Live
        svg.text(100, 10+pos, "Alive", {fontWeight: 'bold', fontSize: '12.5', fill: 'gray'});
        svg.circle(75, 75+pos, kcr,{id: 'kfd',fill: 'none', stroke: 'red', strokeWidth: 1});
        svg.rect(120, 54+pos, krr, krr, 10, 10, {id: 'kmd',fill: 'none', stroke: 'red', strokeWidth: 1});


        //Deceased
        svg.text(270, 10+pos, "Deceased", {fontWeight: 'bold', fontSize: '12.5', fill: 'gray'});
        svg.circle(270, 75+pos, kcr, {id: 'kf', fill: 'none', stroke: 'red', strokeWidth: 1});
        svg.rect(325, 53+pos, krr, krr, 10, 10, {id: 'km',fill: 'none', stroke: 'red', strokeWidth: 1});

        //Qtip loader
        $("#family_pedigree").find("circle").each(function() {

            var e = this.id;
            var content1 = "<a href='#' onclick=readjson('" + e + "')>Edit</a>";
            var content2 = "<a href='#' onclick=readjson('" + e + "')>Add Daughter</a>";
            var content3 = "<a href='#' onclick=readjson('" + e + "')>Add Son</a>";

            $('#'+e).qtip({
                content: {
                    text: function() {
                        return $(this).attr("data-info");
                    },
                    title: {
                        text: '<div align="left" width="300px" class="pop">' +
                        '<ul id="navlist" width="300px" style="font-size: 10px">' +
                        '<li>'+content1+'</li>' +
                        '<li>'+content2+'</li>' +
                        '<li>'+content3+'</li>' +
                        '</ul>' +
                        '</div>',
                        button: true
                    }
                },
                show: {
                    event: 'click',
                    solo: false,
                    modal: true
                },
                position: {
                    my: 'top right', // ...at the center of the viewport
                    at: 'center',
                    target: $('#'+e)
                },
                hide: false,
                events: {
                    show: function(event, api) {
                        $('#'+e).attr('stroke', 'blue');

                    },
                    hide: function(api, event) {
                        $('#'+e).attr('stroke', 'red');
                        return $('.qtip').qtip('destroy');
                    }
                },
                style: {
                    classes: 'qtip-bootstrap'
                }
            });
        });



    });

//    var found = $.inArray('PARENTALS', array) > -1;
//    alert(found)

//    if ( ($.inArray('PARENTALS', array) > -1) == true){
//            $('#pgm').attr("cx", parseInt($('#pgm').attr("cx")) - 35);
//            $('#pgf').attr("x", parseInt($('#pgf').attr("x")) - 35);
//            $('#fline').attr("x1", parseInt($('#fline').attr("x1")) - 34);
//            $('#fline').attr("x2", parseInt($('#fline').attr("x2")) - 34);
//    }
//    if ( ($.inArray('MATERNALS', array) > -1) == true){
//            $('#mgm').attr("cx",  parseInt($('#mgm').attr("cx"))+35);
//            $('#mgf').attr("x", parseInt($('#mgf').attr("x")) + 35);
//            $('#mline').attr("x1", parseInt($('#mline').attr("x1")) + 34);
//            $('#mline').attr("x2",parseInt( $('#mline').attr("x2")) + 34);
//    }



}