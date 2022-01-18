import '../styles/globals.css'
import type { AppProps } from 'next/app'

// import 'antd/dist/antd.css'
import Head from 'next/head'
import { useEffect } from 'react'
// function useRem() {
//   // const setRem = async () => {
//   //   await require('lib-flexible')
//   // }
//   const baseSize = 37.5; // 注意此值要与 postcss.config.js 文件中的 rootValue保持一致
// // 设置 rem 函数
//   const setRem = async () => {
//     // 当前页面宽度相对于 375宽的缩放比例，可根据自己需要修改,一般设计稿都是宽750(图方便可以拿到设计图后改过来)。
//     const scale = document.documentElement.clientWidth / 750;
//     // 设置页面根节点字体大小（“Math.min(scale, 2)” 指最高放大比例为2，可根据实际业务需求调整）
//     document.documentElement.style.fontSize = `${baseSize * Math.min(scale, 2)}px`;
//   }
//   useEffect(() => {
//     setRem()
//      window.addEventListener('resize', setRem)
//   }, [])
  //return (
      // <div>
      // <Head>
      //   <meta name="renderer" content="webkit" />
      //   <title>title</title>
      //   <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"></meta>
      //   <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      // </Head>
      // </div>
  //)
// }

function MyApp({ Component, pageProps }: AppProps) {
  // useRem()

  return <Component {...pageProps} />
}

export default MyApp
