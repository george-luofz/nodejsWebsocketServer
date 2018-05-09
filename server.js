// import { setInterval } from 'timers';

const WebSocket = require('ws');
const protobuf = require('protobufjs');

// 1.构建pb数据
var root = protobuf.loadSync('login.proto');
var InfoClass = root.lookupType('com.yixia.Info');

let infoData = {
    name : "luo",
    passwd: "234567"
}
var verifySuccess = false;

var errorMsg = InfoClass.verify(infoData);
if(errorMsg){
    console.log('verfiy faield '+errorMsg);
}else{
    verifySuccess = true;
    console.log('verify success ');

}



const EVENT_AUTH = 'auth';
const EVENT_GAME_START = 'game_start';
const EVENT_COMMIT_ANSWER = 'game_commit_answer';
const EVENT_ANSWER_FINISH = 'game_answer_finish';
const EVENT_USE_PROP = 'game_use_prop';
const EVENT_TIME_OVER = 'game_time_over';
const EVENT_GAME_OVER = 'game_over';
const EVENT_HEART_BEAT = 'heart_beat';

let sendEvents = [EVENT_AUTH, EVENT_COMMIT_ANSWER, EVENT_USE_PROP, EVENT_TIME_OVER, EVENT_HEART_BEAT]; //客户端发送事件
let observeEvents = [EVENT_GAME_START, EVENT_ANSWER_FINISH, EVENT_GAME_OVER]; // 服务端推送事件

const meIconUrl='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525708952705&di=aad1342dd555e25baaed5c53b007aabb&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F203fb80e7bec54e776561740b1389b504fc26a31.jpg'
const sheIconUrl='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525708804622&di=5023425cc7572a5b965174c583ba13d1&imgtype=0&src=http%3A%2F%2Fimg.duoziwang.com%2F2018%2F01%2F2020084711610.png'

const initAuthDataJSON = {
        "roomId":"c06116568ebd12079e60de86f95e882b",
        "gameId":"f486469c96c4d96a53b1070234965490",
        "questions":[
            {
                "questionId":"11",
                "title":"“北斗七星”是？",
                "options":[
                    "一个星座",
                    "一个星座中的一部分",
                    "由几个星座中的部分组合而成"
                ]
            },
            {
                "questionId":"78",
                "title":"“停车坐爱枫林晚，霜叶红于二月花”中“坐”的意思是？",
                "options":[
                    "因为",
                    "坐下",
                    "座位"
                ]
            },
            {
                "questionId":"80",
                "title":"“稳住，我们能赢！”出自哪个游戏？",
                "options":[
                    "王者荣耀",
                    "刺客信条",
                    "阴阳师"
                ]
            },
            {
                "questionId":"82",
                "title":"“我就是我，是颜色不一样的烟火”是哪首歌？",
                "options":[
                    "我",
                    "再见二丁目",
                    "我们"
                ]
            },
            {
                "questionId":"1",
                "title":" 《笑傲江湖》里令狐冲是向谁学会独孤九剑的? ",
                "options":[
                    "田伯光",
                    "风清扬",
                    "不戒和尚"
                ]
            },
            {
                "questionId":"15",
                "title":"“不为五斗米折腰”最早是指谁不愿为五斗米折腰？",
                "options":[
                    "陶渊明",
                    "司马迁",
                    "诸葛亮"
                ]
            },
            {
                "questionId":"4",
                "title":"地心说认为谁是宇宙的中心？",
                "options":[
                    "太阳",
                    "地球",
                    "月亮"
                ]
            },
            {
                "questionId":"100000063",
                "title":"《钢铁是怎样炼成的》中，保尔是在谁的影响下走向革命道路？",
                "options":[
                    "阿维尔巴赫教授 ",
                    "巴扎诺娃",
                    "朱赫莱"
                ]
            },
            {
                "questionId":"100000017",
                "title":"“粒子束武器”是指什么武器？",
                "options":[
                    "微波武器",
                    "激光武器",
                    "X射线激光武器"
                ]
            },
            {
                "questionId":"100000027",
                "title":"“也许放弃，才能靠近你”是出自莫文蔚的哪首歌？",
                "options":[
                    "《阴天》",
                    "《爱情》",
                    "《盛夏的果实》"
                ]
            }
        ],
        "answers":[
            3,
            3,
            3,
            3,
            3,
            3,
            3,
            3,
            3,
            3
        ],
        "userInfo":[
            {
                "openId":"dd68f0f702a0f637c7151a92a13458b4",
                "iconUrl":meIconUrl
            },
            {
                "openId":"a4ec4aa64671960ec8c1b1a302aa78cc",
                "iconUrl":sheIconUrl
            }
        ],
        "lastTime":15,
        "propTime":3,
        "props":[
            {
                "key":"datifuhuo",
                "logo":"http://hb-redpack.semmw.com/game/images/20184/152282069240972.png",
                "count":0,
                "price":100,
                "gameCount":1
            },
            {
                "key":"datixuanxiang",
                "logo":"http://hb-redpack.semmw.com/game/images/20184/1522820702628548.png",
                "count":1,
                "price":100,
                "gameCount":1
            },
            {
                "key":"datishengming",
                "logo":"http://hb-redpack.semmw.com/game/images/20184/1522820711290249.png",
                "count":1,
                "price":100,
                "gameCount":1
            },
            {
                "key":"datishuangbei",
                "logo":"http://hb-redpack.semmw.com/game/images/20184/1522820711290249.png",
                "count":0,
                "price":100,
                "gameCount":1
            }
        ]
    }
