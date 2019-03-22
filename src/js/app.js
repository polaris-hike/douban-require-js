define(['page','Top250','usboard','search','jquery'], function(Paging,Top250,UsBoard,Search){
  var App = {
    init: function(){
      Paging.init()
      Top250.init()
      UsBoard.init()
      Search.init()
    }
  }
  return App 
})

