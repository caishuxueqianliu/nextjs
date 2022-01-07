
import React from 'react'
interface Props{
  count: Number,
  addCount:()=>Number
}

const About:React.FC<Props> = (props) => {
  return <div>
    {props.posts}
    {props.count}
    <button onClick={props.addCount}>count++</button>
  </div>

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

export default About
