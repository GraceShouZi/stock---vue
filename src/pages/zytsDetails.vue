<template>
	<div>
		<loading v-if="loadFlag"></loading>
	    <div v-else class="zyts_box detail" :style="{ minHeight: height + 'px' }">
	  		<div class="detail_top">
	             <div class="detail_top_title">
	             	<h4>{{topTime}}</h4>
	                <p class="detail_top_title_font01">{{topState}}</p>
	                <span class="detail_follow" v-on:click="follow()" v-bind:class="{detail_unfollow:isFollow}">{{followTxt}}</span>
	             </div>
	             <div class="detail_top_market">
	             	<h4>总市值</h4>
	                <ul>
	                	<li class="detail_top_market_width01">
	                    	<span class="red">{{topMarketValue}}</span>
	                        <i>初始金额：<em class="black">1000000.00</em></i>
	                    </li>
	                    <li class="detail_top_market_width02">
	                    	<span>收益比例</span>
	                        <i v-bind:class="{red: earningsMoney>0, green:earningsMoney<0}">{{earningsRatio}}%</i>
	                    </li>
	                    <li class="detail_top_market_width02">
	                    	<span>收益金额</span>
	                        <i v-bind:class="{red: earningsMoney>0, green:earningsMoney<0}">{{earningsMoney}}</i>
	                    </li>
	                </ul>
	             </div>
	        	 <p class="detail_reason_title"><i class="red">{{name}}</i><em>执业证书编号：{{number}}</em></p>            
	        </div>
	        <div class="detail_reason">
	        	<h3><span>精选说明</span></h3>
	            <div class="detail_selection">
	            	<p v-bind:class="{ds_height_auto :isUp}" >{{detail_selection}}</p>
	                <span class="ds_up" v-bind:class="{ds_down :isUp}" v-on:click='selectDown()'></span>
	            </div>
	        </div>
	        <div class="detail_selection_list">
	        	<table width="100%" border="0" cellpadding="0" cellspacing="0">
	            	<thead>
	                	<tr>
	                    	<th width="22%">详细仓位</th>
	                        <th width="18%">持仓</th>
	                        <th width="22%">成本价/现价</th>
	                        <th width="20%">盈亏</th>
	                        <th width="18%">仓位</th>
	                    </tr>
	                </thead>
	                <tbody>
	                	<tr v-for="item in stockList">
	                    	<td>
	                    		 <router-link :to="{path: item.toLink}">
		                        	<em>{{item.slName}}</em>
		                            <p class="dsl_code"><i class="yellowBg">{{item.slState}}</i><span class="gray">{{item.slCode}}</span></p>
		                        </router-link>
	                        </td>
	                        <td>
	                        	<span>{{item.slChicang}}</span>
	                        </td>
	                        <td>
	                        	<span>{{item.price}}</span>
	                        	<span>{{item.nowPrice}}</span>
	                        </td>
	                        <td v-bind:class="{red: item.slRatio>0, green: item.slRatio<0}">
	                        	<span>{{item.slRatio}}%</span>
	                            <span>{{item.slMoney}}</span>
	                        </td>
	                        <td>
	                          <div class="dsl_circle">
	                        	<div class="progress">
									<svg width="60" height="60" viewbox="0 0 60 60" class='svg'>
	                                    <circle cx="30" cy="30" r="24" stroke-width="3" stroke="#D1D3D7" fill="none"></circle>
	                                    <circle cx="30" cy="30" r="24" stroke-width="3" stroke="#fe5252" fill="none" transform="matrix(0,-1,1,0,0,60)" stroke-dasharray="0 150"></circle>
	                                </svg>
	                                <p class="progressNum"><i>{{item.progressNum}}</i>%</p>
	                            </div>
	                          </div>  
	                        </td>
	                    </tr>
	                </tbody>
	            </table>
	        </div>
			<div class="detail_Tabs">
				<div class="detail_Tabs_tab">
					<ul>
						<li v-for="(item,index) in detailTabList" v-bind:class="{detail_Tabs_A : item.isOn}" v-on:click="detailTabClick(index)"><span>{{item.name}}</span></li>
					</ul>
				</div>
				<div class="detail_Tabs_content" v-if="detailTabListIndex==0">11111</div>
				<div class="detail_Tabs_content" v-if="detailTabListIndex==1">22222</div>	
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
		    	height:500,
		    	isFollow:true,
		    	followTxt:'取消关注',
		    	topTime:'2017/10/31   13:59',
		    	topState:'高管增持个股', 
		    	topMarketValue:'1002413.84', 
		    	earningsRatio:-0.27,  
		    	earningsMoney:'2413.84',
		    	name:'某某',	
		    	number:'A1220616030001',
		    	isUp:false,
		    	detail_selection:'根据业绩预告披露，公司 2017 年前三季度，营业总收入同比小幅增长。因此可以推断公司 Q3 单季度至少实现营收 6.54 亿以上，而去年同期营收 5.82 亿，根据业绩预告披露，公司 2017 年前三季度，营业总收入同比小幅增长。因此可以推断公司 Q3 单季度至少实现营收 6.54 亿以上，而去年同期营收 5.82 亿，单季度同比增长至少 12.37%，确定 Q3 拐点.....',
		    	stockList:[{
		    		slName:'方达证券',
		    		slState:'新股',
		    		slCode:'601901',
		    		slChicang:26800,
		    		price:9.32,
		    		nowPrice:9.41,
		    		slRatio:0.97,
		    		slMoney:2413.84,
		    		progressNum:50,
		    		toLink:'/stockDetails'
		    	}],
		    	detailTabListIndex:0,
		    	detailTabList:[{
		    		name:'直播流',
		    		isOn:true
		    	},{
		    		name:'调仓',
		    		isOn:false
		    	}]
		    }
		},
		mounted:function(){
            var _this = this;
            var pointerTxt = _this.pointerTxt;
            setTimeout(function(){
            	_this.loadFlag = false;
            },400)
            _this.height = window.screen.height - (fontSize*3.4);
            setTimeout(function(){
				var len = _this.stockList.length;
				for(var i=0;i<len;i++){
					var num = _this.stockList[i].progressNum;
					var percent = num / 100;
					var perimeter = Math.PI * 2 * 24;
					var progress = document.getElementsByClassName("svg");
					var circle = progress[i].lastChild;
					circle.setAttribute('stroke-dasharray', perimeter * percent + " " + perimeter * (1- percent));
				}
			},500);
        },
        methods: {
        	follow:function(){
        		var _this = this;
        		_this.isFollow = !_this.isFollow;
        		if(_this.followTxt=='取消关注'){
        			_this.followTxt = '加关注';
        		}else{
        			_this.followTxt = '取消关注';
        		}
        	},
        	selectDown:function(){
        		var _this = this;
        		_this.isUp = !_this.isUp;
        	},
        	detailTabClick:function(index){
        		var _this = this;
        		_this.detailTabListIndex = index;
        		for(var i=0;i<_this.detailTabList.length;i++){
        			if(i==index){
        				_this.detailTabList[i].isOn = true
        			}else{
        				_this.detailTabList[i].isOn = false
        			}
        		}
        	}
        }    
    }
