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
        changeProp(srchBtn, 'disabled', true);
        if(!fw){
            li ='<li class="list-group-item">入力してください。</li>';
            liTemp.push(li);
            render(sgList,liTemp);
            sgBody.css('visibility','visible');
        }else{
            $.ajax({
                url: "https://completion.amazon.co.jp/search/complete",
                data: {mkt:'6', method:'completion', 'search-alias':'aps', q:fw},
                dataType: "jsonp",
                type: "GET",
                success :function(data) {
                    jsonData = data[1];                    
                    if(!jsonData.length){
                        li ='<li class="list-group-item">お探しの商品は見つかりませんでした。</li>';
                        liTemp.push(li);
                    }else{
                        for(var i = 0; i < jsonData.length; i++){
                            li ='<li class="list-group-item">'+ jsonData[i] + '</li>';
                            liTemp.push(li);
                        }
                    }
                    render(sgList,liTemp);
                    sgBody.css('visibility','visible');
                }
            });
        }
        kwrd.keyup(function(){
            if(chkChange(fw,srchBtn)){
                changeProp(srchBtn, 'disabled', false);
                reset(jsonData);
                reset(liTemp);
                sgList.empty();
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

    // 入力された値の監視
    function chkChange(val,item){
        var oldVal = val;
        return function(){
            var newVal = item.val();
            if(oldVal !== newVal) {
                return true;
            }
        }
    }

    // プロパティのフラグ設定
    function changeProp(elm,prop,flg){
        return elm.prop(prop,flg);
    }

    // DOMレンダリング
    function render(dom,html){
        return dom.append(html);
    }

    // 配列リセット
    function reset(array){
        return array.splice(0,array.length);
    }

});
