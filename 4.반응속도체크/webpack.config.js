const {VueLoaderPlugin} = require('vue-loader');
const path = require('path');
// 노드의 모듈을 만들었다
// 웹팩은 스크립트등을 너무 많이 사용해서 하나로 합치기 위해 webpack을 사용한다 .
module.exports = {
    mode: 'development',
    devtool: 'eval', //개발엔 eval , 배포후 hidden-saurce-map
    resolve: {
        extensions: ['.js', '.vue'],
    },
    //하나로 합쳐질 파일의 이름 app (나중에 app.js로 하나로 합쳐진다 )
    entry: {
        // app: './main.js',
        app: path.join(__dirname, 'main.js'),
    },
    //웹팩의 핵심
    module: {
        //자바스크립트 파일들을 어떻게 처리할건지 정해둔다
        rules: [{
            test: /\.vue$/, //파일명이 .vue로 끝나는 파일
            loader: 'vue-loader', //vue-loader을 사용하겠다.
        }, {
            test: /\.css$/,
            use: [
                'vue-style-loader',
                'css-loader',
            ]
        },],
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    //내보낼 파일의이름
    output: {
        //filename: [name].js
        filename: '[name].js',
        //__dirname 현재 경로, dist 폴더 이름
        path: path.join(__dirname, 'dist'), //경로
    },
};