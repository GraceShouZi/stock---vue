<template>
    <div>
        <loading v-if="loadFlag"></loading>
        <div v-else class="zyts_box"  :style="{ minHeight: height + 'px' }">
            <div class="stockPool_top">
                <span class="stockPoolTop_txt01">极弱</span>
                <span class="stockPoolTop_txt02">较弱</span>
                <span class="stockPoolTop_txt03">平稳</span>
                <span class="stockPoolTop_txt04">较强</span>
                <span class="stockPoolTop_txt05">超强</span>
                <div class="ring">
                    <p class="ring_colours"><img src="../assets/images/ring_colours.png"></p>
                    <p class="ring_gray"><img src="../assets/images/ring_gray.png"></p>
                    <p class="ring_dot"><img src="../assets/images/ring_dot.png"></p>
                </div>
                <div class="pointer"><img src="../assets/images/pointer.png"></div>
            </div>
            <div class="stockPool_top_tips">仓位提示：跌幅若达到12%，请严格止损</div>
            <div class="stockPool_tab">
                <li v-for="(item,index) in tabList"  v-bind:class="{on : item.isOn}" v-on:click='tabClick(index)'><span>{{item.name}}</span></li>
            </div>
            <div class="stockPool_content">
                <div class="stockPool_list" v-if="tabIndex==0">
                    <div class="sp_list_li" v-for="(item,index) in attentionList" v-bind:class="{sp_list_li_none: !item.isOpen}">
                        <div class="sp_list_title">
                            <h4>{{item.date}}</h4>
                            <span class="splt_name splt_name02">{{item.title}}</span>
                            <ul class="splt_right">
                                <li><span>总收益</span><i class="red">{{item.yield}}%</i></li>
                                <li><span>最新调仓</span><i><em class="black">{{item.times}}</em>({{item.days}})</i></li>
                            </ul>
                        </div>
                        <p class="sp_list_text">{{item.content}}</p>
                        <p class="sp_list_font">
                            <span class="red unfollow" v-on:click='follow(index)' v-bind:class="{follow : !item.isFollow}">{{item.followTxt}}</span>
                            <router-link to="zytsDetails"  class="redBg white">查看详情</router-link>
                        </p>
                        <span class="cangwei">
                            <img v-if="item.isOpen" src="../assets/images/tiaocang.png">
                            <img v-if="!item.isOpen" src="../assets/images/qingcang.png">
                        </span>
                    </div>
                </div>
                <div class="stockPool_list" v-if="tabIndex==1">
                    <p class="stockPool_noData"><span>暂无数据</span></p>
                </div>
                <div class="stockPool_list" v-if="tabIndex==2">
                    <div class="sp_list_li" v-for="(item,index) in pastList">
                        <div class="sp_list_title">
                            <span class="splt_notice">公告</span>
                            <i class="splt_time gray">{{item.times}}</i>
                        </div>
                        <p class="sp_list_text">{{item.content}}</p>
                        <p class="sp_list_font"><router-link :to="{path: item.toLink}">查看详情</router-link></p>
                    </div>
                </div>
            </div>
            <p class="stockPool_tips gray">郑重提示：本产品提供的个股信息均出自职业证券投资顾问对市场的分析判断；不能保证获利或不产生亏损；据此操作所产生的风险必须自行承担；建议严格控制仓位，贯彻止损纪律。股市有风险，投资需谨慎！</p>
            <p class="stockPool_tips_bg"></p>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import loading from '../components/loading'
    export default {
        components:{loading},
        data () {
            return {
                loadFlag:true,
                pointerTxt:'超强',
                pointerIndex:4,
                tabIndex:0,
                height:500,
                tabList:[{
                    name:'我的关注',
                    isOn:true
                },{
                    name:'今日精选',
                    isOn:false
                },{
                    name:'以往精选',
                    isOn:false
                }],
                attentionList:[{
                    date:'2017-10-19 11:23',
                    title:'高管增持个股',
                    yield:10,
                    times:'13:59',
                    days:'10/25',
                    content:'1.该股是计算机应用板块。2.内外因素加速建筑信息化行业发展，共识迎来发展新时代。在行业提高效率的内在需求和先进科技对建筑行业渗透...',
                    isOpen:true,
                    isFollow:true,
                    followTxt:'取消关注'
                },{
                    date:'2017-10-19 11:23',
                    title:'高管增持个股',
                    yield:10,
                    times:'13:59',
                    days:'10/25',
                    content:'1.该股是计算机应用板块。2.内外因素加速建筑信息化行业发展，共识迎来发展新时代。在行业提高效率的内在需求和先进科技对建筑行业渗透...',
                    isOpen:false,
                    isFollow:true,
                    followTxt:'取消关注'
                }],
                pastList:[{
                    name:666,
                    times:'2017-10-24 10:19',
                    toLink:'zytsDetails',
                    content:'今天大盘上午小幅反弹，低点仍未探明，等待盘中回落，为保障投资者权益，请耐心等待。下午择时推荐个股。',
                }]
            }
        },
        mounted:function(){
            var _this = this;
            var pointerTxt = _this.pointerTxt;
            setTimeout(function(){
                _this.loadFlag = false;
            },400)
            _this.height = window.screen.height - (fontSize*3.4)
        },
        methods:{
            tabClick: function (index) {
              var _this = this;
              _this.tabIndex = index;
              for(var i=0; i<_this.tabList.length; i++){
                if(i!=index){
                  _this.tabList[i].isOn = false;
                }else{
                  _this.tabList[index].isOn = true;
                }
              }
            },
            follow:function(index){
                var _this = this;
                _this.attentionList[index].isFollow = !_this.attentionList[index].isFollow;
                if(_this.attentionList[index].followTxt == '关注'){
                    _this.attentionList[index].followTxt = '取消关注';
                }else{
                    _this.attentionList[index].followTxt = '关注';
                }
            }
        }    
    }