</script>
<style scoped>
.detail{ background: #F1F0F0; overflow: hidden;}
.detail_top{ background:#fff; padding:0 1rem; margin-bottom:0.8rem; overflow:hidden;}
.detail_top_title{ overflow:hidden; padding:1rem 0; border-bottom:1px solid #ddd; position:relative;}
.detail_top_title p{ float:left;}
.detail_top_title p b{ display:block; margin-bottom:0.3rem; font-size:1.9rem; line-height:1.9rem;}
.detail_top_title p span{ display:block; line-height:1.5rem;}
.detail_top_title p span i{ display:inline-block; font-size:1rem; color:#fff; padding:0 0.2rem; border-radius:0.2rem; margin-right:0.2rem;}
.detail_top_title p span em{ font-size:1.2rem; display:inline-block;}
.detail_top_title div{ overflow:hidden; position:relative; top:1rem; float:right;}
.detail_top_title div em{ font-size:1rem;display: block; float: left;line-height: 1.8rem;height: 1.7rem; padding: 0 0.82rem; overflow: hidden; margin-left: 0.85rem; border: 1px solid #ddd; border-radius: 1.7rem;}
.detail_top_title h4{ font-size:1.4rem; margin-bottom:0.4rem; font-weight: 400;}
.detail_top_title_font01{ font-size:1.9rem;}
.detail_follow{ position:absolute; display:block; right:0; top:1.6rem; width:8rem; height:2.9rem; line-height:2.9rem; color:#fff; border-radius:2.9rem; text-align:center; font-size:1.4rem; border:1px solid #FF585C;
box-sizing:border-box; background:#FF585C;}
.detail_unfollow{ background:#fff !important; color:#FF585C !important;}
.detail_top_qingcang{ position:absolute; display:block; width:4.5rem; height:4.5rem; left:39%; top:1rem;}
.detail_top_qingcang img{ width:100%;}
.detail_top_recommend { line-height:2.2rem; padding:1rem 0 0.7rem 0;border-bottom:1px solid #ddd;}
.detail_top_recommend ul{ overflow:hidden;}
.detail_top_recommend ul li{ float:left; font-size:1.1rem; width:25%; color:#a6a6a6;}
.detail_top_recommend ul li:nth-child(2){ width:50%; text-align:center;}
.detail_top_recommend ul li:nth-child(3){ text-align:right;}
.detail_top_recommend p{ overflow:hidden; font-size:1.4rem;}
.detail_top_recommend p span{ display:block; float:left; width:25%;}
.detail_top_recommend p span:nth-child(2){ width:50%; text-align:center;}
.detail_top_recommend p span:nth-child(3){ text-align:right;}
.detail_top_zdf{ overflow:hidden; padding:1rem 0;}
.detail_top_left{ float:left; width:33%;}
.detail_top_left span{ font-size:2.4rem; line-height:1.8rem;}
.detail_top_left p{ font-size:1.2rem; line-height:1.8rem;}
.detail_top_left p i{ margin-right:1.2rem;}
.detail_top_right{ float:right; overflow:hidden; width:67%; font-size:1.1rem; line-height:1.8rem;}
.detail_top_right li{ float:left; width:50%; text-align:right; color:#333;}
.detail_top_right li span{ font-size:1.2rem; margin-left:0.5rem;}
.detail_top_market h4{ font-size:1rem; color:#a6a6a6; line-height:3.5rem;}
.detail_top_market ul{ overflow:hidden;}
.detail_top_market ul li{ float:left; color:#a6a6a6; line-height:2.1rem;}
.detail_top_market ul li span{ display:block;}
.detail_top_market ul li i{ display:block;}
.detail_top_market_width01{ width:50%;}
.detail_top_market_width01 span{ font-size:2.3rem; position:relative; left:-0.2rem;}
.detail_top_market_width01 i{ font-size:1.2rem;}
.detail_top_market_width02{ width:25%; text-align:center;}
.detail_top_market_width02 span{ font-size:1rem;}
.detail_top_market_width02 i{ font-size:1.4rem;}
.detail_reason{ background:#fff; margin-bottom:0.8rem;}
.detail_reason h3{padding:0.8rem 0; font-size:1.3rem; border-bottom:1px solid #ddd;}
.detail_reason h3 span{ display:block; border-left:0.25rem solid #FF4040; height:1.6rem;line-height:1.7rem; padding-left:0.8rem;}
.detail_reason_title{ line-height:1.4rem; width:78%; height:1.3rem; padding:0.35rem 0; border:1px solid #ddd; border-radius:2rem; margin:1.2rem auto; text-align:center; font-size:1.1rem; overflow:hidden;}
.detail_reason_title i{ float:left; display:block; width:5rem; text-align: center;}
.detail_reason_title em{float:left;border-left:1px solid #ddd; padding-left:1rem; color:#4e4e4f;}
.detail_reason_text{ padding:1rem; font-size:1.2rem; line-height:1.7rem; overflow:hidden;}
.detail_reason_text p{ text-align:justify; margin-bottom:1.7rem;}
.detail_reason_text p:last-child{ margin-bottom:0;}
.detail_selection{padding:1rem 1rem 2rem 1rem; font-size:1.2rem; line-height:1.8rem; overflow:hidden; text-align:justify; position:relative;}
.detail_selection p{ height:6.8rem; overflow:hidden;}
.ds_height_auto{ height:auto !important;}
.ds_up{ display:block; background:url(../assets/images/arrow.png) no-repeat; width:1.6rem; height:0.8rem; background-size:100% 100%; position:absolute; bottom:0.5rem; left:50%; margin-left:-0.8rem;}
.ds_down{ transform:rotate(180deg);}
.detail_selection_list{ background:#fff; margin-bottom:0.8rem;}
.detail_selection_list table th{ line-height:3.3rem; font-size:1.2rem; color:#818181;}
.detail_selection_list table td{ border-top:1px solid #ddd; vertical-align:middle; font-size:1.4rem; text-align:center; padding:0.6rem 0; line-height:2rem;}
.detail_selection_list table td span{ display:block;}
.detail_selection_list table td em{ display:block; font-size:1.5rem;}
.dsl_code{ position:relative; overflow:hidden; font-size:1rem;}
.dsl_code i{ display:inline-block; color:#fff; padding:0.2rem; line-height:1rem; border-radius:0.2rem; margin-right:0.2rem;}
.dsl_code span{ display:inline-block !important;}
.dsl_circle{ margin:0 auto; position:relative;}
.progress{ width:60px; height:60px; margin:0 auto;}
.progress circle {-webkit-transition: stroke-dasharray .5s; transition: stroke-dasharray .5s;}
.progressNum{ position:absolute; top:0; width:60px;text-align:center; line-height:60px; font-size:16px;}
.detail_Tabs{ background:#fff; overflow:hidden;}
.detail_Tabs_tab{ overflow:hidden; border-bottom:1px solid #ddd;padding:1.2rem 1rem 0 1rem;}
.detail_Tabs_tab ul{ display:flex; width:100%;}
.detail_Tabs_tab ul li{ flex:1; text-align:center; line-height: 3.1rem;font-size: 1.7rem;box-sizing: border-box;height: 3.5rem; overflow: hidden;border: 1px solid #fff;border-bottom: 0;cursor: pointer;}
.detail_Tabs_tab ul li span{display: block;border-top: 0.3rem solid #fff;}
.detail_Tabs_tab .detail_Tabs_A{ border:1px solid #DDDDDD; border-bottom:0; background:#FFFFFF; border-radius:0.5rem 0.5rem 0 0; position:relative; color:#fe5252;}
.detail_Tabs_tab .detail_Tabs_A span{border-top:0.3rem solid #fe5252;}
.detail_Tabs_content{ padding-bottom:1rem;}
.detail_Tabs_content dl{ padding:0 1rem; overflow:hidden;}
.detail_Tabs_content dl dt{ padding:1rem 0;}
.detail_Tabs_content dl dt span{ display:inline-block; width:5.7rem; height:2rem; color:#fff; line-height:2.1rem; font-size:1.2rem; text-align:center; border-radius:0.2rem;}
.detail_Tabs_content dl dd{border-left:1px solid #ddd; margin-left:2rem; position:relative; padding-bottom:1rem;}
.dtc_time{ position:absolute; top:0; left:-1.7rem;font-size:1.4rem; background:#fff;}
.dtc_time i{ font-size:1.2rem;}
.dtc_live{ margin-left:2.6rem; text-align:justify; font-size:1.2rem; line-height:1.7rem; border-bottom:1px solid #DDDDDD; padding-bottom:1rem;}
.dtc_live:last-child{ border:0; padding-bottom:0;}
.dtc_live img{ max-width:100%; margin-top:0.5rem;}
.dtc_tiaocang{ margin-left:2.6rem; border:1px solid #DDDDDD; border-radius:0.5rem; padding:0.3rem 0.3rem 0 0.3rem; overflow:hidden;}
.dtc_tiaocang h4{ line-height:1.8rem; padding:0.7rem 0 0.8rem 0.2rem; font-size:1.2rem; border-bottom:1px solid #E9EAEA; text-align:justify;}
.dtc_tiaocang table td{ text-align:center; vertical-align:middle; font-size:1.1rem; line-height:1.8rem; padding:0.6rem 0;}
.dtc_tiaocang table span{ display:block; white-space:nowrap;}
.dtct_buy{ width:2.5rem; height:2.5rem; line-height:2.5rem; border-radius:50%; margin:0 auto; color:#fff; font-size:1.2rem;}
.dtc_tiaocang table td em{display: block;font-size: 1.4rem;}
.detail_Tabs_content dl dd:last-child{ padding:0;}
.black_bg{ width:100%; max-width:768px; height:100%; background:rgba(0,0,0,0.66); position:fixed; top:0; z-index:9;}
.stockPool_explain{ width:100%; max-width:768px; background:#fff; position:fixed; bottom:0; z-index:10; border-top:0.2rem solid #FF585C; padding-top:0.4rem;}
.stockPool_explain h3{ font-size:1.5rem; padding:0 2rem; line-height:3rem;}
.stockPool_explain_content{ padding:0 2rem 4rem 2rem; text-align:justify; line-height:1.8rem; font-size:1.2rem;}
.stockPool_explain_bottom{ background:#FE5252; height:5.9rem; padding:0 2rem; color:#fff;}
.stockPool_explain_bottom a{ display:block; float:left; color:#fff; line-height:5.9rem; font-size:1.6rem;}
.stockPool_explain_bottom span{ display:block; float:right; padding:0.95rem 0; line-height:2rem; text-align:right;}
.stockPool_explain_bottom span em{ display:block; font-size:1.4rem;}
.stockPool_explain_bottom span i{ display:block; font-size:1.6rem;}
</style>