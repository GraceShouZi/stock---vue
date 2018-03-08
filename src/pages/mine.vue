<template>
    <div class="wrapper">
        <div class="myTop">
            <h3><img src="../assets/images/comment_img.png" ></h3>
            <p class="myTop_font01">YX28654323</p>
            <p class="myTop_font02">趋势点睛短线投顾-专业版</p>
            <p class="myTop_font03"><img src="../assets/images/myTopTime.png">剩余45天：2017-12-12到期</p>
        </div>
        <div class="myMain">
            <ul>
                <li><span><img src="../assets/images/my_icon01.png">服务时间</span><em>周一到周五9:00-17:30</em></li>
                <li><span><img src="../assets/images/my_icon02.png">服务热线</span><a class="blue" href="tel:400-6736-018">400-673-6018</a></li>
                <li><span><img src="../assets/images/my_icon03.png">在线咨询</span><a href="javascript:void(0);" class="myMain_font">咨询</a></li>
            </ul>
        </div>
        <p class="myExit"><a href="#" class="red">退出登录</a></p>
    </div>
</template>
<style type="text/css">
.myTop{ background:url(../assets/images/my_top_bg.png) no-repeat center; height:15.7rem; background-size:auto 17.7rem; color:#ffffff; text-align:center; padding-top:2rem; margin-bottom:0.8rem;}
.myTop h3 img{ width:6.5rem; height:6.5rem; border-radius:50%;}
.myTop_font01{ line-height:2.5rem; font-size:1rem;}
.myTop_font02{ line-height:2.5rem; margin-bottom:0.2rem; font-size:1.2rem;}
.myTop_font03{ background:#fff; line-height:1.8rem; height:1.7rem; color:#333333; font-size:1.1rem; width:16.2rem; margin:0 auto; border-radius:1.7rem; text-align:left;}
.myTop_font03 img{ width:1.1rem; height:1.1rem; position:relative; top:-0.15rem; margin:0 0.3rem 0 0.5rem;}
.myMain{ background:#fff; margin-bottom:3rem;}
.myMain li{ height:3.8rem; line-height:3.8rem; border-bottom:1px solid #e5e5e5; padding:0 0.9rem; overflow:hidden; font-size:1.2rem; color:#999999;}
.myMain li span{ float:left; color:#333333;}
.myMain li span img{ width:1.5rem; margin-right:0.9rem; position:relative; top:-0.1rem;}
.myMain li em{ float:right;}
.myMain li a{ float:right;color:#999999;}
.myMain li .myMain_font{ background:url(../assets/images/arrows03.png)no-repeat right center; background-size:0.7rem auto; padding-right:1.4rem;}
.myExit{ height:3.9rem; line-height:3.9rem; text-align:center; background:#fff; font-size:1.2rem;border-bottom:1px solid #e5e5e5;}

</style>
<script>
    import axios from 'axios'
    export default {
    }
</script>