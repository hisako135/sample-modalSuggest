$(function(){
    var fwBody      = $('#js-fwBody');
    var fwBox       = $('#js-fwBox');
    var modal       = $('#js-modal');
    var kwrd        = $('#js-kwrd');
    var srchBtn     = $('#js-srch');
    var closeBtn    = $('#js-close');
    var sgBody      = $('#js-sgBody');
    var sgList      = $('#js-sgList');
    var jsonData    = [];
    var liTemp      = [];

    fwBox.focus(function(){
        fwBody.hide();
        modal.show();
        kwrd.focus();
    });

    srchBtn.on('click',function(){
        var fw = kwrd.val();
        $.ajax({
            url: "http://completion.amazon.co.jp/search/complete",
            data: {mkt:'6', method:'completion', 'search-alias':'aps', q:fw},
            dataType: "jsonp",
            type: "GET",
            success :function(data) {
                jsonData = data[1];                    
                if(!jsonData.length){
                    console.log('商品はありません。');
                }else{
                    for(var i = 0; i < jsonData.length; i++){
                        var li ='<li class="list-group-item"><a href="#">'+ jsonData[i] + '</a></li>';
                        liTemp.push(li);
                    }
                    render(sgList,liTemp);
                    sgBody.css('visibility','visible');
                }
            }
        });
    });

    closeBtn.on('click',function(){
        if(jsonData.length){
            reset(jsonData);
            reset(liTemp);
            sgList.empty();
        }
        kwrd.val('');
        modal.hide();
        fwBody.show();
    });  

    function render(dom,html){
        return dom.append(html);
    }

    function reset(array){
        return array.splice(0,array.length);
    }

});
