<template>
    <div class="comment">
        <div class="comment_li" id="comment_li01"  v-for="(item,index) in listData">
            <a href="#comment_li01">
                <div class="comment_li_top" v-on:click='ShowClick(index)'>
                    <div class="comment_li_left">
                        <h3>{{item.date}}</h3>
                        <p>同期上证指数<span class="red">{{item.zdf}}%</span></p>
                    </div>
                    <div class="comment_li_right">
                        <h3><span>盘面点评</span></h3>
                        <p>{{item.time}}</p>
                    </div>
                    <span class="comment_arrows" v-bind:class="{comment_arrows02:item.isFlag}"></span>
                </div>   
            </a>             
            <div class="comment_content" v-html="item.content" v-if='item.isFlag'></div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
    	 data () {
            return {
                listData: [{
                	date:'今日',
                	zdf:66.66,
                	time:'2017-06-19 17:16',
                	isFlag:false,
                	content:'<p>图中够可以看出，指数回踩一次（黑色箭头）未跌破3016,之后出现上涨，第一次突破未果后回调回来，之后继续上攻，今天回踩突破的位置后企稳反弹，指数有继续上攻的意思，下方macd也出现金叉做多的信号。</p>'
                },{
                	date:'今日',
                	zdf:66.66,
                	time:'2017-06-19 17:16',
                	isFlag:false,
                	content:'<p>【上证指数点评】</p>'
                },{
                	date:'今日',
                	zdf:66.66,
                	time:'2017-06-19 17:16',
                	isFlag:false,
                	content:'<p>【上证指数点评】</p>'
                }]
            }
        },
        methods:{
			ShowClick:function(index){
				var _this = this;
				_this.listData[index].isFlag = !_this.listData[index].isFlag;
			}
        }
    }

</script>
<style scoped>
.comment{ overflow:hidden; background: #F7F8FB;}
.comment_li{ background:#fff; margin-bottom:0.8rem; overflow:hidden;}
.comment_li_top{ overflow:hidden; width:100%; position:relative;height:5rem; padding:0.9rem 0; box-sizing:border-box;}
.comment_li_top:after{ content:""; height:3.2rem; width:1px; background:#EAEAEA; position:absolute; left:50%; top:50%; transform:translateY(-50%);}
.comment_li_left{ float:left; width:50%; box-sizing:border-box; padding-left:1rem;}
.comment_li_left h3{ line-height:1.6rem; font-size:1.2rem; margin-bottom:0.4rem;}
.comment_li_left p{ font-size:1.1rem; color:#999999;}
.comment_li_left p span{ margin-left:0.65rem;}
.comment_li_right{ float:left; width:50%; padding-left:2.1rem; box-sizing:border-box;}
.comment_li_right h3{ margin-bottom:0.4rem;}
.comment_li_right h3 span{ display:block; width:4.8rem; height:1.6rem; background:#ff3b30; border-radius:0.2rem; line-height:1.6rem; text-align:center; color:#fff; font-size:1rem;}
.comment_li_right p{ font-size:1.1rem; color:#999999;}
.comment_arrows{ display:block; position:absolute; right:0.9rem; top:1.8rem; width:0; height:0; border-left:0.8rem solid transparent; border-right:0.8rem solid transparent; border-top:0.8rem solid #BCBCBC;}
.comment_arrows:after{ content:""; width:0; height:0;border-left:0.8rem solid transparent; border-right:0.8rem solid transparent; border-top:0.8rem solid #fff; position:absolute; left:-0.8rem; top:-0.95rem;}
.comment_arrows02{ transform:rotate(180deg);}
.comment_content{ width:100%; border-top:1px solid #EAEAEA; padding:0.9rem 1rem; box-sizing:border-box; font-size:1.1rem;}
.comment_content p{text-align:justify; line-height:1.7rem;}
.comment_content img{ max-width:100%;margin:0.5rem 0;}   
</style>