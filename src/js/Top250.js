define(['helper','jquery'],function(Helpers,$){
  var Top250 = {
    init: function(){
      var _this = this
      this.$container = $('#top250')
      this.$content = this.$container.find('.container')
      this.page = 0
      this.count = 10
      this.isFinshed = false
      this.isLoading = false
      this.bind()
      this.getData(function(data){
        _this.renderData(data)
        _this.page++
      })
    },
    bind: function(){
      var _this = this
  
      this.$container.on('scroll', function(){
        console.log(_this.isLoading)
        if(Helpers.isToBottom(_this.$container, _this.$content) && !_this.isFinshed && !_this.isLoading){
          console.log('to bottom')
          _this.getData(function(data){
            _this.renderData(data)
            _this.page++
            if(_this.page * _this.count > data.total) {
              _this.isFinshed = true
            }
          })
        }
        // if(_this.clock){
        //   clearTimeout(_this.clock)
        // }
        // _this.clock = setTimeout(function(){
        //   console.log('scroll...')
  
        // }, 100)
      })
    },
    getData: function(callback){
      var _this = this
      this.isLoading = true
      this.$container.find('.loading').show(400)
      $.ajax({
        url: 'http://api.douban.com/v2/movie/top250',
        data: {
          start: this.count*this.page,
          count: this.count
        },
        dataType: 'jsonp'
      }).done(function(ret){
        _this.isLoading = false
        _this.$container.find('.loading').hide(400)
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
  return Top250
})