</script>
<style scoped>
.zyts_box{ background: #F1F0F0; }
.stockPool_top{ height:15.5rem; position:relative; overflow:hidden; background:#ffffff url(../assets/images/stockPool_top.png) no-repeat center top; background-size:100% auto;}
.stockPool_top span{font-size:1.3rem; position:absolute; display:block; width:3.8rem; text-align:center; line-height:1.3rem; z-index:999;}
.stockPoolTop_txt01{ bottom:1rem; left:1.2rem;}
.stockPoolTop_txt02{ top:5.4rem; left:4.8rem;}
.stockPoolTop_txt03{ top:1rem; left:50%; margin-left:-1.7rem;}
.stockPoolTop_txt04{ top:5.4rem; right:4.8rem;}
.stockPoolTop_txt05{ bottom:1rem; right:1.2rem;}
.stockPool_img{ position:absolute;transform-origin: center; top:0; left:0; width:100%;}
.stockPool_img img{ width:100%;}
.stockPool_img02{ width:100%;position:absolute;transform-origin: center; top:0%; left:0%;transform-origin:center; transform:rotate(0deg)}
.stockPool_img02 img{ width:100%;}
.ring{ height:9.6rem; overflow:hidden; margin:4.1rem auto 0 auto; width:19.4rem; position:relative;}
.ring_colours{ width:19.4rem; height:19.4rem; position:absolute; top:0; left:0;}
.ring_colours img{ width:100%;}
.ring_gray{width:19.4rem; height:19.4rem; position:absolute; top:0; left:0; z-index:9; transform-origin:50% 49.9%;}
.ring_gray img{ width:100%;}
.ring_dot{width:19.4rem; height:19.4rem;position:absolute; top:0; left:0; z-index:9;}
.ring_dot img{ width:100%;}
.pointer{ width:10rem; position:absolute; left:50%; margin-left:-8.6rem; bottom:0.5rem; transform-origin:8.6rem center; overflow:hidden; z-index:11;}
.pointer img{ width:100%;}
.stockPool_top_tips{ padding:0.4rem 0 0 0; line-height:2.6rem; text-align:center; font-size:1.1rem; height:2.5rem;background:#fff url(../assets/images/stockPool_top_tips_bg.png) no-repeat center; background-size:100% auto; color:#fff; margin-bottom:0.9rem;}
.stockPool_tab{ padding:0 1rem; overflow:hidden; border-bottom:1px solid #DDDDDD; margin-bottom:1.2rem; position:relative;
 display:flex;
 display: -webkit-flex;
 display: -moz-flex;
}
.stockPool_tab li{ text-align:center; line-height:3.1rem; font-size:1.7rem; box-sizing:border-box; height:3.5rem;overflow:hidden;border:1px solid #F1F0F0;border-bottom:0; cursor:pointer;
flex:1;
-webkit-flex:1;
-moz-flex:1;
}
.stockPool_tab li span{ display:block; border-top:0.3rem solid #F1F0F0;}
.stockPool_tab .on{ border:1px solid #DDDDDD; border-bottom:0; background:#FFFFFF; border-radius:0.5rem 0.5rem 0 0; position:relative; color:#fe5252;}
.stockPool_tab .on span{border-top:0.3rem solid #fe5252;}
.stockPool_list{ padding:0 1rem; overflow: hidden;}
.stockPool_noData{ background:url(../assets/images/noData.png) no-repeat center 40%; background-size:5.9rem 5.9rem; position:relative; height:16rem;}
.stockPool_noData span{ position:absolute; display:block; width:100%; bottom:10%; text-align:center; font-size:1.1rem; color:#1e2e3b; text-indent:-1rem; color:#1e2e3b;}
.sp_list_li{border:1px solid #DDDDDD; background:#fff; border-radius:0.5rem; padding:0.2rem 1.6rem 1rem 1.6rem; margin-bottom:1.2rem; position:relative;}
.sp_list_title{border-bottom:1px solid #DDDDDD; overflow:hidden; padding:1.2rem 0 1rem 0;}
.splt_right{ float:right; overflow:hidden; width:65%}
.splt_right li{ width:50%; float:left; text-align:center; font-size:1rem; color:#a6a6a6; line-height:1.6rem;}
.splt_right li span{ display:block; margin-bottom:0.4rem;}
.splt_right li i{ display:block; font-size:1.5rem;}
.splt_notice{ font-size:1.5rem; float:left; background:url(../assets/images/stockPool_icon01.png) no-repeat left center; background-size:1.4rem auto; padding-left:2rem;line-height:1.6rem;}
.splt_time{ font-size:1.2rem; float:right;line-height:1.6rem;}
.splt_name{ float:left;font-size:1.5rem; display:block; width:35%;}
.splt_name02{ line-height:3.6rem;}
.sp_list_title h4{ font-size:1.2rem; color:#909090; margin-bottom:0.6rem;}
.sp_list_title p{ clear:both; overflow:hidden; padding-top:0.3rem;font-size:1rem; line-height:1.5rem;}
.sp_list_title p span{ display:block; float:left; padding:0 0.2rem; color:#fff; border-radius:0.2rem; margin-right:0.2rem;}
.sp_list_title p i{ display:block; float:left; font-size:1.2rem;}
.sp_list_title p em{ display:block; float:right; line-height:1.8rem; height:1.7rem; padding:0 0.82rem;position:relative; overflow:hidden; margin-left:0.85rem; border:1px solid #ddd; border-radius:1.7rem;}
.sp_list_text{ font-size:1.2rem; padding:0.8rem 0; line-height:1.8rem; margin-bottom:0.8rem; text-align:justify;} 
.sp_list_font{ text-align:center;}
.sp_list_font a{ display:inline-block; width:45%; line-height:2.9rem; height:2.9rem; border:1px solid #FF585C; box-sizing:border-box; border-radius:2.9rem; font-size:1.4rem; letter-spacing:0.1rem;margin-left:5%;}
.sp_list_font span{ display:inline-block; width:45%; line-height:2.9rem; height:2.9rem; border:1px solid #FF585C; box-sizing:border-box; border-radius:2.9rem; font-size:1.4rem; letter-spacing:0.1rem;}
.follow{ background:url(../assets/images/add.png) no-repeat 2.8rem 0.6rem; background-size:1.4rem 1.4rem; text-indent:1rem;}
.cangwei{ position:absolute; top:0.2rem; left:11rem; width:4.5rem;}
.cangwei img{ width:100%;}
.sp_list_li_none{ pointer-events:none;}
.sp_list_li_none .red{ color:#919191;}
.sp_list_li_none .redBg{ background:#919191;}
.sp_list_li_none .sp_list_font a{ border:1px solid #919191;}
.sp_list_li_none .sp_list_font span{ border:1px solid #919191;}
.sp_list_li_none .splt_right .red{ color:#333;}
</style>