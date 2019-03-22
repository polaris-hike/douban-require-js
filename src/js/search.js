define(['jquery','helper'],function($,Helpers){
  var Search = {
    init: function() {
      this.page = 0
      this.count = 10
      this.isFinshed = false
      this.isLoading = false
      this.$container = $('#search')
      this.$content = this.$container.find('.container')
      this.bind()
    },
  
    bind: function() {
      var _this = this
      this.$container.find('.search-area .button').on('click', function(){
        console.log('click ')
        _this.getData(function(data){
          console.log(data)
          _this.renderData(data)
        })
      })
      console.log(this.$container.find('.search-area input'))
      this.$container.find('.search-area input').on('keyup', function(e){
        if(e.key === 'Enter') {
          _this.getData(function(data){
          _this.renderData(data)
        })
        }
      })
  
      this.$container.on('scroll', function(){
        console.log(_this.isLoading)
        if(Helpers.isToBottom(_this.$container, _this.$container.find('.wrap')) && !_this.isFinshed && !_this.isLoading){
          console.log('to bottom')
          _this.getData(function(data){
            _this.renderData(data)
            _this.page++
            if(_this.page * _this.count > data.total) {
              _this.isFinshed = true
            }
          })
        }
      })
    },
    getData: function(callback){
      var _this = this
      var keyword = this.$container.find('.search-area input').val()
      this.isLoading = true
      $.ajax({
        url: 'http://api.douban.com/v2/movie/search',
        data: {
          q: keyword
        },
        dataType: 'jsonp'
      }).done(function(ret){
        _this.isLoading = false
        callback(ret)
      })
    },
    renderData(data){
      var _this = this
      data.subjects.forEach(function(item){
        var $node = Helpers.createNode(item)
        _this.$content.append($node)    
      })
    }
  }
  return Search
})

