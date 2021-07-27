// ==UserScript==
// @name         Baha JiCha tool
// @namespace    GiCha
// @version      0.3
// @description  Let me hlep you JiCha!!
// @author       opmm0809
// @match        https://forum.gamer.com.tw/C.php?*
// @match        https://forum.gamer.com.tw/Co.php?*
// @icon         https://www.google.com/s2/favicons?domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function(jQuery) {
    'use strict';

    // Your code here...
    function hentai_log(text) {
        console.log("hentai tools: " + text);
    }
    //hentai_log("start");
    var posts = document.getElementsByClassName("c-post__header__author");
    var pars = window.location.href.split("?")[1].split("&");
    var bsn = "";
    // parse parameter "bsn" from URL
    pars.every(element => {
        var tmp = element.split("=");
        if (tmp[0] == "bsn") {
            bsn = tmp[1];
            return false;
        } else {
            return true;
        }
    })

    for (var i = 0; i < posts.length; i++) {
        //hentai_log("floor" + String(i + 1) + " start");
        var floor_author_id = posts[i].getElementsByClassName("userid")[0].text;
        var insert_element = document.createElement('a');
        insert_element.href = `https://forum.gamer.com.tw/Bo.php?bsn=${bsn}&qt=6&q=${floor_author_id}`;
        insert_element.text = "稽查";
        insert_element.target = "_blank";
        insert_element.rel = "noreferrer noopener";
        insert_element.style.color = "#ed0854";
        posts[i].appendChild(insert_element);

        //hentai_log("author_id: " + floor_author_id);
        //hentai_log("floor" + String(i + 1) + " end");
    }

    var reply_author_id = "";
    jQuery(document).ready(function(){
        jQuery(document).on('mouseover', '.tippy-reply-menu', function() {
            var user_url = jQuery(this).parent().find('.user--sm')[0].href;
            var parse = user_url.split("/");
            reply_author_id = parse[parse.length - 1];
            console.log(reply_author_id);
        });


        jQuery('body').on('DOMNodeInserted', '.tippy-popper', function(e) {
            var choose_list = e.target.getElementsByTagName("ul")[0];
            var menu = jQuery(choose_list).closest(".tippy-tooltip--regular");    // to identify what kind of menu
            if (choose_list != undefined && choose_list.className == "" && menu.attr("data-template-id") == "#replyMenu") {

                //console.log(tmp.attr("data-template-id"))
                //console.log(reply_author_id);
                //console.log(choose_list);
                var DOM = `<li id = 'hentai'><a href = "https://forum.gamer.com.tw/Bo.php?bsn=${bsn}&qt=6&q=${reply_author_id}" style='color: rgb(237, 8, 84);' target="_blank" rel="noreferrer noopener">稽查</a></li>`
                jQuery(choose_list).find("#hentai").remove()
                jQuery(choose_list).append(DOM);
            }
        });
    });
})(jQuery);
