<template>
    <div class="optional grayBg">
		<div v-if="optionalFlag">
	  		<ul class="zsList">
	  			<li v-for="(item,index) in zsList" v-bind:class="{red:item.zde>0, green:item.zde<0}">
	  				<h3>{{item.name}}</h3>
	  				<p class="zsList_font01">{{item.zhishu}}</p>
	  				<p class="zsList_font02"><span>{{item.zde}}</span><em>{{item.zdf}}</em></p>
	  			</li>
	  		</ul>
	  		<div class="optional_list">
	  			<ul class="optional_title"><li>自选股</li><li>最新价</li><li>涨跌幅</li></ul>
	  			<ul class="optional_content">
	  				<li v-for="(item,index) in stockList">
	  					<div class="optional_content_left">
	  						<span>{{item.name}}</span>
	  						<i>{{item.code}}</i>
	  					</div>
	  					<div class="optional_content_center">
	  						<span>{{item.price}}</span>
	  					</div>
	  					<div class="optional_content_right">
	  						<span v-bind:class="{redBg:item.zdf>0, greenBg:item.zdf<0, grayBg:item.zdf==0}">{{item.zdf}}%</span>
	  					</div>
	  				</li>
	  			</ul>
	  			<p class="addStock" v-on:click="addStock()">添加自选</p>
	  		</div>
	  	</div>
		<div class="searchStock" v-if="!optionalFlag">
			<div class="searchTitle">
				<p><input type="text" v-on:input="searchInput()" v-model="message" maxlength="6" placeholder="请输入股票代码"></p>
				<span v-on:click="cancel()">取消</span>
		    </div>
			<ul class="searchList" v-if="searchListFlag">
				<li v-for="(item,index) in searchList">
					<span>{{item.name}}</span>
					<em>{{item.code}}</em>
					<i v-if="item.isOn" v-on:click="add(index)"><img src="../assets/images/add_03.png"></i>
                    <i v-else>已选</i>
				</li>		
			</ul>
		</div>
    </div>
