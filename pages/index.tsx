import type { NextPage } from 'next'
// import Head from 'next/head'
// import Link from 'next/link'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
// import React, {useState,useEffect} from 'react'
// // import * as echarts from 'echarts';
//
// const Home: NextPage = (props) => {
//
//     return (
//    <>
//            <Link href="/resume">
//           <a>resume</a>
//         </Link>
//
//      </>
//   )
//
// }
// export async function getStaticProps() {
//     const res = await fetch('http://localhost:3000/api/hello')
//     const posts = await res.json()
//     return {
//         props: {
//             posts:posts.name
//         },
//     }
// }
//
// export default Home
import React, {useState, useEffect, useRef} from 'react'
import StyleEditor from '../components/styleEditor'
import ResumeEditor from '../components/ResumeEditor'
import {md} from '../static/test'

const Home: NextPage = () => {
    const data = {
        interval: 20,
        currentStyle: '',
        enableHtml: false,
        fullStyle:[
            `/*
* Inspired by http://strml.net/测呃呃呃呃呃呃呃呃呃
* 大家好，我是方方
* 二月了，好多公司都在招聘，你是不是也在准备简历呀。
* 说做就做，我也来写一份简历！
*/

/* 首先给所有元素加上过渡效果 */
* {
  transition: all .3s;
}

/* 文字离边框太近了 */
.styleEditor {
  width: 45vw; height: 90vh;
  color: rgb(222,222,222);
  background-color:  #111111;
  box-shadow:0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  border-radius: 20px;
  padding: .5em;
  margin: .5em;
  overflow: auto;
}
/* 代码高亮 */
.token.selector{ color: rgb(133,153,0); }
.token.property{ color: rgb(187,137,0); }
.token.punctuation{ color: yellow; }
.token.function{ color: rgb(42,161,152); }

/* 加点 3D 效果呗 */
html{
  perspective: 1000px;
}
/* 接下来我给自己准备一个编辑器 */
.resumeEditor{
  position: fixed; right: 0; top: 0;
  width: 48vw; height: 90vh;
  background: white; color: #222;
  border-radius: 20px;
  box-shadow:0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  padding: .5em;  margin: .5em;
  overflow: auto;
}
/* 好了，我开始写简历了 */


`,
            `
/* 这个简历好像差点什么
 * 对了，这是 Markdown 格式的，我需要变成对 HR 更友好的格式
 * 简单，用开源工具翻译成 HTML 就行了
 */
`
            ,
            `
/* 再对 HTML 加点样式 */
.resumeEditor{
  padding: 2em;
}
.resumeEditor h2{
  display: inline-block;
  border-bottom: 1px solid;
  margin: 1em 0 .5em;
}
.resumeEditor ul,.resumeEditor ol{
  list-style: none;
}
.resumeEditor ul> li::before{
  content: '•';
  margin-right: .5em;
}
.resumeEditor ol {
  counter-reset: section;
}
.resumeEditor ol li::before {
  counter-increment: section;
  content: counters(section, ".") " ";
  margin-right: .5em;
}
.resumeEditor blockquote {
  margin: 1em;
  padding: .5em;
  background: #ddd;
}
`],
        currentMarkdown: '',
        fullMarkdown:md
    }
    const [currentStyle,setCurrentStyle] = useState('')
    const [enableHtml,setEnableHtml] = useState(false)
    const [currentMarkdown,setCurrentMarkdown] = useState('')
    const styleEditorRef = useRef("")
    const  makeResume = async () =>{
        await progressivelyShowStyle(0)
        await progressivelyShowResume()
        await progressivelyShowStyle(1)
        await showHtml()
        await progressivelyShowStyle(2)
    }
    const showHtml = () => {
        return new Promise((resolve, reject) => {
            data.enableHtml = true
            setEnableHtml(true)
            // data.$nextTick(() => {
            //     this.$refs.resumeEditor.goTop()
            // })
            resolve(true)
        })
    }
    const progressivelyShowStyle = (n:number) =>{
        return new Promise((resolve, reject) => {
            let interval = data.interval
            let showStyle = (async function () {
                let style = data.fullStyle[n]
                if (!style) { return }
                // 计算前 n 个 style 的字符总数
                let length = data.fullStyle.filter((_, index) => index <= n).map((item) => item.length).reduce((p, c) => p + c, 0)
                let prefixLength = length - style.length
                if (data.currentStyle.length < length) {
                    let l = data.currentStyle.length - prefixLength
                    let char = style.substring(l, l + 1) || ' '
                    data.currentStyle += char
                    setCurrentStyle(data.currentStyle)
                    // if (style.substring(l - 1, l) === '\n' && styleEditorRef) {
                    //     // data.$nextTick(() => {
                    //    console.log(styleEditorRef)
                    //     // })
                    // }
                    setTimeout(showStyle, interval)
                } else {
                    resolve('')
                }
            }).bind(this)
            showStyle()
        })
    }


    const progressivelyShowResume = () => {
        return new Promise((resolve, reject) => {
            let length = data.fullMarkdown.length
            let interval = data.interval
            let showResume = () => {
                if (data.currentMarkdown.length < length) {
                    data.currentMarkdown = data.fullMarkdown.substring(0, data.currentMarkdown.length + 1)
                    setCurrentMarkdown(data.currentMarkdown)
                    let lastChar = data.currentMarkdown[data.currentMarkdown.length - 1]
                    let prevChar = data.currentMarkdown[data.currentMarkdown.length - 2]
                    // if (prevChar === '\n' && data.$refs.resumeEditor) {
                    //     data.$nextTick(() => data.$refs.resumeEditor.goBottom())
                    // }
                    setTimeout(showResume, interval)
                } else {
                    resolve('')
                }
            }
            showResume()
        })
    }
    useEffect(()=>{
        makeResume()
    },[])

    return <div >
        <StyleEditor code={currentStyle}/>
        {/*<pre className="" dangerouslySetInnerHTML={{ __html: Prism.highlight(data.fullStyle, Prism.languages.css)}}></pre>*/}
        <ResumeEditor enableHtml={enableHtml} markdown={currentMarkdown}/>
        {/*<span style={{fontSize:16}}>{currentStyle} </span> {setEnableHtml}*/}
    </div>

}


export default Home
