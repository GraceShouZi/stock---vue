<template>
	<div>
		<loading v-if="loadFlag"></loading>
		<div style="margin-top:10px">
			<ul class="chartTab">
				<li v-for="(item,index) in chartTabList" v-bind:class="{chartTab_A : item.isOn}" v-on:click='navClick(index)'>
					<a>{{item.name}}</a>
				</li>
	        </ul>
			<div id="canvasBoxMin" v-bind:class="{hide : MFlag == false}" class="canvasBox"></div>
			<div id="canvasBoxKline" v-bind:class="{hide : MFlag == true}" class="canvasBox"></div>
		</div>
	</div>
</template>
<style scoped>
	.chartTab{ overflow:hidden; display:flex; background:#f5f5f5; border:1px solid #ccc; margin:1rem 0.5rem;}
	.chartTab li{ float:left;list-style-type:none; height:3rem; line-height:3rem;flex:1; text-align:center; font-size:1.4rem; cursor:pointer;}
	.chartTab li a{ color:#333; text-decoration:none; display:block;}
	.chartTab .chartTab_A{ background:#F00; color:#fff; pointer-events:none;}
	.chartTab .chartTab_A a{ color:#fff;}
	.canvasBox{border-top:1px solid #ccc; border-bottom:1px solid #ccc; height:250px; overflow:hidden; margin-bottom:10px}
	.hide{display:none;}
	.show{display:block;}
</style>

<script>
    import axios from 'axios'
    import loading from '../components/loading'
    var charts = require('../assets/js/chart.js');
    var winWidth = document.body.clientWidth > 768 ? 768 : document.body.clientWidth;
    var winHeight = 250;
	var PIXEL_RATIO = charts.PIXEL_RATIO;
	var klineData = [];
    var minData ={"quote":{"time":"20161104084531","open":16.19,"preClose":16.2,"highest":16.38,"lowest":16.19,"price":16.35,"volume":258641,"amount":42141},"mins": [{"price":16.19,"volume":214,"amount":3464.66},{"price":16.19,"volume":1192,"amount":19298.48},{"price":16.2,"volume":204,"amount":3302.76},{"price":16.2,"volume":382,"amount":6184.58},{"price":16.19,"volume":329,"amount":5326.51},{"price":16.19,"volume":224,"amount":3626.56},{"price":16.2,"volume":137,"amount":2218.03},{"price":16.2,"volume":225,"amount":3642.75},{"price":16.2,"volume":47,"amount":760.93},{"price":16.2,"volume":332,"amount":5375.08},{"price":16.2,"volume":52,"amount":841.88},{"price":16.2,"volume":1579,"amount":25579.8},{"price":16.21,"volume":351,"amount":5686.2},{"price":16.22,"volume":29,"amount":469.8},{"price":16.25,"volume":1490,"amount":24152.9},{"price":16.25,"volume":609,"amount":9871.89},{"price":16.24,"volume":971,"amount":15739.91},{"price":16.25,"volume":2070,"amount":33575.4},{"price":16.26,"volume":453,"amount":7347.66},{"price":16.25,"volume":979,"amount":15889.17},{"price":16.25,"volume":613,"amount":9948.99},{"price":16.26,"volume":416,"amount":6751.68},{"price":16.24,"volume":240,"amount":3895.2},{"price":16.25,"volume":1382,"amount":22429.86},{"price":16.23,"volume":277,"amount":4495.71},{"price":16.24,"volume":51,"amount":827.73},{"price":16.24,"volume":267,"amount":4333.41},{"price":16.24,"volume":2833,"amount":46007.92},{"price":16.25,"volume":1403,"amount":22784.72},{"price":16.26,"volume":632,"amount":10263.68},{"price":16.26,"volume":337,"amount":5472.88},{"price":16.27,"volume":898,"amount":14583.52},{"price":16.27,"volume":169,"amount":2744.56},{"price":16.26,"volume":620,"amount":10068.8},{"price":16.22,"volume":1820,"amount":29556.8},{"price":16.27,"volume":616,"amount":10003.84},{"price":16.28,"volume":592,"amount":9614.08},{"price":16.28,"volume":1348,"amount":21891.52}]};
    var klineData0 = [[20160727,15.74,15.73,15.88,15.45,15.87,406973,637940000],[20160728,15.87,15.77,15.79,15.65,15.68,174514,274350000],[20160729,15.68,15.65,15.71,15.61,15.7,143483,224750000],[20160801,15.7,15.68,15.85,15.65,15.8,229099,361190000],[20160802,15.8,15.79,15.85,15.68,15.75,108778,171310000],[20160803,15.75,15.64,15.72,15.62,15.67,105840,165700000],[20160804,15.67,15.69,15.69,15.49,15.59,156105,243120000],[20160805,15.59,15.6,15.8,15.59,15.73,176485,277450000],[20160808,15.73,15.76,15.76,15.66,15.74,131294,206330000],[20160809,15.74,15.75,15.8,15.71,15.79,154809,243950000],[20160810,15.79,15.8,15.85,15.73,15.83,184995,292530000],[20160811,15.83,15.75,16.4,15.74,16.07,526894,852410000],[20160812,16.07,16.12,16.39,16,16.36,469916,763630000],[20160815,16.36,16.5,17.02,16.45,16.94,773339,1299620000],[20160816,16.94,16.94,16.99,16.67,16.7,493840,829740000],[20160817,16.7,16.72,16.85,16.52,16.64,364466,606580000],[20160818,16.64,16.55,16.77,16.35,16.44,371101,612290000],[20160819,16.44,16.43,16.5,16.36,16.42,199273,327520000],[20160822,16.42,16.42,16.47,16.31,16.41,197686,324280000],[20160823,16.41,16.41,16.56,16.32,16.4,317544,521790000],[20160824,16.4,16.41,16.51,16.34,16.39,170854,280400000],[20160825,16.39,16.36,16.41,16.2,16.34,247499,403470000],[20160826,16.34,16.36,16.4,16.29,16.34,146881,240040000],[20160829,16.34,16.31,16.37,16.08,16.23,302020,489410000],[20160830,16.23,16.24,16.49,16.24,16.4,363970,597420000],[20160831,16.4,16.35,16.56,16.32,16.48,220034,362530000],[20160901,16.48,16.48,16.55,16.38,16.41,212720,349930000],[20160902,16.41,16.38,16.5,16.35,16.48,231470,380420000],[20160905,16.48,16.49,16.58,16.42,16.49,256770,423400000],[20160906,16.49,16.49,16.53,16.37,16.41,202826,333210000],[20160907,16.41,16.41,16.5,16.35,16.48,179756,295520000],[20160908,16.48,16.47,16.61,16.43,16.6,244069,403800000],[20160909,16.6,16.62,16.66,16.5,16.56,187395,310620000],[20160912,16.56,16.38,16.47,16.26,16.4,365092,597900000],[20160913,16.4,16.4,16.46,16.39,16.45,142344,233970000],[20160914,16.45,16.43,16.48,16.38,16.4,239814,393970000],[20160919,16.4,16.45,16.51,16.42,16.46,144660,238090000],[20160920,16.46,16.47,16.48,16.42,16.46,173968,286080000],[20160921,16.46,16.47,16.51,16.43,16.45,94161,154920000],[20160922,16.45,16.49,16.59,16.47,16.53,115278,190440000],[20160923,16.53,16.55,16.55,16.48,16.48,102005,168270000],[20160926,16.48,16.45,16.57,16.41,16.48,207692,342750000],[20160927,16.48,16.42,16.52,16.42,16.48,170255,280850000],[20160928,16.48,16.48,16.53,16.46,16.48,128420,211840000],[20160929,16.48,16.52,16.55,16.49,16.5,109974,181620000],[20160930,16.5,16.5,16.53,16.48,16.49,121903,201090000],[20161010,16.49,16.53,16.6,16.48,16.55,186669,308450000],[20161011,16.55,16.57,16.58,16.5,16.57,126904,209790000],[20161012,16.57,16.54,16.54,16.48,16.51,106439,175590000],[20161013,16.51,16.51,16.52,16.42,16.43,145044,238970000],[20161014,16.43,16.43,16.47,16.38,16.46,106601,175020000],[20161017,16.46,16.41,16.44,16.22,16.27,164249,268130000],[20161018,16.27,16.28,16.39,16.24,16.34,182518,298060000],[20161019,16.34,16.35,16.39,16.24,16.27,111432,181630000],[20161020,16.27,16.27,16.34,16.25,16.29,89858,146260000],[20161021,16.29,16.29,16.34,16.22,16.3,108848,177160000],[20161024,16.3,16.3,16.58,16.27,16.47,247572,406980000],[20161025,16.47,16.48,16.5,16.36,16.42,133093,218720000],[20161026,16.42,16.4,16.42,16.3,16.32,124368,203170000],[20161027,16.32,16.3,16.31,16.18,16.19,195175,316510000],[20161028,16.19,16.19,16.34,16.18,16.29,150672,244740000],[20161031,16.29,16.23,16.31,16.01,16.27,146733,237640000],[20161101,16.27,16.26,16.33,16.21,16.3,130283,212180000],[20161102,16.3,16.21,16.3,16.18,16.2,250512,406670000],[20161103,16.2,16.19,16.31,16.19,16.23,71582,116380000]];
    var klineData1 = [[20160324,18.11,18.11,18.11,17.68,17.72,274483,488310000],[20160325,17.72,17.72,17.87,17.68,17.74,136192,241970000],[20160328,17.74,17.78,18,17.37,17.45,245217,433450000],[20160329,17.45,17.53,17.66,17.37,17.45,191512,335810000],[20160330,17.45,17.65,17.95,17.65,17.87,355621,634180000],[20160331,17.87,17.98,18.08,17.72,17.93,237621,425380000],[20160401,17.93,17.98,18.25,17.61,18.18,357905,643980000],[20160405,18.18,17.94,18.29,17.76,18.17,426223,768010000],[20160406,18.17,18.03,18.14,17.87,17.96,234287,421230000],[20160407,17.96,17.95,18,17.63,17.69,290477,516130000],[20160408,17.69,17.56,17.76,17.53,17.6,171322,301700000],[20160411,17.6,17.6,17.82,17.55,17.67,241176,426860000],[20160412,17.67,17.69,17.7,17.53,17.62,141008,248000000],[20160413,17.62,17.73,17.99,17.69,17.74,351897,627670000],[20160414,17.74,17.9,18.01,17.75,17.8,157962,281980000],[20160415,17.8,17.95,18.06,17.8,17.89,347735,623840000],[20160418,17.89,17.75,18.03,17.66,17.81,280841,501790000],[20160419,17.81,17.95,17.98,17.78,17.9,272464,487100000],[20160420,17.9,17.89,17.99,17.31,17.96,466146,825440000],[20160421,17.96,17.82,18.35,17.75,18.12,482129,872380000],[20160422,18.12,18,18.36,17.94,18.24,281782,513190000],[20160425,18.24,18.15,18.16,17.82,17.88,242944,435470000],[20160426,17.88,17.87,18.08,17.75,17.92,157394,281500000],[20160427,17.92,17.97,17.97,17.8,17.86,138389,247620000],[20160428,17.86,17.93,18.1,17.83,17.9,157284,282200000],[20160429,17.9,17.83,17.94,17.75,17.83,230659,412460000],[20160503,17.83,17.95,18.24,17.83,18.12,277767,501830000]];
	var klineData2 = [[20160809,15.74,15.75,15.8,15.71,15.79,154809,243950000],[20160810,15.79,15.8,15.85,15.73,15.83,184995,292530000],[20160811,15.83,15.75,16.4,15.74,16.07,526894,852410000],[20160812,16.07,16.12,16.39,16,16.36,469916,763630000],[20160815,16.36,16.5,17.02,16.45,16.94,773339,1299620000],[20160816,16.94,16.94,16.99,16.67,16.7,493840,829740000],[20160817,16.7,16.72,16.85,16.52,16.64,364466,606580000],[20160818,16.64,16.55,16.77,16.35,16.44,371101,612290000],[20160819,16.44,16.43,16.5,16.36,16.42,199273,327520000],[20160822,16.42,16.42,16.47,16.31,16.41,197686,324280000],[20160823,16.41,16.41,16.56,16.32,16.4,317544,521790000],[20160824,16.4,16.41,16.51,16.34,16.39,170854,280400000],[20160825,16.39,16.36,16.41,16.2,16.34,247499,403470000],[20160826,16.34,16.36,16.4,16.29,16.34,146881,240040000],[20160829,16.34,16.31,16.37,16.08,16.23,302020,489410000],[20160830,16.23,16.24,16.49,16.24,16.4,363970,597420000],[20160831,16.4,16.35,16.56,16.32,16.48,220034,362530000],[20160901,16.48,16.48,16.55,16.38,16.41,212720,349930000],[20160902,16.41,16.38,16.5,16.35,16.48,231470,380420000],[20160905,16.48,16.49,16.58,16.42,16.49,256770,423400000],[20160906,16.49,16.49,16.53,16.37,16.41,202826,333210000],[20160907,16.41,16.41,16.5,16.35,16.48,179756,295520000],[20160908,16.48,16.47,16.61,16.43,16.6,244069,403800000],[20160909,16.6,16.62,16.66,16.5,16.56,187395,310620000],[20160912,16.56,16.38,16.47,16.26,16.4,365092,597900000],[20160913,16.4,16.4,16.46,16.39,16.45,142344,233970000],[20160914,16.45,16.43,16.48,16.38,16.4,239814,393970000],[20160919,16.4,16.45,16.51,16.42,16.46,144660,238090000],[20160920,16.46,16.47,16.48,16.42,16.46,173968,286080000],[20160921,16.46,16.47,16.51,16.43,16.45,94161,154920000]];
	var klineData = klineData0;
    export default {
    	components:{loading},
    	data () {
		    return {	
		    	loadFlag:false,
		    	MFlag:true,
		    	chartTabList:[{
		    		name:'分时',
		    		isOn:true
		    	},{
		    		name:'日K',
		    		isOn:false
		    	},{
		    		name:'月K',
		    		isOn:false
		    	},{
		    		name:'年K',
		    		isOn:false
		    	}],
		    	navIndex:0   	
		    }
		},
		mounted:function(){	
		    var _this = this;	
		    var myCanvasMin = _this.createHiDPICanvas(winWidth,winHeight,'minCanvas');
	        document.getElementById('canvasBoxMin').appendChild(myCanvasMin);
	        var minCanvas = document.getElementById("minCanvas");
			_this.draw(minData,winHeight,minCanvas,winWidth);
			var myCanvasKline = _this.createHiDPICanvas(winWidth,winHeight,'klineCanvas');
	        document.getElementById('canvasBoxKline').appendChild(myCanvasKline);
	        var klineCanvas = document.getElementById("klineCanvas");
			_this.drawkline(klineData,winHeight,klineCanvas,winWidth);
			window.onresize = function(){
				var winWidth = document.body.clientWidth > 768 ? 768 : document.body.clientWidth;
				var PIXEL_RATIO = charts.PIXEL_RATIO;
				console.log(winWidth*PIXEL_RATIO)
				if(_this.MFlag){
					var minCharts = document.getElementById('minCanvas');
					minCharts.setAttribute("width",winWidth*PIXEL_RATIO)
					minCharts.style.width = winWidth+'px';
					var ctx = minCharts.getContext("2d");
					ctx.setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0);
					_this.draw(minData,winHeight,minCanvas,winWidth);
				}else{
					var klineCharts = document.getElementById('klineCanvas');
					klineCharts.setAttribute("width",winWidth*PIXEL_RATIO)
					klineCharts.style.width = winWidth+'px';
					var ctx = klineCharts.getContext("2d");
					ctx.setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0);
					_this.drawkline(klineData,winHeight,klineCanvas,winWidth);
				}
			}
		},
		methods:{
			createHiDPICanvas:function(w, h,name,ratio){
				if (!ratio) { ratio = PIXEL_RATIO; }
			    var can = document.createElement("canvas");
			    can.id = name;
			    can.width = w * ratio;
			    can.height = h * ratio;
			    can.style.width = w + "px";
			    can.style.height = h + "px";
			    can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
			    return can;
			},
			navClick: function (index) {
			    var _this = this;
			    var name = _this.chartTabList[index].name;
			    _this.navIndex = index;
			    for(var i=0; i<_this.chartTabList.length; i++){
	                if(i!=index){
	                  _this.chartTabList[i].isOn = false;
	                }else{
	                  _this.chartTabList[index].isOn = true;
	                }
              	}
	          	if(index==0){
                	_this.MFlag = true;		
                }else{
                	_this.MFlag = false;
                	if(name=='日K'){
	                	klineData = klineData0;
	                }else if(name=='月K'){
	                	klineData = klineData1;
	                }else if(name=='年K'){
	                	klineData = klineData2;
	                }
	                _this.drawkline(klineData,winHeight,klineCanvas,winWidth);
                }
    		},
    		draw:function(minData,height,canvas,width){
    			var context = canvas.getContext("2d");
				context.clearRect(0, 0, width, height);
				var data = [];
				var dataVol = [];
				var zsClose = minData.quote.preClose;
				var open = minData.quote.open;
				var max = minData.quote.highest;
				var min = minData.quote.lowest;
				var zVol = minData.quote.volume;
				for(var i=0;i<minData.mins.length;i++){
					data.push(minData.mins[i].price)
					dataVol.push(minData.mins[i].volume)
				}		
				var xAxisLen = 3;
				var topHeight = height * 0.75;
				var footerHeight = height *0.25;
				var xDistance = topHeight/4;
				var xLen = 0;
				var yDistance = width/241;
				var dataMax = Math.max.apply(null,data);
				var dataMin = Math.min.apply(null,data);	
			  	if(dataMax>max){max = dataMax}
				if(dataMin < min){min = dataMin}
				var maxdiff = max-zsClose;
				var mindiff = Math.abs(min-zsClose);
				if( maxdiff > mindiff ){
					min = zsClose - maxdiff;
				}else{
					max = zsClose + mindiff;
				}
				for(var i =0;i<=xAxisLen;i++){
					context.beginPath();
					context.moveTo(0,i*xDistance+xDistance);
					context.lineTo(width,i*xDistance+xDistance);
					context.lineWidth = 1;
					context.strokeStyle = "#ccc";
					context.stroke();
				}
				for (var i = 2; i >= 0; i--) {
					var val = max - i * maxdiff;
				    var valPct = ((val - zsClose) * 100 / zsClose).toFixed(2)+'%';
					var diffH = (topHeight-16) / 2;
					context.fillStyle = valPct == '0.00%' ? 'gray' : (valPct.charAt(0)>'-' ? 'green' : 'red');	
					context.font = "12px Microsoft yahei";
					if(!isNaN(val)){
						context.textAlign="left";
						context.fillText(val.toFixed(2), 0,i*diffH+12);
					}
					if(val){
						context.textAlign="right";
						context.fillText(valPct, width,i*diffH+12);
					}
				}
				context.beginPath();
				context.lineWidth = 1;  
				context.strokeStyle = "#06f";  
				for(var i =0;i<data.length;i++){
					var yValue = data[i];
					xLen += yDistance;  
					var yPont = topHeight/(max-min)*(max-data[i]);
					if (i == 0) {  
						context.moveTo(0,yPont); 
						context.lineTo(xLen,yPont);   
					}else{  
						context.lineTo(xLen,yPont);
					}
				}
				context.stroke(); 
				var volMax = Math.max.apply(null,dataVol);
				var volMin = Math.min.apply(null,dataVol);
				if(dataVol != ""){
					for(var i=0; i<dataVol.length;i++){
						var candleVolY = charts.getVolumeY(footerHeight, volMax, dataVol[i] ,topHeight);
						var candleVolHeight = footerHeight/volMax*dataVol[i];
						var yPont = footerHeight/(volMax-volMin)*(volMax-dataVol[i])
						var yPont = isFinite(yPont) ? footerHeight/(volMax-volMin)*(volMax-dataVol[i]): 0;
						if(yPont == footerHeight){
							yPont = footerHeight;
						}
						context.beginPath();
						if(i==0){		
							if(data[0]>zVol){
								context.fillStyle ='red'           
							}else{
								context.fillStyle ='green'              
							}
						}else{
							if(data[i]>data[i-1]){
								context.fillStyle ='red' 
							}else{
								context.fillStyle ='green'  
							}
						}
						context.fillRect(i*yDistance, candleVolY, 1, candleVolHeight);
						context.stroke();
					}
				}
    		},
    		drawkline:function(kdata,height,id,width){
    			var canvas = id;
				var context = canvas.getContext("2d");
				context.clearRect(0, 0, width, height);
				var data = charts.getKLData(kdata);
				var dHigh =[];
				var dLow = [];
				var volumeData = [];
				var MAsData = [];
				var max;
				var min;
				var vHigh;
				var vLow;
				var currentX = 0;
				var MAs = [{ color: 'rgb(255,70,251)', daysCount: 5 },{ color: 'rgb(227,150,34)', daysCount: 10 },{ color: 'rgb(0,153,255)', daysCount: 20 },{ color: 'rgb(53,71,107)', daysCount: 30 }];
				var spaceWidth = 2;
				var barWidth = 5;
				var dataCount = Math.ceil(width / (spaceWidth + barWidth))-1;
				var maxDataLength = data.ks.length;
				var xAxisLen = 5;
				var topHeight = height*0.75;
				var footerHeight = height*0.25;
				var filteredData = [];
				var startIndex;
				if(maxDataLength-dataCount<0){
					startIndex = 0;
				}else{
					startIndex = maxDataLength - dataCount;
				}
			    for (var i = startIndex; i < data.ks.length; i++) {
			         filteredData.push(data.ks[i]);
			    }
				for(var i=0;i<filteredData.length;i++){
					if (i == 0 && (maxDataLength - dataCount==0)) { 
						max = data.high;
						min = data.low; 
					}else { 
						dHigh.push(filteredData[i].high);
						dLow.push(filteredData[i].low);
						volumeData.push(filteredData[i].volume)
					}
				}
				max = Math.max.apply(null,dHigh);
				min = Math.min.apply(null,dLow); 
				vHigh = Math.max.apply(null,volumeData);
				vLow = Math.min.apply(null,volumeData);
				for(var i=0; i<MAs.length; i++){
					var MA = charts.calcMAPrices(data.ks, startIndex, filteredData.length, MAs[i].daysCount);
					for(var k=0; k<MA.length; k++){
						if(MA[k] != false){
							MAsData.push(MA[k])
						}
					}
					context.stroke();
				}
				max = max > Math.max.apply(null,MAsData) ? max :Math.max.apply(null,MAsData);
				min = min < Math.min.apply(null,MAsData) ? min :Math.min.apply(null,MAsData);
				for(var i=0; i<MAs.length; i++){
					var MA = charts.calcMAPrices(data.ks, startIndex, filteredData.length, MAs[i].daysCount);
					context.strokeStyle = MAs[i].color;
					context.beginPath();
					var currentX = 0;
					for(var k=0; k<MA.length; k++){
						var x = k * (spaceWidth + barWidth) + ( spaceWidth + barWidth) * .5;
						if(MA[k] != false){
							var y = charts.getY(max,min,topHeight,MA[k]); 
							if (y && i==0) {
									context.lineTo(x, y);
							} else {
									context.lineTo(x, y);
							}
						}
					}
					context.stroke();
				}	
				for(var i =1;i<xAxisLen;i++){
					var xDistance = (topHeight)/(xAxisLen-1);
					context.beginPath();
					context.moveTo(0,i*xDistance);
					context.lineTo(width,i*xDistance);
					context.lineWidth = 1;
					context.strokeStyle = "#ccc";
					context.stroke();
				}
				context.beginPath();
				context.font = "12px Microsoft yahei";
				context.textAlign="left";
				context.fillStyle = "gray";
				context.fillText(max.toFixed(2), 0, 12);
				context.fillText(min.toFixed(2), 0, topHeight-3);
				context.stroke();
				for(var i=0;i<filteredData.length;i++){
					var isRise = filteredData[i].close > filteredData[i].open;
					var color = isRise ? 'red' : 'green';
					var lineX = charts.getCandleLineX(spaceWidth,barWidth,i);
					if (currentX == 0) currentX = lineX;
					else {
						if (lineX - currentX < 1) return;
					}
					currentX = lineX;
					var topY = charts.getY(max,min,topHeight,filteredData[i].high);
					var bottomY = charts.getY(max,min,topHeight,filteredData[i].low);
					context.fillStyle = color;
					context.strokeStyle = color;
					var candleY, candleHeight,candleVolY,candleVolHeight;
					if (isRise) {
						candleY = charts.getY(max,min,topHeight,filteredData[i].close)
						candleHeight = charts.getY(max,min,topHeight,filteredData[i].open) - candleY;
					} else {
						candleY = charts.getY(max,min,topHeight,filteredData[i].open);
						candleHeight = charts.getY(max,min,topHeight,filteredData[i].close) - candleY;
					}
					candleVolY = charts.getVolumeY(footerHeight, vHigh, filteredData[i].volume ,topHeight);
					candleVolHeight = footerHeight/vHigh*filteredData[i].volume;
					//画线
					context.beginPath();
					context.moveTo(lineX, topY);
					context.lineTo(lineX, bottomY);
					context.stroke();
					var candleX = lineX - barWidth / 2;
					context.beginPath();
					context.fillRect(candleX, candleY, barWidth, candleHeight);
					context.fillRect(candleX, candleVolY, barWidth, candleVolHeight);	
					context.stroke();
				}
    		}
		}
    }
</script>