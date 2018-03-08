<template>
    <div class="first" id="first">
    	<ul class="focus">
            <li v-for="(item,index) in focusList">
            	<router-link :to="{path: item.toLink}"><span>{{item.name}}</span></router-link>
            </li>
        </ul>
		<div class="news">
			<ul>
				<li v-for="(item,index) in newsList">
					<div class="newsRight">
						<img src="../assets/images/1.jpg">
					</div>
					<div class="newsLeft">
						<h3>{{item.title}}</h3>
						<p>{{item.content}}</p>
					</div>
					<p class="newsTips">
						<span>By<i>{{item.name}}</i></span>
						<em>来自栏目<i>{{item.itemName}}</i><i>{{item.time}}</i></em>
					</p>
				</li>
			</ul>
		    <div class="loading" v-if="loadFlag"><i></i>加载中...</div>
		    <div class="loading" v-if="!loadFlag">暂无更多数据</div>
		</div>
    </div>    
</template>
<script>
    import axios from 'axios'
    var scrollFlag = true;
    var data =[];
    export default {
    	name: 'first',
    	data () {
		    return {
		      loadFlag:true,	
		      counter: 0,
		      page:0,
		      focusList:[{
		      	name:'智赢天胜',
		      	toLink:'zyts'
		      },{
		      	name:'超级1+1',
		      	toLink:''
		      },{
		      	name:'雷霆5号',
		      	toLink:''
		      },{
		      	name:'666',
		      	toLink:''
		      }],
		      newsList:[]
		    }
		},
		mounted:function(){
            var _this = this;
            if(_this.newsList == ''){
	            setTimeout(function() {
	                _this.newsList = _this.createTestData(10, true);
	            }, 1000);
	        }
	        window.addEventListener('scroll', function () {
                if (document.body.scrollTop + window.innerHeight >= document.body.offsetHeight && document.body.clientHeight > window.innerHeight) {
                    if (scrollFlag == true && _this.page<2) {
                    	console.log(123)
                        scrollFlag = false;
                        _this.loadFlag = true;
                        setTimeout(function () {
                            _this.newsList = _this.newsList.concat(_this.createTestData(5));
                        }, 500)
                    	_this.page++;                     
                	}else{
                		console.log(456)
                		_this.loadFlag = false;
                	}
                }
            })
        },
        methods:{
			createTestData: function(count, isReset) {
				scrollFlag = true;
                if (isReset) {
                    this.counter = 0;
                }
                var res = [];
                for (var i = 0; i < count; i++) {
                    res.push({
                        imgSrc:'../assets/images/1.jpg',
				      	title:'人生最关键的7个问题，我们都帮你解决了！',
				      	content:'我妈【我拎了一箱鸡蛋给你，放你厨房柜子里了】我【嗯，猫有没有捣乱】我妈【不晓得，我放下鸡蛋就走了】',
				      	name:'某某人',
				      	itemName:'趋势密码',
				      	time:'20分钟前'
                    });
                    this.counter++;
                }
                return res;
            }
        }
    }
</script>
<style scoped>
	.focus{ overflow: hidden; padding:0.8rem 0.8rem 0 0.8rem;}
	.focus li{ float: left; width:50%; text-align:center;line-height: 3rem; font-size: 1.2rem;}
	.focus li span{ display: block; margin:0.15rem; background: #f1f1f1; color: #494949;}
	.news{ padding:0 0 3rem 0; width:100%; position: relative; }
	.news ul { margin:0 0.95rem; }
	.news li{ width:100%; position: relative; padding: 1.5rem 0;}
	.news li:before{ content:""; height: 1px; width:100%; background: #eee; position: absolute; bottom: 0rem; 
	 transform: scaleY(50%);}
	.newsLeft{ margin-right: 7.8rem; text-align: justify;}
	.newsLeft h3{ font-size: 1.3rem; font-weight: 400; line-height: 1.2; margin-bottom: 0.4rem;}
	.newsLeft p{ font-size:1rem; line-height: 1.4; color: #aaa; }
	.newsRight{ float: right; width:7rem; height: 7rem;}
	.newsRight img{ width:100%; height: 100%}
	.newsTips{ clear: both; padding-top: 0.4rem; overflow: hidden; color: #aaa; font-size: 1rem;}
	.newsTips span{ float: left; }
	.newsTips span i{ margin-left: 0.4rem; }
	.newsTips em{ float: right; }
	.newsTips em i{ margin-left: 0.4rem; }
	.loading{ width:100%; text-align: center; line-height: 3rem;color: #aaa; position: absolute; bottom: 0; font-size: 1.2rem;}
	.loading i{ display: inline-block; width:1.2rem; height: 1.2rem; border:0.2rem solid #ccc; border-radius: 50%; border-top: 0.2rem solid transparent;margin-right: 0.4rem; position: relative; top: 0.4rem; font-size:1.2rem; animation:load 0.5s infinite linear; transform-origin: center center;}
	@keyframes load{
	    0%{ transform: rotate(0); }
	   100%{ transform: rotate(360deg); }
	}	
</style>