// const initAuthData = initAuthDataJSON

var initAuthData = {
    questions:[
        {questionId:1,title:"这首歌的作者生于哪个年代?",options:["50后","60后","70后"]},
        {questionId:2,title:"这首歌的作者生于哪个国家?",options:["中国","美国","日本"]},
        {questionId:3,title:"这首歌的作者生于哪个城市?",options:["北京","上海","天津"]},
        {questionId:4,title:"这首歌的作者哪个口音?",options:["北京话","上海话","河南话"]},
        {questionId:5,title:"这首歌的作者什么性别?",options:["男","女","未知"]}
    ],
    answers:[1,2,2,1,3], // 1,2分别表示正确答案顺序，取值(1,2,3)
    userInfo:[{iconUrl:meIconUrl,userId:123,openId:"1"},{iconUrl:sheIconUrl,userId:234,openId:"2"}], //考虑到可能有多个信息，用了字典
    props:[{key:"",logo:"http://",count:10,gameCount:1}], //道具信息，里边是多个字典；keyid表示道具id，iconUrl表示道具图片，lastNum表示剩余数量
    lastTime:15, //每题时长,
    propTime:3  //道具时长
}

var gameStartInfoData = {
    userInfo:[{openId:"",score:23},{openId:"",score:23}],
    questionId:1, //题目索引
    props:[{id:1,iconUrl:"http://",lastNum:10,start:1}], //本题开始时的道具信息  //待定
    qnum:1 //第几题
}

var commitAnswerInfoData = {
    openId:1,
    currentScore : 10, //当前题目得分
    totalScore : 20,  //总得分
    continuousNum : 3//连续答对题目数
}

var answerFinishInfoData = {

}

var usePropInfoData = {
    proId : 1,
    openId : 1,
    currentScore : 10, //当前题目得分
    totalScore : 20,   //总得分
    continuousNum : 3 //连续答对题目数

}

var timeOutInfoData = {

}

var gameOverInfoData = {

}

// 2.搭建服务器
const wss = new WebSocket.Server({ port: 8085 });

