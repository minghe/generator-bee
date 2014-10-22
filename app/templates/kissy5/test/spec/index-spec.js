KISSY.add(function (S,require) {
    var index = require('<%=name%>/index');
    describe('<%=name%> index', function () {
        it('index init',function(){
            expect(index).toBeTruthy();
        })
    });

});