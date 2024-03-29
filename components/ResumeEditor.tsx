
import React,{ useState, useMemo } from 'react';
// @ts-ignore
import {marked} from 'marked'


const ResumeEditor = (props:{markdown:string,enableHtml:boolean}) => {
    const result:string = useMemo(() => {
        return props.enableHtml ? marked(props.markdown) : props.markdown
    }, [props.markdown])
    // className={htmlMode:enableHtml} {["iconfont ",isRed ?item.icon :'' ]
    return  <div className={['resumeEditor'].join('')}>
        {/*{props.enableHtml ?*/}
        {/*        <div dangerouslySetInnerHTML={{ __html: marked(props.markdown)}}></div>*/}
        {/*        :  <pre> {result}</pre> }*/}
        <div dangerouslySetInnerHTML={{ __html: marked(props.markdown)}}></div>
</div>

}
//
// export async function getStaticProps() {
//     // Call an external API endpoint to get posts.
//     // You can use any data fetching library
//     // const res = await fetch('https://.../posts')
//     // const posts = await res.json()
//     // const res = await fetch('http://101.35.251.32:8081/admin/getInfo')
//     const res = await fetch('http://localhost:3000/api/hello')
//     const posts = await  res.json()
//     console.log(posts.name)
//     // By returning { props: { posts } }, the Blog component
//     // will receive `posts` as a prop at build time
//     return {
//         props: {
//             posts:posts.name
//         },
//     }
// }

export default ResumeEditor
