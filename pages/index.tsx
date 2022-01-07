import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import About from './about'
import React, {useState,useEffect} from 'react'
import * as echarts from 'echarts';
interface Count {
  count:Number
}

const Home: NextPage = (props) => {
  let [count, setCount] = useState(0)

    const init = ():void =>{
        var chartDom:any = document.getElementById('echart');
        var myChart = echarts.init(chartDom);
        myChart.resize()
        var option;
        option = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [150, 230, 224, 218, 135, 147, 260],
                    type: 'line'
                }
            ]
        };
        option && myChart.setOption(option);
    }

    const addCount = ():void=> {
        let newCount = count
        setCount(newCount+=1)
    }
    useEffect(()=>{
        // setInterval(()=>{addCount()},1000)
        window.addEventListener('resize', () => {
            init()
        })
    },[])

    return (
   <>
       {/*<div className={styles.box}></div>*/}
       <div id={"echart"} className={styles.echart}></div>
        <p>{props.posts}</p>
        <p>{count}</p>
        <About count={count} addCount={addCount}/>
     </>
  )

}
export async function getStaticProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    // const res = await fetch('https://.../posts')
    // const posts = await res.json()
    // const res = await fetch('http://101.35.251.32:8081/admin/getInfo')
    const res = await fetch('http://localhost:3000/api/hello')
    const posts = await  res.json()
    console.log(posts.name)
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            posts:posts.name
        },
    }
}

export default Home