var webSocket;
wss.on('connection', function connection(ws) {
    console.log('client connection');
    webSocket = ws;
    ws.on('message',onMessage);
    return;
    // ws.on('message', function incoming(message) {
    //     console.log('received: %s', message);
    //     var jsonObj = JSON.parse(message);
    //     console.log('event'+ jsonObj.eventId);
    //     if(jsonObj.eventId === EVENT_AUTH){
    //         var respData = {
    //             eventId : EVENT_AUTH,
    //             error : null,
    //             message : initAuthData,
    //             success : 1
    //         }
    //         ws.send(JSON.stringify(respData));
    //     }else{
    //         console.log('event not true');
    //     }

    //     setTimeout(function(){
    //         // if(jsonObj.eventId === EVENT_GAME_START){
    //             var respData = {
    //                 eventId : EVENT_GAME_START,
    //                 error : null,
    //                 message : gameStartInfoData,
    //                 success : 1
    //             }
    //             ws.send(JSON.stringify(respData));
    //         // }
    //     },1000);

    //     if(jsonObj.eventId === EVENT_COMMIT_ANSWER){

    //     }

        // 收到
        // if(message ==='hello server'){
        //     console.log('get client message');
        //     // ws.send('hello client');
        //     setInterval(function(){
        //         console.log('send to client message');
        //         ws.send('hello client');
        //     },1000)
        // }

        // 1. 验证是否是json
        // 2. 解析event
        // 3. 返回指定数据

    // });
  // 验证成功就发送
//   if(verifySuccess === true){
//     console.log('begin to send');

//     var info = InfoClass.create(infoData);
//     var buffer = InfoClass.encode(info).finish();
//     ws.send('hello world');
//     console.log('end send');
//   }
  
});

 function onMessage(message){
    console.log('received: %s', message);
    var jsonObj = JSON.parse(message);
    var eventId = jsonObj.eventId;
    console.log('eventId '+ eventId);

    
    if(eventId === EVENT_COMMIT_ANSWER){
        var tempData = buildResponseDataWithEvent(EVENT_ANSWER_FINISH);
        var tempJsonStr = JSON.stringify(tempData);
        console.log('send client with answerFinish');
        webSocket.send(tempJsonStr);
    }else if(eventId === EVENT_TIME_OVER){
        var questionIds = jsonObj['data']['questionId'];
        var newData = null;
        console.log('questionId ' +questionIds);
        if(questionIds === initAuthData['questions'].length){
            newData = buildResponseDataWithEvent(EVENT_GAME_OVER);
            console.log('send client with gameOver');
        }else{
            questionIds++;
            var tempData = {
                userInfo:[{openId:"",score:44},{openId:"",score:48}],
                qnum:questionIds, //第几题
                props:[{id:1,iconUrl:"http://",lastNum:10,start:1}] //本题开始时的道具信息  //待定
            }
            var newData = {
                eventId : EVENT_GAME_START,
                error : null,
                message : tempData,
                success : 1
            }
            console.log('send client with game start');
        }
        var tempJsonStr = JSON.stringify(newData);
        console.log('send client with '+ tempJsonStr);
        webSocket.send(tempJsonStr);
    }else{
        var respData = buildResponseDataWithEvent(jsonObj.eventId);
        var sendStr = JSON.stringify(respData);
        console.log('send client with '+ sendStr);
        webSocket.send(sendStr);
    }
    
    // setInterval(() => {
        // var gameStartData = buildResponseDataWithEvent(EVENT_GAME_START);
        // webSocket.send('{"eventId":"event","message":"234"}');
    // }, 1000);

    // setTimeout(() => {
    //     var gameStartData = buildResponseDataWithEvent(EVENT_GAME_START);
    //     webSocket.send(JSON.stringify(gameStartData))
    // }, 1000);

    // setTimeout(() => {
    //     console.log('2s2s2s2s');
    //     var gameStartData = buildResponseDataWithEvent(EVENT_ANSWER_FINISH);
    //     webSocket.send(JSON.stringify(gameStartData))
    // }, 2000);

    // setTimeout(() => {
    //     var gameStartData = buildResponseDataWithEvent(EVENT_GAME_OVER);
    //     webSocket.send(JSON.stringify(gameStartData))
    // }, 5000);
 }

 function buildResponseDataWithEvent(event){
    var data = _infoDataWithEvent(event);
    var respData = {
        eventId : event,
        error : null,
        message : data,
        success : 1
    }
    return respData;
 }

 function _infoDataWithEvent(event){
     let data = null;
     switch (event){
         case EVENT_AUTH: data = initAuthData;break;
         case EVENT_GAME_START: data = gameStartInfoData;break;
         case EVENT_COMMIT_ANSWER: data = commitAnswerInfoData;break;
         case EVENT_ANSWER_FINISH: data = answerFinishInfoData;break;
         case EVENT_USE_PROP: data = usePropInfoData;break;
         case EVENT_TIME_OVER : data = timeOutInfoData;break;
         case EVENT_GAME_OVER : data = gameOverInfoData;break;
     }
     console.log('evnetId '+event + ' should response with '+ JSON.stringify(data));
     return data;
 }



