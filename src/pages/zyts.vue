<template>
	<div>
		<loading v-if="loadFlag"></loading>
	    <div v-else class="zyts_box listbox">
	  		<div v-for="(item,index) in list"  class="listbox_li" v-bind:class="{listbox_li_none : !item.isOpen}">
	        	<div class="listbox_title">
	            	<span>{{item.name}}</span>
	                <em>紧跟投股实时布局，买卖轻松掌握。</em>
	                <router-link :to="{path: item.toLink}" v-if="item.isOpen">查看详情</router-link>
	                <router-link :to="{path: item.toLink}" v-if="!item.isOpen">未开通</router-link>
	            </div>
	            <div class="listbox_time">
	            	<p><span>剩余天数</span><em>{{item.day}}</em></p>
	                <p><span>到期时间</span><i>{{item.date}}</i></p>
	            </div>
	            <p class="listbox_font">
	            	<router-link :to="{path: item.toLink}" v-if="item.isOpen">查看服务</router-link>
	            	<router-link :to="{path: item.toLink}" v-if="!item.isOpen">查看详情</router-link>
	            </p>
	  		</div>
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
		    	list:[{
		    		name:'大师在线',
		    		content:'紧跟投股实时布局，买卖轻松掌握。',
		    		day:5,
		    		date:'2018-04-01',
		    		state:'查看服务',
		    		isOpen:true,
		    		toLink:'zytsStockPool'
		    	},{
		    		name:'大师在线',
		    		content:'紧跟投股实时布局，买卖轻松掌握。',
		    		day:5,
		    		date:'2018-04-01',
		    		state:'查看服务',
		    		isOpen:true,
		    		toLink:'zytsStockPool'
		    	},{
		    		name:'大师在线',
		    		content:'紧跟投股实时布局，买卖轻松掌握。',
		    		day:5,
		    		date:'2018-04-01',
		    		state:'查看服务',
		    		isOpen:false,
		    		toLink:'zytsStockPool'
		    	}]
		    }
		},
		mounted:function(){
            var _this = this;
            setTimeout(function(){
            	_this.loadFlag = false;
            },400)
        }       
    }
</script>
<style scoped>
.listbox{ padding:1rem; background: #F1F0F0;}
.listbox_li{ background:#FFFFFF; border-radius:0.3rem; overflow:hidden; position:relative; padding-bottom:1.2rem; margin-bottom:1.2rem;}
.listbox_li:before{ content:""; width:1rem; height:1rem; display:block; background:#F1F0F0; position:absolute; top:5.3rem; right:-0.5rem; z-index:9; border-radius:50%;}
.listbox_li:after{ content:""; width:1rem; height:1rem; display:block; background:#F1F0F0; position:absolute; top:5.3rem; left:-0.5rem; z-index:9;border-radius:50%;}
.listbox_title{ background:#FE5252; color:#fff; padding:1.2rem 1.2rem 1rem 1.2rem; position:relative;}
.listbox_title span{ display:block; font-size:1.7rem; line-height:2rem;}
.listbox_title em{ display:block; font-size:1.2rem; line-height:1.7rem;}
.listbox_title a{ display:block; position:absolute; top:1.5rem; right:1.2rem; width:26.7%; text-align:center; line-height:2.9rem; background:#fff; border-radius:2.9rem;font-size:1.4rem; color:#ff4040;}
.listbox_time{ overflow:hidden;}
.listbox_time p{float:left; width:50%; text-align:center; padding:1rem 0;}
.listbox_time p span{ display:block; line-height:1.6rem; font-size:1.2rem; color:#818181;}
.listbox_time p em{ display:block; line-height:2.6rem; font-size:2.2rem;}
.listbox_time p i{ display:block; line-height:2.6rem; font-size:1.5rem;}
.listbox_text{ font-size:1.1rem; text-align:justify; padding:0.8rem 1.2rem; line-height:1.5rem;}
.listbox_font{ line-height:3.6rem; border:1px solid #FE6767; height:3.5rem; border-radius:3.5rem; text-align:center; margin:0 1.2rem; font-size:1.5rem; overflow:hidden;}
.listbox_font a{ display:block; width:100%; color:#ff4040;}
.listbox .listbox_li_none{ pointer-events: none; }
.listbox .listbox_li_none .listbox_title{ background:#b4b4b4;}
.listbox .listbox_li_none .listbox_title a{ background:#7f7f7f; color:#fff; pointer-events:none;}
.listbox .listbox_li_none .listbox_font{ border:1px solid #656565;}
.listbox .listbox_li_none .listbox_font a{color:#7f7f7f;}
.listbox_li:last-child{ margin-bottom:0;}
</style>