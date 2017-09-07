$(function(){
    var fwBody = $('#js-fwBody');
    var fwBox = $('#js-fwBox');
    var modal = $('#js-modal');
    var sgst = $('#js-sgst');
    var srchBtn = $('#js-srch');
    var closeBtn = $('#js-close');
    var sgBody = $('js-sgBody');
    var sgList = $('js-sgList');

    fwBox.focus(function(){
        fwBody.hide();
        modal.show();
        
        closeBtn.on('click',function(){
            console.log('入力された値は「' + sgst.val() + '」だよ');
            sgst.val('');
            console.log(sgst.val() + '消したよ');
            fwBody.show();
            modal.hide();
        });

        srchBtn.on('click',function(){
            var fw = sgst.val();
            $.ajax({
                url: "http://completion.amazon.co.jp/search/complete",
                data: {mkt:'6', method:'completion', 'search-alias':'aps', q:fw},
                dataType: "jsonp",
                type: "GET",
                success :function(data) {                    
                    if(data){
                        var jsonData = data[1];
                        var liTemp = [];
                        console.log(jsonData);

                        for(var i = 0; i < jsonData.length; i++){
                            var li = document.createElement('li');
                            li.innerHTML = jsonData[i];
                            liTemp.push(li);
                        }
                        console.log(liTemp);
                        render(sgList,liTemp);
                        sgBody.css('visibilty','visible');
                    }
                }
            });
        });
    });
    function render(dom,html){
        dom.innerHTML = html;
    }
});