</template>
<style scoped>
	.zsList{ overflow:hidden; display:flex; padding:1rem 0; background: #fff; margin-bottom: 1rem;}
	.zsList li{ flex:1; text-align: center; box-sizing:border-box; height: 5.5rem;}
	.zsList li h3{font-size: 1.2rem; font-weight: 400; line-height: 1.6rem; color: #4c4c4c;}
	.zsList li:nth-child(2){ border-left: 1px solid #ccc;border-right: 1px solid #ccc;}
	.zsList_font01{ line-height: 2.2rem; font-size: 1.7rem;margin:0.2rem 0;}
	.zsList_font02{ font-size: 1.1rem;}
	.zsList_font02 span{ margin-right: 1rem; }
	.optional_list{background: #fff;}
	.optional_title{ overflow: hidden; line-height:3.1rem; height: 3rem; border-bottom: 1px solid #000; position: relative; padding: 0 1rem;}
	.optional_title li{ display: block; float: left; color: #a1a1a1; font-size: 1.2rem; text-align: center; width: 47%;}
	.optional_title li:nth-child(1){ text-align: left;width: 28%;}
	.optional_title li:nth-child(3){ width: 25%;}
	.optional_content{ padding:0 1rem; }
	.optional_content li{ overflow: hidden; width: 100%; text-align: center; border-bottom: 1px solid #ddd; padding: 0.6rem 0; font-size: 1.4rem;}
	.optional_content li div{ float: left; width: 47%; text-align: center;}
	.optional_content li div:nth-child(1){ width: 28%; text-align: left;}
	.optional_content li div:nth-child(3){ width: 25%;}
	.optional_content li:last-child{ border-bottom: 0; }
	.optional_content_left span{ display: block; margin-bottom: 0.4rem; line-height: 1.4rem;}
	.optional_content_left i{ display: block; font-size: 1rem; color: #909090; line-height: 1rem;}
	.optional_content_center{ line-height: 2.8rem; }
	.optional_content_right span{ display: block; width: 7.5rem; height: 2.5rem; line-height: 2.5rem; margin:0.15rem auto; border-radius: 0.5rem; color: #fff;}
	.optional_content .grayBg{ background:#B2B2B2;}
	.addStock{ margin:0.5rem 1rem; height: 3.2rem; line-height: 3.2rem; background:#FE5252; text-align: center; font-size: 1.4rem; color: #fff;}
	.searchStock{ background: #fff; }
	.searchTitle{ height: 2.8rem; border-bottom: 1px solid #ddd; padding:1rem 0.8rem;}
	.searchTitle p{ border: 1px solid #ddd; height: 2.8rem; box-sizing:border-box; overflow: hidden; padding:0 0.5rem; background:#f6f7f8; float: left; width: 86%;}
	.searchTitle p input{ height: 2.7rem; border:0; padding:0; font-size: 1.2rem; background: none;width: 100%;}
	.searchTitle span{ display: block; float: right; width: 14%; text-align: center; height: 2.8rem; line-height: 2.8rem; font-size: 1.2rem; color: #a1a1a1;}
	.searchList{ padding:0 0.8rem; }
	.searchList li{ line-height: 4.5rem; border-bottom: 1px solid #ddd; overflow: hidden; font-size: 1.3rem;}
	.searchList li span{ display: block; float: left; width: 33%;}
	.searchList li em{ display: block; float: left; color: #909090;}
	.searchList li i{ display: block; float: right; color: #909090;}
	.searchList li i img{ width:2.6rem;}
</style>
</style>
<script>
    import axios from 'axios'
    export default {
    	data(){
    		return{
    			optionalFlag:true,
    			zsList:[{
    				name:'上证指数',
    				zhishu:3112.68,
    				zde:+2.63,
    				zdf:'1.1%'
    			},{
    				name:'深圳成指',
    				zhishu:3112.68,
    				zde:-2.63,
    				zdf:'1.1%'
    			},{
    				name:'创业板指',
    				zhishu:3112.68,
    				zde:+2.63,
    				zdf:'1.1%'
    			}],
    			stockList:[{
    				name:'赣锋锂业',
    				code:'002460',
    				price:43.90,
    				zdf:-23.15
    			},{
    				name:'赣锋锂业',
    				code:'002460',
    				price:43.90,
    				zdf:+23.15
    			},{
    				name:'赣锋锂业',
    				code:'002460',
    				price:43.90,
    				zdf: 0
    			}],
    			searchList:[{
    				name:'赣锋锂业',
    				code:'004560',
    				isOn:true
    			},{
    				name:'赣锋锂业',
    				code:'004560',
    				isOn:true
    			},{
    				name:'赣锋锂业',
    				code:'004560',
    				isOn:true
    			},{
    				name:'赣锋锂业',
    				code:'004560',
    				isOn:true
    			}],
    			message:'',
    			searchListFlag:false,
    		}
    	},
    	methods:{
			addStock: function() {
				  var _this = this;
				  _this.optionalFlag = false;
                  var top = document.getElementById("top");
                  var topNav_placeholder = document.getElementsByClassName("topNav_placeholder")[0];
                  top.style = "display:none";
                  topNav_placeholder.style = "display:none";
            },
            searchInput:function(){
                var _this = this;
                _this.message = _this.message.trim()
                if(_this.message.length >3){
                	_this.searchListFlag = true;
                }else{
                	_this.searchListFlag = false;
                }  
            },
            add:function(index){
            	var _this = this;
            	_this.searchList[index].isOn = false;                              
            },
            cancel:function(index){
            	var _this = this;
            	_this.searchListFlag = false;
            	_this.optionalFlag = true;
            	_this.message = "";
                var top = document.getElementById("top");
                var topNav_placeholder = document.getElementsByClassName("topNav_placeholder")[0];
                top.style = "display:block";
                topNav_placeholder.style = "display:block";
            }
        }
    }
</script>